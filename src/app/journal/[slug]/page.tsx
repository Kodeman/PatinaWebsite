import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL as siteUrl } from "@/lib/site-url";
import { sanityFetch } from "../../../../sanity/lib/client";
import { journalPostBySlugQuery, journalPostsQuery } from "../../../../sanity/lib/queries";

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
  const posts = await sanityFetch<{ slug: string }[]>({
    query: journalPostsQuery,
    isDraftMode: false,
  }) || [];

  return posts
    .filter((post) => post.slug)
    .map((post) => ({ slug: post.slug }));
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
    title: `${post.title} — The Designer's Eye | Patina`,
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
    image: ({ value }: { value: { asset?: { url: string }; alt?: string; caption?: string } }) => (
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
    link: ({ value, children }: { value?: { href: string }; children: React.ReactNode }) => (
      <a
        href={value?.href}
        className="text-[var(--patina-clay-beige)] underline hover:text-[var(--patina-charcoal)] transition-colors"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        <article className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="max-w-[680px] mx-auto px-4 sm:px-6">
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--patina-clay-beige)]">
                  {categoryLabels[post.category] || post.category}
                </span>
              </div>
              <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-normal text-[var(--patina-charcoal)] mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 font-mono text-sm text-[var(--patina-mocha-brown)]/60">
                <span>{post.author}</span>
                <span>·</span>
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
            </header>

            {/* Cover Image */}
            {post.coverImageUrl && (
              <div className="relative aspect-[16/9] rounded-[var(--radius-xl)] overflow-hidden mb-10">
                <Image
                  src={post.coverImageUrl}
                  alt={post.coverImageAlt || post.title}
                  fill
                  className="object-cover"
                  sizes="680px"
                  priority
                />
              </div>
            )}

            {/* Body */}
            {post.body && (
              <div className="prose-patina">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </div>
            )}

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-[var(--patina-clay-beige)]/15">
              <div className="bg-[var(--patina-soft-cream)] rounded-[var(--radius-xl)] p-8 mb-8">
                <NewsletterSignup variant="inline" source="journal-post" />
              </div>
              <Link
                href="/journal"
                className="inline-flex items-center gap-2 text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] transition-colors font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                Back to Journal
              </Link>
            </footer>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
