import type { MetadataRoute } from "next";
import { SITE_URL as baseUrl } from "@/lib/site-url";
import { sanityFetch } from "../../sanity/lib/client";
import {
  journalSitemapQuery,
  productSitemapQuery,
} from "../../sanity/lib/queries";

// Fallback product slugs for when Sanity is empty / unreachable.
// Once Sanity is the source of truth, the dynamic feed below takes over.
const fallbackProductSlugs = [
  "noma-dining-chair",
  "atelier-coffee-table",
  "kyoto-platform-bed",
  "archipelago-bookshelf",
  "haven-lounge-chair",
  "fjord-sideboard",
];

interface SanityProductSitemap {
  slug: string;
  _updatedAt: string;
}

interface SanityJournalSitemap {
  slug: string;
  publishedAt: string;
  _updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static routes — lastmod uses build time. For pages that change rarely
  // (privacy, terms) the changeFrequency hint is what matters more to crawlers.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/furniture`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/designers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/app`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/founding`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/signup`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/makers/apply`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/materials`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Sanity content — fall back to hard-coded slugs if the fetch fails so the
  // sitemap is never empty during build.
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products =
      (await sanityFetch<SanityProductSitemap[]>({
        query: productSitemapQuery,
        isDraftMode: false,
      })) || [];

    productRoutes =
      products.length > 0
        ? products.map((p) => ({
            url: `${baseUrl}/furniture/${p.slug}`,
            lastModified: new Date(p._updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          }))
        : fallbackProductSlugs.map((slug) => ({
            url: `${baseUrl}/furniture/${slug}`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.7,
          }));
  } catch {
    productRoutes = fallbackProductSlugs.map((slug) => ({
      url: `${baseUrl}/furniture/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  }

  let journalRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts =
      (await sanityFetch<SanityJournalSitemap[]>({
        query: journalSitemapQuery,
        isDraftMode: false,
      })) || [];

    journalRoutes = posts.map((post) => ({
      url: `${baseUrl}/journal/${post.slug}`,
      lastModified: new Date(post._updatedAt || post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Journal is new — empty fallback is fine.
    journalRoutes = [];
  }

  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}
