import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { AppHero } from '@/components/sections/AppHero';
import { AppProblemBridge } from '@/components/sections/AppProblemBridge';
import { AppJourney } from '@/components/sections/AppJourney';
import { AestheteEngineExplainer } from '@/components/sections/AestheteEngineExplainer';
import { AppDesignerHandoff } from '@/components/sections/AppDesignerHandoff';
import { AppTrustSection } from '@/components/sections/AppTrustSection';
import { AppCTA } from '@/components/sections/AppCTA';
import { sanityFetch } from '../../../sanity/lib/client';
import { appPageQuery } from '../../../sanity/lib/queries';

export const metadata: Metadata = {
  title: 'Get the App | Patina',
  description:
    "Discover furniture that grows more beautiful with time. Scan your space, see pieces in your room, and find what belongs—guided by the insights of professional designers.",
};

interface AppPage {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroHeadlineEmphasis?: string;
  heroSubheadline?: string;
  heroSecondaryLine?: string;
  heroPrimaryCta?: string | { label: string; href?: string };
  heroSecondaryCta?: string | { label: string; href?: string };
  heroAndroidNote?: string;
  problemHeader?: string;
  problemParagraphs?: string[];
  comparisonLeft?: {
    label: string;
    description: string;
    itemCount: number;
  };
  comparisonRight?: {
    label: string;
    description: string;
    itemCount: number;
  };
  journeyHeader?: string;
  journeySteps?: Array<{
    stepNumber: number;
    title: string;
    description: string;
    tagline: string;
    icon: string;
  }>;
  engineHeader?: string;
  enginePillars?: Array<{
    title: string;
    description: string;
    icon?: string;
    examples?: string[];
    highlight?: string;
  }>;
  handoffHeader?: string;
  handoffDescription?: string;
  handoffBenefit?: string;
  handoffItems?: string[];
  handoffCta?: string;
  trustEyebrow?: string;
  trustIndicators?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  ctaHeadline?: string;
  ctaHeadlineEmphasis?: string;
  ctaSubheadline?: string;
  ctaTertiaryLine?: string;
  ctaPrimary?: string | { label: string; href?: string };
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string | { label: string; href?: string };
}

export default async function AppPage() {
  const { isEnabled: isDraft } = await draftMode();

  const appPage = await sanityFetch<AppPage | null>({
    query: appPageQuery,
    isDraftMode: isDraft,
  });

  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Hero - Aesthete Engine branding, story-driven copy */}
        <AppHero
          eyebrow={appPage?.heroEyebrow}
          headline={appPage?.heroHeadline}
          headlineEmphasis={appPage?.heroHeadlineEmphasis}
          subheadline={appPage?.heroSubheadline}
          secondaryLine={appPage?.heroSecondaryLine}
          primaryCta={appPage?.heroPrimaryCta}
          secondaryCta={appPage?.heroSecondaryCta}
          androidNote={appPage?.heroAndroidNote}
        />

        {/* Problem/Solution Bridge - "What's popular vs what's right" */}
        <AppProblemBridge
          header={appPage?.problemHeader}
          paragraphs={appPage?.problemParagraphs}
          comparisonLeft={appPage?.comparisonLeft}
          comparisonRight={appPage?.comparisonRight}
        />

        {/* How It Works - 4-step vertical journey */}
        <AppJourney
          header={appPage?.journeyHeader}
          steps={appPage?.journeySteps}
        />

        {/* Aesthete Engine Explainer - 3-pillar dark section */}
        <AestheteEngineExplainer
          header={appPage?.engineHeader}
          pillars={appPage?.enginePillars}
        />

        {/* Designer Handoff - Data transfer value */}
        <AppDesignerHandoff
          header={appPage?.handoffHeader}
          description={appPage?.handoffDescription}
          benefit={appPage?.handoffBenefit}
          items={appPage?.handoffItems}
          cta={appPage?.handoffCta}
        />

        {/* Trust Indicators - 3-column trust section */}
        <AppTrustSection
          eyebrow={appPage?.trustEyebrow}
          indicators={appPage?.trustIndicators}
        />

        {/* Final CTA */}
        <AppCTA
          headline={appPage?.ctaHeadline}
          headlineEmphasis={appPage?.ctaHeadlineEmphasis}
          subheadline={appPage?.ctaSubheadline}
          tertiaryLine={appPage?.ctaTertiaryLine}
          primaryCta={appPage?.ctaPrimary}
          secondaryText={appPage?.ctaSecondaryText}
          secondaryLink={appPage?.ctaSecondaryLink}
        />
      </main>

      <Footer />
    </>
  );
}
