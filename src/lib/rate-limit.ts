import { NextRequest } from "next/server";

// Server-side spam protection helpers for lead/form endpoints.
//
// NOTE: This in-memory limiting is best-effort. The bucket Map lives in
// module scope, so it resets on every serverless cold start and is NOT shared
// across instances (each lambda/edge invocation may see a fresh map). For
// durable, cross-instance rate limiting we would need Upstash/Redis or a
// Supabase table to track counters (tracked follow-up). In practice the
// honeypot below carries most of the anti-spam value; treat checkRateLimit as
// a cheap first line of defense rather than a guarantee.

/**
 * Extract the client IP from the request. Uses the first hop of the
 * `x-forwarded-for` chain (the originating client per Vercel/proxy convention),
 * falling back to `'unknown'` when no forwarding header is present.
 */
export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstHop = forwardedFor.split(",")[0]?.trim();
    if (firstHop) {
      return firstHop;
    }
  }
  return "unknown";
}

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 60_000;

// Module-scope fixed-window limiter. Keyed by an arbitrary string (typically
// `${ip}:${route}`). Pure in-memory — see top-of-file note on durability.
const buckets = new Map<string, RateLimitBucket>();

/**
 * Fixed-window rate limiter. Returns `{ ok: true }` while the key is under the
 * limit for the current window, otherwise `{ ok: false, retryAfter }` where
 * `retryAfter` is the number of whole seconds until the window resets.
 *
 * Defaults to 5 requests per 60 seconds.
 */
export function checkRateLimit(
  key: string,
  opts?: { limit?: number; windowMs?: number }
): { ok: boolean; retryAfter?: number } {
  const limit = opts?.limit ?? DEFAULT_LIMIT;
  const windowMs = opts?.windowMs ?? DEFAULT_WINDOW_MS;
  const now = Date.now();

  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (existing.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }

  existing.count += 1;
  return { ok: true };
}

// Must equal LEAD_HONEYPOT_FIELD exported from "@/lib/lead-payload". Hardcoded
// here (rather than imported) to avoid an import cycle between the payload and
// rate-limit modules.
const DEFAULT_HONEYPOT_FIELD = "company_url";

/**
 * Returns true when the honeypot field is filled in. Bots tend to auto-fill
 * every input, so a non-empty string in a field hidden from real users is a
 * strong spam signal.
 */
export function isHoneypotTripped(
  body: Record<string, unknown>,
  field: string = DEFAULT_HONEYPOT_FIELD
): boolean {
  const value = body[field];
  return typeof value === "string" && value.trim().length > 0;
}
