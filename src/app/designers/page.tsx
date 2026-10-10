import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { StudioMotion } from "@/components/studio/StudioMotion";
import { StrataMark } from "@/components/ui/StrataMark";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { DesignerWorkbench } from "@/components/studio/DesignerWorkbench";
import { DesignerApplicationForm } from "./DesignerApplicationForm";
import styles from "@/components/studio/DesignersPage.module.css";

// Every claim on this page is a verified row in marketing/canon/claims.md (C01-C06, C23, C24).
export const metadata: Metadata = {
  title: "The Founding 50 — For Designers",
  description:
    "Built for the year your studio brings on its first designer. One living document per client, from brief to install. Bring one live project to Patina’s Founding 50.",
  alternates: { canonical: "/designers" },
};

const benefits = [
  [
    "One living document per client",
    "From the brief to the install, the job lives on one page.",
  ],
  [
    "One agreed direction",
    "Your client sees the same page you do.",
  ],
  [
    "A quiet desk",
    "No dashboards, no task manager, no tab bars.",
  ],
  [
    "Read by Kody and Leah",
    "Kody and Leah read every application. Patina is pre-launch, and the Founding 50 shapes what comes next.",
  ],
];

export default function DesignersPage() {
  return (
    <div className={styles.page}>
      <Navigation />
      <main id="main-content">
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>For studios / The Founding 50</p>
            <h1>
              Built for your
              <br />
              first hire.
            </h1>
            <p>
              For the year your studio brings on its first designer and the
              workload doubles. One living document per client, from brief to
              install.
            </p>
            <TrackedLink
              className={styles.primary}
              href="#apply"
              location="designers_hero"
            >
              Bring one live project. <span aria-hidden="true">↗</span>
            </TrackedLink>
            <p className={styles.invitationDetail}>
              50 working designers. Kody and Leah read every application.
              <br />
              Patina is pre-launch.
            </p>
          </div>
          <StudioMotion kind="paper" className={styles.heroArt}>
            <figure className={styles.materialPhotograph}>
              <Image
                src="/images/studio/materials.jpg"
                alt="Illustrative designer’s worktable with timber, textiles, a pencil, and a furniture sketch"
                fill
                priority
                sizes="(max-width: 850px) 100vw, 48vw"
              />
            </figure>
            <div className={styles.invitationCard}>
              <div className={styles.invitationCardTop}>
                <StrataMark size="compact" align="left" />
                <span>
                  Patina
                  <br />
                  An invitation
                </span>
              </div>
              <p>
                A place in
                <br />
                the Founding <span>50.</span>
              </p>
              <div className={styles.invitationCardFoot}>
                From Kody &amp; Leah
              </div>
            </div>
            <p className={styles.artCaption}>
              Illustrative imagery — awaiting partner photography.
            </p>
          </StudioMotion>
        </header>
        <div className={styles.invitationLine}>
          <p>Your client sees the same page you do: one agreed direction.</p>
          <span>Rooted in Madison. Open to your studio.</span>
        </div>
        <section
          className={styles.founderSection}
          aria-labelledby="designer-invitation-title"
        >
          <StudioMotion kind="paper" className={styles.founderLetter}>
            <div className={styles.letterMasthead}>
              <StrataMark size="compact" align="left" />
              <span>From Kody and Leah</span>
            </div>
            <blockquote>“Bring one live project.”</blockquote>
            <p>
              Tell us about a job your studio is running now, from the brief to
              the install. We read every application ourselves.
            </p>
            <p className={styles.signature}>Kody and Leah</p>
            <p className={styles.signatureRole}>
              Middle West Studio / Madison, Wisconsin
            </p>
          </StudioMotion>
          <div className={styles.founderCopy}>
            <p className={styles.eyebrow}>
              An invitation to working studios.
            </p>
            <h2 id="designer-invitation-title">
              Built from practice.
              <br />
              Shaped with yours.
            </h2>
            <p>
              Patina is a venture of Middle West Studio in Madison, Wisconsin.
              Leah leads design, voice and teaching. Kody leads build,
              infrastructure and operations.
            </p>
            <p>
              The Founding 50 is a circle of 50 working designers shaping
              Patina. Your way of seeing, your language, and the realities of
              your work matter here.
            </p>
            <Link className={styles.textLink} href="/about">
              The story behind Patina <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <DesignerWorkbench />
        <section
          className={styles.benefits}
          aria-labelledby="designer-benefits-title"
        >
          <div className={styles.benefitsHeading}>
            <p className={styles.eyebrow}>What your studio gets.</p>
            <h2 id="designer-benefits-title">
              One page.
              <br />
              One agreed direction.
            </h2>
            <p>
              Bring your experience into the building process, alongside
              designers who care about the same details you do.
            </p>
            <div className={styles.cohortMark}>
              <strong>50</strong>
              <span>
                Founding designers.
                <br />
                Many ways of seeing.
              </span>
            </div>
          </div>
          <dl className={styles.benefitList}>
            {benefits.map(([title, description]) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section
          id="apply"
          className={styles.application}
          aria-labelledby="designer-application-title"
        >
          <div className={styles.applicationIntro}>
            <StrataMark size="compact" variant="on-clay" align="left" />
            <p className={styles.eyebrow}>A place in the Founding 50.</p>
            <h2 id="designer-application-title">
              Bring one
              <br />
              live project.
            </h2>
            <p>
              Tell us about your studio and the job you would bring. Kody and
              Leah read every application.
            </p>
            <p className={styles.applicationNote}>
              Patina is pre-launch. Joining the Founding 50 is an invitation to
              help shape it.
            </p>
            <Link className={styles.textLink} href="/contact">
              Talk to us first <span aria-hidden="true">↗</span>
            </Link>
            <figure className={styles.applicationStudy}>
              <Image src="/images/studio/chair.png" alt="" fill sizes="310px" />
              <figcaption>
                Illustrative imagery — awaiting partner photography.
              </figcaption>
            </figure>
          </div>
          <div className={styles.applicationSheet}>
            <div className={styles.sheetTop}>
              <StrataMark size="compact" align="left" />
              <span>Patina / Founding designers</span>
            </div>
            <h3>A little about your practice.</h3>
            <p>
              Start with your name and email. The rest helps us understand your
              point of view.
            </p>
            <div className={styles.form}>
              <DesignerApplicationForm />
            </div>
          </div>
        </section>
        <section
          aria-label="For homeowners"
          className="px-4 pt-10 pb-6 text-center text-[var(--patina-mocha-brown)]"
        >
          <p className="text-sm">
            Not a studio? Homeowners can get The Designer’s Eye, our letter on
            rooms that last.
          </p>
          <NewsletterSignup
            source="designers_homeowner"
            showIntro={false}
            className="py-4 [&_button]:bg-transparent [&_button]:border [&_button]:border-[var(--patina-clay-beige)] [&_button]:text-[var(--patina-mocha-brown)] [&_button:hover]:bg-[var(--patina-off-white)] [&_button]:py-2 [&_button]:text-sm [&_input]:py-2 [&_input]:text-sm"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
