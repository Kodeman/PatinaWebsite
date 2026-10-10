import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { StudioPage } from "@/components/studio/StudioPage";
import { StudioMotion } from "@/components/studio/StudioMotion";
import { StrataMark } from "@/components/ui/StrataMark";
import styles from "@/components/studio/EditorialPages.module.css";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL as siteUrl } from "@/lib/site-url";
import { sanityFetch } from "../../../../sanity/lib/client";
import {
  journalPostBySlugQuery,
  journalPostsQuery,
} from "../../../../sanity/lib/queries";

interface JournalPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: PortableTextBlock[];
  category: string;
  publishedAt: string;
  author: string;
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

export async function generateStaticParams() {
  const posts =
    (await sanityFetch<{ slug: string }[]>({
      query: journalPostsQuery,
      isDraftMode: false,
    })) || [];

  return posts.filter((post) => post.slug).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();

  const post = await sanityFetch<JournalPost | null>({
    query: journalPostBySlugQuery,
    params: { slug },
    isDraftMode: isDraft,
  });

  if (!post) return { title: "Post Not Found | Patina" };

  return {
    title: `${post.title} — The Designer's Eye`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://patina.cloud/journal/${post.slug}`,
      ...(post.coverImageUrl && { images: [{ url: post.coverImageUrl }] }),
    },
    alternates: {
      canonical: `https://patina.cloud/journal/${post.slug}`,
    },
  };
}

const portableTextComponents = {
  types: {
    image: ({
      value,
    }: {
      value: { asset?: { url: string }; alt?: string; caption?: string };
    }) => (
      <figure className="my-8">
        {value.asset?.url && (
          <Image
            src={value.asset.url}
            alt={value.alt || ""}
            width={680}
            height={400}
            className="rounded-[var(--radius-lg)] w-full"
          />
        )}
        {value.caption && (
          <figcaption className="text-sm text-[var(--patina-mocha-brown)]/60 mt-2 text-center">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display text-2xl text-[var(--patina-charcoal)] mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display text-xl text-[var(--patina-charcoal)] mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-[3px] border-[var(--patina-clay-beige)] pl-5 my-6 italic text-[var(--patina-mocha-brown)]">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[var(--patina-mocha-brown)] leading-relaxed mb-5">
        {children}
      </p>
    ),
  },
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href: string };
      children: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        className="text-[var(--patina-clay-beige)] underline hover:text-[var(--patina-charcoal)] transition-colors"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={
          value?.href?.startsWith("http") ? "noopener noreferrer" : undefined
        }
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-[var(--patina-charcoal)] font-semibold">
        {children}
      </strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
};

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const post = await sanityFetch<JournalPost | null>({
    query: journalPostBySlugQuery,
    params: { slug },
    isDraftMode: isDraft,
  });
  if (!post) notFound();

  const articleUrl = `${siteUrl}/journal/${post.slug}`;
  const articleJsonLd = generateArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    url: articleUrl,
    datePublished: post.publishedAt,
    authorName: post.author,
    imageUrl: post.coverImageUrl,
  });
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteUrl },
    { name: "Journal", url: `${siteUrl}/journal` },
    { name: post.title, url: articleUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <StudioPage
        className={`${styles.editorialPage} ${styles.articlePage}`}
        eyebrow={
          categoryLabels[post.category] || post.category || "The Designer’s Eye"
        }
        title={post.title}
        description={post.excerpt}
        heroAction={
          <a className="studio-link" href="#article-body">
            Read the story <span aria-hidden="true">↓</span>
          </a>
        }
        heroArt={
          post.coverImageUrl ? (
            <StudioMotion kind="image" className={styles.articleHeroArt}>
              <figure>
                <Image
                  src={post.coverImageUrl}
                  alt={post.coverImageAlt || post.title}
                  width={1536}
                  height={1024}
                  priority
                  sizes="(max-width: 760px) 100vw, 52vw"
                />
                <figcaption>Published in The Designer’s Eye.</figcaption>
              </figure>
            </StudioMotion>
          ) : undefined
        }
      >
        <section className="studio-section">
          <div className={styles.articleLayout}>
            <aside className={styles.articleRail}>
              <StrataMark size="compact" align="left" />
              <p>The Designer’s Eye</p>
              <div>
                <span>Words by</span>
                <strong>{post.author}</strong>
              </div>
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              )}
              <Link href="/journal" className="studio-link">
                All journal entries
              </Link>
            </aside>
            <article id="article-body" className={styles.articleBody}>
              {post.body && (
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              )}
              <div className={styles.articleEnd}>
                <StrataMark size="compact" align="left" />
              </div>
            </article>
          </div>
          <div className={styles.newsletter}>
            <div>
              <StrataMark size="compact" align="left" />
              <h2>
                The conversation
                <br />
                continues.
              </h2>
              <p>
                Subscribe to The Designer’s Eye for future notes from Patina.
              </p>
            </div>
            <NewsletterSignup
              variant="inline"
              source="journal-post"
              showIntro={false}
            />
          </div>
          <div className={styles.links}>
            <Link href="/journal" className="studio-link">
              Back to The Designer’s Eye
            </Link>
            <Link href="/founding" className="studio-link">
              Explore the Founding Circle
            </Link>
          </div>
        </section>
      </StudioPage>
    </>
  );
}
