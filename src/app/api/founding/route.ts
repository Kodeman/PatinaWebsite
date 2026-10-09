import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { captureServerEvent } from "@/lib/posthog-server";
import { isHoneypotTripped, checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { captureLeadEvent } from "@/lib/lead-capture";
import { sendFoundingWelcome } from "@/lib/emails/founding-welcome";
import { SMS_CONSENT_TEXT, systemMessages } from "@/lib/copy/system-messages";
import {
  badRequest, emailError, emailDomain, invalidRequest, normalizeEmail, orNull, saveFailed,
  scheduleDelivery, scheduleLeadNotification, serviceUnavailable, success, userAgent,
  type LeadBody, type PersistError, type Rejection,
} from "@/lib/lead-route";

const TAG = "Founding";

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

type Db = NonNullable<typeof supabaseAdmin>;

interface Signup {
  email: string;
  phone: string | null;
  /** Consent is only meaningful with a number to send to. */
  smsConsent: boolean;
}

// PGRST204 = PostgREST rejected a column the schema cache doesn't know
// (42703 is the Postgres-level equivalent, kept as a belt-and-braces check).
const MISSING_COLUMN_CODES = ["PGRST204", "42703"];

function sourceError(body: LeadBody): Rejection {
  return body.source ? null : badRequest("Source is required");
}

/**
 * Honeypot, rate limit, then validation. Bots that filled the hidden honeypot
 * field get a success-shaped response so they can't detect the trap.
 */
function screen(request: NextRequest, body: LeadBody): Rejection {
  if (isHoneypotTripped(body)) return success();
  if (!checkRateLimit(getClientIp(request)).ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  return emailError(body) || sourceError(body);
}

/**
 * This form never revokes consent — STOP is the revocation path — so a
 * submission without the box checked simply leaves any previously recorded
 * consent alone.
 */
function signupOf(email: string, phone: string | null, smsConsent: unknown): Signup {
  return { email, phone, smsConsent: smsConsent === true && !!phone };
}

function roleOf(body: LeadBody): string {
  return body.role || "unknown";
}

/**
 * Consent is per-number (TCPA audit trail: the consent record must point at
 * the number the member actually agreed for). A submission that carries no
 * consent may fill an empty phone or restate the same number, but must never
 * overwrite a different stored number — that stored number may be the one an
 * earlier consent was granted for.
 */
function phoneToWrite({ phone, smsConsent }: Signup, storedPhone: string | null | undefined): string | null {
  if (!phone) return null;
  return smsConsent || !storedPhone || storedPhone === phone ? phone : null;
}

function firstTouchWithStyles(body: LeadBody) {
  return {
    ...(body.first_touch_attribution || {}),
    ...(body.preferred_styles ? { preferred_styles: body.preferred_styles } : {}),
  };
}

/**
 * `phone` is only written when we have one — never null over an existing
 * number, since this row is upserted on every re-submit.
 */
function waitlistRow(request: NextRequest, body: LeadBody, email: string, phone: string | null) {
  const utm = body.utm || {};
  return {
    email,
    source: body.source,
    signup_page: orNull(body.signup_page),
    cta_text: orNull(body.cta_text),
    utm_source: orNull(utm.utm_source),
    utm_medium: orNull(utm.utm_medium),
    utm_campaign: orNull(utm.utm_campaign),
    utm_content: orNull(utm.utm_content),
    utm_term: orNull(utm.utm_term),
    referrer: orNull(utm.referrer),
    role: roleOf(body),
    gclid: orNull(body.gclid),
    fbclid: orNull(body.fbclid),
    channel: orNull(body.channel),
    posthog_distinct_id: orNull(body.posthog_distinct_id),
    first_touch_attribution: firstTouchWithStyles(body),
    last_touch_attribution: orNull(body.last_touch_attribution),
    user_agent: userAgent(request),
    ...(phone ? { phone } : {}),
  };
}

function upsertWaitlist(db: Db, row: object) {
  return db.from("waitlist").upsert(row, { onConflict: "email" });
}

function isMissingColumn(error: PersistError | null): boolean {
  return MISSING_COLUMN_CODES.includes(String(error?.code));
}

/**
 * Upserts the signup, with the consent columns when consent was given. The
 * consent columns are additive, so rather than lose the signup when they're
 * missing we record it without them — exactly one retry. `smsConsentPersisted`
 * tracks what actually landed, so analytics can't claim a dropped consent.
 */
async function upsertSignup(db: Db, baseRow: object, smsConsent: boolean) {
  if (!smsConsent) {
    const { error } = await upsertWaitlist(db, baseRow);
    return { error, smsConsentPersisted: false };
  }

  const { error } = await upsertWaitlist(db, {
    ...baseRow,
    sms_consent: true,
    sms_consent_at: new Date().toISOString(),
    sms_consent_text: SMS_CONSENT_TEXT,
  });
  if (!isMissingColumn(error)) return { error, smsConsentPersisted: true };

  console.warn(
    "[Founding] waitlist SMS consent columns are missing (PostgREST PGRST204 / Postgres 42703) — migration 00433_waitlist_sms_consent.sql is pending. Retrying the signup without consent columns; this submission's consent is NOT recorded.",
  );
  const retry = await upsertWaitlist(db, baseRow);
  return { error: retry.error, smsConsentPersisted: false };
}

function signupFailed(body: LeadBody, email: string, error: PersistError) {
  const response = saveFailed(TAG, error, "Failed to save signup", {
    email_domain: emailDomain(email),
    source: body.source,
  });

  // Track signup failure server-side
  captureServerEvent({
    distinctId: body.posthog_distinct_id || email,
    event: "founding_signup_error",
    properties: {
      error_code: error.code,
      error_message: error.message,
      source: body.source,
      signup_page: body.signup_page,
    },
  });
  return response;
}

/**
 * The welcome letter and the founders' notice, kept alive after the response
 * on serverless hosts. Send failures don't block the success response.
 */
function scheduleWelcome(body: LeadBody, email: string) {
  scheduleDelivery(TAG, "Welcome email", () => sendFoundingWelcome({ email, first_name: body.first_name }));
  scheduleLeadNotification(TAG, {
    kind: "Founding Circle",
    email,
    name: body.first_name,
    distinctId: body.posthog_distinct_id,
    fields: { role: roleOf(body), source: body.source, signup_page: body.signup_page, channel: body.channel },
    attribution: body,
  });
}

/** Mirrors a saved signup to PostHog; new members also get the first letter. */
function recordSignup(body: LeadBody, email: string, smsConsentPersisted: boolean, isNewSignup: boolean) {
  captureLeadEvent({
    event: "founding_circle_signup",
    email,
    posthogDistinctId: body.posthog_distinct_id,
    properties: {
      source: body.source,
      signup_page: body.signup_page,
      cta_text: body.cta_text,
      email_domain: emailDomain(email),
      has_utm: !!body.utm?.utm_source,
      channel: body.channel,
      sms_consent: smsConsentPersisted,
    },
    personProps: {
      email,
      role: roleOf(body),
      founding_source: body.source,
    },
    attribution: body,
  });

  // Only on a member's first signup — the upsert is idempotent on email, so a
  // re-submit must not re-trigger the "first letter from Kody."
  if (isNewSignup) scheduleWelcome(body, email);
}

async function saveSignup(db: Db, request: NextRequest, body: LeadBody, signup: Signup) {
  const { data: existingRow } = await db
    .from("waitlist")
    .select("email, phone")
    .eq("email", signup.email)
    .maybeSingle();

  const row = waitlistRow(request, body, signup.email, phoneToWrite(signup, existingRow?.phone));
  const { error, smsConsentPersisted } = await upsertSignup(db, row, signup.smsConsent);
  if (error) return signupFailed(body, signup.email, error);

  recordSignup(body, signup.email, smsConsentPersisted, !existingRow);
  return success();
}

async function handle(request: NextRequest, body: LeadBody) {
  const rejection = screen(request, body);
  if (rejection) return rejection;

  const email = normalizeEmail(body.email);

  // Runs before the Supabase guard below so a bad number is rejected the same
  // way in every environment.
  const phoneResult = normalizePhone(body.phone);
  if (!phoneResult.ok) return badRequest(systemMessages.signup.invalidPhone);
  if (!supabaseAdmin) return serviceUnavailable();

  return saveSignup(supabaseAdmin, request, body, signupOf(email, phoneResult.phone, body.sms_consent));
}

export async function POST(request: NextRequest) {
  try {
    return await handle(request, await request.json());
  } catch (err) {
    return invalidRequest(TAG, err);
  }
}
