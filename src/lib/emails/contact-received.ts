import { sendHtmlEmail, type SendResult } from "./send";
import { frame, signOff, escapeHtml } from "./template";

const REASON_LABELS: Record<string, string> = {
  general: "General Inquiry",
  product: "Product Question",
  order: "Order Support",
  designer: "Designer Partnership",
  maker: "Maker Application",
  press: "Press & Media",
};

function reasonLabel(reason: string) {
  return REASON_LABELS[reason] || reason || "General Inquiry";
}

/** Auto-reply to the person who wrote in, so they know a human will follow up. */
export function contactAutoReplyEmail(opts: { name?: string | null }) {
  const name = opts.name?.trim() || "there";
  return frame(
    `<p>Hi ${escapeHtml(name)},</p>
<p>Thank you for reaching out to Patina. This is a quick note to say your message landed — and a real person (usually Kody or Leah) reads every one.</p>
<p>We typically reply within two business days. If your note is time-sensitive, just reply to this email and it comes straight to us.</p>
${signOff}`,
    { preheader: "We got your message — a real person will reply soon." },
  );
}

export async function sendContactAutoReply(opts: {
  email: string;
  name?: string | null;
}): Promise<SendResult> {
  return sendHtmlEmail({
    to: opts.email,
    subject: "We got your message",
    html: contactAutoReplyEmail(opts),
    tags: [
      { name: "source", value: "contact_autoreply" },
      { name: "email_type", value: "transactional" },
    ],
  });
}

/** Internal notification so the founders actually see the message (not just a DB row). */
export function contactNotificationEmail(opts: {
  name: string;
  email: string;
  reason: string;
  message: string;
}) {
  return frame(
    `<p><strong>New contact message</strong></p>
<p><strong>From:</strong> ${escapeHtml(opts.name)} &lt;${escapeHtml(opts.email)}&gt;<br/>
<strong>About:</strong> ${escapeHtml(reasonLabel(opts.reason))}</p>
<p style="white-space:pre-wrap">${escapeHtml(opts.message)}</p>`,
  );
}

export async function sendContactNotification(opts: {
  name: string;
  email: string;
  reason: string;
  message: string;
}): Promise<SendResult> {
  return sendHtmlEmail({
    to: "hello@patina.cloud",
    replyTo: opts.email,
    subject: `Contact — ${reasonLabel(opts.reason)} — ${opts.name}`,
    html: contactNotificationEmail(opts),
    tags: [
      { name: "source", value: "contact_notification" },
      { name: "email_type", value: "internal" },
    ],
  });
}
