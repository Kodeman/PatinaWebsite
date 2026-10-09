import { after, NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { captureLeadEvent } from "@/lib/lead-capture";
import { sendContactAutoReply, sendContactNotification } from "@/lib/emails/contact-received";
import {
  badRequest, emailError, emailDomain, invalidRequest, orNull, scheduleDelivery, screenSubmission,
  serviceUnavailable, success, userAgent, type LeadBody, type PersistError, type Rejection,
} from "@/lib/lead-route";

const TAG = "Contact";

interface ContactNote {
  name: string;
  email: string;
  reason: string;
  message: string;
}

function isBlank(value: unknown): boolean {
  return !value || !String(value).trim();
}

function validationError(body: LeadBody): Rejection {
  const invalidEmail = emailError(body);
  if (invalidEmail) return invalidEmail;
  if (isBlank(body.name)) return badRequest("Name is required");
  if (isBlank(body.message)) return badRequest("A message is required");
  return null;
}

function contactNote(body: LeadBody): ContactNote {
  return {
    name: String(body.name).trim(),
    email: String(body.email).toLowerCase().trim(),
    reason: String(body.reason || "general").trim(),
    message: String(body.message).trim(),
  };
}

/** Sends the founders' notice; true only when the provider accepted it. */
async function notifyFounders(note: ContactNote): Promise<boolean> {
  try {
    const result = await sendContactNotification(note);
    if (!result.success) console.error("[Contact] Notification email was not accepted");
    return result.success;
  } catch {
    console.error("[Contact] Notification email failed");
    return false;
  }
}

/**
 * A saved note can be acknowledged while the notice completes after the
 * response. When the insert failed, the notice is the fallback record, so its
 * acceptance is confirmed before reporting success.
 */
async function noticeSecured(note: ContactNote, error: PersistError | null): Promise<boolean> {
  if (!error) {
    after(async () => { await notifyFounders(note); });
    return true;
  }
  console.error("[Contact] Supabase insert failed; attempting email fallback");
  return notifyFounders(note);
}

async function handle(request: NextRequest, body: LeadBody) {
  // Silently accept honeypot hits so bots can't detect the trap.
  const rejection = screenSubmission(request, body, "contact", validationError);
  if (rejection) return rejection;

  const note = contactNote(body);
  if (!supabaseAdmin) return serviceUnavailable();

  const { error } = await supabaseAdmin.from("contact_messages").insert({
    ...note,
    posthog_distinct_id: orNull(body.posthog_distinct_id),
    user_agent: userAgent(request),
  });
  if (!(await noticeSecured(note, error))) return serviceUnavailable();

  scheduleDelivery(TAG, "Auto-reply email", () => sendContactAutoReply({ email: note.email, name: note.name }));
  captureLeadEvent({
    event: "contact_form_submitted",
    email: note.email,
    posthogDistinctId: body.posthog_distinct_id,
    properties: { reason: note.reason, email_domain: emailDomain(note.email) },
    personProps: { email: note.email },
    attribution: body,
  });
  return success();
}

/** Save contact notes, with an acknowledged email fallback when storage fails. */
export async function POST(request: NextRequest) {
  try {
    return await handle(request, await request.json());
  } catch (err) {
    return invalidRequest(TAG, err);
  }
}
