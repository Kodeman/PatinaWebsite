import { sendHtmlEmail, type SendResult } from "./send";
import { frame, escapeHtml } from "./template";
import { LEAD_NOTIFY_TO } from "./senders";

const POSTHOG_PERSON_URL = "https://us.posthog.com/project/326191/person/";
const TOUCH_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "referrer"] as const;

type Touch = Partial<Record<(typeof TOUCH_KEYS)[number], unknown>>;

export interface LeadNotification {
  /** Signup type shown in the subject, e.g. "Founding Circle". */
  kind: string;
  /** Normalized lead email; also the Reply-To. */
  email: string;
  name?: string | null;
  /** Anonymous PostHog id the route captured under; the email stands in, as in captureLeadEvent. */
  distinctId?: string | null;
  /** Lead details shown as rows, e.g. role, source, signup_page, channel. */
  fields: Record<string, unknown>;
  /** The lead payload's attribution touches. */
  attribution?: { first_touch_attribution?: Touch | null; last_touch_attribution?: Touch | null };
}

/** One labelled row per attribution field of a touch. */
function touchRows(label: string, touch: Touch | null | undefined): Array<[string, unknown]> {
  return TOUCH_KEYS.map((key) => [`${label} ${key}`, touch?.[key]]);
}

/** Table rows for every row that carries a value. */
function rowsHtml(rows: Array<[string, unknown]>) {
  return rows
    .filter(([, value]) => value != null && value !== "")
    .map(([label, value]) => `<tr><td style="padding:2px 16px 2px 0;color:#8B7355">${escapeHtml(label)}</td><td style="padding:2px 0">${escapeHtml(String(value))}</td></tr>`)
    .join("\n");
}

/** Internal key/value summary of a new lead, with a link to the PostHog person. */
export function leadNotificationEmail(lead: LeadNotification) {
  const rows: Array<[string, unknown]> = [
    ["kind", lead.kind],
    ["email", lead.email],
    ["name", lead.name],
    ...Object.entries(lead.fields),
    ...touchRows("last-touch", lead.attribution?.last_touch_attribution),
    ...touchRows("first-touch", lead.attribution?.first_touch_attribution),
  ];
  const personUrl = POSTHOG_PERSON_URL + encodeURIComponent(lead.distinctId || lead.email);
  return frame(
    `<p><strong>New ${escapeHtml(lead.kind)} signup</strong></p>
<table style="border-collapse:collapse;font-size:14px">
${rowsHtml(rows)}
</table>
<p><a href="${escapeHtml(personUrl)}" style="color:#8B7355">PostHog person</a></p>`,
  );
}

/** Tell the founders about a new lead. Internal mail: Reply-To reaches the lead, no unsubscribe line. */
export async function sendLeadNotification(lead: LeadNotification): Promise<SendResult> {
  return sendHtmlEmail({
    to: LEAD_NOTIFY_TO,
    replyTo: lead.email,
    subject: `New ${lead.kind} signup — ${lead.name || lead.email}`,
    html: leadNotificationEmail(lead),
    tags: [
      { name: "source", value: "lead_notification" },
      { name: "email_type", value: "internal" },
    ],
  });
}
