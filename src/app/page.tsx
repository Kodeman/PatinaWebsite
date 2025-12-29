import { draftMode } from "next/headers";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import {
  ValuePropositionSection,
  AestheteEngineSection,
  ARShowcaseSection,
  FeaturedMakersSection,
  TestimonialsSection,
  DesignerServicesSection,
  AppCTASection,
} from "./HomeContent";
import { sanityFetch } from "../../sanity/lib/client";
import { homePageQuery, featuredMakersQuery, testimonialsQuery, trustBadgesQuery } from "../../sanity/lib/queries";

interface HomePage {
  heroTitle?: string;
  heroTitleEmphasis?: string;
  heroDescription?: string;
  heroSecondaryLine?: string;
  heroTrustLine?: string;
  heroCta?: { label: string; href: string };
  valueHeader?: { eyebrow?: string; headline?: string; subheadline?: string };
  valueFeatures?: Array<{ title: string; description: string; icon?: string }>;
  engineHeader?: { eyebrow?: string; headline?: string; subheadline?: string };
  engineBody?: string;
  engineCta?: { label: string; href: string };
  enginePillars?: Array<{ title: string; description: string; examples?: string[]; highlight?: string }>;
  experienceHeader?: { eyebrow?: string; headline?: string; subheadline?: string };
  experienceBody?: string;
  experienceSteps?: Array<{ number: number; title: string; text: string }>;
  makersHeader?: { eyebrow?: string; headline?: string };
  makersBody?: string;
  testimonialsHeader?: { eyebrow?: string; headline?: string };
  servicesHeader?: { eyebrow?: string; headline?: string; subheadline?: string };
  servicesBody?: string;
  servicesBenefit?: string;
  servicesHandoffItems?: string[];
  servicesCta?: { label: string; href: string };
  ctaHeader?: { eyebrow?: string; headline?: string; subheadline?: string };
  ctaBody?: string;
  ctaSecondary?: string;
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
          description={homePage?.heroDescription || "Discover furniture that grows more beautiful with every year. See it in your space. Know the makers."}
          secondaryLine={homePage?.heroSecondaryLine || "Powered by The Aesthete Engine—designer-taught intelligence that learns what you love."}
          primaryCta={homePage?.heroCta || { label: "Get the App", href: "/app" }}
          trustLine={homePage?.heroTrustLine || "Heritage makers since 1904"}
          imageUrl="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2000&h=1200&fit=crop&q=80"
          scrollTargetId="value-proposition"
        />

        {/* 2. Value Proposition Section */}
        <div id="value-proposition">
          <ValuePropositionSection
            header={homePage?.valueHeader}
            features={homePage?.valueFeatures}
          />
        </div>

        {/* 3. The Aesthete Engine */}
        <AestheteEngineSection
          header={homePage?.engineHeader}
          body={homePage?.engineBody}
          pillars={homePage?.enginePillars}
          cta={homePage?.engineCta}
        />

        {/* 4. AR Experience Showcase */}
        <ARShowcaseSection
          header={homePage?.experienceHeader}
          body={homePage?.experienceBody}
          steps={homePage?.experienceSteps}
        />

        {/* 5. Featured Makers */}
        <FeaturedMakersSection
          header={homePage?.makersHeader}
          body={homePage?.makersBody}
          makers={makers || undefined}
        />

        {/* 6. Testimonials / Social Proof */}
        <TestimonialsSection
          header={homePage?.testimonialsHeader}
          testimonials={testimonials || undefined}
          trustBadges={trustBadges || undefined}
        />

        {/* 7. Designer Services */}
        <DesignerServicesSection
          header={homePage?.servicesHeader}
          body={homePage?.servicesBody}
          benefit={homePage?.servicesBenefit}
          handoffItems={homePage?.servicesHandoffItems}
          cta={homePage?.servicesCta}
        />

        {/* 8. Final CTA */}
        <AppCTASection
          header={homePage?.ctaHeader}
          body={homePage?.ctaBody}
          secondary={homePage?.ctaSecondary}
          primaryCta={homePage?.ctaPrimary}
          secondaryLink={homePage?.ctaSecondaryLink}
        />
      </main>

      <Footer />
    </>
  );
}
