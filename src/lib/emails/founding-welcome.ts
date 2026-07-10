import { sendHtmlEmail, type SendResult } from "./send";
import { frame, signedBy, escapeHtml } from "./template";

/**
 * The "first letter from Leah" the Founding Circle modal promises new members.
 * Written in Leah's first-person voice, build-in-public tone. Sent once, on a
 * member's first signup (see src/app/api/founding/route.ts).
 */
export function foundingWelcomeEmail(opts: { first_name?: string | null }) {
  const name = opts.first_name?.trim() || "there";
  return frame(
    `<p>Hi ${escapeHtml(name)},</p>
<p>Thank you for joining the Founding Circle. I don't take it lightly that you'd put your name on something that isn't finished yet — so I wanted to write to you myself.</p>
<p>I've spent years sourcing furniture for clients at my studio, Middlewest, here in Madison. The tools never matched how designers actually think. So Kody and I are building the one I always wished existed — and you're now part of shaping it.</p>
<p>Here's what that means, practically:</p>
<p>You'll hear from us as the catalog grows and makers sign on. Every so often I'll ask you a real question — which makers to bring on, which rooms to focus on first — and your answer will genuinely change what we build. When the app is ready, you're first through the door. And your name will be on it.</p>
<p>We're not ready to launch yet. But we're closer every week, and I'd rather show you the unfinished version than a polished promise.</p>
<p>More soon.</p>
${signedBy("Leah", "Patina · Madison, WI")}`,
    { preheader: "A first note from Leah — welcome to the Founding Circle." },
  );
}

export async function sendFoundingWelcome(opts: {
  email: string;
  first_name?: string | null;
}): Promise<SendResult> {
  return sendHtmlEmail({
    to: opts.email,
    subject: "A first letter from Leah",
    html: foundingWelcomeEmail(opts),
    tags: [
      { name: "source", value: "founding_welcome" },
      { name: "email_type", value: "lifecycle" },
    ],
  });
}
