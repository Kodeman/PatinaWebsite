import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StudioPage } from "@/components/studio/StudioPage";
import { StudioMotion } from "@/components/studio/StudioMotion";
import { JoinCircleButton } from "@/components/studio/JoinCircleButton";
import styles from "@/components/studio/EditorialPages.module.css";
import { StrataMark } from "@/components/ui/StrataMark";

export const metadata: Metadata = {
  title: "The App We’re Building",
  description:
    "A designer’s eye, on your terms. Discover the furniture experience Patina is building and join the Founding Circle for first access at launch.",
  alternates: { canonical: "https://patina.cloud/app" },
};

export default function AppPage() {
  return (
    <StudioPage
      className={styles.editorialPage}
      eyebrow="The app / In the making"
      title={
        <>
          Your room.
          <br />A little more possibility.
        </>
      }
      description="We’re building a way to find furniture that belongs in your space, guided by a working designer’s judgment. The app and marketplace are pre-launch."
      heroAction={<JoinCircleButton source="app-hero" />}
      heroArt={
        <StudioMotion kind="image" className={styles.appHeroArt}>
          <figure className={styles.heroPhotograph}>
            <Image
              src="/images/studio/room.jpg"
              alt="Illustrative warm living room with a lounge chair, timber, and linen"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 760px) 100vw, 52vw"
            />
            <figcaption>
              Illustrative imagery — awaiting partner photography.
              Not an app screen or available product listing.
            </figcaption>
          </figure>
          <div className={styles.appHeroCard} aria-hidden="true">
            <span>A closer look.</span>
            <Image
              src="/images/studio/chair.png"
              alt=""
              width={1536}
              height={1024}
              sizes="240px"
              loading="eager"
            />
            <span>Shape. Texture. Possibility.</span>
          </div>
        </StudioMotion>
      }
    >
      <section className={`studio-section ${styles.appIntroduction}`}>
        <div className="studio-two-column">
          <div className="studio-copy">
            <p className="studio-kicker">What we’re building.</p>
            <h2 className={styles.sectionTitle}>
              A place to
              <br />
              follow your eye.
            </h2>
            <p>
              Something catches your attention. A texture, a shape, a feeling.
              You don’t need to know the name for it to begin.
            </p>
            <p>
              Patina is being built around those discoveries: a focused
              selection informed by real designers, with a path to a fuller
              design conversation when you want one.
            </p>
            <JoinCircleButton source="app-introduction" />
            <p className={styles.caption}>
              First access when the app launches.
            </p>
          </div>
          <StudioMotion kind="paper">
            <figure className={styles.appStudy}>
              <p className={styles.studyNote}>
                Room to
                <br />
                think it through.
              </p>
              <Image
                src="/images/studio/chair.png"
                alt="Illustrative isolated timber and leather lounge chair"
                width={1536}
                height={1024}
                sizes="(max-width: 760px) 100vw, 50vw"
              />
              <figcaption className={styles.caption}>
                Illustrative imagery — awaiting partner photography.
                Not a product for sale.
              </figcaption>
            </figure>
          </StudioMotion>
        </div>
      </section>
      <section className={`studio-section ${styles.appJourney}`}>
        <div className="studio-two-column">
          <div>
            <StrataMark size="compact" align="left" />
            <p className="studio-kicker">
              The experience we’re working toward.
            </p>
            <h2 className={styles.sectionTitle}>
              From a feeling
              <br />
              to a conversation.
            </h2>
          </div>
          <ol className={styles.steps}>
            <li>
              <div>
                <h3>Begin with your space.</h3>
                <p>
                  Your room, your taste, and how you live should be the starting
                  point. We’re designing Patina to carry that context into the
                  search.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>Find what belongs.</h3>
                <p>
                  Real interior designers teach Patina what to look for. The aim
                  is a focused selection you can consider with confidence.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>Continue with a person.</h3>
                <p>
                  When you want more help, we’re building a handoff that carries
                  your discoveries into a conversation with a working designer.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className={`studio-section ${styles.appClosing}`}>
        <div className={styles.closing}>
          <StudioMotion kind="paper">
            <div className={styles.note}>
              <p className="studio-kicker">From the people building it.</p>
              <h2>The tools should feel like part of the process.</h2>
              <p>
                Leah brings the judgment of a working designer. Kody is building
                the tools to make room for that judgment and your own
                discoveries.
              </p>
              <Link href="/about" className="studio-link">
                Read our story
              </Link>
            </div>
          </StudioMotion>
          <div>
            <h2 className={styles.sectionTitle}>
              Have a hand
              <br />
              in what’s next.
            </h2>
            <p>
              The Founding Circle gets first access, behind-the-scenes updates,
              and a say in what we build. Join the people helping Patina take
              shape.
            </p>
            <JoinCircleButton source="app-closing" />
            <div className={styles.links}>
              <Link href="/founding" className="studio-link">
                Explore membership
              </Link>
              <Link href="/designers" className="studio-link">
                Building with designers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </StudioPage>
  );
}
