'use client';

import { Container } from '@/components/layout/Container';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/motion';
import { TrustPillar } from './TrustPillar';
import { trustContent, trustIndicators } from '@/data/appContent';

/**
 * AppTrustSection - 3-column trust indicators section
 * Designer-Taught | Quality Curated | Privacy First
 */
export function AppTrustSection() {
  return (
    <section className="py-16 lg:py-20 bg-[var(--patina-soft-cream)]">
      <Container>
        {/* Header */}
        <FadeIn className="text-center mb-10">
          <span className="text-label text-[var(--patina-clay-beige)]">{trustContent.eyebrow}</span>
        </FadeIn>

        {/* Trust Pillars */}
        <StaggerChildren staggerDelay={0.1}>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {trustIndicators.map((indicator) => (
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
