import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { captureLeadEvent } from "@/lib/lead-capture";
import { sendDesignerReceived } from "@/lib/emails/application-received";
import {
  badRequest, emailError, emailDomain, invalidRequest, leadAttribution, normalizeEmail, orNull,
  saveFailed, scheduleDelivery, scheduleLeadNotification, screenSubmission, serviceUnavailable, success,
  type LeadBody, type Rejection,
} from "@/lib/lead-route";

const TAG = "DesignerApply";

function validationError(body: LeadBody): Rejection {
  const invalidEmail = emailError(body);
  if (invalidEmail) return invalidEmail;
  if (!body.first_name || !body.last_name) return badRequest("First and last name are required");
  return null;
}

function applicationRow(body: LeadBody, email: string) {
  return {
    first_name: body.first_name,
    last_name: body.last_name,
    email,
    company: orNull(body.company),
    location: orNull(body.location),
    website: orNull(body.website),
    motivation: orNull(body.motivation),
    sourcing_process: orNull(body.sourcing_process),
    referral_source: orNull(body.referral_source),
    lead_attribution: leadAttribution(body),
    posthog_distinct_id: orNull(body.posthog_distinct_id),
  };
}

/** Event, acknowledgement and internal notice for a saved application. */
function recordApplication(body: LeadBody, email: string) {
  // distinctId resolves to the anonymous posthog_distinct_id (via
  // captureLeadEvent) so pre-application browsing merges with this person.
  captureLeadEvent({
    event: "designer_application_submitted",
    email,
    posthogDistinctId: body.posthog_distinct_id,
    properties: {
      company: orNull(body.company),
      has_company: !!body.company,
      has_website: !!body.website,
      has_motivation: !!body.motivation,
      email_domain: emailDomain(email),
      referral_source: orNull(body.referral_source),
    },
    personProps: { email, role: "designer" },
    attribution: body,
  });

  // Send failures don't block the success response — the row is saved either way.
  scheduleDelivery(TAG, "Ack email", () =>
    sendDesignerReceived({ email, first_name: body.first_name, last_name: body.last_name }),
  );
  scheduleLeadNotification(TAG, {
    kind: "designer application",
    email,
    name: `${body.first_name} ${body.last_name}`,
    distinctId: body.posthog_distinct_id,
    fields: { role: "designer", source: body.source, signup_page: body.signup_page, channel: body.channel },
    attribution: body,
  });
}

async function handle(request: NextRequest, body: LeadBody) {
  // Silently accept honeypot-tripped submissions without persisting — don't
  // reveal the trap to bots.
  const rejection = screenSubmission(request, body, "designers-apply", validationError);
  if (rejection) return rejection;

  const email = normalizeEmail(body.email);
  if (!supabaseAdmin) return serviceUnavailable();

  const { error } = await supabaseAdmin
    .from("founding_designer_applications")
    .insert(applicationRow(body, email));
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
