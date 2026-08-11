/**
 * Unified client-side lead payload builder.
 *
 * Every signup form (Founding Circle, newsletter, maker/designer applications)
 * spreads buildLeadPayload() into its POST body so the server receives a
 * consistent set of attribution + identity fields regardless of source.
 */

import { getAttribution, classifyChannel, type Attribution, type Channel } from "./attribution";

/**
 * Honeypot field name. Forms render a hidden input with this name; a non-empty
 * value on the server indicates a bot submission and should be dropped.
 */
export const LEAD_HONEYPOT_FIELD = "company_url";

export interface BuildLeadPayloadOptions {
  /** Originating surface, e.g. "hero", "footer", "designers_page". */
  source: string;
  /** Pathname the signup happened on, e.g. "/" or "/designers". */
  signupPage: string;
  /** CTA copy that triggered the signup. */
  ctaText?: string;
  /** PostHog distinct id, from posthog?.get_distinct_id?.() — null if unavailable. */
  posthogDistinctId: string | null;
  /** Additional form-specific fields to merge into the payload. */
  extra?: Record<string, unknown>;
}

export interface LeadPayload {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer: string;
  first_touch_attribution: Attribution["first_touch"] | null;
  last_touch_attribution: Attribution["last_touch"] | null;
  posthog_distinct_id: string | null;
  signup_page: string;
  cta_text: string | null;
  gclid: string | null;
  fbclid: string | null;
  channel: Channel;
  [key: string]: unknown;
}

/**
 * Build the unified lead payload shared by all signup forms.
 */
export function buildLeadPayload(opts: BuildLeadPayloadOptions): LeadPayload {
  const attribution = getAttribution();
  const last = attribution?.last_touch;

  const payload: LeadPayload = {
    utm_source: last?.utm_source,
    utm_medium: last?.utm_medium,
    utm_campaign: last?.utm_campaign,
    utm_content: last?.utm_content,
    utm_term: last?.utm_term,
    referrer: last?.referrer || "",
    first_touch_attribution: attribution?.first_touch || null,
    last_touch_attribution: attribution?.last_touch || null,
    posthog_distinct_id: opts.posthogDistinctId,
    signup_page: opts.signupPage,
    cta_text: opts.ctaText ?? null,
    gclid: last?.gclid || null,
    fbclid: last?.fbclid || null,
    channel: classifyChannel(attribution),
  };

  if (opts.extra) {
    Object.assign(payload, opts.extra);
  }

  return payload;
}

/**
 * Infer the lead's role from the originating surface.
 *
 * Designer/maker-facing surfaces => "designer"; clearly consumer-facing
 * surfaces => "consumer"; anything ambiguous => "unknown".
 */
export function inferRole(
  source: string,
  signupPage: string
): "designer" | "consumer" | "unknown" {
  const haystack = `${source} ${signupPage}`.toLowerCase();

  if (/designer|maker|trade|pro\b|professional|studio/.test(haystack)) {
    return "designer";
  }

  if (/founding|waitlist|newsletter|furniture|shop|consumer|home|signup/.test(haystack)) {
    return "consumer";
  }

  return "unknown";
}
