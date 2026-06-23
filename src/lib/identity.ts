/**
 * Identity helpers — the canonical-ID contract for PostHog.
 *
 * Implements the rules in `docs/identity-contract.md`:
 *   - Email is the canonical distinct_id before authentication.
 *   - The Supabase auth.uid() becomes canonical after authentication.
 *   - alias() welds the email identity onto auth.uid() exactly once at conversion,
 *     so anonymous + email-stage + authenticated history is one person.
 *
 * Every authenticated surface (web, extension, iOS, portal) calls identifyUser()
 * on login. The web client calls aliasOnConversion() once when a lead becomes a
 * Supabase user. Both are resilient no-ops when PostHog is unavailable (no key,
 * SSR, consent denied) and never throw.
 */

import { getPostHogClient } from "./posthog";
import { track } from "./analytics";

/**
 * Identify an authenticated user under the canonical distinct_id.
 *
 * Captures the current anonymous distinct_id first so the pre-auth session is
 * recorded as `previous_anonymous_id`, then calls posthog.identify(userId, ...)
 * to merge the anonymous session into the canonical id. Finally emits the typed
 * `user_identified` event.
 *
 * @param userId            Canonical distinct_id. Post-auth this is the Supabase
 *                          auth.uid(); pre-auth (account creation flows) it may be
 *                          the email. Never a device id — those are person props.
 * @param email             User email, set as a person property.
 * @param platform          Originating surface: "website" | "extension" | "ios" | "portal".
 * @param additionalProps   Extra person properties. `identification_method`, if
 *                          present, drives the tracked event; it defaults to
 *                          "account_creation".
 */
export function identifyUser(
  userId: string,
  email: string,
  platform: string,
  additionalProps?: Record<string, unknown>
): void {
  const posthog = getPostHogClient();
  if (!posthog) return;

  // Capture the anonymous id before identify() reassigns distinct_id, so the
  // pre-auth session is traceable on the identified person.
  const previousAnonymousId = posthog.get_distinct_id?.() || null;

  posthog.identify(userId, {
    email,
    platform,
    previous_anonymous_id: previousAnonymousId,
    ...additionalProps,
  });

  const identificationMethod =
    typeof additionalProps?.identification_method === "string"
      ? additionalProps.identification_method
      : "account_creation";

  track("user_identified", {
    platform,
    identification_method: identificationMethod,
  });
}

/**
 * Weld the email identity onto the Supabase auth.uid() at the moment of
 * conversion (lead → authenticated user).
 *
 * alias(authUid, email) tells PostHog "these two named ids are the same person."
 * After this, auth.uid() is the canonical distinct_id and the email-stage (and,
 * transitively, anonymous-stage) history rolls up under it. Call this exactly
 * ONCE, at conversion — re-identify would not retroactively merge a named email
 * identity, which is why alias is required (see identity-contract.md, G16).
 *
 * @param authUid Supabase auth.uid() — the post-auth canonical id.
 * @param email   The pre-auth email identity to alias onto authUid.
 */
export function aliasOnConversion(authUid: string, email: string): void {
  const posthog = getPostHogClient();
  if (!posthog) return;

  posthog.alias(authUid, email);
}
