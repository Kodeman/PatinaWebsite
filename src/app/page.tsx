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

export default function HomePage() {
  return (
    <>
      {/* Navigation is now handled within the Hero component */}
      <main id="main-content">
        {/* 1. Hero Section - Full viewport "Morning Light" design */}
        <Hero
          title="Where Time "
          titleEmphasis="Adds Value"
          description="Discover furniture that grows more beautiful with every year. See it in your space. Know the makers."
          secondaryLine="Powered by The Aesthete Engine—designer-taught intelligence that learns what you love."
          primaryCta={{
            label: "Get the App",
            href: "/app",
          }}
          trustLine="Heritage makers since 1904"
          imageUrl="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2000&h=1200&fit=crop&q=80"
          scrollTargetId="value-proposition"
        />

        {/* 2. Value Proposition Section */}
        <div id="value-proposition">
          <ValuePropositionSection />
        </div>

        {/* 3. The Aesthete Engine - Intelligence Positioning */}
        <AestheteEngineSection />

        {/* 4. AR Experience Showcase */}
        <ARShowcaseSection />

        {/* 5. Featured Makers */}
        <FeaturedMakersSection />

        {/* 6. Testimonials / Social Proof */}
        <TestimonialsSection />

        {/* 7. Designer Services */}
        <DesignerServicesSection />

        {/* 8. Final CTA */}
        <AppCTASection />
      </main>

      <Footer />
    </>
  );
}
