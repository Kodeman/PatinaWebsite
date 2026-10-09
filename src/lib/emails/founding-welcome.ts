import { sendHtmlEmail, type SendResult } from "./send";
import { kodySignupSender } from "./senders";
import { frame, signedBy, escapeHtml, UNSUBSCRIBE_MAILTO } from "./template";

/** Kody's first letter, sent once when someone joins the Founding Circle. */
export function foundingWelcomeEmail(opts: { first_name?: string | null }) {
  const name = opts.first_name?.trim() || "there";
  return frame(
    `<p>Hi ${escapeHtml(name)},</p>
<p>Thank you for joining the Founding Circle. I'm Kody, and I'm building Patina with Leah here in Madison.</p>
<p>The idea started with a gap I kept seeing: tools that felt sterile and disconnected from the creative process. I want Patina to feel like a place to explore a room, get to know the people behind a piece, and find furniture that belongs.</p>
<p>Leah brings the perspective of a working designer through Middlewest Studio. We're building this together, and I'm glad you're part of it.</p>
<p>As a founding member, you'll get notes on what we're making and questions that help shape it. You'll have first access when the app launches. The app and marketplace are still in development; I'll share progress as we go.</p>
<p>If you'd like, hit reply and tell me what brought you here. Is there a room on your mind, or something you wish furniture discovery did better?</p>
${signedBy("Kody", "Co-founder, Patina · Madison, WI")}`,
    {
      preheader: "A first note from Kody — welcome to the Founding Circle.",
      unsubscribeUrl: UNSUBSCRIBE_MAILTO,
    },
  );
}

export async function sendFoundingWelcome(opts: {
  email: string;
  first_name?: string | null;
}): Promise<SendResult> {
  return sendHtmlEmail({
    ...kodySignupSender,
    to: opts.email,
    subject: "A first letter from Kody",
    html: foundingWelcomeEmail(opts),
    tags: [
      { name: "source", value: "founding_welcome" },
      { name: "email_type", value: "lifecycle" },
    ],
  });
}
