import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getServerPostHog } from "@/lib/posthog-server";
import { sendDesignerReceived } from "@/lib/emails/application-received";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      first_name,
      last_name,
      email,
      company,
      location,
      website,
      motivation,
      sourcing_process,
      referral_source,
    } = body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    if (!first_name || !last_name) {
      return NextResponse.json(
        { error: "First and last name are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!supabaseAdmin) {
      console.log("[DesignerApply] Supabase not configured, application data:", {
        first_name,
        last_name,
        email: normalizedEmail,
        company,
      });
      return NextResponse.json({ success: true });
    }

    const { error } = await supabaseAdmin.from("founding_designer_applications").insert({
      first_name,
      last_name,
      email: normalizedEmail,
      company: company || null,
      location: location || null,
      website: website || null,
      motivation: motivation || null,
      sourcing_process: sourcing_process || null,
      referral_source: referral_source || null,
    });

    if (error) {
      console.error(
        "[DesignerApply] Supabase error:",
        JSON.stringify({
          code: error.code,
          message: error.message,
          details: error.details,
        })
      );
      return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
    }

    // Track server-side
    const posthog = getServerPostHog();
    if (posthog) {
      posthog.capture({
        distinctId: normalizedEmail,
        event: "designer_application_submitted",
        properties: {
          company: company || null,
          has_website: !!website,
          has_motivation: !!motivation,
          referral_source: referral_source || null,
        },
      });
    }

    // Fire-and-forget application-received ack email. Send failures don't block
    // the success response — the row is saved either way.
    sendDesignerReceived({
      email: normalizedEmail,
      first_name,
      last_name,
    }).catch((err) => {
      console.error(
        "[DesignerApply] Ack email failed:",
        err instanceof Error ? err.message : "Unknown error",
      );
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(
      "[DesignerApply] Request error:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
