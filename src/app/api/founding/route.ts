import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getServerPostHog } from "@/lib/posthog-server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Founding] Request error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
