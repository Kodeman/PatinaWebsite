import { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { AppHero } from "@/components/sections/AppHero";
import { AppProblemBridge } from "@/components/sections/AppProblemBridge";
import { AppJourney } from "@/components/sections/AppJourney";
import { AestheteEngineExplainer } from "@/components/sections/AestheteEngineExplainer";
import { AppDesignerHandoff } from "@/components/sections/AppDesignerHandoff";
import { AppTrustSection } from "@/components/sections/AppTrustSection";
import { AppCTA } from "@/components/sections/AppCTA";

export const metadata: Metadata = {
  title: "Get the App | Patina",
  description:
    "Discover furniture that belongs with The Aesthete Engine. Scan your space, uncover your style, and find pieces that fit—not just the room, but the life you're building.",
};

export default function AppPage() {
  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Hero - Aesthete Engine branding, story-driven copy */}
        <AppHero />

        {/* Problem/Solution Bridge - "What's popular vs what's right" */}
        <AppProblemBridge />

        {/* How It Works - 4-step vertical journey */}
        <AppJourney />

        {/* Aesthete Engine Explainer - 3-pillar dark section */}
        <AestheteEngineExplainer />

        {/* Designer Handoff - Data transfer value */}
        <AppDesignerHandoff />

        {/* Trust Indicators - 3-column trust section */}
        <AppTrustSection />

        {/* Final CTA */}
        <AppCTA />
      </main>

      <Footer />
    </>
  );
}
