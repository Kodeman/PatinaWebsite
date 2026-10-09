import { after, NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { systemMessages } from "@/lib/copy/system-messages";
import { captureLeadEvent } from "@/lib/lead-capture";
import { checkRateLimit, getClientIp, isHoneypotTripped } from "@/lib/rate-limit";
import { sendContactAutoReply, sendContactNotification } from "@/lib/emails/contact-received";
import { errorMessage } from "@/lib/errors";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Save contact notes, with an acknowledged email fallback when storage fails. */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, reason, message, posthog_distinct_id } = body;

    // Silently accept honeypot hits so bots can't detect the trap.
    if (isHoneypotTripped(body)) {
      return NextResponse.json({ success: true });
    }

    const ip = getClientIp(request);
    const { ok, retryAfter } = checkRateLimit(`${ip}:contact`);
    if (!ok) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!message || !String(message).trim()) {
      return NextResponse.json({ error: "A message is required" }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const safeName = String(name).trim();
    const safeReason = String(reason || "general").trim();
    const safeMessage = String(message).trim();

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: systemMessages.errors.generic },
        { status: 503, headers: { "Retry-After": "60" } },
      );
    }

    const notifyFounders = async () => {
      try {
        const result = await sendContactNotification({
          name: safeName,
          email: normalizedEmail,
          reason: safeReason,
          message: safeMessage,
        });
        if (!result.success) console.error("[Contact] Notification email was not accepted");
        return result.success;
      } catch {
        console.error("[Contact] Notification email failed");
        return false;
      }
    };

    // Keep the existing email fallback, but confirm acceptance before success.
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: safeName,
      email: normalizedEmail,
      reason: safeReason,
      message: safeMessage,
      posthog_distinct_id: posthog_distinct_id || null,
      user_agent: request.headers.get("user-agent") || null,
    });
    if (error) {
      console.error("[Contact] Supabase insert failed; attempting email fallback");
      if (!(await notifyFounders())) {
        return NextResponse.json(
          { error: systemMessages.errors.generic },
          { status: 503, headers: { "Retry-After": "60" } },
        );
      }
    } else {
      // A saved note can be acknowledged while notification completes.
      after(async () => { await notifyFounders(); });
    }

    after(() =>
      sendContactAutoReply({ email: normalizedEmail, name: safeName }).catch((err) => {
        console.error("[Contact] Auto-reply email failed:", errorMessage(err));
      }),
    );

    captureLeadEvent({
      event: "contact_form_submitted",
      email: normalizedEmail,
      posthogDistinctId: posthog_distinct_id,
      properties: {
        reason: safeReason,
        email_domain: normalizedEmail.split("@")[1],
      },
      personProps: { email: normalizedEmail },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact] Request error:", errorMessage(err));
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
