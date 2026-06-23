import { getServerPostHog } from "@/lib/posthog-server";

/**
 * Arguments for {@link captureLeadEvent}.
 */
export interface CaptureLeadEventArgs {
  /** PostHog event name, e.g. "waitlist_signup" or "newsletter_signup". */
  event: string;
  /** Normalized lead email. Used as the identity fallback when no anonymous id exists. */
  email: string;
  /**
   * Anonymous PostHog `distinct_id` forwarded from the client.
   * Preferred for identity resolution so a lead's pre-signup browsing
   * (autocaptured anonymously in the browser) merges with the server-side
   * signup event under the same person.
   */
  posthogDistinctId?: string | null;
  /** Event-level properties recorded on the capture. */
  properties?: Record<string, unknown>;
  /**
   * Person properties to persist on the resolved person via PostHog's `$set`.
   * posthog-node has no dedicated identify-with-properties on capture, so
   * person properties are merged in under the `$set` key inside `properties`.
   */
  personProps?: Record<string, unknown>;
}

/**
 * Server-side PostHog capture used by all lead-capture API routes
 * (newsletter, waitlist, designer/maker applications, etc.).
 *
 * Identity resolution: `distinctId = posthogDistinctId || email`. The anonymous
 * client `distinct_id` is preferred so events captured on the server link to the
 * same person PostHog already tracked anonymously in the browser before signup.
 * Email is only the fallback when the client did not forward a distinct id.
 *
 * Resilience: if PostHog is not configured (no key), this is a no-op. Any capture
 * failure is swallowed — analytics must never break a signup.
 */
export function captureLeadEvent({
  event,
  email,
  posthogDistinctId,
  properties,
  personProps,
}: CaptureLeadEventArgs): void {
  const posthog = getServerPostHog();
  if (!posthog) return;

  // Prefer the anonymous client distinct_id so pre-signup browsing merges
  // into the same person; fall back to email when none was forwarded.
  const distinctId = posthogDistinctId || email;

  try {
    posthog.capture({
      distinctId,
      event,
      properties: {
        ...properties,
        ...(personProps ? { $set: personProps } : {}),
      },
    });
  } catch {
    // Analytics is best-effort — never let a capture failure break a signup.
  }
}
