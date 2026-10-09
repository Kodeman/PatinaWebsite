import type { MetadataRoute } from "next";
import { SITE_URL as baseUrl } from "@/lib/site-url";
import { sanityFetch } from "../../sanity/lib/client";
import { journalSitemapQuery } from "../../sanity/lib/queries";

interface SanityJournalSitemap {
  slug: string;
  publishedAt?: string;
  _updatedAt?: string;
}

/** The most recent parseable date on a post, or undefined so the entry omits lastmod. */
function lastModifiedDate(post: SanityJournalSitemap): Date | undefined {
  const date = post._updatedAt || post.publishedAt;
  return date && !Number.isNaN(Date.parse(date)) ? new Date(date) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/founding`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/designers`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/makers`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/app`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/journal`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/press`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/makers/apply`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/careers`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  let posts: SanityJournalSitemap[] = [];
  try {
    posts = await sanityFetch<SanityJournalSitemap[]>({
      query: journalSitemapQuery,
      isDraftMode: false,
    }) || [];
  } catch {
    // Keep real public routes available if the publishing service is unavailable.
  }

  const journalRoutes: MetadataRoute.Sitemap = posts.filter((post) => post.slug).map((post) => ({
    url: `${baseUrl}/journal/${post.slug}`, lastModified: lastModifiedDate(post), changeFrequency: "monthly", priority: 0.7,
  }));
  return [...staticRoutes, ...journalRoutes];
}
