import { sendHtmlEmail, type SendResult } from "./send";
import { frame, signedBy, escapeHtml, UNSUBSCRIBE_MAILTO } from "./template";

/**
 * The genuine "first letter" the newsletter signup success state promises.
 * Sent once, right after a subscriber confirms their double opt-in
 * (see src/app/api/newsletter/confirm/route.ts). This is marketing mail, so it
 * carries an unsubscribe link.
 */
export function newsletterWelcomeEmail(opts: { first_name?: string | null } = {}) {
  const name = opts.first_name?.trim() || "there";
  return frame(
    `<p>Hi ${escapeHtml(name)},</p>
<p>You're confirmed — thank you. Welcome to <strong>The Designer's Eye</strong>.</p>
<p>It's a biweekly letter from my desk at Middlewest Studio: what I'm noticing in design, the makers and materials worth knowing about, and honest notes on building Patina. No daily blasts, no fluff — just the things I'd tell a friend who asked what's worth paying attention to.</p>
<p>The next one lands in your inbox soon. If something here ever doesn't earn its place, you can step away in one click, no hard feelings.</p>
${signedBy("Leah", "Patina")}`,
    {
      preheader: "Welcome to The Designer's Eye — a biweekly letter from Leah's desk.",
      unsubscribeUrl: UNSUBSCRIBE_MAILTO,
    },
  );
}

export async function sendNewsletterWelcome(opts: {
  email: string;
  first_name?: string | null;
}): Promise<SendResult> {
  return sendHtmlEmail({
    to: opts.email,
    subject: "Welcome to The Designer's Eye",
    html: newsletterWelcomeEmail(opts),
    tags: [
      { name: "source", value: "newsletter_welcome" },
      { name: "email_type", value: "lifecycle" },
    ],
  });
}
