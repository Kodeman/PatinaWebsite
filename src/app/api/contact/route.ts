import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { captureLeadEvent } from "@/lib/lead-capture";
import { checkRateLimit, getClientIp, isHoneypotTripped } from "@/lib/rate-limit";
import { sendContactAutoReply, sendContactNotification } from "@/lib/emails/contact-received";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form handler. Previously the form silently discarded messages — this
 * route persists them (best-effort) and, crucially, emails the founders so the
 * message reaches a human even if the `contact_messages` table isn't migrated
 * yet. Email delivery is the guaranteed channel; DB persistence is a bonus.
 */
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

    // Best-effort persistence. If the table isn't migrated yet, we log and keep
    // going — the notification email below is the guaranteed delivery channel.
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin.from("contact_messages").insert({
        name: safeName,
        email: normalizedEmail,
        reason: safeReason,
        message: safeMessage,
        posthog_distinct_id: posthog_distinct_id || null,
        user_agent: request.headers.get("user-agent") || null,
      });
      if (error) {
        console.error(
          "[Contact] Supabase insert failed (continuing via email):",
          JSON.stringify({ code: error.code, message: error.message }),
        );
      }
    } else {
      console.log("[Contact] Supabase not configured, message from:", normalizedEmail);
    }

    // Notify the founders (guaranteed channel) and auto-reply to the sender.
    // Fire-and-forget: send failures don't block the success response.
    sendContactNotification({
      name: safeName,
      email: normalizedEmail,
      reason: safeReason,
      message: safeMessage,
    }).catch((err) => {
      console.error(
        "[Contact] Notification email failed:",
        err instanceof Error ? err.message : "Unknown error",
      );
    });

    sendContactAutoReply({ email: normalizedEmail, name: safeName }).catch((err) => {
      console.error(
        "[Contact] Auto-reply email failed:",
        err instanceof Error ? err.message : "Unknown error",
      );
    });

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
    console.error("[Contact] Request error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
