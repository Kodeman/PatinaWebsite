'use client';

import { Container } from '@/components/layout/Container';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/motion';
import { TrustPillar } from './TrustPillar';
import { trustContent, trustIndicators } from '@/data/appContent';

interface AppTrustSectionProps {
  eyebrow?: string;
  indicators?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

/**
 * AppTrustSection - 3-column trust indicators section
 * Designer-Taught | Quality Curated | Privacy First
 */
export function AppTrustSection({ eyebrow, indicators }: AppTrustSectionProps) {
  const displayIndicators = indicators?.length
    ? indicators.map((ind, i) => ({
        id: `indicator-${i}`,
        title: ind.title,
        description: ind.description,
        icon: (ind.icon || 'designer') as 'designer' | 'quality' | 'privacy',
      }))
    : trustIndicators;
  return (
    <section className="py-16 lg:py-20 bg-[var(--patina-soft-cream)]">
      <Container>
        {/* Header */}
        <FadeIn className="text-center mb-10">
          <span className="text-label text-[var(--patina-clay-beige)]">{eyebrow || trustContent.eyebrow}</span>
        </FadeIn>

        {/* Trust Pillars */}
        <StaggerChildren staggerDelay={0.1}>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {displayIndicators.map((indicator) => (
              <StaggerItem key={indicator.id}>
                <TrustPillar indicator={indicator} />
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>
      </Container>
    </section>
  );
}
