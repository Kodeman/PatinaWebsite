import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { StudioPage } from "@/components/studio/StudioPage";
import { JoinCircleButton } from "@/components/studio/JoinCircleButton";

export const metadata: Metadata = {
  title: "Press & studio notes",
  description:
    "Facts, founder background, and press inquiries for Patina, a venture of Middle West Studio in Madison, Wisconsin.",
  alternates: { canonical: "/press" },
};

export default function PressPage() {
  return (
    <StudioPage
      eyebrow="From Madison, with a wider point of view."
      title={
        <>
          A story
          <br />
          in the making.
        </>
      }
      description="Patina is building a more personal way to discover furniture, bringing designers, makers, and the people who live with their work into the same conversation."
      heroAction={
        <TrackedLink
          href="/press/patina-fact-sheet.txt"
          location="press_hero"
          download
          className="studio-button"
        >
          Download the fact sheet <span aria-hidden="true">↓</span>
        </TrackedLink>
      }
      image="/images/studio/materials.jpg"
      imageAlt="Illustrative arrangement of wood and fabric samples on a studio table"
      imageCaption="Illustrative imagery — awaiting partner photography."
    >
      <section className="studio-section studio-two-column">
        <div className="studio-copy">
          <p className="studio-kicker">Press inquiries</p>
          <h2>
            Start with
            <br />a conversation.
          </h2>
          <p>
            For interviews with Kody or Leah, background on Patina, or imagery
            requests, write to the team.
          </p>
          <TrackedLink
            className="studio-link"
            href="mailto:hello@patina.cloud?subject=Patina%20press%20inquiry"
            location="press_inquiries"
          >
            hello@patina.cloud <span aria-hidden="true">↗</span>
          </TrackedLink>
          <div className="studio-press-actions">
            <TrackedLink
              href="/press/patina-fact-sheet.txt"
              location="press_inquiries"
              download
              className="studio-button"
            >
              Download the fact sheet <span aria-hidden="true">↓</span>
            </TrackedLink>
          </div>
        </div>
        <dl className="studio-press-facts">
          <div>
            <dt>Founded</dt>
            <dd>2023, in Madison, Wisconsin</dd>
          </div>
          <div>
            <dt>Founders</dt>
            <dd>Kody &amp; Leah Kochaver</dd>
          </div>
          <div>
            <dt>Product stage</dt>
            <dd>App and marketplace are pre-launch</dd>
          </div>
          <div>
            <dt>Invitations</dt>
            <dd>
              Founding Circle: 200 places
              <br />
              Founding designers: 50 places
              <br />
              First maker partners: 15 places
            </dd>
          </div>
          <div>
            <dt>Reach</dt>
            <dd>
              Membership is open everywhere. Initial outreach focuses on
              Chicago, Madison, and Minneapolis.
            </dd>
          </div>
        </dl>
      </section>
      <section className="studio-section studio-two-column">
        <div className="studio-copy">
          <p className="studio-kicker">The people behind Patina</p>
          <h2>
            Two perspectives.
            <br />A shared purpose.
          </h2>
        </div>
        <div className="studio-copy">
          <p>
            Leah Kochaver brings the perspective of a practicing interior
            designer and her work at Middle West Studio. She helps shape how
            Patina understands rooms, materials, and the decisions that make a
            space personal.
          </p>
          <p>
            Kody Kochaver is building Patina because he sees a gap between the
            creativity of designing a room and the tools available to support
            it. Together, they’re creating a furniture discovery experience that
            gives people, craft, and design judgment more room.
          </p>
          <Link href="/about" className="studio-link">
            Read our story <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="studio-section studio-two-column studio-press-invite">
        <div className="studio-copy">
          <p className="studio-kicker">The next chapter</p>
          <h2>
            Help shape
            <br />
            what comes next.
          </h2>
        </div>
        <div className="studio-copy">
          <p>
            The Founding Circle is open to people who want a part in building
            Patina, with first access when the app launches and an ongoing view
            into the work.
          </p>
          <JoinCircleButton source="press_invitation" />
        </div>
      </section>
    </StudioPage>
  );
}
