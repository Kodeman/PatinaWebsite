import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getServerPostHog } from "@/lib/posthog-server";
import { isHoneypotTripped, checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { captureLeadEvent } from "@/lib/lead-capture";
import { sendFoundingWelcome } from "@/lib/emails/founding-welcome";
import { SMS_CONSENT_TEXT, systemMessages } from "@/lib/copy/system-messages";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PhoneResult = { ok: true; phone: string | null } | { ok: false };

/**
 * Normalizes a submitted mobile number to E.164. An absent or empty value is
 * not an error — it yields `{ ok: true, phone: null }`, meaning "no phone on
 * this submission." Anything that can't be read as a 10–15 digit number is
 * rejected so we never store an unreachable number against a consent record.
 */
function normalizePhone(raw: unknown): PhoneResult {
  if (raw === undefined || raw === null) return { ok: true, phone: null };
  if (typeof raw !== "string") return { ok: false };

  const stripped = raw.trim().replace(/[\s.()-]/g, "");
  if (!stripped) return { ok: true, phone: null };

  const hasPlus = stripped.startsWith("+");
  const digits = hasPlus ? stripped.slice(1) : stripped;
  if (!/^\d{10,15}$/.test(digits)) return { ok: false };

  // A bare 10-digit number is assumed US/Canada; 11+ digits already carry a
  // country code and only need the `+`.
  if (!hasPlus && digits.length === 10) return { ok: true, phone: `+1${digits}` };
  return { ok: true, phone: `+${digits}` };
}

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
      first_name,
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
      phone,
      sms_consent,
    } = body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    if (!source) {
      return NextResponse.json({ error: "Source is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Runs before the Supabase guard below so a bad number is rejected the same
    // way in every environment.
    const phoneResult = normalizePhone(phone);
    if (!phoneResult.ok) {
      return NextResponse.json({ error: systemMessages.signup.invalidPhone }, { status: 400 });
    }
    const normalizedPhone = phoneResult.phone;

    // Consent is only meaningful with a number to send to. This form never
    // revokes consent — STOP is the revocation path — so a submission without
    // the box checked simply leaves any previously recorded consent alone.
    const recordSmsConsent = sms_consent === true && !!normalizedPhone;

    if (!supabaseAdmin) {
      console.log("[Founding] Supabase not configured, signup data:", {
        email: normalizedEmail,
        source,
        signup_page,
        preferred_styles,
      });
      return NextResponse.json({ success: true });
    }

    // Only send the welcome letter on a member's first signup — the upsert below
    // is idempotent on email, so a re-submit must not re-trigger the "first
    // letter from Leah."
    const { data: existingRow } = await supabaseAdmin
      .from("waitlist")
      .select("email")
      .eq("email", normalizedEmail)
      .maybeSingle();
    const isNewSignup = !existingRow;

    // `phone` is only written when we have one — never null over an existing
    // number, since this row is upserted on every re-submit.
    const baseRow = {
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
      ...(normalizedPhone ? { phone: normalizedPhone } : {}),
    };

    const smsConsentColumns = recordSmsConsent
      ? {
          sms_consent: true,
          sms_consent_at: new Date().toISOString(),
          sms_consent_text: SMS_CONSENT_TEXT,
        }
      : null;

    let { error } = await supabaseAdmin
      .from("waitlist")
      .upsert(
        smsConsentColumns ? { ...baseRow, ...smsConsentColumns } : baseRow,
        { onConflict: "email" }
      );

    // 42703 = undefined_column. The consent columns are additive, so rather
    // than lose the signup we record it without them — exactly one retry.
    if (error?.code === "42703" && smsConsentColumns) {
      console.warn(
        "[Founding] waitlist SMS consent columns are missing — migration 00433_waitlist_sms_consent.sql is pending. Retrying the signup without consent columns; this submission's consent is NOT recorded.",
      );
      ({ error } = await supabaseAdmin
        .from("waitlist")
        .upsert(baseRow, { onConflict: "email" }));
    }

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
        sms_consent: recordSmsConsent,
      },
      personProps: {
        email: normalizedEmail,
        role: role || "unknown",
        founding_source: source,
      },
    });

    // Fire-and-forget welcome — the "first letter from Leah" the modal promises.
    // New members only; send failures don't block the success response.
    if (isNewSignup) {
      sendFoundingWelcome({ email: normalizedEmail, first_name }).catch((err) => {
        console.error(
          "[Founding] Welcome email failed:",
          err instanceof Error ? err.message : "Unknown error",
        );
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Founding] Request error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
