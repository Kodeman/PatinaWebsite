'use client';

import { Container } from '@/components/layout/Container';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/motion';
import { EnginePillar } from './EnginePillar';
import { aestheteEngineContent, enginePillars } from '@/data/appContent';

interface AestheteEngineExplainerProps {
  header?: string;
  pillars?: Array<{
    title: string;
    description: string;
    icon?: string;
    examples?: string[];
    highlight?: string;
  }>;
}

/**
 * AestheteEngineExplainer - Dedicated section for The Aesthete Engine
 * Dark background with 3-pillar layout explaining the AI system
 */
export function AestheteEngineExplainer({ header, pillars }: AestheteEngineExplainerProps) {
  // Convert CMS pillars to local format
  const displayPillars = pillars?.length
    ? pillars.map((p, i) => ({
        id: `pillar-${i}`,
        title: p.title,
        description: p.description,
        examples: p.examples || [],
        highlight: p.highlight,
      }))
    : enginePillars;
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden">
      {/* Subtle paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Header */}
        <FadeIn className="text-center mb-12 lg:mb-16">
          <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
            {aestheteEngineContent.eyebrow}
          </span>
          <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-4">
            {aestheteEngineContent.headline}
          </h2>
          <p className="text-xl text-[var(--patina-off-white)]/80 leading-relaxed max-w-[700px] mx-auto">
            {aestheteEngineContent.subheadline}
          </p>
        </FadeIn>

        {/* Pillars Grid */}
        <StaggerChildren staggerDelay={0.1}>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {displayPillars.map((pillar) => (
              <StaggerItem key={pillar.id}>
                <EnginePillar pillar={pillar as typeof enginePillars[0]} />
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>
      </Container>
    </section>
  );
}
