import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink } from "@/components/ui/TrackedLink";
import Image from "next/image";
import { draftMode } from "next/headers";
import { StudioPage } from "@/components/studio/StudioPage";
import { StudioMotion } from "@/components/studio/StudioMotion";
import { StrataMark } from "@/components/ui/StrataMark";
import { sanityFetch } from "../../../sanity/lib/client";
import { careersPageQuery } from "../../../sanity/lib/queries";
import styles from "@/components/studio/EditorialPages.module.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Work worth caring about. Help build Patina in Madison, Wisconsin: made for design studios, rooted in design judgment and craft.",
  alternates: { canonical: "https://patina.cloud/careers" },
};

interface CareersPageData {
  openPositions?: Array<{
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
  }>;
}

export default async function CareersPage() {
  const { isEnabled: isDraft } = await draftMode();
  const page = await sanityFetch<CareersPageData | null>({
    query: careersPageQuery,
    isDraftMode: isDraft,
  });
  const positions = page?.openPositions || [];
  return (
    <StudioPage
      className={styles.editorialPage}
      eyebrow="Working at Patina"
      title={
        <>
          Make something
          <br />
          worth keeping.
        </>
      }
      description="We’re building Patina in Madison, Wisconsin, around a belief in design judgment, thoughtful tools, and furniture that earns its place."
      heroAction={
        <a href="#open-roles" className="studio-button">
          See open roles <span aria-hidden="true">↓</span>
        </a>
      }
      heroArt={
        <StudioMotion kind="paper" className={styles.careersHeroArt}>
          <figure className={styles.heroPhotograph}>
            <Image
              src="/images/studio/shared-monitor.jpg"
              alt="Two colleagues sharing a monitor beside a sample wall"
              width={2400}
              height={1600}
              priority
              sizes="(max-width: 760px) 100vw, 52vw"
            />
            <figcaption>
              Illustration.
            </figcaption>
          </figure>
          <div className={styles.careersHeroNote}>
            <StrataMark size="compact" align="left" />
            <p>
              Design.
              <br />
              Technology.
              <br />
              Care.
            </p>
            <span>
              A belief that carries
              <br />
              through every discipline.
            </span>
          </div>
        </StudioMotion>
      }
    >
      <section className={`studio-section ${styles.careersPrinciples}`}>
        <div className="studio-two-column">
          <div>
            <p className="studio-kicker">The work ahead.</p>
            <h2 className={styles.sectionTitle}>
              Care, in
              <br />
              every discipline.
            </h2>
            <p className={styles.lead}>
              The way we build the tools should reflect the care in the things
              they help people discover.
            </p>
          </div>
          <ul className={styles.principles}>
            <li>
              <h3>Respect the judgment.</h3>
              <p>
                Working designers bring knowledge that can’t be reduced to a
                trend. Start by listening.
              </p>
            </li>
            <li>
              <h3>Make room for the process.</h3>
              <p>
                Creative work involves discovery. Build tools that help people
                follow an idea.
              </p>
            </li>
            <li>
              <h3>Tell the truth.</h3>
              <p>
                Be clear about what exists, what we’re building, and what still
                needs work.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section
        id="open-roles"
        className={`studio-section ${styles.rolesSection}`}
      >
        <div className={styles.closing}>
          <div>
            <p className="studio-kicker">Join the work.</p>
            <h2 className={styles.sectionTitle}>Open roles.</h2>
            <p>Published opportunities appear here as the team grows.</p>
          </div>
          {positions.length > 0 ? (
            <ul className={styles.roles}>
              {positions.map((position) => (
                <li key={position.title}>
                  <span className="studio-kicker">{position.department}</span>
                  <h3>{position.title}</h3>
                  <p>{position.description}</p>
                  <p className={styles.caption}>
                    {position.location} / {position.type}
                  </p>
                  <TrackedLink
                    href={`/contact?subject=${encodeURIComponent(position.title)}`}
                    location="careers_open_roles"
                    className="studio-link"
                  >
                    Ask about this role
                  </TrackedLink>
                </li>
              ))}
            </ul>
          ) : (
            <StudioMotion kind="paper">
              <div className={styles.note}>
                <StrataMark size="compact" align="left" />
                <h2>
                  No open roles
                  <br />
                  listed today.
                </h2>
                <p>
                  If you care about what we’re building, we’d still like to know
                  you. Tell us about your work and what draws you to Patina.
                </p>
                <Link href="/contact" className="studio-link">
                  Introduce yourself
                </Link>
              </div>
            </StudioMotion>
          )}
        </div>
        <div className={styles.links}>
          <Link href="/designers" className="studio-link">
            Partner as a designer
          </Link>
          <Link href="/makers" className="studio-link">
            Partner as a maker
          </Link>
          <Link href="/about" className="studio-link">
            Meet the founders
          </Link>
        </div>
      </section>
    </StudioPage>
  );
}
