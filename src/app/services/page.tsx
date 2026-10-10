import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { StudioPage } from "@/components/studio/StudioPage";
import { StudioMotion } from "@/components/studio/StudioMotion";
import { JoinCircleButton } from "@/components/studio/JoinCircleButton";
import { StrataMark } from "@/components/ui/StrataMark";
import { ServicesCTA } from "./ServicesCTA";
import styles from "@/components/studio/TradePages.module.css";

export const metadata: Metadata = {
  title: "Design Services — A Designer’s Eye, on Your Terms",
  description:
    "Discover Patina’s planned handoff from your own furniture exploration to a working designer. Tell us about your space while the app takes shape.",
};
const brief = [
  ["Your point of view", "The pieces, materials, and rooms you’re drawn to."],
  ["The room as it is", "The space you have and the things you want to keep."],
  ["What matters most", "Your priorities, investment range, and timing."],
];
export default function ServicesPage() {
  return (
    <StudioPage
      eyebrow="Design services / The handoff"
      title={
        <>
          Room for your ideas.
          <br />
          <em>And a designer’s eye.</em>
        </>
      }
      description="Explore what you love at your own pace. When you want a working designer to take it further, the thinking you’ve already done should come with you."
      image="/images/studio/room.jpg"
      imageAlt="An illustrative living room with a timber chair, soft upholstery, and afternoon light"
      imageCaption="Illustrative imagery — awaiting partner photography."
      heroAction={
        <ServicesCTA
          href="/contact"
          label="Talk to Us"
          location="services_hero"
        />
      }
    >
      <section
        className={`studio-section studio-two-column ${styles.introduction} ${styles.serviceIntroduction}`}
      >
        <div className="studio-copy">
          <span className="studio-kicker">The idea we’re building around</span>
          <h2>
            A conversation
            <br />
            <em>with a running start.</em>
          </h2>
          <p>
            A room begins with more than measurements. There are things you’ve
            saved, pieces you already own, and a feeling you haven’t quite found
            the words for.
          </p>
          <p>
            Patina’s planned handoff brings that context into a designer’s first
            conversation with you. The app and marketplace are pre-launch; we’re
            building toward this with working designers.
          </p>
          <ServicesCTA
            href="/contact"
            label="Talk to Us"
            location="services_introduction"
          />
        </div>
        <div className={styles.handoffDesk}>
          <StudioMotion kind="image" className={styles.chairStudy}>
            <figure>
              <Image
                src="/images/studio/chair.png"
                alt="Illustrative timber and upholstered chair, studied outside the room"
                width={1536}
                height={1024}
                sizes="(max-width: 900px) 85vw, 42vw"
              />
              <figcaption>
                The room, considered one piece at a time.
                <br />
                Illustrative imagery — awaiting partner photography.
              </figcaption>
            </figure>
          </StudioMotion>
          <StudioMotion
            kind="paper"
            className={`${styles.note} ${styles.briefNote}`}
          >
            <StrataMark size="compact" align="left" />
            <span className="studio-kicker">A brief, taking shape</span>
            <h3>
              Carry the
              <br />
              <em>good thinking forward.</em>
            </h3>
            <dl className={styles.briefList}>
              {brief.map(([title, description]) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.small}>
              An illustration of the handoff we’re developing.
            </p>
          </StudioMotion>
        </div>
      </section>
      <section className={`studio-section ${styles.scopeSection}`}>
        <StudioMotion kind="image" className={styles.scopeImage}>
          <figure>
            <Image
              src="/images/studio/materials.jpg"
              alt="Illustrative material samples on a designer’s worktable"
              width={1536}
              height={1024}
              sizes="(max-width: 900px) 90vw, 38vw"
            />
            <figcaption>
              Illustrative imagery — awaiting partner photography.
            </figcaption>
          </figure>
        </StudioMotion>
        <div className={styles.scopeContent}>
          <div className="studio-copy">
            <span className="studio-kicker">Start where you are</span>
            <h2>
              Your home.
              <br />
              <em>Your scope.</em>
            </h2>
            <p>
              A design conversation can begin with one room or reach across a
              whole home. Scope, timing, and deliverables belong in a proposal
              agreed with your designer.
            </p>
          </div>
          <dl className={styles.numberedList}>
            <div>
              <span aria-hidden="true">01</span>
              <dt>A single room</dt>
              <dd>
                A living room looking for direction. A bedroom that still feels
                unfinished. One space, given attention.
              </dd>
            </div>
            <div>
              <span aria-hidden="true">02</span>
              <dt>Connected spaces</dt>
              <dd>
                Consider how rooms relate: their proportions, materials, and the
                way you move between them.
              </dd>
            </div>
            <div>
              <span aria-hidden="true">03</span>
              <dt>A whole home</dt>
              <dd>
                Find the thread that connects your home, with room for each
                space to have its own character.
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section className={`studio-section studio-two-column ${styles.dark}`}>
        <div className="studio-copy">
          <span className="studio-kicker">A place in what comes next</span>
          <h2>
            Help us make
            <br />
            <em>room for you.</em>
          </h2>
        </div>
        <div className="studio-copy">
          <p>
            Join the Founding Circle to help shape Patina and receive first
            access when the app launches. Have a project in mind today? Tell us
            about it and we can begin a conversation.
          </p>
          <div className={styles.actions}>
            <JoinCircleButton source="services_closing" />
            <Link className="studio-link" href="/contact">
              Talk to Us <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </StudioPage>
  );
}
