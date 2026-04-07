import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getServerPostHog } from "@/lib/posthog-server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source, signup_page, utm } = body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!supabaseAdmin) {
      console.log("[Newsletter] Supabase not configured, signup data:", {
        email: normalizedEmail,
        source,
        signup_page,
      });
      return NextResponse.json({ success: true });
    }

    const { error } = await supabaseAdmin.from("newsletter_subscribers").upsert(
      {
        email: normalizedEmail,
        source: source || "website",
        signup_page: signup_page || null,
        utm_source: utm?.utm_source || null,
        utm_medium: utm?.utm_medium || null,
        utm_campaign: utm?.utm_campaign || null,
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

    // Track server-side
    const posthog = getServerPostHog();
    if (posthog) {
      posthog.capture({
        distinctId: normalizedEmail,
        event: "newsletter_signup",
        properties: { source, signup_page },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Newsletter] Request error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
