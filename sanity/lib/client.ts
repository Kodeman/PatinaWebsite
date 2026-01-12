import { createClient, type QueryParams } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Production client (uses CDN)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

// Preview client (bypasses CDN, includes drafts)
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "previewDrafts",
  token: process.env.SANITY_API_READ_TOKEN,
});

// Image URL builder
const builder = createImageUrlBuilder(client);

type SanityImageSource = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

export function urlFor(source: SanityImageSource | Record<string, unknown>) {
  return builder.image(source);
}

// Typed fetch helper with caching support
interface SanityFetchOptions {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  isDraftMode?: boolean;
}

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 3600, // Default 1 hour
  isDraftMode = false,
}: SanityFetchOptions): Promise<T> {
  const selectedClient = isDraftMode ? previewClient : client;

  return selectedClient.fetch<T>(query, params, {
    next: {
      revalidate: isDraftMode ? 0 : revalidate,
    },
  });
}
