import { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { AboutHero } from '@/components/sections/AboutHero';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { OriginStory } from '@/components/sections/OriginStory';
import { NameDefinition } from '@/components/sections/NameDefinition';
import { ValuesSection } from '@/components/sections/ValuesSection';
import { FoundersSection } from '@/components/sections/FoundersSection';
import { StudioConnection } from '@/components/sections/StudioConnection';
import { JourneyTimeline } from '@/components/sections/JourneyTimeline';
import { AboutCTA } from '@/components/sections/AboutCTA';
import { generateAboutPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Our Story | Patina',
  description:
    'Meet Kody and Leah Kochaver, the husband and wife team behind Patina. Born from real interior design work in Madison, Wisconsin.',
  openGraph: {
    title: 'Our Story | Patina - Where Time Adds Value',
    description:
      'Meet Kody and Leah Kochaver, the husband and wife team behind Patina. Born from real interior design work in Madison, Wisconsin.',
  },
};

export default function AboutPage() {
  const jsonLd = generateAboutPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation variant="transparent" />

      <main id="main-content" className="min-h-screen">
        {/* Hero - "Where Time Adds Value" */}
        <AboutHero />

        {/* The Problem - Split comparison */}
        <ProblemSection />

        {/* Origin Story - "The Kitchen Table" */}
        <OriginStory />

        {/* The Name - Dictionary definition */}
        <NameDefinition />

        {/* Values - Material swatch cards */}
        <ValuesSection />

        {/* Founders - Kody & Leah */}
        <FoundersSection />

        {/* Middlewest Studio Connection */}
        <StudioConnection />

        {/* Journey Timeline */}
        <JourneyTimeline />

        {/* CTA - Join the Journey */}
        <AboutCTA />
      </main>

      <Footer />
    </>
  );
}
