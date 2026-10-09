import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { StrataMark } from "@/components/ui/StrataMark";
import { StudioMotion } from "@/components/studio/StudioMotion";
import { MakerStudy } from "./MakerStudy";
import styles from "./MakersPage.module.css";

export const metadata: Metadata = {
  title: "For Makers — The First 15",
  description:
    "A founding invitation to 15 furniture makers. Help shape how your work is discovered and understood, with craft at the center. Apply to partner with Patina.",
  alternates: { canonical: "/makers" },
};

const questions = [
  {
    title: "Is the marketplace open yet?",
    answer:
      "The app and marketplace are pre-launch. We’re bringing together the people and work that will shape them. This invitation is a chance to be part of that beginning.",
  },
  {
    title: "What should I share in an application?",
    answer:
      "Tell us about your workshop, where you work, your materials and process, and how we can reach you. A website or portfolio helps us get to know the work. If you have a trade program, tell us how it works today.",
  },
  {
    title: "Who reads the applications?",
    answer:
      "Kody and Leah personally review every maker application for fit. You’ll hear from us within two weeks. We begin with a conversation about your work and what a partnership could look like.",
  },
  {
    title: "Can makers pay for placement?",
    answer:
      "No. There are no sponsored placements or pay-to-play slots. Placement is earned through the quality of the work and its fit with Patina.",
  },
];

export default function MakersPage() {
  return (
    <div className={styles.page}>
      <Navigation />
      <main id="main-content">
        <header className={styles.hero}>
          <Image
            className={styles.heroImage}
            src="/images/studio/workbench.jpg"
            alt="Illustrative close-up of hands fitting a timber joint at a workshop bench"
            fill
            priority
            sizes="100vw"
          />
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>For makers / A founding invitation</p>
            <h1>
              Good work
              <br />
              deserves a<br />
              closer look.
            </h1>
            <p className={styles.heroDescription}>
              We’re inviting 15 founding makers to help shape a place where the
              care behind a piece becomes part of how it is discovered.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.lightButton} href="/makers/apply">
                Apply to Partner <span aria-hidden="true">↗</span>
              </Link>
              <a className={styles.heroLink} href="#the-work">
                Step inside <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className={styles.heroFoot}>
            <StrataMark size="compact" align="left" variant="on-clay" />
            <p>
              Illustrative imagery — awaiting partner photography.
            </p>
          </div>
        </header>

        <section
          className={styles.opening}
          id="the-work"
          aria-labelledby="work-title"
        >
          <p className={styles.kicker}>A designer’s eye. A maker’s care.</p>
          <div className={styles.openingColumns}>
            <h2 id="work-title">
              The details you
              <br />
              put into it.
              <br />
              <span>
                We want people
                <br />
                to see them.
              </span>
            </h2>
            <div className={styles.openingCopy}>
              <p>
                A material chosen for the way it will age. A joint refined until
                it feels right. The decisions that rarely fit into a product
                thumbnail.
              </p>
              <p>
                Patina starts with a working designer’s judgment. We’re building
                furniture discovery around fewer, considered choices—and the
                people who make them.
              </p>
              <p>Your work deserves room to be understood.</p>
            </div>
          </div>
        </section>

        <MakerStudy />

        <section
          className={styles.partnership}
          id="founding-makers"
          aria-labelledby="partnership-title"
        >
          <div className={styles.partnershipHeading}>
            <StrataMark size="compact" align="left" />
            <p className={styles.kicker}>The first 15 founding makers</p>
            <h2 id="partnership-title">
              Help shape
              <br />
              the way your
              <br />
              work is seen.
            </h2>
            <p>
              We’re starting with a small group of makers whose approach to
              materials and construction belongs at the heart of Patina.
            </p>
            <Link className={styles.darkButton} href="/makers/apply">
              Apply to Partner <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className={styles.partnershipDetails}>
            <article>
              <h3>A designer’s point of view.</h3>
              <p>
                Leah’s work at Middle West Studio shapes the judgment behind
                Patina. We want to understand a piece the way a designer does:
                its proportion, its presence, and the care in its construction.
              </p>
            </article>
            <article>
              <h3>Your voice beside the work.</h3>
              <p>
                Help us understand what matters about your process. The
                materials, the methods, and the reasons behind them should come
                from the people who know them best.
              </p>
            </article>
            <article>
              <h3>A say in the beginning.</h3>
              <p>
                Bring your perspective to how makers and their work are
                represented. We’re building this experience now; the practical
                realities of your workshop belong in that conversation.
              </p>
            </article>
            <div className={styles.placementStatement}>
              <p>
                Earned placement.
                <br />
                No sponsored slots.
                <br />
                No pay-to-play.
              </p>
              <span>Craft is the starting point.</span>
            </div>
          </div>
        </section>

        <section
          className={styles.workingTogether}
          aria-labelledby="working-title"
        >
          <div className={styles.workingIntro}>
            <p className={styles.kicker}>From your workshop to our studio</p>
            <h2 id="working-title">
              A good partnership
              <br />
              starts with
              <br />
              understanding.
            </h2>
            <p>
              Before anything else, we want to get to know your work. Here’s
              what that conversation is built around.
            </p>
          </div>
          <div className={styles.exchange}>
            <div>
              <span className={styles.exchangeLabel}>What you bring</span>
              <h3>
                The knowledge
                <br />
                behind the piece.
              </h3>
              <ul>
                <li>
                  Your materials, construction, and approach to finishing.
                </li>
                <li>Images or a portfolio that show the work clearly.</li>
                <li>
                  The practical details: where you work and how your existing
                  trade program operates.
                </li>
                <li>What you want people to understand about your craft.</li>
              </ul>
            </div>
            <div>
              <span className={styles.exchangeLabel}>What we bring</span>
              <h3>
                Attention to the work.
                <br />A personal conversation.
              </h3>
              <ul>
                <li>Personal review with Kody and Leah.</li>
                <li>A designer’s perspective on craft and fit.</li>
                <li>A conversation about how your work belongs in Patina.</li>
                <li>A reply within two weeks, with a clear next step.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.processIntro}>
            <p className={styles.kicker}>The beginning is straightforward</p>
            <h2 id="process-title">
              Show us the work.
              <br />
              We’ll take it from there.
            </h2>
            <p>
              The application starts a conversation. The app and marketplace are
              pre-launch; we’ll discuss the shape of a partnership together.
            </p>
          </div>
          <ol className={styles.processSteps}>
            <li>
              <span aria-hidden="true">01</span>
              <div>
                <h3>Tell us about your workshop.</h3>
                <p>Share your work, your process, and where we can see more.</p>
              </div>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <div>
                <h3>Leah takes a closer look.</h3>
                <p>
                  Every application is reviewed personally. Allow up to two
                  weeks for a reply.
                </p>
              </div>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <div>
                <h3>Begin a conversation.</h3>
                <p>
                  If there’s a fit, we’ll talk through your work and what comes
                  next.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className={styles.questions} aria-labelledby="questions-title">
          <h2 id="questions-title">Before we begin.</h2>
          <div>
            {questions.map((question) => (
              <details key={question.title}>
                <summary>
                  {question.title}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{question.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <StudioMotion kind="image" className={styles.closingImage}>
            <figure>
              <Image
                src="/images/founders/windy-peak-room.jpg"
                alt="Pale upholstered sofas and a dark timber table in a Middle West Studio living room"
                fill
                sizes="(max-width: 850px) 100vw, 45vw"
              />
              <figcaption>
                Windy Peak / A Middle West Studio project
                <br />
                Design: Leah Kochaver. Photography: Ashley Hicks.
              </figcaption>
            </figure>
          </StudioMotion>
          <div className={styles.closingCopy}>
            <StrataMark size="compact" align="left" variant="on-clay" />
            <p className={styles.kicker}>An invitation to the first 15</p>
            <h2 id="closing-title">
              Bring your work
              <br />
              to the conversation.
            </h2>
            <p>Tell us what you make, and what makes it yours.</p>
            <Link className={styles.lightButton} href="/makers/apply">
              Apply to Partner <span aria-hidden="true">↗</span>
            </Link>
            <Link className={styles.closingLink} href="/contact">
              Talk to us first <span aria-hidden="true">↗</span>
            </Link>
            <p className={styles.closingNote}>
              Personally reviewed by Kody and Leah.
              <br />
              You’ll hear from us within two weeks.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
