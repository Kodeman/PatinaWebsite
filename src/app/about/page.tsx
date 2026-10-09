import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { StudioMotion } from "@/components/studio/StudioMotion";
import {
  StoryChapters,
  StoryRoomJourney,
} from "@/components/studio/StoryJourney";
import { JoinCircleButton } from "@/components/studio/JoinCircleButton";
import { StrataMark } from "@/components/ui/StrataMark";
import { generateAboutPageJsonLd } from "@/lib/seo";
import styles from "@/components/studio/StoryPage.module.css";

export const metadata: Metadata = {
  title: "Our Story — Leah & Kody Kochaver",
  description:
    "A designer’s eye. A builder’s instinct. Follow Leah and Kody Kochaver’s paths into Patina, from real rooms to tools that belong in the creative process.",
  alternates: { canonical: "https://patina.cloud/about" },
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateAboutPageJsonLd()),
        }}
      />
      <Navigation />
      <main id="main-content">
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              Our story / Leah &amp; Kody Kochaver
            </p>
            <h1>
              <span>A designer’s eye.</span>
              <span>A builder’s instinct.</span>
            </h1>
            <p className={styles.heroDescription}>
              We’re Leah and Kody. One of us starts with how a room feels. The
              other starts with how things work. Patina is where those ways of
              seeing come together.
            </p>
            <a href="#leah" className={styles.textLink}>
              Follow our story <span aria-hidden="true">↓</span>
            </a>
            <StrataMark size="compact" align="left" />
          </div>
          <StudioMotion kind="image">
            <figure className={styles.heroArt}>
              <div className={styles.heroImage}>
                <Image
                  src="/images/founders/hiawatha-room.jpg"
                  alt="A Hiawatha living and dining room by Leah Kochaver, with curved seating, a stone table, and Wisconsin woodland beyond the windows"
                  fill
                  priority
                  sizes="(max-width: 850px) 100vw, 48vw"
                />
              </div>
              <figcaption>
                <TrackedLink
                  href="https://www.middlewest.studio/saraha-circle-1"
                  location="about_leah_hiawatha"
                  target="_blank"
                  rel="noreferrer"
                >
                  Hiawatha / Middle West Studio
                </TrackedLink>
                <br />
                Interior design by Leah Kochaver. Photography by Ashley Hicks.
              </figcaption>
            </figure>
          </StudioMotion>
        </header>
        <StoryChapters />
        <section id="leah" className={styles.leah}>
          <div className={styles.reading}>
            <p className={styles.eyebrow}>The first path / Leah</p>
            <h2 className={styles.chapterHeading}>
              A home begins
              <br />
              with a person.
            </h2>
            <p className={styles.lead}>
              Before the plans and samples, Leah listens. How you live. What
              you’re drawn to. What would make a room feel like yours.
            </p>
            <p>
              Her path ran through fine art and communications, then interior
              design. After twelve years in Seattle, she returned to Wisconsin
              in 2018. In 2023, she founded Middle West Studio.
            </p>
            <p>
              Her work brings the practical and the personal together: the plan
              that makes a room work, the material you want to touch, the piece
              that feels as though it has always belonged.
            </p>
            <blockquote className={styles.leahQuote}>
              “Listen first.
              <br />
              Design second.”
            </blockquote>
            <TrackedLink
              href="https://middlewest.studio"
              location="about_leah"
              target="_blank"
              rel="noreferrer"
              className={styles.textLink}
            >
              Visit Middle West Studio <span aria-hidden="true">↗</span>
            </TrackedLink>
            <dl className={styles.milestones}>
              <div>
                <dt>2018</dt>
                <dd>
                  Home to Wisconsin,
                  <br />
                  after twelve years in Seattle.
                </dd>
              </div>
              <div>
                <dt>2023</dt>
                <dd>
                  Middle West Studio begins.
                  <br />A practice built around people.
                </dd>
              </div>
            </dl>
          </div>
          <StudioMotion kind="image">
            <figure className={styles.leahPortrait}>
              <Image
                src="/images/founders/leah-kochaver.jpg"
                alt="Leah Kochaver, founder of Middle West Studio and co-founder of Patina, outdoors among green foliage"
                width={1250}
                height={1666}
                sizes="(max-width: 850px) 85vw, 36vw"
              />
              <figcaption>
                <strong>Leah Kochaver</strong>Co-founder / Design &amp;
                Experience
                <br />
                Portrait courtesy of Middle West Studio.
              </figcaption>
            </figure>
          </StudioMotion>
        </section>
        <StoryRoomJourney />
        <section id="kody" className={styles.kody}>
          <StudioMotion kind="paper">
            <article className={styles.workingPage}>
              <div className={styles.workingPageTop}>
                <StrataMark size="compact" align="left" />
                <span>
                  From Kody’s writing
                  <br />A principle to build by
                </span>
              </div>
              <blockquote>
                “The best tools don’t replace the work — they help you do the
                work better.”
              </blockquote>
              <p>
                That thought runs through his work: begin with the experience,
                leave room for the person, and build something that holds up
                beyond its first impression.
              </p>
              <div className={styles.workingPageFoot}>
                <span>Kody Kochaver</span>
                <TrackedLink
                  href="https://www.kochaver.com/"
                  location="about_kody_page"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read Kody’s approach
                </TrackedLink>
              </div>
            </article>
          </StudioMotion>
          <div className={styles.reading}>
            <p className={styles.eyebrow}>The second path / Kody</p>
            <h2 className={styles.chapterHeading}>
              Make room
              <br />
              for the work.
            </h2>
            <p className={styles.lead}>
              Kody has spent two decades making complex systems simpler to use.
              The question underneath has stayed much the same: what should this
              feel like for the person using it?
            </p>
            <p>
              His work has taken him through Jydo, Blacktee, and Avidex.
              Different systems and settings; a continuing interest in tools
              that help people do their work with more confidence.
            </p>
            <p>
              With Patina, he sees a gap close to the creative process. Too many
              tools feel sterile. They organize the task, but leave little room
              for the looking, connecting, and reconsidering that make design
              personal.
            </p>
            <p>
              He’s building toward something that feels at home in that process.
            </p>
            <TrackedLink
              href="https://www.linkedin.com/in/kkochaver/"
              location="about_kody"
              target="_blank"
              rel="noreferrer"
              className={styles.textLink}
            >
              More about Kody <span aria-hidden="true">↗</span>
            </TrackedLink>
            <div className={styles.kodySignpost}>
              <span>Co-founder / Technology &amp; Product</span>
              <span>Madison, Wisconsin</span>
            </div>
          </div>
        </section>
        <section id="together" className={styles.together}>
          <div className={styles.meetingIntro}>
            <div>
              <p className={styles.eyebrow}>Where the paths meet</p>
              <h2 className={styles.chapterHeading}>
                The creative part
                <br />
                deserves more room.
              </h2>
            </div>
            <div>
              <p>
                Leah knows the difference a designer’s judgment makes. Kody
                believes the tools should support that judgment, and the
                discoveries that happen around it.
              </p>
              <p>
                So we’re building Patina: a more personal way to find furniture,
                guided by working designers, with room for the maker’s care and
                your own point of view.
              </p>
              <p>
                You can begin with a feeling. Follow what catches your eye. And,
                when you want more help, carry that conversation forward with a
                designer.
              </p>
            </div>
          </div>
          <div className={styles.belief}>
            <div className={styles.beliefName}>
              <StrataMark size="medium" align="left" />
              <h3>Patina.</h3>
              <p>
                A name, and a belief.
                <br />
                Founded in Madison, Wisconsin, in 2023.
              </p>
            </div>
            <div className={styles.beliefCopy}>
              <blockquote>
                The surface that develops through age and exposure, adding
                depth, character, and value.
              </blockquote>
              <p>
                We’re drawn to things that grow more interesting with time. A
                timber edge worn smooth. A room that reflects the life inside
                it. Taste that develops because you keep looking.
              </p>
              <p>We want to build a company that grows that way, too.</p>
              <p className={styles.tagline}>Where Time Adds Value.</p>
            </div>
          </div>
        </section>
        <section id="next" className={styles.next}>
          <StudioMotion kind="image">
            <figure className={styles.closingArt}>
              <Image
                src="/images/founders/country-home-kitchen.jpg"
                alt="Country Home kitchen designed by Leah Kochaver, with hanging pans, timber counters, framed art, and a patterned rug"
                width={1000}
                height={1334}
                sizes="(max-width: 850px) 100vw, 43vw"
              />
              <figcaption>
                <TrackedLink
                  href="https://www.middlewest.studio/country-home"
                  location="about_country_home"
                  target="_blank"
                  rel="noreferrer"
                >
                  Country Home / Middle West Studio
                </TrackedLink>
                <br />
                Design by Leah Kochaver. Photography by Middle West Studio.
              </figcaption>
            </figure>
          </StudioMotion>
          <div className={styles.invitation}>
            <StrataMark size="compact" align="left" />
            <p className={styles.eyebrow}>The next chapter / You</p>
            <h2 className={styles.chapterHeading}>
              There’s room
              <br />
              for your story.
            </h2>
            <p>
              The app and marketplace are pre-launch. We’re inviting people who
              care about their homes to help shape what comes next. Your
              questions, preferences, and point of view belong in the
              conversation.
            </p>
            <JoinCircleButton source="about-closing" />
            <p className={styles.membershipNote}>
              The Founding Circle. Limited to 200 founding members.
              <br />
              Open wherever you call home.
            </p>
            <div className={styles.invitationLinks}>
              <Link href="/founding" className={styles.textLink}>
                Explore membership
              </Link>
              <Link href="/designers" className={styles.textLink}>
                For designers
              </Link>
              <Link href="/makers" className={styles.textLink}>
                For makers
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
