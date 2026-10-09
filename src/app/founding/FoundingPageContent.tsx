import Link from "next/link";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { StrataMark } from "@/components/ui/StrataMark";
import { FoundingCircleForm } from "@/components/ui/FoundingCircleForm";
import { foundingBenefits } from "@/components/studio/FoundingInvitation";
import { StudioMotion } from "@/components/studio/StudioMotion";
import { JoinCircleButton } from "@/components/studio/JoinCircleButton";

export function FoundingPageContent() {
  return (
    <>
      <section className="studio-founding-opening">
        <div className="studio-founding-heading">
          <p className="studio-kicker">An invitation from Kody &amp; Leah</p>
          <h1>
            A place at
            <br />
            the beginning.
          </h1>
          <p>
            We’re building a more personal way to discover furniture. One that
            brings a designer’s eye, a maker’s care, and your own point of view
            together.
          </p>
          <p>
            The app and marketplace aren’t ready yet. The people who help shape
            them will be part of the story from the start.
          </p>
          <a href="#membership" className="studio-link">
            Explore your membership <span aria-hidden="true">↓</span>
          </a>
        </div>
        <StudioMotion className="studio-founding-card">
          <div className="studio-letter-top">
            <StrataMark size="compact" align="left" />
            <p>
              Patina / Founding Circle
              <br />
              Madison, Wisconsin
            </p>
          </div>
          <h2>Come on in.</h2>
          <p>Join the Founding Circle.</p>
          <p className="studio-founding-cap">
            Limited to 200 founding members.
            <br />
            Open wherever you call home.
          </p>
          <FoundingCircleForm
            source="founding_page"
            ctaText="Join the Founding Circle"
          />
          <p className="studio-founding-note">
            A first letter from Kody to welcome you. Then notes from the studio
            as Patina takes shape.
          </p>
          <p className="studio-founding-signature">Warmly, Kody &amp; Leah</p>
        </StudioMotion>
      </section>
      <section
        id="membership"
        className="studio-section studio-two-column studio-membership"
      >
        <div className="studio-copy">
          <p className="studio-kicker">A circle with a part to play.</p>
          <h2>
            More than
            <br />
            early access.
          </h2>
          <p>
            Your questions, preferences, and honest reactions can help us build
            a place that feels like it belongs in the creative process.
          </p>
          <JoinCircleButton source="founding_benefits" />
        </div>
        <dl>
          {foundingBenefits.map(([title, description], index) => (
            <div key={title}>
              <dt>
                <span>0{index + 1}</span>
                {title}
              </dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="studio-section studio-two-column studio-founding-next">
        <div className="studio-copy">
          <p className="studio-kicker">After you join</p>
          <h2>
            The conversation
            <br />
            starts here.
          </h2>
        </div>
        <ol className="studio-list">
          <li>
            <h3>A first letter.</h3>
            <p>
              Kody welcomes you to the circle and shares why we’re building
              Patina.
            </p>
          </li>
          <li>
            <h3>A look at the work.</h3>
            <p>
              Updates from the studio and monthly questions invite your
              perspective as the platform takes shape.
            </p>
          </li>
          <li>
            <h3>A first step inside.</h3>
            <p>
              Founding members get first access when the app launches. We’ll
              write when there’s something ready for you to try.
            </p>
          </li>
        </ol>
      </section>
      <section className="studio-section studio-two-column studio-founding-questions">
        <div className="studio-copy">
          <p className="studio-kicker">A few things to know.</p>
          <h2>
            Before you
            <br />
            pull up a chair.
          </h2>
        </div>
        <div>
          <details>
            <summary>Do I need to live in the Midwest?</summary>
            <p>
              No. Patina is rooted in Madison, Wisconsin, and our first outreach
              is focused on Chicago, Madison, and Minneapolis. The Founding
              Circle is open wherever you call home.
            </p>
          </details>
          <details>
            <summary>Can I use the app today?</summary>
            <p>
              The app and marketplace are pre-launch. Membership brings you into
              the building process and gives you first access when the app
              launches.
            </p>
          </details>
          <details>
            <summary>I’m a designer or a maker. Where do I start?</summary>
            <p>
              There are dedicated invitations for{" "}
              <Link href="/designers">the Founding 50 designers</Link> and{" "}
              <Link href="/makers">our first maker partners</Link>. We’d love to
              learn about your work.
            </p>
          </details>
          <details>
            <summary>What if I have a question for you?</summary>
            <p>
              Write to{" "}
              <TrackedLink href="mailto:hello@patina.cloud" location="founding_questions">
                hello@patina.cloud
              </TrackedLink> or{" "}
              <Link href="/contact">leave us a note</Link>. We read them.
            </p>
          </details>
        </div>
      </section>
    </>
  );
}
