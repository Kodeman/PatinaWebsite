import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Join the Patina Waitlist",
  description:
    "Get early access to Patina — designer-curated furniture for your real space. Founding members get first dibs and a hand in shaping what we build.",
  alternates: {
    canonical: "https://patina.cloud/waitlist",
  },
  openGraph: {
    title: "Join the Patina Waitlist",
    description:
      "Get early access to Patina. We're building this with our first members, not just for them.",
    url: "https://patina.cloud/waitlist",
  },
};

/**
 * /waitlist is a clean, shareable shortcut to /founding.
 * Easier to drop in podcasts, press, social bios than the longer URL.
 * Keeping a single conversion surface (the Founding Circle page) so we don't
 * fragment our analytics or duplicate copy.
 */
export default function WaitlistPage() {
  redirect("/founding");
}
