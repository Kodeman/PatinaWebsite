import { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch } from "../../../sanity/lib/client";
import { careersPageQuery } from "../../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Patina is a small, early team in Madison, Wisconsin, building designer-led, craft-first furniture discovery. We're not hiring broadly yet — but we'd love to know the people who believe in it.",
};

interface CareersPageData {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroHeadlineEmphasis?: string;
  heroDescription?: string;
  valuesHeader?: string;
  valuesDescription?: string;
  values?: Array<{ title: string; description: string }>;
  positionsHeader?: string;
  positionsDescription?: string;
  openPositions?: Array<{
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
  }>;
  ctaHeader?: string;
  ctaDescription?: string;
  ctaLink?: { label: string; href: string };
}

// No open roles by default. Real openings are added in the CMS as they arise —
// we never list positions we aren't actually hiring for.
const openPositions: NonNullable<CareersPageData["openPositions"]> = [];

const values = [
  {
    title: "Craft Over Speed",
    description:
      "We believe in doing things right, not just fast. Quality work takes time, and we give our team the space to produce their best.",
  },
  {
    title: "Transparency First",
    description:
      "Open communication, honest feedback, and clear expectations. No hidden agendas, no politics—just good work.",
  },
  {
    title: "Sustainable Thinking",
    description:
      "From our products to our practices, we consider the long-term impact. This applies to how we treat our people too.",
  },
  {
    title: "Maker Mindset",
    description:
      "Everyone at Patina is a maker in some way. We value craftsmanship in all its forms—code, design, writing, and beyond.",
  },
];

export default async function CareersPage() {
  const { isEnabled: isDraft } = await draftMode();

  const pageData = await sanityFetch<CareersPageData | null>({
    query: careersPageQuery,
    isDraftMode: isDraft,
  });

  const displayValues = pageData?.values?.length ? pageData.values : values;
  const displayPositions = pageData?.openPositions?.length ? pageData.openPositions : openPositions;

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
              {pageData?.heroEyebrow || "Working at Patina"}
            </p>
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-6">
              {pageData?.heroHeadline || "Build something"}{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">{pageData?.heroHeadlineEmphasis || "lasting"}</em>
            </h1>
            <p className="text-xl text-[var(--patina-mocha-brown)] leading-relaxed max-w-2xl mx-auto">
              {pageData?.heroDescription || "We're a small team in Madison, Wisconsin with a big belief: furniture should be chosen with a designer's eye and built to be handed down. This is where we'll post roles as we grow."}
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-28">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
                {pageData?.valuesHeader || "How we work"}
              </h2>
              <p className="text-lg text-[var(--patina-mocha-brown)] max-w-xl mx-auto">
                {pageData?.valuesDescription || "These aren't just words on a wall—they guide every decision we make."}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayValues.map((value) => (
                <div
                  key={value.title}
                  className="bg-[var(--patina-soft-cream)] p-6 rounded-[var(--radius-lg)]"
                >
                  <h3 className="font-medium text-[var(--patina-charcoal)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[var(--patina-mocha-brown)]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
                {pageData?.positionsHeader || "Open roles"}
              </h2>
              <p className="text-lg text-[var(--patina-mocha-brown)]">
                {pageData?.positionsDescription || "Where we'll post positions as the team grows."}
              </p>
            </div>

            {displayPositions.length > 0 ? (
              <div className="space-y-4">
                {displayPositions.map((position) => (
                  <article
                    key={position.title}
                    className="group bg-[var(--patina-warm-white)] p-6 rounded-[var(--radius-lg)] hover:shadow-[var(--shadow-md)] transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg font-display font-semibold text-[var(--patina-charcoal)]">
                            {position.title}
                          </h3>
                          <span className="px-2 py-0.5 bg-[var(--patina-clay-beige)]/10 text-xs text-[var(--patina-clay-beige)] rounded-full">
                            {position.department}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--patina-mocha-brown)] mb-3">
                          {position.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs text-[var(--patina-clay-beige)]">
                          <span>{position.location}</span>
                          <span>{position.type}</span>
                        </div>
                      </div>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-6 py-2.5 bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] rounded-[var(--radius-md)] text-sm font-medium transition-all hover:bg-[var(--patina-mocha-brown)] whitespace-nowrap"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="max-w-[620px] mx-auto text-center bg-[var(--patina-warm-white)] rounded-[var(--radius-xl)] p-10 lg:p-12">
                <p className="text-lg text-[var(--patina-charcoal)] leading-relaxed mb-4">
                  We&apos;re a two-person team right now, and we&apos;re not actively hiring.
                </p>
                <p className="text-[var(--patina-mocha-brown)] leading-relaxed mb-8">
                  As Patina grows, that will change — and this is where we&apos;ll post first.
                  If you&apos;re a designer, maker, or builder who believes in what we&apos;re
                  building, we&apos;d still love to know you.
                </p>
                <a
                  href="mailto:careers@patina.cloud"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--patina-charcoal)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-charcoal)] hover:text-[var(--patina-off-white)]"
                >
                  Introduce yourself
                </a>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
