import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { NewsletterConfirmBanner } from "@/components/ui/NewsletterConfirmBanner";
import { LivingStudy, FounderJourney } from "@/components/studio/LivingStudy";
import { FoundingInvitation } from "@/components/studio/FoundingInvitation";
import { StudioMotion } from "@/components/studio/StudioMotion";

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
        <section className="studio-doors" aria-labelledby="studio-doors-title">
          <div className="studio-doors-heading">
            <p className="studio-kicker">
              There’s a place for your perspective.
            </p>
            <h2 id="studio-doors-title">
              A studio takes
              <br />
              many hands.
            </h2>
          </div>
          <div className="studio-door">
            <StudioMotion kind="paper">
              <Image
                src="/images/studio/materials.jpg"
                width={800}
                height={650}
                sizes="(max-width: 760px) 100vw, 40vw"
                alt="Illustrative designer’s material study, with timber and textile samples"
              />
            </StudioMotion>
            <p className="studio-kicker">For designers / the Founding 50</p>
            <h3>
              Your judgment
              <br />
              belongs here.
            </h3>
            <p>
              Built for the year a studio brings on its first designer and the
              work doubles. Bring one live project to the Founding 50. Kody and
              Leah read every application.
            </p>
            <TrackedLink
              className="studio-link"
              href="/designers"
              location="home_door_designers"
            >
              Apply to the Founding 50 <span aria-hidden="true">↗</span>
            </TrackedLink>
          </div>
          <p className="studio-doors-caption">
            Illustrative imagery — awaiting partner photography.
          </p>
        </section>
        <FoundingInvitation source="studio_home_invitation" />
      </main>
      <Footer />
    </>
  );
}
