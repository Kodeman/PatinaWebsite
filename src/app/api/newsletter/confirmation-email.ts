import { sendHtmlEmail, type SendResult } from "@/lib/emails/send";
import { frame, escapeHtml } from "@/lib/emails/template";
import { SITE_URL } from "@/lib/site-url";

/**
 * Builds the double opt-in confirmation link. Both token and email are
 * URL-encoded so they survive query transport intact.
 */
function buildConfirmUrl(email: string, token: string) {
  const params = new URLSearchParams({ token, email });
  return `${SITE_URL}/api/newsletter/confirm?${params.toString()}`;
}

export function newsletterConfirmationEmail(opts: { email: string; token: string }) {
  const url = buildConfirmUrl(opts.email, opts.token);
  const safeUrl = escapeHtml(url);
  return frame(`<p>Hi there,</p>
<p>Thanks for signing up for the Patina journal. One quick step — confirm your email so we know it's really you.</p>
<p style="margin:28px 0">
  <a href="${safeUrl}" style="display:inline-block;background:#2C2926;color:#FAF7F2;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:600">Confirm your subscription</a>
</p>
<p style="font-size:13px;color:#8B7355">If the button doesn't work, paste this link into your browser:<br/>${safeUrl}</p>
<p>If you didn't sign up, you can safely ignore this email — we won't add you without this confirmation.</p>
<p style="margin-top:24px">Warmly,<br/>Kody &amp; Leah<br/>Patina</p>`);
}

export async function sendNewsletterConfirmation(opts: {
  email: string;
  token: string;
}): Promise<SendResult> {
  return sendHtmlEmail({
    to: opts.email,
    subject: "Confirm your Patina subscription",
    html: newsletterConfirmationEmail(opts),
    tags: [
      { name: "source", value: "newsletter_confirmation" },
      { name: "email_type", value: "double_opt_in" },
    ],
  });
}
