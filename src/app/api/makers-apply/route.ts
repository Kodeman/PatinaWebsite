import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getServerPostHog } from "@/lib/posthog-server";
import { sendMakerReceived } from "@/lib/emails/application-received";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      brand_name,
      contact_name,
      email,
      location,
      website,
      description,
      materials,
      trade_program,
      referral_source,
    } = body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    if (!brand_name || !contact_name) {
      return NextResponse.json({ error: "Brand name and contact name are required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!supabaseAdmin) {
      console.log("[MakerApply] Supabase not configured, application data:", {
        brand_name,
        contact_name,
        email: normalizedEmail,
      });
      return NextResponse.json({ success: true });
    }

    const { error } = await supabaseAdmin.from("maker_applications").insert({
      brand_name,
      contact_name,
      email: normalizedEmail,
      location: location || null,
      website: website || null,
      description: description || null,
      materials: materials || null,
      trade_program: trade_program || null,
      referral_source: referral_source || null,
    });

    if (error) {
      console.error("[MakerApply] Supabase error:", JSON.stringify({
        code: error.code,
        message: error.message,
        details: error.details,
      }));
      return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
    }

    // Track server-side
    const posthog = getServerPostHog();
    if (posthog) {
      posthog.capture({
        distinctId: normalizedEmail,
        event: "maker_application_submitted",
        properties: { brand_name, referral_source },
      });
    }

    // Fire-and-forget application-received ack email. Send failures don't block
    // the success response — the row is saved either way.
    sendMakerReceived({
      email: normalizedEmail,
      brand_name,
      contact_name,
    }).catch((err) => {
      console.error(
        "[MakerApply] Ack email failed:",
        err instanceof Error ? err.message : "Unknown error",
      );
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[MakerApply] Request error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
