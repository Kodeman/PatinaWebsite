import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source, signup_page, cta_text, utm, posthog_distinct_id } = body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    if (!source) {
      return NextResponse.json({ error: "Source is required" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      // Supabase not configured — log and return success for dev
      console.log("[Waitlist] Supabase not configured, signup data:", {
        email,
        source,
        signup_page,
      });
      return NextResponse.json({ success: true });
    }

    const { error } = await supabaseAdmin.from("waitlist").upsert(
      {
        email: email.toLowerCase().trim(),
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
      },
      { onConflict: "email" }
    );

    if (error) {
      console.error("[Waitlist] Supabase error:", error);
      return NextResponse.json({ error: "Failed to save signup" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
