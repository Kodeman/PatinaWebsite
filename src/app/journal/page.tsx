import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { draftMode } from "next/headers";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { sanityFetch } from "../../../sanity/lib/client";
import { journalPostsQuery } from "../../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "The Designer's Eye — Journal | Patina",
  description:
    "Notes on design, craft, and building something new. From Leah's desk at Middlewest Studio.",
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

  const posts = await sanityFetch<JournalPost[]>({
    query: journalPostsQuery,
    isDraftMode: isDraft,
  }) || [];

  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Hero */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              The Designer&apos;s Eye
            </p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] font-normal text-[var(--patina-charcoal)] mb-4 leading-tight">
              Notes on design, craft, and building something new.
            </h1>
            <p className="text-lg text-[var(--patina-mocha-brown)] max-w-[600px] mx-auto">
              From Leah&apos;s desk at Middlewest Studio — product discoveries,
              sourcing stories, and honest updates on building Patina.
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="pb-20 lg:pb-28">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/journal/${post.slug}`}
                    className="group block"
                  >
                    <article className="bg-white rounded-[var(--radius-xl)] overflow-hidden border border-[var(--patina-clay-beige)]/10 transition-all duration-400 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] h-full">
                      {post.coverImageUrl && (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={post.coverImageUrl}
                            alt={post.coverImageAlt || post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-xs uppercase tracking-wider text-[var(--patina-clay-beige)]">
                            {categoryLabels[post.category] || post.category}
                          </span>
                          <span className="text-[var(--patina-clay-beige)]/30">
                            ·
                          </span>
                          <span className="font-mono text-xs text-[var(--patina-mocha-brown)]/60">
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>
                        <h2 className="font-display text-xl text-[var(--patina-charcoal)] mb-2 group-hover:text-[var(--patina-mocha-brown)] transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-sm text-[var(--patina-mocha-brown)] leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="font-display text-xl text-[var(--patina-charcoal)] mb-3">
                  The first posts are coming soon.
                </p>
                <p className="text-[var(--patina-mocha-brown)] mb-8 max-w-md mx-auto">
                  We&apos;re writing about the decisions behind building
                  Patina — from choosing our first makers to how designer-taught
                  AI actually works. Subscribe to get notified.
                </p>
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="mt-16 bg-[var(--patina-soft-cream)] rounded-[var(--radius-xl)] p-8">
              <NewsletterSignup variant="inline" source="journal" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
