import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { draftMode } from "next/headers";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch } from "../../../sanity/lib/client";
import { makersQuery } from "../../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "Our Makers | Patina",
  description:
    "Meet the artisan workshops and craftspeople behind Patina furniture. Each maker brings generations of tradition and a commitment to quality.",
};

interface Maker {
  _id: string;
  name: string;
  slug: string;
  location: string;
  foundedYear: number;
  yearsOfCraft: number;
  badges: string[];
  quote?: string;
  imageUrl?: string;
}

export default async function MakersPage() {
  const { isEnabled: isDraft } = await draftMode();

  const makers = await sanityFetch<Maker[]>({
    query: makersQuery,
    isDraftMode: isDraft,
  }) || [];
  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pb-28 bg-[var(--patina-soft-cream)] overflow-hidden">
          <div
            className="absolute -bottom-20 -right-20 w-[400px] h-[300px] bg-[var(--patina-clay-beige)] opacity-[0.04] pointer-events-none"
            style={{
              borderRadius: "60% 40% 50% 50% / 50% 50% 40% 60%",
              transform: "rotate(15deg)",
            }}
          />

          <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              The Artisans
            </p>
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-6">
              Meet our{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">makers</em>
            </h1>
            <p className="text-xl text-[var(--patina-mocha-brown)] leading-relaxed max-w-2xl mx-auto">
              Behind every piece of Patina furniture is a workshop with history,
              a craftsperson with mastery, and a tradition worth preserving.
            </p>
          </div>
        </section>

        {/* Makers Grid */}
        <section className="py-20 lg:py-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {makers.map((maker) => (
                <article
                  key={maker._id}
                  className="group bg-[var(--patina-soft-cream)] rounded-[var(--radius-xl)] overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-lg)]"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/2] overflow-hidden bg-[var(--patina-clay-beige)]/10">
                    {maker.imageUrl ? (
                      <Image
                        src={maker.imageUrl}
                        alt={`${maker.name} workshop`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-[var(--patina-clay-beige)] text-sm">No image</span>
                      </div>
                    )}
                    {/* Badge */}
                    {maker.badges?.[0] && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <span className="text-xs font-medium text-[var(--patina-charcoal)]">
                          {maker.badges[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold text-[var(--patina-charcoal)] mb-1">
                      {maker.name}
                    </h3>
                    <p className="text-sm text-[var(--patina-clay-beige)] mb-3">
                      {maker.location} · Est. {maker.foundedYear}
                    </p>
                    {maker.quote && (
                      <p className="text-sm text-[var(--patina-mocha-brown)] mb-4 italic">
                        &ldquo;{maker.quote}&rdquo;
                      </p>
                    )}
                    {maker.yearsOfCraft && (
                      <p className="text-xs uppercase tracking-wider text-[var(--patina-clay-beige)]">
                        {maker.yearsOfCraft} years of craft
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Become a Maker CTA */}
        <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-4">
              Are you a{" "}
              <em className="italic text-[var(--patina-clay-beige)]">maker</em>?
            </h2>
            <p className="text-lg text-[rgba(237,233,228,0.75)] mb-10">
              We&apos;re always looking for exceptional craftspeople to join our
              network. If you share our values of quality, transparency, and
              sustainability, we&apos;d love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-off-white)] shadow-lg"
              >
                Apply to Join
              </Link>
              <Link
                href="/furniture"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--patina-clay-beige)] text-[var(--patina-off-white)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[rgba(163,146,124,0.1)]"
              >
                See Their Work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
