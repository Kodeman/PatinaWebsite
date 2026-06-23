import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { captureLeadEvent } from "@/lib/lead-capture";
import { checkRateLimit, getClientIp, isHoneypotTripped } from "@/lib/rate-limit";
import { sendNewsletterConfirmation } from "./confirmation-email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      source,
      signup_page,
      posthog_distinct_id,
      utm,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      referrer,
      first_touch_attribution,
      last_touch_attribution,
    } = body;

    // Silently accept honeypot hits so bots can't distinguish the trap.
    if (isHoneypotTripped(body)) {
      return NextResponse.json({ success: true });
    }

    // Rate-limit per client IP (best-effort, in-memory).
    const ip = getClientIp(request);
    const limited = checkRateLimit(`${ip}:newsletter`);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers: { "Retry-After": String(limited.retryAfter) } }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Read flat top-level utm_* keys (current form payload), falling back to the
    // legacy nested `utm` object for backward compatibility.
    const resolvedUtmSource = utm_source ?? utm?.utm_source ?? null;
    const resolvedUtmMedium = utm_medium ?? utm?.utm_medium ?? null;
    const resolvedUtmCampaign = utm_campaign ?? utm?.utm_campaign ?? null;
    const resolvedUtmContent = utm_content ?? utm?.utm_content ?? null;
    const resolvedUtmTerm = utm_term ?? utm?.utm_term ?? null;
    const resolvedReferrer = referrer ?? utm?.referrer ?? null;

    if (!supabaseAdmin) {
      console.log("[Newsletter] Supabase not configured, signup data:", {
        email: normalizedEmail,
        source,
        signup_page,
      });
      return NextResponse.json({ success: true });
    }

    // Double opt-in: store an unconfirmed row with a fresh confirmation token.
    // Re-subscribing (upsert conflict on email) rotates the token and resets
    // confirmed=false so the link in the freshest email is the one that works.
    const confirmationToken = randomUUID();

    const { error } = await supabaseAdmin.from("newsletter_subscribers").upsert(
      {
        email: normalizedEmail,
        source: source || "website",
        signup_page: signup_page || null,
        utm_source: resolvedUtmSource,
        utm_medium: resolvedUtmMedium,
        utm_campaign: resolvedUtmCampaign,
        utm_content: resolvedUtmContent,
        utm_term: resolvedUtmTerm,
        referrer: resolvedReferrer,
        user_agent: request.headers.get("user-agent") || null,
        lead_attribution: {
          ...(first_touch_attribution ? { first_touch: first_touch_attribution } : {}),
          ...(last_touch_attribution ? { last_touch: last_touch_attribution } : {}),
        },
        posthog_distinct_id: posthog_distinct_id || null,
        confirmed: false,
        confirmation_token: confirmationToken,
      },
      { onConflict: "email" }
    );

    if (error) {
      console.error("[Newsletter] Supabase error:", JSON.stringify({
        code: error.code,
        message: error.message,
        details: error.details,
      }));
      return NextResponse.json({ error: "Failed to save signup" }, { status: 500 });
    }

    // Fire-and-forget double opt-in confirmation email. Send failures don't block
    // the success response — the unconfirmed row is saved either way and the user
    // can re-subscribe to trigger a fresh link.
    sendNewsletterConfirmation({
      email: normalizedEmail,
      token: confirmationToken,
    }).catch((emailErr) => {
      console.error(
        "[Newsletter] Confirmation email failed:",
        emailErr instanceof Error ? emailErr.message : "Unknown error",
      );
    });

    // Track server-side with proper identity merge. Prefers the anonymous
    // client distinct_id so pre-signup browsing links to the same person.
    captureLeadEvent({
      event: "newsletter_signup",
      email: normalizedEmail,
      posthogDistinctId: posthog_distinct_id,
      properties: {
        email_domain: normalizedEmail.split("@")[1],
        source,
        signup_page,
        utm_source: resolvedUtmSource,
        utm_medium: resolvedUtmMedium,
        utm_campaign: resolvedUtmCampaign,
      },
      personProps: { email: normalizedEmail, newsletter_source: source },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Newsletter] Request error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
