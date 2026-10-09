import { randomUUID } from "node:crypto";
import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { captureLeadEvent } from "@/lib/lead-capture";
import {
  emailError, emailDomain, invalidRequest, normalizeEmail, orNull, saveFailed, scheduleDelivery,
  scheduleLeadNotification, screenSubmission, serviceUnavailable, success, userAgent, type LeadBody,
} from "@/lib/lead-route";
import { sendNewsletterConfirmation } from "./confirmation-email";

const TAG = "Newsletter";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "referrer"] as const;
type Utm = Record<(typeof UTM_KEYS)[number], unknown>;

/** The first value that isn't null or undefined, else null. */
function firstDefined(current: unknown, legacy: unknown) {
  return current ?? legacy ?? null;
}

/**
 * Reads flat top-level utm_* keys (current form payload), falling back to the
 * legacy nested `utm` object for backward compatibility.
 */
function resolveUtm(body: LeadBody): Utm {
  const legacy = body.utm || {};
  const utm = {} as Utm;
  for (const key of UTM_KEYS) utm[key] = firstDefined(body[key], legacy[key]);
  return utm;
}

function touchAttribution(body: LeadBody) {
  return {
    ...(body.first_touch_attribution ? { first_touch: body.first_touch_attribution } : {}),
    ...(body.last_touch_attribution ? { last_touch: body.last_touch_attribution } : {}),
  };
}

function subscriberRow(request: NextRequest, body: LeadBody, email: string, utm: Utm, token: string) {
  return {
    email,
    source: body.source || "website",
    signup_page: orNull(body.signup_page),
    ...utm,
    user_agent: userAgent(request),
    lead_attribution: touchAttribution(body),
    posthog_distinct_id: orNull(body.posthog_distinct_id),
    confirmed: false,
    confirmation_token: token,
  };
}

/** Confirmation email, internal notice and event for a stored subscriber. */
function recordSubscriber(body: LeadBody, email: string, utm: Utm, token: string) {
  // Failures don't block the success response — the unconfirmed row is saved
  // either way and the user can re-subscribe to trigger a fresh link.
  scheduleDelivery(TAG, "Confirmation email", () => sendNewsletterConfirmation({ email, token }));
  scheduleLeadNotification(TAG, {
    kind: "newsletter (pending confirmation)",
    email,
    distinctId: body.posthog_distinct_id,
    fields: { source: body.source, signup_page: body.signup_page, channel: body.channel },
    attribution: body,
  });

  // Prefers the anonymous client distinct_id so pre-signup browsing links to
  // the same person.
  captureLeadEvent({
    event: "newsletter_signup",
    email,
    posthogDistinctId: body.posthog_distinct_id,
    properties: {
      email_domain: emailDomain(email),
      source: body.source,
      signup_page: body.signup_page,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
    },
    personProps: { email, newsletter_source: body.source },
    attribution: body,
  });
}

async function handle(request: NextRequest, body: LeadBody) {
  const rejection = screenSubmission(request, body, "newsletter", emailError);
  if (rejection) return rejection;

  const email = normalizeEmail(body.email);
  const utm = resolveUtm(body);
  if (!supabaseAdmin) return serviceUnavailable();

  // Double opt-in: store an unconfirmed row with a fresh confirmation token.
  // Re-subscribing (upsert conflict on email) rotates the token and resets
  // confirmed=false so the link in the freshest email is the one that works.
  const token = randomUUID();
  const { error } = await supabaseAdmin
    .from("newsletter_subscribers")
    .upsert(subscriberRow(request, body, email, utm, token), { onConflict: "email" });
  if (error) return saveFailed(TAG, error, "Failed to save signup");

  recordSubscriber(body, email, utm, token);
  return success();
}

export async function POST(request: NextRequest) {
  try {
    return await handle(request, await request.json());
  } catch (err) {
    return invalidRequest(TAG, err);
  }
}
