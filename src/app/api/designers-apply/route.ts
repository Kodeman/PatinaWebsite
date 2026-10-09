import { after, NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { systemMessages } from "@/lib/copy/system-messages";
import { captureLeadEvent } from "@/lib/lead-capture";
import { checkRateLimit, getClientIp, isHoneypotTripped } from "@/lib/rate-limit";
import { sendDesignerReceived } from "@/lib/emails/application-received";
import { sendLeadNotification } from "@/lib/emails/lead-notification";
import { errorMessage } from "@/lib/errors";

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
      posthog_distinct_id,
    } = body;

    // Silently accept honeypot-tripped submissions without persisting — don't
    // reveal the trap to bots.
    if (isHoneypotTripped(body)) {
      return NextResponse.json({ success: true });
    }

    const ip = getClientIp(request);
    const { ok, retryAfter } = checkRateLimit(`${ip}:designers-apply`);
    if (!ok) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

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

    // Consolidated attribution snapshot stored on the application row.
    const leadAttribution = {
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
      return NextResponse.json(
        { error: systemMessages.errors.generic },
        { status: 503, headers: { "Retry-After": "60" } },
      );
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
      lead_attribution: leadAttribution,
      posthog_distinct_id: posthog_distinct_id || null,
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

    // Track server-side. distinctId resolves to the anonymous posthog_distinct_id
    // (via captureLeadEvent) so pre-application browsing merges with this person.
    captureLeadEvent({
      event: "designer_application_submitted",
      email: normalizedEmail,
      posthogDistinctId: posthog_distinct_id,
      properties: {
        company: company || null,
        has_company: !!company,
        has_website: !!website,
        has_motivation: !!motivation,
        email_domain: normalizedEmail.split("@")[1],
        referral_source: referral_source || null,
      },
      personProps: { email: normalizedEmail, role: "designer" },
      attribution: body,
    });

    // Run the acknowledgement after the response. Send failures don't block
    // the success response — the row is saved either way.
    after(() =>
      sendDesignerReceived({
        email: normalizedEmail,
        first_name,
        last_name,
      }).catch((err) => {
        console.error("[DesignerApply] Ack email failed:", errorMessage(err));
      }),
    );
    after(() =>
      sendLeadNotification({
        kind: "designer application",
        email: normalizedEmail,
        name: `${first_name} ${last_name}`,
        distinctId: posthog_distinct_id,
        fields: { role: "designer", source: body.source, signup_page: body.signup_page, channel },
        attribution: body,
      }).catch((err) => {
        console.error("[DesignerApply] Lead notification failed:", errorMessage(err));
      }),
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DesignerApply] Request error:", errorMessage(err));
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
