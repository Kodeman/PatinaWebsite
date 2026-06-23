import { Metadata } from "next";
import { draftMode } from "next/headers";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { generateServiceJsonLd } from "@/lib/seo";
import { sanityFetch } from "../../../sanity/lib/client";
import { servicesPageQuery } from "../../../sanity/lib/queries";
import { ServicesCTA } from "./ServicesCTA";

export const metadata: Metadata = {
  title: "Design Services | Patina",
  description:
    "Patina matches you with an independent designer who already knows your space. The app captures your style, rooms, and saves — so your designer arrives with a running start.",
};

interface SectionHeader {
  eyebrow?: string;
  headline?: string;
  headlineEmphasis?: string;
  subheadline?: string;
}

interface CTALink {
  label?: string;
  href?: string;
  variant?: string;
  isExternal?: boolean;
}

interface ServicesPageData {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroHeadlineEmphasis?: string;
  heroDescription?: string;
  heroCta?: CTALink;
  briefingHeader?: SectionHeader;
  briefingIntro?: string;
  briefingItems?: Array<{ icon: string; label: string; description: string }>;
  briefingQuote?: string;
  briefingQuoteAttribution?: string;
  processHeader?: SectionHeader;
  processSteps?: Array<{ number: string; title: string; description: string }>;
  matchingHeader?: SectionHeader;
  matchingBody?: string;
  matchExampleInitials?: string;
  matchExampleName?: string;
  matchExampleFirm?: string;
  matchExampleScore?: string;
  matchExampleCriteria?: string;
  expectationsHeader?: SectionHeader;
  expectationsIntro?: string;
  scopingExamples?: Array<{ title: string; description: string }>;
  expectationsClosing?: string;
  ctaHeadline?: string;
  ctaHeadlineEmphasis?: string;
  ctaDescription?: string;
  ctaPrimary?: CTALink;
  ctaSecondary?: CTALink;
}

const defaultBriefingItems = [
  {
    icon: "◎",
    label: "Style Profile",
    description:
      "Your taste, decoded. Built from the style quiz, your saves, your skips, and the patterns between them.",
  },
  {
    icon: "⊞",
    label: "Room Scans",
    description:
      "Precise 3D models of your rooms with measurements, existing furniture, and architectural features.",
  },
  {
    icon: "♡",
    label: "Saved Pieces",
    description:
      "Every product you've saved, tried in AR, or lingered on — organized by room and category.",
  },
  {
    icon: "$",
    label: "Budget & Timeline",
    description:
      "Your investment range and when you'd like to start, so proposals are grounded from day one.",
  },
];

const defaultProcessSteps = [
  {
    number: "01",
    title: "Use the App",
    description:
      "Take the style quiz. Scan your rooms. Save pieces you love. The more you explore, the sharper your briefing package becomes.",
  },
  {
    number: "02",
    title: "Get Matched",
    description:
      "Patina pairs you with a designer whose aesthetic, expertise, and working style align with yours. Not random — intentional.",
  },
  {
    number: "03",
    title: "Meet & Consult",
    description:
      "Your designer already has your briefing package. The first conversation is about vision and priorities — not measurements and logistics.",
  },
  {
    number: "04",
    title: "Receive a Proposal",
    description:
      "A custom proposal scoped to your rooms, your budget, and your goals. Not a template — a plan built for you by someone who understands your style.",
  },
];

const defaultScopingExamples = [
  {
    title: "A Single Room",
    description:
      "Focused guidance for one space — a living room that needs direction, a bedroom that's never felt finished, a home office that actually works.",
  },
  {
    title: "A Connected Floor",
    description:
      "When your living room, dining area, and kitchen need to feel like one cohesive story. Your designer coordinates flow, palette, and proportion across the whole space.",
  },
  {
    title: "A Whole Home",
    description:
      "Comprehensive design across multiple rooms. Your designer builds a vision for how every space relates — from the entryway that sets the tone to the bedroom that closes the day.",
  },
];

export default async function ServicesPage() {
  const { isEnabled: isDraft } = await draftMode();

  const pageData = await sanityFetch<ServicesPageData | null>({
    query: servicesPageQuery,
    isDraftMode: isDraft,
  });

  const briefingItems = pageData?.briefingItems?.length
    ? pageData.briefingItems
    : defaultBriefingItems;
  const processSteps = pageData?.processSteps?.length
    ? pageData.processSteps
    : defaultProcessSteps;
  const scopingExamples = pageData?.scopingExamples?.length
    ? pageData.scopingExamples
    : defaultScopingExamples;

  const heroHeadline = pageData?.heroHeadline || "Your designer already knows your";
  const heroHeadlineEmphasis = pageData?.heroHeadlineEmphasis || "space";
  const heroDescription =
    pageData?.heroDescription ||
    "Patina connects you with independent designers and design firms who share your aesthetic — and starts them off with everything they need to craft a proposal that actually fits your life. No packages. No guesswork. Just the right designer with the right head start.";

  const briefingEyebrow = pageData?.briefingHeader?.eyebrow || "The Patina Advantage";
  const briefingHeadline =
    pageData?.briefingHeader?.headline || "What your designer receives before";
  const briefingEmphasis =
    pageData?.briefingHeader?.headlineEmphasis || "saying hello";
  const briefingIntro =
    pageData?.briefingIntro ||
    "Most design relationships start with a blank page. Yours starts with a briefing package — assembled by you, just by using the app.";
  const briefingQuote =
    pageData?.briefingQuote ||
    "The first meeting used to be 90 minutes of getting-to-know-you. Now I walk in with a running start.";
  const briefingQuoteAttribution =
    pageData?.briefingQuoteAttribution || "— Patina Designer";

  const processEyebrow = pageData?.processHeader?.eyebrow || "How It Works";
  const processHeadline =
    pageData?.processHeader?.headline || "Four steps from app to";
  const processEmphasis =
    pageData?.processHeader?.headlineEmphasis || "custom proposal";

  const matchingEyebrow = pageData?.matchingHeader?.eyebrow || "Designer Matching";
  const matchingHeadline =
    pageData?.matchingHeader?.headline || "The right designer, not the";
  const matchingEmphasis =
    pageData?.matchingHeader?.headlineEmphasis || "next available";
  const matchingBody =
    pageData?.matchingBody ||
    "Patina's matching considers your style profile, project scope, budget range, location, and personality — then pairs you with a designer who's genuinely the right fit. These are independent professionals running their own firms, not interchangeable names on a roster.";

  const matchInitials = pageData?.matchExampleInitials || "LK";
  const matchName = pageData?.matchExampleName || "Leah Kirkland";
  const matchFirm = pageData?.matchExampleFirm || "Middlewest Studio · Madison, WI";
  const matchScore = pageData?.matchExampleScore || "94%";
  const matchCriteria =
    pageData?.matchExampleCriteria ||
    "Matched on: warm modern aesthetic, Midwestern craft values, residential focus, experience with open floor plans.";

  const expectationsEyebrow = pageData?.expectationsHeader?.eyebrow || "What to Expect";
  const expectationsHeadline =
    pageData?.expectationsHeader?.headline || "Every project is";
  const expectationsEmphasis =
    pageData?.expectationsHeader?.headlineEmphasis || "different";
  const expectationsIntro =
    pageData?.expectationsIntro ||
    "We don't offer fixed packages because no two homes — or homeowners — are the same. Your designer will craft a proposal around your specific needs. Here's what that typically looks like.";
  const expectationsClosing =
    pageData?.expectationsClosing ||
    "Scope, timeline, investment, and deliverables are all defined in your custom proposal. No surprises. No fine print.";

  const ctaHeadline = pageData?.ctaHeadline || "Ready to meet";
  const ctaHeadlineEmphasis = pageData?.ctaHeadlineEmphasis || "your designer?";
  const ctaDescription =
    pageData?.ctaDescription ||
    "Start with the app. Build your style profile. Scan the rooms that matter most. When you're ready, we'll introduce you to a designer who gets it.";

  const heroCtaLabel = pageData?.heroCta?.label || "Find Your Designer";
  const heroCtaHref = pageData?.heroCta?.href || "/app";
  const ctaPrimaryLabel = pageData?.ctaPrimary?.label || "Download the App";
  const ctaPrimaryHref = pageData?.ctaPrimary?.href || "/app";
  const ctaSecondaryLabel =
    pageData?.ctaSecondary?.label || "Already Have a Profile? Connect Now";
  const ctaSecondaryHref = pageData?.ctaSecondary?.href || "/app";

  const serviceJsonLd = generateServiceJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Section 01 · Hero */}
        <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[var(--patina-warm-white)]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-label text-[var(--patina-clay-beige)] mb-4">
              {pageData?.heroEyebrow || "Design Services"}
            </p>
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-8 max-w-3xl mx-auto">
              {heroHeadline}{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">
                {heroHeadlineEmphasis}
              </em>
            </h1>
            <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed max-w-2xl mx-auto mb-10">
              {heroDescription}
            </p>
            <ServicesCTA
              href={heroCtaHref}
              label={heroCtaLabel}
              location="services_hero"
              variant="primary-dark"
            />
          </div>
        </section>

        {/* Section 02 · Briefing Package */}
        <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span
                className="inline-block text-[10px] font-mono uppercase tracking-[0.08em] text-white px-2 py-[2px] rounded-sm mb-4"
                style={{ backgroundColor: "var(--patina-success)" }}
              >
                New
              </span>
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                {briefingEyebrow}
              </p>
              <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-5 max-w-2xl mx-auto">
                {briefingHeadline}{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">
                  {briefingEmphasis}
                </em>
              </h2>
              <p className="text-base text-[var(--patina-mocha-brown)] leading-relaxed max-w-[540px] mx-auto">
                {briefingIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {briefingItems.map((item) => (
                <div
                  key={item.label}
                  className="bg-[var(--patina-warm-white)] border border-[rgba(163,146,124,0.15)] rounded-[var(--radius-sm)] p-6 text-center"
                >
                  <div
                    className="text-2xl mb-3 text-[var(--patina-clay-beige)]"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-[var(--patina-clay-beige)] mb-2">
                    {item.label}
                  </div>
                  <p className="text-sm text-[var(--patina-mocha-brown)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-14 max-w-[480px] mx-auto">
              <p className="text-base italic text-[var(--patina-mocha-brown)] leading-relaxed">
                &ldquo;{briefingQuote}&rdquo;
              </p>
              <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-[var(--patina-clay-beige)] mt-3">
                {briefingQuoteAttribution}
              </p>
            </div>
          </div>
        </section>

        {/* Section 03 · How It Works */}
        <section className="py-20 lg:py-28 bg-[var(--patina-warm-white)]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                {processEyebrow}
              </p>
              <h2 className="text-heading-1 text-[var(--patina-charcoal)] max-w-2xl mx-auto">
                {processHeadline}{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">
                  {processEmphasis}
                </em>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative">
              {processSteps.map((step, index) => (
                <div key={step.number} className="relative text-center">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-[calc(50%+32px)] right-[-50%] h-px bg-[var(--patina-clay-beige)] opacity-25" />
                  )}
                  <div className="font-display text-[40px] font-light leading-none text-[var(--patina-clay-beige)] opacity-40 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-heading-3 text-[var(--patina-charcoal)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--patina-mocha-brown)] leading-relaxed max-w-[260px] mx-auto">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 04 · Designer Matching */}
        <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span
                className="inline-block text-[10px] font-mono uppercase tracking-[0.08em] text-white px-2 py-[2px] rounded-sm mb-4"
                style={{ backgroundColor: "var(--patina-success)" }}
              >
                New
              </span>
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                {matchingEyebrow}
              </p>
              <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-6 max-w-xl">
                {matchingHeadline}{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">
                  {matchingEmphasis}
                </em>
              </h2>
              <p className="text-base text-[var(--patina-mocha-brown)] leading-relaxed max-w-2xl">
                {matchingBody}
              </p>
            </div>

            <div className="bg-[var(--patina-warm-white)] border border-[rgba(163,146,124,0.15)] rounded-[var(--radius-sm)] p-8 grid grid-cols-[auto_1fr_auto] gap-6 items-center max-w-[560px]">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-display text-lg"
                style={{
                  background:
                    "linear-gradient(135deg, var(--patina-clay-beige), var(--patina-mocha-brown))",
                }}
                aria-hidden="true"
              >
                {matchInitials}
              </div>
              <div className="min-w-0">
                <div className="font-display text-lg text-[var(--patina-charcoal)] truncate">
                  {matchName}
                </div>
                <div className="text-sm text-[var(--patina-mocha-brown)] font-light truncate">
                  {matchFirm}
                </div>
              </div>
              <div className="text-center">
                <div
                  className="font-display text-3xl font-medium"
                  style={{ color: "var(--patina-success)" }}
                >
                  {matchScore}
                </div>
                <div className="text-[9px] font-mono uppercase tracking-[0.08em] text-[var(--patina-clay-beige)]">
                  Style Match
                </div>
              </div>
            </div>

            <p className="text-sm text-[var(--patina-mocha-brown)] leading-relaxed mt-5 max-w-[560px]">
              {matchCriteria}
            </p>
          </div>
        </section>

        {/* Section 05 · What to Expect */}
        <section className="py-20 lg:py-28 bg-[var(--patina-warm-white)]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                {expectationsEyebrow}
              </p>
              <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-5">
                {expectationsHeadline}{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">
                  {expectationsEmphasis}
                </em>
              </h2>
              <p className="text-base text-[var(--patina-mocha-brown)] leading-relaxed max-w-[540px] mx-auto">
                {expectationsIntro}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {scopingExamples.map((example) => (
                <div key={example.title}>
                  <h3 className="font-display text-xl font-medium text-[var(--patina-charcoal)] mb-3">
                    {example.title}
                  </h3>
                  <p className="text-base text-[var(--patina-mocha-brown)] leading-relaxed">
                    {example.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-[var(--patina-mocha-brown)] leading-relaxed max-w-[460px] mx-auto mt-14">
              {expectationsClosing}
            </p>
          </div>
        </section>

        {/* Section 06 · Closing CTA */}
        <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-5">
              {ctaHeadline}{" "}
              <em className="italic text-[var(--patina-clay-beige)]">
                {ctaHeadlineEmphasis}
              </em>
            </h2>
            <p className="text-lg text-[rgba(237,233,228,0.75)] leading-relaxed mb-10 max-w-[480px] mx-auto">
              {ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ServicesCTA
                href={ctaPrimaryHref}
                label={ctaPrimaryLabel}
                location="services_closing_primary"
                variant="primary-light"
              />
              <ServicesCTA
                href={ctaSecondaryHref}
                label={ctaSecondaryLabel}
                location="services_closing_secondary"
                variant="outline-light"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
