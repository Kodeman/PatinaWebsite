import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { draftMode } from "next/headers";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch } from "../../../sanity/lib/client";
import { materialsFullQuery } from "../../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "Materials | Patina",
  description:
    "Discover the premium materials behind Patina furniture. From sustainably sourced hardwoods to hand-selected leathers, learn about our commitment to quality.",
};

interface Material {
  _id: string;
  name: string;
  slug?: string;
  category?: string;
  origin: string;
  colorHex: string;
  description?: string;
  properties?: string[];
  sustainability?: string;
  imageUrl?: string;
}

const sustainabilityStats = [
  { value: "100%", label: "FSC Certified Wood" },
  { value: "0", label: "Chrome in Leather" },
  { value: "85%", label: "Recyclable Materials" },
  { value: "Local", label: "Sourcing Priority" },
];

export default async function MaterialsPage() {
  const { isEnabled: isDraft } = await draftMode();

  const materials = await sanityFetch<Material[]>({
    query: materialsFullQuery,
    isDraftMode: isDraft,
  }) || [];
  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pb-28 bg-[var(--patina-soft-cream)] overflow-hidden">
          <div
            className="absolute -bottom-20 -left-20 w-[400px] h-[300px] bg-[var(--patina-clay-beige)] opacity-[0.04] pointer-events-none"
            style={{
              borderRadius: "60% 40% 50% 50% / 50% 50% 40% 60%",
              transform: "rotate(-15deg)",
            }}
          />

          <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              Honest Materials
            </p>
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-6">
              Where{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">quality</em> begins
            </h1>
            <p className="text-xl text-[var(--patina-mocha-brown)] leading-relaxed max-w-2xl mx-auto">
              Every material we use is chosen for its beauty, durability, and story.
              We believe that great furniture starts with honest materials—sourced
              responsibly and crafted with care.
            </p>
          </div>
        </section>

        {/* Sustainability Stats */}
        <section className="py-12 bg-[var(--patina-charcoal)]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {sustainabilityStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl lg:text-4xl font-display font-semibold text-[var(--patina-off-white)] mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[rgba(237,233,228,0.7)] uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials Grid */}
        <section className="py-20 lg:py-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {materials.map((material) => (
                <article
                  key={material._id}
                  className="group bg-[var(--patina-soft-cream)] rounded-[var(--radius-xl)] overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/2] overflow-hidden bg-[var(--patina-clay-beige)]/10">
                    {material.imageUrl ? (
                      <Image
                        src={material.imageUrl}
                        alt={material.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-[var(--patina-clay-beige)] text-sm">No image</span>
                      </div>
                    )}
                    {/* Category Badge */}
                    {material.category && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <span className="text-xs font-medium text-[var(--patina-charcoal)]">
                          {material.category}
                        </span>
                      </div>
                    )}
                    {/* Color Swatch */}
                    {material.colorHex && (
                      <div
                        className="absolute bottom-4 right-4 w-8 h-8 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: material.colorHex }}
                        title={`${material.name} color sample`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-display font-semibold text-[var(--patina-charcoal)]">
                          {material.name}
                        </h3>
                        <p className="text-sm text-[var(--patina-clay-beige)]">
                          Origin: {material.origin}
                        </p>
                      </div>
                    </div>
                    {material.description && (
                      <p className="text-[var(--patina-mocha-brown)] mb-4 leading-relaxed">
                        {material.description}
                      </p>
                    )}
                    {material.properties && material.properties.length > 0 && (
                    <ul className="space-y-2">
                      {material.properties.map((property) => (
                        <li
                          key={property}
                          className="flex items-center gap-2 text-sm text-[var(--patina-mocha-brown)]"
                        >
                          <svg
                            className="w-4 h-4 text-[var(--patina-clay-beige)] flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                          {property}
                        </li>
                      ))}
                    </ul>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sourcing Philosophy */}
        <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-6">
              Our sourcing philosophy
            </h2>
            <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed mb-8">
              We visit every workshop and mill we work with. We meet the people,
              understand their practices, and ensure our standards are met. This
              isn&apos;t just due diligence—it&apos;s building relationships that result in
              better furniture.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-[var(--radius-lg)]">
                <h3 className="font-medium text-[var(--patina-charcoal)] mb-2">
                  Traceability
                </h3>
                <p className="text-sm text-[var(--patina-mocha-brown)]">
                  Every piece of wood can be traced back to its forest of origin.
                </p>
              </div>
              <div className="bg-white p-6 rounded-[var(--radius-lg)]">
                <h3 className="font-medium text-[var(--patina-charcoal)] mb-2">
                  Longevity
                </h3>
                <p className="text-sm text-[var(--patina-mocha-brown)]">
                  We choose materials that improve with age, not disposable alternatives.
                </p>
              </div>
              <div className="bg-white p-6 rounded-[var(--radius-lg)]">
                <h3 className="font-medium text-[var(--patina-charcoal)] mb-2">
                  Transparency
                </h3>
                <p className="text-sm text-[var(--patina-mocha-brown)]">
                  Full disclosure on every material&apos;s origin, treatment, and impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28">
          <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
              See materials in action
            </h2>
            <p className="text-[var(--patina-mocha-brown)] mb-8">
              Browse our collection to see how these materials come together in
              finished pieces.
            </p>
            <Link
              href="/furniture"
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-mocha-brown)] shadow-lg"
            >
              Explore the Collection
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
