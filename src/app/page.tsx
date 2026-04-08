import { draftMode } from "next/headers";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ThePromise } from "@/components/sections/ThePromise";
import { TheRoom } from "@/components/sections/TheRoom";
import { FirstTouchJourney } from "@/components/sections/FirstTouchJourney";
import { FoundingCircleForm } from "@/components/ui/FoundingCircleForm";
import { FoundingCounter } from "@/components/ui/FoundingCounter";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import {
  FeaturedMakersSection,
  MaterialStoriesSection,
  TheJourneySection,
  DesignerServicesSection,
  VoicesSection,
  HowItWorksSection,
  WhyDifferentSection,
  MiddlewestSection,
  FinalCTASection,
  HomeScrollDepthTracker,
} from "./HomeContent";
import { sanityFetch } from "../../sanity/lib/client";
import { homePageQuery, featuredMakersQuery, testimonialsQuery, trustBadgesQuery } from "../../sanity/lib/queries";

interface HomePage {
  // Hero
  heroTitle?: string;
  heroTitleEmphasis?: string;
  heroDescription?: string;
  heroTrustLine?: string;
  heroCta?: { label: string; href: string };
  // Promise
  promiseOverline?: string;
  promiseHeadline?: string;
  promiseBody?: string;
  promiseFeatures?: { title: string; description: string; icon?: string }[];
  // Why Different
  whyDifferentOverline?: string;
  whyDifferentHeadline?: string;
  whyDifferentHeadlineEmphasis?: string;
  whyDifferentParagraphs?: string[];
  whyDifferentClosingBold?: string;
  // Room
  roomHeader?: { eyebrow?: string; headline?: string; subheadline?: string };
  roomHotspots?: {
    id: string;
    xPercent: number;
    yPercent: number;
    productName: string;
    productPrice: number;
    productMaker?: string;
    tier: "partner" | "curated" | "sourced";
    designerNote?: string;
    ctaLabel?: string;
    ctaUrl?: string;
  }[];
  // Makers
  makersHeader?: { eyebrow?: string; headline?: string };
  makersBody?: string;
  // Testimonials / Voices
  testimonialsHeader?: { eyebrow?: string; headline?: string };
  // Professional Services
  servicesHeader?: { eyebrow?: string; headline?: string; subheadline?: string };
  servicesBody?: string;
  servicesBenefit?: string;
  servicesHandoffItems?: string[];
  servicesCta?: { label: string; href: string };
  // Final CTA
  ctaHeader?: { eyebrow?: string; headline?: string; subheadline?: string };
  ctaBody?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondaryLink?: { label: string; href: string };
}

interface Maker {
  _id: string;
  name: string;
  slug: string;
  location: string;
  foundedYear?: number;
  yearsOfCraft?: number;
  badges?: string[];
  imageUrl?: string;
}

interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  location: string;
}

interface TrustBadge {
  value: string;
  label: string;
}

export default async function HomePage() {
  const { isEnabled: isDraft } = await draftMode();

  // Fetch all homepage data in parallel
  const [homePage, makers, testimonials, trustBadges] = await Promise.all([
    sanityFetch<HomePage | null>({
      query: homePageQuery,
      isDraftMode: isDraft,
    }),
    sanityFetch<Maker[]>({
      query: featuredMakersQuery,
      isDraftMode: isDraft,
    }),
    sanityFetch<Testimonial[]>({
      query: testimonialsQuery,
      isDraftMode: isDraft,
    }),
    sanityFetch<TrustBadge[]>({
      query: trustBadgesQuery,
      isDraftMode: isDraft,
    }),
  ]);

  return (
    <>
      <main id="main-content">
        <HomeScrollDepthTracker />
        {/* 1. Hero Section */}
        <Hero
          title={homePage?.heroTitle || "Where Time "}
          titleEmphasis={homePage?.heroTitleEmphasis || "Adds Value"}
          description={homePage?.heroDescription || "The complete room, designer-curated. Handcrafted anchor pieces surrounded by everything else your space needs \u2014 all chosen with intention."}
          ctaSlot={
            <>
              <FoundingCircleForm source="hero" variant="dark" ctaText="Join the Founding Circle" />
              <p className="mt-3 text-sm text-[var(--patina-off-white)]/60 font-mono">
                Be among the first 200 to shape what we&apos;re building
              </p>
              <div className="mt-3">
                <FoundingCounter variant="dark" />
              </div>
            </>
          }
          trustLine={homePage?.heroTrustLine || "Heritage makers \u00b7 Designer-selected brands \u00b7 Every detail specified"}
          imageUrl="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2000&h=1200&fit=crop&q=80"
          scrollTargetId="first-touch"
        />

        {/* 2. The Promise — Value Proposition */}
        <ThePromise
          overline={homePage?.promiseOverline}
          headline={homePage?.promiseHeadline}
          body={homePage?.promiseBody}
          features={homePage?.promiseFeatures}
        />

        {/* 3. Why This Is Different — Competitive Positioning */}
        <WhyDifferentSection
          overline={homePage?.whyDifferentOverline}
          headline={homePage?.whyDifferentHeadline}
          headlineEmphasis={homePage?.whyDifferentHeadlineEmphasis}
          paragraphs={homePage?.whyDifferentParagraphs}
          closingBold={homePage?.whyDifferentClosingBold}
        />

        {/* 4. First Touch — Cinematic Scroll Journey */}
        <FirstTouchJourney continueTargetId="the-room" />

        {/* 5. The Room — Interactive Hotspot Viewer */}
        <TheRoom
          header={homePage?.roomHeader}
          hotspots={homePage?.roomHotspots}
        />

        {/* 6. Newsletter Signup */}
        <section className="bg-[var(--patina-off-white)]">
          <NewsletterSignup variant="inline" source="homepage" />
        </section>

        {/* 7. Founding Partners */}
        <FeaturedMakersSection
          header={homePage?.makersHeader}
          body={homePage?.makersBody}
          makers={makers || undefined}
          testimonials={testimonials || undefined}
        />

        {/* 8. Material Stories — Sensory Interlude */}
        <MaterialStoriesSection />

        {/* 9. The Journey — How It Feels */}
        <TheJourneySection testimonials={testimonials || undefined} />

        {/* 10. Built from Middlewest Studio */}
        <MiddlewestSection />

        {/* 11. Professional Design Services */}
        <DesignerServicesSection
          header={homePage?.servicesHeader}
          body={homePage?.servicesBody}
          benefit={homePage?.servicesBenefit}
          handoffItems={homePage?.servicesHandoffItems}
          cta={homePage?.servicesCta}
          testimonials={testimonials || undefined}
        />

        {/* 12. From the Founders */}
        <VoicesSection
          header={homePage?.testimonialsHeader}
          testimonials={testimonials || undefined}
        />

        {/* 13. How It Works — Collapsible */}
        <HowItWorksSection />

        {/* 14. Final CTA */}
        <FinalCTASection
          header={homePage?.ctaHeader}
          body={homePage?.ctaBody}
          primaryCta={homePage?.ctaPrimary}
          secondaryLink={homePage?.ctaSecondaryLink}
        />
      </main>

      <Footer />
    </>
  );
}
