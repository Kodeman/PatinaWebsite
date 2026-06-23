import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getServerPostHog } from "@/lib/posthog-server";
import { isHoneypotTripped, checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { captureLeadEvent } from "@/lib/lead-capture";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Silently drop bots that filled the hidden honeypot field — return a
    // success-shaped response so they can't detect the trap.
    if (isHoneypotTripped(body)) {
      return NextResponse.json({ success: true });
    }

    if (!checkRateLimit(getClientIp(request)).ok) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const {
      email,
      source,
      signup_page,
      cta_text,
      utm,
      posthog_distinct_id,
      preferred_styles,
      first_touch_attribution,
      last_touch_attribution,
      role,
      gclid,
      fbclid,
      channel,
    } = body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    if (!source) {
      return NextResponse.json({ error: "Source is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!supabaseAdmin) {
      console.log("[Founding] Supabase not configured, signup data:", {
        email: normalizedEmail,
        source,
        signup_page,
        preferred_styles,
      });
      return NextResponse.json({ success: true });
    }

    const { error } = await supabaseAdmin.from("waitlist").upsert(
      {
        email: normalizedEmail,
        source,
        signup_page: signup_page || null,
        cta_text: cta_text || null,
        utm_source: utm?.utm_source || null,
        utm_medium: utm?.utm_medium || null,
        utm_campaign: utm?.utm_campaign || null,
        utm_content: utm?.utm_content || null,
        utm_term: utm?.utm_term || null,
        referrer: utm?.referrer || null,
        role: role || "unknown",
        gclid: gclid || null,
        fbclid: fbclid || null,
        channel: channel || null,
        posthog_distinct_id: posthog_distinct_id || null,
        first_touch_attribution: {
          ...(first_touch_attribution || {}),
          ...(preferred_styles ? { preferred_styles } : {}),
        },
        last_touch_attribution: last_touch_attribution || null,
        user_agent: request.headers.get("user-agent") || null,
      },
      { onConflict: "email" }
    );

    if (error) {
      console.error("[Founding] Supabase error:", JSON.stringify({
        code: error.code,
        message: error.message,
        details: error.details,
        email_domain: normalizedEmail.split("@")[1],
        source,
      }));

      // Track signup failure server-side
      const posthog = getServerPostHog();
      if (posthog) {
        posthog.capture({
          distinctId: posthog_distinct_id || normalizedEmail,
          event: "founding_signup_error",
          properties: {
            error_code: error.code,
            error_message: error.message,
            source,
            signup_page,
          },
        });
      }

      return NextResponse.json({ error: "Failed to save signup" }, { status: 500 });
    }

    // Mirror the successful signup to PostHog server-side.
    captureLeadEvent({
      event: "founding_circle_signup",
      email: normalizedEmail,
      posthogDistinctId: posthog_distinct_id,
      properties: {
        source,
        signup_page,
        has_utm: !!utm?.utm_source,
        channel,
      },
      personProps: {
        email: normalizedEmail,
        role: role || "unknown",
        founding_source: source,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Founding] Request error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
