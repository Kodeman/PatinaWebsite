import { sendHtmlEmail, type SendResult } from './send';

const signOff = `<p style="margin-top:24px">Warmly,<br/>Kody &amp; Leah<br/>Patina</p>`;

const frame = (body: string) => `<!DOCTYPE html>
<html><body style="font-family:-apple-system,'Inter',system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#2C2926;line-height:1.6;background:#FAF7F2">
${body}
<hr style="margin:32px 0;border:none;border-top:1px solid #E5E2DD"/>
<p style="font-size:12px;color:#8B7355">Patina · hello@patina.cloud</p>
</body></html>`;

export function designerReceivedEmail(app: { first_name: string; last_name?: string }) {
  const name = app.first_name?.trim() || 'there';
  return frame(`<p>Hi ${escapeHtml(name)},</p>
<p>Thank you for applying to the Patina Founding 50. We read every application personally — no automated intake, no form‑letter response.</p>
<p>Leah and I will get back to you within 7 days with either an invitation to a short call or a note about timing. In the meantime, if there's anything else you'd like us to see, just reply to this message.</p>
<p>We're building Patina for designers who think about furniture the way you do — cultivated, not decorated. We're glad you raised your hand.</p>
${signOff}`);
}

export function makerReceivedEmail(app: { contact_name: string; brand_name: string }) {
  const name = app.contact_name?.trim() || 'there';
  const brand = app.brand_name?.trim() || 'your workshop';
  return frame(`<p>Hi ${escapeHtml(name)},</p>
<p>Thank you for sharing ${escapeHtml(brand)} with us. We believe furniture should tell a story — and yours caught our attention.</p>
<p>Leah personally reviews every maker application. Expect to hear from our team within two weeks with next steps. If something important comes up about your work in the meantime, just reply to this email.</p>
<p>We're being very selective about the first 15 makers. Grateful you put ${escapeHtml(brand)} forward.</p>
${signOff}`);
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;',
  );
}

export async function sendDesignerReceived(app: {
  email: string;
  first_name: string;
  last_name?: string;
}): Promise<SendResult> {
  return sendHtmlEmail({
    to: app.email,
    subject: 'We received your Founding 50 application',
    html: designerReceivedEmail(app),
    tags: [
      { name: 'source', value: 'application_received' },
      { name: 'application_type', value: 'designer' },
    ],
  });
}

export async function sendMakerReceived(app: {
  email: string;
  brand_name: string;
  contact_name: string;
}): Promise<SendResult> {
  return sendHtmlEmail({
    to: app.email,
    subject: `We received your Patina application for ${app.brand_name || 'your workshop'}`,
    html: makerReceivedEmail(app),
    tags: [
      { name: 'source', value: 'application_received' },
      { name: 'application_type', value: 'maker' },
    ],
  });
}
