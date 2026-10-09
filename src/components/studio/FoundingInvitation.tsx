import { StrataMark } from "@/components/ui/StrataMark";
import { StudioMotion } from "./StudioMotion";
import { JoinCircleButton } from "./JoinCircleButton";

export const foundingBenefits = [
  [
    "First access",
    "Be first through the door when the app launches, and first to test it as we build.",
  ],
  [
    "Real influence",
    "Monthly questions on which makers to bring in and which styles to explore. Your input shapes the product.",
  ],
  [
    "Behind the curtain",
    "Updates from Kody and Leah as the catalog grows and the platform takes shape. The real building story.",
  ],
  [
    "Your name at launch",
    "Founding members get credited at launch. Your name on the thing you helped build.",
  ],
  [
    "Always a founder",
    "Your founding-member status never expires. Your early support stays part of Patina’s story.",
  ],
] as const;

export function FoundingInvitation({
  source = "studio_invitation",
}: {
  source?: string;
}) {
  return (
    <section
      className="studio-invitation"
      id="founding-circle"
      aria-labelledby="invitation-title"
    >
      <div className="studio-invitation-intro">
        <p className="studio-kicker">Help us build what comes next.</p>
        <h2 id="invitation-title">
          The Founding
          <br />
          Circle.
        </h2>
        <p>
          We’re building a furniture platform where real designers teach it what
          belongs, real makers craft the pieces, and your room gets the
          attention it deserves.
        </p>
        <JoinCircleButton source={source} className="studio-button-light" />
        <p className="studio-cap">
          Limited to 200 founding members. Open wherever you call home.
        </p>
      </div>
      <div className="studio-member-benefits">
        <h3>More than early access.</h3>
        <dl>
          {foundingBenefits.map(([title, description]) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </div>
      <StudioMotion kind="paper" className="studio-envelope">
        <div className="studio-envelope-back" aria-hidden="true" />
        <article className="studio-letter">
          <div className="studio-letter-top">
            <StrataMark size="compact" align="left" />
            <p>
              Patina / Founding Circle
              <br />
              Madison, Wisconsin
            </p>
          </div>
          <h3>
            A place
            <br />
            at the table.
          </h3>
          <p>
            We’re building the furniture platform we wish existed. A place where
            a designer’s judgment, a maker’s care, and your own point of view
            come together.
          </p>
          <p>
            We’re not ready to launch yet. But we’d love your help getting there
            — choosing what matters, trying what we’re making, and helping it
            become something worth keeping.
          </p>
          <p className="studio-signature">Warmly, Kody &amp; Leah</p>
          <JoinCircleButton source={`${source}_letter`} />
          <p className="studio-letter-note">
            Your welcome begins with a first letter from Kody.
            <br />
            First access when the app launches.
          </p>
        </article>
        <div className="studio-envelope-lip" aria-hidden="true" />
      </StudioMotion>
      <div className="studio-invitation-foot">
        <span>Where Time Adds Value.</span>
        <span>The app and marketplace are pre-launch.</span>
      </div>
    </section>
  );
}
