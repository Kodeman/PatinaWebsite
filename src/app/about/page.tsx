import { Metadata } from 'next';
import { draftMode } from 'next/headers';
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
import { sanityFetch } from '../../../sanity/lib/client';
import { aboutPageQuery, foundersQuery } from '../../../sanity/lib/queries';

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

interface AboutPage {
  heroHeadline?: string;
  heroSubheadline?: string;
  problemHeading?: string;
  problemDescription?: string;
  problemStatistic?: { value: string; label: string };
  wordDefinition?: string;
  pronunciation?: string;
  partOfSpeech?: string;
  definition?: string;
  definitionQuote?: string;
  brandValues?: Array<{ title: string; description: string; materialTexture?: string }>;
  studioHeading?: string;
  studioDescription?: string;
  studioLinkText?: string;
  studioLinkUrl?: string;
  timeline?: Array<{ year: string; title: string; description: string; icon?: string }>;
  ctaHeadline?: string;
  ctaActions?: Array<{ label: string; href: string; variant?: string }>;
}

interface Founder {
  _id: string;
  name: string;
  role: string;
  title?: string;
  bio?: string;
  credentials?: string[];
  imageUrl?: string;
}

export default async function AboutPage() {
  const { isEnabled: isDraft } = await draftMode();
  const jsonLd = generateAboutPageJsonLd();

  const [aboutPage, founders] = await Promise.all([
    sanityFetch<AboutPage | null>({
      query: aboutPageQuery,
      isDraftMode: isDraft,
    }),
    sanityFetch<Founder[]>({
      query: foundersQuery,
      isDraftMode: isDraft,
    }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation variant="transparent" />

      <main id="main-content" className="min-h-screen">
        {/* Hero - "Where Time Adds Value" */}
        <AboutHero
          headline={aboutPage?.heroHeadline}
          subheadline={aboutPage?.heroSubheadline}
        />

        {/* The Problem - Split comparison */}
        <ProblemSection
          heading={aboutPage?.problemHeading}
          description={aboutPage?.problemDescription}
          statistic={aboutPage?.problemStatistic}
        />

        {/* Origin Story - "The Kitchen Table" */}
        <OriginStory />

        {/* The Name - Dictionary definition */}
        <NameDefinition
          word={aboutPage?.wordDefinition}
          pronunciation={aboutPage?.pronunciation}
          partOfSpeech={aboutPage?.partOfSpeech}
          definition={aboutPage?.definition}
          quote={aboutPage?.definitionQuote}
        />

        {/* Values - Material swatch cards */}
        <ValuesSection values={aboutPage?.brandValues} />

        {/* Founders - Kody & Leah */}
        <FoundersSection founders={founders?.length ? founders : undefined} />

        {/* Middlewest Studio Connection */}
        <StudioConnection
          heading={aboutPage?.studioHeading}
          description={aboutPage?.studioDescription}
          linkText={aboutPage?.studioLinkText}
          linkUrl={aboutPage?.studioLinkUrl}
        />

        {/* Journey Timeline */}
        <JourneyTimeline timeline={aboutPage?.timeline} />

        {/* CTA - Join the Journey */}
        <AboutCTA
          headline={aboutPage?.ctaHeadline}
          actions={aboutPage?.ctaActions}
        />
      </main>

      <Footer />
    </>
  );
}
