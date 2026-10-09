import { sendHtmlEmail, type SendResult } from './send';
import { kodySignupSender } from './senders';
import { frame, signedBy, escapeHtml } from './template';

export function designerReceivedEmail(app: { first_name: string; last_name?: string }) {
  const name = app.first_name?.trim() || 'there';
  return frame(`<p>Hi ${escapeHtml(name)},</p>
<p>Thank you for applying to Patina's Founding 50. I'm Kody, one of Patina's founders.</p>
<p>I'm building Patina with Leah, who runs Middlewest Studio here in Madison. I want the tools we build to feel like part of the creative process, and your experience as a designer matters to that work.</p>
<p>Your application is in. I'll review it with Leah, and we'll get back to you within seven days with an invitation to talk or an update on timing.</p>
<p>In the meantime, you're welcome to reply with anything else you'd like us to see. I'd especially like to hear where your current sourcing tools get in the way.</p>
<p>Thanks for considering building this with us.</p>
${signedBy('Kody', 'Co-founder, Patina · Madison, WI')}`, {
    preheader: "Your Founding 50 application is in. I'll review it with Leah.",
  });
}

export function makerReceivedEmail(app: { contact_name: string; brand_name: string }) {
  const name = app.contact_name?.trim() || 'there';
  const brand = app.brand_name?.trim() || 'your workshop';
  return frame(`<p>Hi ${escapeHtml(name)},</p>
<p>Thank you for introducing ${escapeHtml(brand)} to Patina. I'm Kody, one of the founders.</p>
<p>Patina started with the belief that the tools we use to find furniture should make room for the care that goes into making it. A workshop's materials, methods, and point of view belong in that story.</p>
<p>I'll review your application with Leah. We'll get back to you within two weeks with next steps or an update on timing.</p>
<p>If there's a piece or a part of your process you'd like us to understand, you can reply with a link or a note. I'd like to learn what you want people to notice about your work.</p>
<p>Thank you for considering a place in Patina's first chapter.</p>
${signedBy('Kody', 'Co-founder, Patina · Madison, WI')}`, {
    preheader: "Your maker application is in. I'll review it with Leah.",
  });
}

export async function sendDesignerReceived(app: {
  email: string;
  first_name: string;
  last_name?: string;
}): Promise<SendResult> {
  return sendHtmlEmail({
    ...kodySignupSender,
    to: app.email,
    subject: 'A note from Kody about your Founding 50 application',
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
    ...kodySignupSender,
    to: app.email,
    subject: `A note from Kody about your Patina application for ${app.brand_name || 'your workshop'}`,
    html: makerReceivedEmail(app),
    tags: [
      { name: 'source', value: 'application_received' },
      { name: 'application_type', value: 'maker' },
    ],
  });
}
