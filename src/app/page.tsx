import { draftMode } from "next/headers";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FirstTouchJourney } from "@/components/sections/FirstTouchJourney";
import {
  FeaturedMakersSection,
  MaterialStoriesSection,
  TheJourneySection,
  DesignerServicesSection,
  VoicesSection,
  HowItWorksSection,
  FinalCTASection,
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
        {/* 1. Hero Section */}
        <Hero
          title={homePage?.heroTitle || "Where Time "}
          titleEmphasis={homePage?.heroTitleEmphasis || "Adds Value"}
          description={homePage?.heroDescription || "Discover furniture that grows more beautiful with every year. See it in your space. Know the hands that made it."}
          primaryCta={homePage?.heroCta || { label: "Begin Your Journey", href: "/app" }}
          trustLine={homePage?.heroTrustLine || "Heritage makers since 1904"}
          imageUrl="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2000&h=1200&fit=crop&q=80"
          scrollTargetId="first-touch"
        />

        {/* 2. First Touch - Cinematic Scroll Journey */}
        <FirstTouchJourney continueTargetId="makers" />

        {/* 3. Meet the Makers */}
        <FeaturedMakersSection
          header={homePage?.makersHeader}
          body={homePage?.makersBody}
          makers={makers || undefined}
          testimonials={testimonials || undefined}
        />

        {/* 4. Material Stories - Sensory Interlude */}
        <MaterialStoriesSection />

        {/* 5. The Journey - Organic Flow */}
        <TheJourneySection testimonials={testimonials || undefined} />

        {/* 6. Professional Design Services */}
        <DesignerServicesSection
          header={homePage?.servicesHeader}
          body={homePage?.servicesBody}
          benefit={homePage?.servicesBenefit}
          handoffItems={homePage?.servicesHandoffItems}
          cta={homePage?.servicesCta}
          testimonials={testimonials || undefined}
        />

        {/* 7. Voices - Community Stories */}
        <VoicesSection
          header={homePage?.testimonialsHeader}
          testimonials={testimonials || undefined}
        />

        {/* 8. How It Works - Collapsible */}
        <HowItWorksSection />

        {/* 9. Final CTA - Story Based */}
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
