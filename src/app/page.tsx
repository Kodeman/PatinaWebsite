import { Suspense } from "react";
import type { Metadata } from "next";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { NewsletterConfirmBanner } from "@/components/ui/NewsletterConfirmBanner";
import { LivingStudy, FounderJourney } from "@/components/studio/LivingStudy";
import { FoundingInvitation } from "@/components/studio/FoundingInvitation";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <NewsletterConfirmBanner />
      </Suspense>
      <Navigation />
      <main id="main-content" className="studio-home">
        <LivingStudy />
        <div className="studio-launch-line">
          <p>
            The app and marketplace are pre-launch. For your own home, the
            Founding Circle is open.
          </p>
          <TrackedLink href="/founding" location="home_launch_line">
            A place at the beginning ↗
          </TrackedLink>
        </div>
        <FounderJourney />
        <FoundingInvitation source="studio_home_invitation" />
        <section className="studio-doors" aria-label="For designers">
          <div className="studio-door">
            <p className="studio-kicker">For designers.</p>
            <h3>
              Your judgment
              <br />
              belongs here.
            </h3>
          </div>
          <div className="studio-door">
            <p>
              Running a studio? Patina is built for the year it brings on its
              first designer and the work doubles. Kody and Leah read every
              application.
            </p>
            <TrackedLink
              className="studio-link"
              href="/designers"
              location="home_door_designers"
            >
              Apply to the Founding 50 <span aria-hidden="true">↗</span>
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
