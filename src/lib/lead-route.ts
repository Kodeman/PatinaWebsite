import { after, NextRequest, NextResponse } from "next/server";
import { systemMessages } from "@/lib/copy/system-messages";
import { checkRateLimit, getClientIp, isHoneypotTripped } from "@/lib/rate-limit";
import { sendLeadNotification, type LeadNotification } from "@/lib/emails/lead-notification";
import { errorMessage } from "@/lib/errors";

// Response and bookkeeping steps shared by the lead routes (founding,
// newsletter, designers-apply, makers-apply, contact). Each route keeps its own
// order of checks; these helpers only name the steps.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** A parsed lead request body: untrusted JSON, read field by field. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LeadBody = Record<string, any>;

/** What a rejection step returns: the response to send, or null to continue. */
export type Rejection = NextResponse | null;

/** A Supabase write error, as logged. */
export interface PersistError {
  code?: string;
  message?: string;
  details?: string;
}

export function success() {
  return NextResponse.json({ success: true });
}

export function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

/** Retryable 503 for a request that cannot be stored right now. */
export function serviceUnavailable() {
  return NextResponse.json(
    { error: systemMessages.errors.generic },
    { status: 503, headers: { "Retry-After": "60" } },
  );
}

/** The catch-all for a body that can't be read or a handler that threw. */
export function invalidRequest(tag: string, err: unknown) {
  console.error(`[${tag}] Request error:`, errorMessage(err));
  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

/** The 429 for a client over the per-route limit, keyed `${ip}:${route}`. */
export function rateLimitResponse(request: NextRequest, route: string): Rejection {
  const { ok, retryAfter } = checkRateLimit(`${getClientIp(request)}:${route}`);
  if (ok) return null;
  return NextResponse.json(
    { error: "Too many requests" },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}

/**
 * Honeypot, then rate limit, then the route's own validation. A honeypot hit
 * gets a success-shaped response so bots can't detect the trap.
 */
export function screenSubmission(
  request: NextRequest,
  body: LeadBody,
  route: string,
  validate: (body: LeadBody) => Rejection,
): Rejection {
  if (isHoneypotTripped(body)) return success();
  return rateLimitResponse(request, route) || validate(body);
}

export function isValidEmail(email: unknown): boolean {
  return !!email && EMAIL_REGEX.test(email as string);
}

/** The 400 for a missing or malformed email, or null. */
export function emailError(body: LeadBody): Rejection {
  return isValidEmail(body.email) ? null : badRequest("Valid email is required");
}

export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function emailDomain(email: string): string {
  return email.split("@")[1];
}

/** Empty or missing values are stored as null. */
export function orNull<T>(value: T): T | null {
  return value || null;
}

export function userAgent(request: NextRequest): string | null {
  return orNull(request.headers.get("user-agent"));
}

/** The consolidated attribution snapshot stored on an application row. */
export function leadAttribution(body: LeadBody) {
  return {
    utm_source: orNull(body.utm_source),
    utm_medium: orNull(body.utm_medium),
    utm_campaign: orNull(body.utm_campaign),
    utm_content: orNull(body.utm_content),
    utm_term: orNull(body.utm_term),
    referrer: orNull(body.referrer),
    gclid: orNull(body.gclid),
    fbclid: orNull(body.fbclid),
    channel: orNull(body.channel),
    first_touch: orNull(body.first_touch_attribution),
    last_touch: orNull(body.last_touch_attribution),
  };
}

export function logSupabaseError(tag: string, error: PersistError, extra: Record<string, unknown> = {}) {
  console.error(`[${tag}] Supabase error:`, JSON.stringify({
    code: error.code,
    message: error.message,
    details: error.details,
    ...extra,
  }));
}

/** Logs a failed write and returns the route's 500. */
export function saveFailed(tag: string, error: PersistError, message: string, extra?: Record<string, unknown>) {
  logSupabaseError(tag, error, extra);
  return NextResponse.json({ error: message }, { status: 500 });
}

/**
 * Runs a send after the response, within its lifetime on serverless hosts. A
 * failed send is logged as `[tag] label failed:` and never fails the request.
 */
export function scheduleDelivery(tag: string, label: string, send: () => Promise<unknown>) {
  after(() =>
    send().catch((err) => {
      console.error(`[${tag}] ${label} failed:`, errorMessage(err));
    }),
  );
}

/** Schedules the internal new-lead notice. */
export function scheduleLeadNotification(tag: string, notice: LeadNotification) {
  scheduleDelivery(tag, "Lead notification", () => sendLeadNotification(notice));
}
