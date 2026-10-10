import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { draftMode } from "next/headers";
import { StudioPage } from "@/components/studio/StudioPage";
import { StudioMotion } from "@/components/studio/StudioMotion";
import { StrataMark } from "@/components/ui/StrataMark";
import styles from "@/components/studio/EditorialPages.module.css";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { sanityFetch } from "../../../sanity/lib/client";
import { journalPostsQuery } from "../../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "The Designer's Eye — Journal",
  description:
    "Notes on design, craft, and building something new. From Leah's desk at Middle West Studio.",
  openGraph: {
    title: "The Designer's Eye — Patina Journal",
    description:
      "Product discoveries, sourcing stories, and honest updates on building Patina.",
    url: "https://patina.cloud/journal",
  },
  alternates: {
    canonical: "https://patina.cloud/journal",
  },
};

interface JournalPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  author: string;
  featured: boolean;
  coverImageUrl?: string;
  coverImageAlt?: string;
}

const categoryLabels: Record<string, string> = {
  "building-patina": "Building Patina",
  "design-thinking": "Design Thinking",
  "maker-stories": "Maker Stories",
  "material-deep-dives": "Materials",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function JournalPage() {
  const { isEnabled: isDraft } = await draftMode();
  const posts = (
    (await sanityFetch<JournalPost[]>({
      query: journalPostsQuery,
      isDraftMode: isDraft,
    })) || []
  ).filter((post) => post.slug && post.title);

  return (
    <StudioPage
      className={styles.editorialPage}
      eyebrow="The Designer’s Eye"
      title={
        <>
          Notes from
          <br />a work in progress.
        </>
      }
      description="Design thinking, material discoveries, and honest notes on building Patina. From Leah’s desk and the work we’re doing together."
      heroAction={
        <a
          href={posts.length ? "#journal-entries" : "#journal-letter"}
          className="studio-button"
        >
          {posts.length ? "Read the journal" : "Subscribe to the letters"}{" "}
          <span aria-hidden="true">↓</span>
        </a>
      }
      heroArt={
        <StudioMotion kind="paper" className={styles.journalHeroArt}>
          <div className={styles.journalFolio}>
            <div className={styles.folioTop}>
              <StrataMark size="compact" align="left" />
              <span>Patina / A studio journal</span>
            </div>
            <p className={styles.folioTitle}>
              The
              <br />
              Designer’s
              <br />
              Eye.
            </p>
            <div className={styles.folioImage}>
              <Image
                src="/images/founders/hiawatha-room.jpg"
                alt="A living room at Hiawatha"
                width={1024}
                height={683}
                priority
                sizes="(max-width: 760px) 80vw, 40vw"
              />
            </div>
            <p className={styles.folioFoot}>
              Rooms. Materials. The making of Patina.
            </p>
          </div>
          <p className={styles.heroCaption}>
            Interior design: Leah Kochaver, Middle West Studio. Photography: Ashley Hicks.
          </p>
        </StudioMotion>
      }
    >
      <section
        id="journal-entries"
        className={`studio-section ${styles.journalSection}`}
        aria-label="Journal"
      >
        <div className={styles.sectionMasthead}>
          <span>
            {posts.length
              ? "From the journal"
              : "The first chapter is taking shape"}
          </span>
          <span>By the people building Patina</span>
        </div>
        {posts.length > 0 ? (
          <div className={styles.postList}>
            {posts.map((post, index) => (
              <Link
                key={post._id}
                href={`/journal/${post.slug}`}
                className={styles.postLink}
                data-featured={index === 0}
              >
                {post.coverImageUrl ? (
                  <StudioMotion kind="image">
                    <div className={styles.postImage}>
                      <Image
                        src={post.coverImageUrl}
                        alt={post.coverImageAlt || post.title}
                        fill
                        sizes="(max-width: 760px) 100vw, 50vw"
                      />
                    </div>
                  </StudioMotion>
                ) : (
                  <div className={styles.blankPage} aria-hidden="true">
                    <div>
                      <StrataMark size="compact" align="left" />
                      <p>The Designer’s Eye</p>
                      <span>Notes from Patina</span>
                    </div>
                  </div>
                )}
                <article>
                  <div className={styles.postMeta}>
                    <span>
                      {categoryLabels[post.category] || post.category}
                    </span>
                    {post.publishedAt && (
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                    )}
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <span className={styles.postRead}>Read the story</span>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyJournal}>
            <StudioMotion kind="paper">
              <div className={styles.blankPage} aria-hidden="true">
                <div>
                  <StrataMark size="compact" align="left" />
                  <p>
                    The first
                    <br />
                    page.
                  </p>
                  <span>Leah &amp; Kody / Patina</span>
                </div>
              </div>
            </StudioMotion>
            <div className="studio-copy">
              <p className="studio-kicker">We’re putting pen to paper.</p>
              <h2 className={styles.sectionTitle}>
                Every decision
                <br />
                has a story.
              </h2>
              <p>
                There are no published journal entries yet. We’re preparing
                notes on the design decisions, material questions, and people
                shaping Patina.
              </p>
              <p>
                Subscribe to The Designer’s Eye for future notes, or spend a
                little time with{" "}
                <Link href="/about" className="studio-link">
                  our story
                </Link>
                .
              </p>
            </div>
          </div>
        )}
        <div id="journal-letter" className={styles.newsletter}>
          <div>
            <StrataMark size="compact" align="left" />
            <h2>
              A letter worth
              <br />
              making time for.
            </h2>
            <p>
              The Designer’s Eye brings notes on design, materials, and building
              Patina to your inbox.
            </p>
          </div>
          <NewsletterSignup
            variant="inline"
            source="journal"
            showIntro={false}
          />
        </div>
      </section>
    </StudioPage>
  );
}
