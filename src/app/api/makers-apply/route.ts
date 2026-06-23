import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { captureLeadEvent } from "@/lib/lead-capture";
import { checkRateLimit, getClientIp, isHoneypotTripped } from "@/lib/rate-limit";
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
      posthog_distinct_id,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      referrer,
      gclid,
      fbclid,
      channel,
      first_touch_attribution,
      last_touch_attribution,
    } = body;

    // Honeypot: bots auto-fill every field, including the hidden one. A filled
    // trap means a bot — respond success-shaped without writing anything.
    if (isHoneypotTripped(body)) {
      return NextResponse.json({ success: true });
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    if (!brand_name || !contact_name) {
      return NextResponse.json({ error: "Brand name and contact name are required" }, { status: 400 });
    }

    // Rate limit per client IP — cheap first line of defense against spam.
    const ip = getClientIp(request);
    const limit = checkRateLimit(`${ip}:makers-apply`);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Consolidate the unified lead attribution into a single jsonb column.
    const lead_attribution = {
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_content: utm_content || null,
      utm_term: utm_term || null,
      referrer: referrer || null,
      gclid: gclid || null,
      fbclid: fbclid || null,
      channel: channel || null,
      first_touch: first_touch_attribution || null,
      last_touch: last_touch_attribution || null,
    };

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
      lead_attribution,
      posthog_distinct_id: posthog_distinct_id || null,
    });

    if (error) {
      console.error("[MakerApply] Supabase error:", JSON.stringify({
        code: error.code,
        message: error.message,
        details: error.details,
      }));
      return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
    }

    // Track server-side. Keyed on the anonymous posthog_distinct_id so the
    // application merges with the lead's pre-signup browsing.
    captureLeadEvent({
      event: "maker_application_submitted",
      email: normalizedEmail,
      posthogDistinctId: posthog_distinct_id,
      properties: { brand_name, referral_source },
      personProps: { email: normalizedEmail, role: "maker" },
    });

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
