import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ValuePropositionSection, AppCTASection } from "./HomeContent";

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main id="main-content">
        {/* Hero Section */}
        <Hero
          title="Furniture that grows "
          titleEmphasis="with your space"
          description="Discover pieces with stories worth telling. See them in your room before you decide. Find quality that lasts."
          provenanceLine="Featuring makers with 50+ years of craft tradition"
          primaryCta={{
            label: "Get the App",
            href: "/app",
          }}
          secondaryCta={{
            label: "Work with a Designer",
            href: "/services",
          }}
          imageUrl="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2000&h=1200&fit=crop&q=80"
          materialTag={{
            name: "White Oak",
            origin: "Vermont",
          }}
        />

        {/* Value Proposition Section with animations */}
        <ValuePropositionSection />

        {/* App CTA Section with animations */}
        <AppCTASection />
      </main>

      <Footer />
    </>
  );
}
