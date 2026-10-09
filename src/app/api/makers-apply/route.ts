import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { captureLeadEvent } from "@/lib/lead-capture";
import { isHoneypotTripped } from "@/lib/rate-limit";
import { sendMakerReceived } from "@/lib/emails/application-received";
import {
  badRequest, emailError, emailDomain, invalidRequest, leadAttribution, normalizeEmail, orNull,
  rateLimitResponse, saveFailed, scheduleDelivery, scheduleLeadNotification, serviceUnavailable, success,
  type LeadBody, type Rejection,
} from "@/lib/lead-route";

const TAG = "MakerApply";

function validationError(body: LeadBody): Rejection {
  const invalidEmail = emailError(body);
  if (invalidEmail) return invalidEmail;
  if (!body.brand_name || !body.contact_name) return badRequest("Brand name and contact name are required");
  return null;
}

/**
 * Honeypot, then validation, then the rate limit. Bots auto-fill every field,
 * including the hidden one; a filled trap gets a success-shaped response
 * without writing anything.
 */
function screen(request: NextRequest, body: LeadBody): Rejection {
  if (isHoneypotTripped(body)) return success();
  return validationError(body) || rateLimitResponse(request, "makers-apply");
}

function applicationRow(body: LeadBody, email: string) {
  return {
    brand_name: body.brand_name,
    contact_name: body.contact_name,
    email,
    location: orNull(body.location),
    website: orNull(body.website),
    description: orNull(body.description),
    materials: orNull(body.materials),
    trade_program: orNull(body.trade_program),
    referral_source: orNull(body.referral_source),
    lead_attribution: leadAttribution(body),
    posthog_distinct_id: orNull(body.posthog_distinct_id),
  };
}

/** Event, acknowledgement and internal notice for a saved application. */
function recordApplication(body: LeadBody, email: string) {
  // Keyed on the anonymous posthog_distinct_id so the application merges with
  // the lead's pre-signup browsing.
  captureLeadEvent({
    event: "maker_application_submitted",
    email,
    posthogDistinctId: body.posthog_distinct_id,
    properties: {
      brand_name: body.brand_name,
      referral_source: body.referral_source,
      // The maker form's workshop name, site/portfolio, and description.
      has_company: !!body.brand_name,
      has_website: !!body.website,
      has_motivation: !!body.description,
      email_domain: emailDomain(email),
    },
    personProps: { email, role: "maker" },
    attribution: body,
  });

  // Send failures don't block the success response — the row is saved either way.
  scheduleDelivery(TAG, "Ack email", () =>
    sendMakerReceived({ email, brand_name: body.brand_name, contact_name: body.contact_name }),
  );
  scheduleLeadNotification(TAG, {
    kind: "maker application",
    email,
    name: `${body.contact_name} (${body.brand_name})`,
    distinctId: body.posthog_distinct_id,
    fields: { role: "maker", source: body.source, signup_page: body.signup_page, channel: body.channel },
    attribution: body,
  });
}

async function handle(request: NextRequest, body: LeadBody) {
  const rejection = screen(request, body);
  if (rejection) return rejection;

  const email = normalizeEmail(body.email);
  if (!supabaseAdmin) return serviceUnavailable();

  const { error } = await supabaseAdmin.from("maker_applications").insert(applicationRow(body, email));
  if (error) return saveFailed(TAG, error, "Failed to save application");

  recordApplication(body, email);
  return success();
}

export async function POST(request: NextRequest) {
  try {
    return await handle(request, await request.json());
  } catch (err) {
    return invalidRequest(TAG, err);
  }
}
