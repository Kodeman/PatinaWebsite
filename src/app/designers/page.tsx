import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { StudioMotion } from "@/components/studio/StudioMotion";
import { StrataMark } from "@/components/ui/StrataMark";
import { DesignerWorkbench } from "@/components/studio/DesignerWorkbench";
import { DesignerApplicationForm } from "./DesignerApplicationForm";
import styles from "@/components/studio/DesignersPage.module.css";

export const metadata: Metadata = {
  title: "The Founding 50 — For Designers",
  description:
    "Help shape the tools your practice deserves. Apply to Patina’s Founding 50: working designers co-creating designer-taught furniture discovery.",
  alternates: { canonical: "/designers" },
};

const benefits = [
  [
    "Your vocabulary, in the tools",
    "Help shape how furniture is described and understood. The judgments you make in practice belong in the system.",
  ],
  [
    "A voice in what gets built",
    "Explore the Designer Portal, share what is missing, and bring real project experience into product decisions.",
  ],
  [
    "A community of peers",
    "A private founding cohort and monthly conversations with Kody and Leah. A place to compare notes and contribute.",
  ],
  [
    "A running start with clients",
    "When the consumer app launches, founding designers will be the first designers people can connect with.",
  ],
  [
    "Your contribution, recognized",
    "Founding designers are credited by name at launch. There is no fee to join; your expertise is the contribution.",
  ],
];

export default function DesignersPage() {
  return (
    <div className={styles.page}>
      <Navigation />
      <main id="main-content">
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>For designers / The Founding 50</p>
            <h1>
              Your eye belongs
              <br />
              in the making.
            </h1>
            <p>
              You know the difference between a room that is furnished and a
              room that feels right. Help us build tools that understand the
              difference, too.
            </p>
            <TrackedLink
              className={styles.primary}
              href="#apply"
              location="designers_hero"
            >
              Apply to the Founding 50 <span aria-hidden="true">↗</span>
            </TrackedLink>
            <p className={styles.invitationDetail}>
              50 working designers. A shared beginning.
              <br />
              No fee to join. Your perspective is the contribution.
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
                From the studio of Kody &amp; Leah
              </div>
            </div>
            <p className={styles.artCaption}>
              Illustrative imagery — awaiting partner photography.
            </p>
          </StudioMotion>
        </header>
        <div className={styles.invitationLine}>
          <p>
            Patina starts with a working designer’s eye. The next chapter brings
            yours into the conversation.
          </p>
          <span>Rooted in Madison. Open to your perspective.</span>
        </div>
        <section
          className={styles.founderSection}
          aria-labelledby="designer-invitation-title"
        >
          <StudioMotion kind="paper" className={styles.founderLetter}>
            <div className={styles.letterMasthead}>
              <StrataMark size="compact" align="left" />
              <span>From Leah’s desk</span>
            </div>
            <blockquote>
              “The tools never matched how designers actually think.”
            </blockquote>
            <p>
              That is the starting point for Patina. A place where the tools
              make room for the way designers notice, connect, and consider.
            </p>
            <p className={styles.signature}>Leah Kochaver</p>
            <p className={styles.signatureRole}>
              Co-Founder, Design &amp; Experience
              <br />
              Middlewest Studio / Madison, Wisconsin
            </p>
          </StudioMotion>
          <div className={styles.founderCopy}>
            <p className={styles.eyebrow}>
              An invitation to working designers.
            </p>
            <h2 id="designer-invitation-title">
              Built from practice.
              <br />
              Shaped with yours.
            </h2>
            <p>
              Leah runs Middlewest Studio in Madison. Her design practice is
              where Patina’s point of view begins. Kody is building the tools
              around a shared belief: they should feel like part of the creative
              process.
            </p>
            <p>
              We’re bringing together 50 interior designers to help shape what
              comes next. Your way of seeing, your language, and the realities
              of your work matter here.
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
            <p className={styles.eyebrow}>What we build together.</p>
            <h2 id="designer-benefits-title">
              A place to shape
              <br />
              what comes next.
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
              Bring your
              <br />
              designer’s eye.
            </h2>
            <p>
              Tell us a little about your practice and what you would bring to
              the conversation. Kody and Leah personally review every
              application. You’ll hear from us within 7 days.
            </p>
            <p className={styles.applicationNote}>
              The app and marketplace are pre-launch. Joining the Founding 50 is
              an invitation to help shape them.
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
      </main>
      <Footer />
    </div>
  );
}
