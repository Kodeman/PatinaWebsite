import { Metadata } from "next";
import { draftMode } from "next/headers";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CatalogContent } from "./CatalogContent";
import { sanityFetch } from "../../../sanity/lib/client";
import { productsQuery } from "../../../sanity/lib/queries";
import type { ProductCard } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Furniture Collection | Patina",
  description:
    "Discover handcrafted furniture from artisans around the world. Each piece tells a story of craftsmanship, materials, and the makers who bring them to life.",
};

export default async function FurniturePage() {
  const { isEnabled: isDraft } = await draftMode();

  const products = await sanityFetch<ProductCard[]>({
    query: productsQuery,
    isDraftMode: isDraft,
  });

  const categories = [
    { value: "all", label: "All" },
    { value: "living-room", label: "Living Room" },
    { value: "dining", label: "Dining" },
    { value: "bedroom", label: "Bedroom" },
    { value: "office", label: "Office" },
  ];

  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-soft-cream)]">
        {/* Page Header */}
        <section className="pt-32 pb-12 bg-[var(--patina-warm-white)]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              Collection
            </p>
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-4">
              Furniture with{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">
                provenance
              </em>
            </h1>
            <p className="text-lg text-[var(--patina-mocha-brown)] max-w-xl">
              Each piece in our collection is handcrafted by artisans who have
              dedicated their lives to their craft. Browse by room or discover
              something unexpected.
            </p>
          </div>
        </section>

        {/* Catalog Content */}
        <CatalogContent products={products || []} categories={categories} />
      </main>

      <Footer />
    </>
  );
}
