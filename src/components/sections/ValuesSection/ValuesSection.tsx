'use client';

import { Container } from '@/components/layout/Container';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/motion';
import { ValueCard } from '@/components/ui/ValueCard';
import { brandValues } from '@/data/aboutContent';

export function ValuesSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-warm-white)]">
      <Container>
        {/* Section header */}
        <FadeIn className="text-center mb-12 lg:mb-16">
          <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
            What We Believe
          </span>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)]">
            The principles that guide{' '}
            <em className="text-[var(--patina-mocha-brown)] not-italic">every decision</em>
          </h2>
        </FadeIn>

        {/* Values grid - 3 on first row, 2 centered on second row */}
        <StaggerChildren staggerDelay={0.1}>
          <div className="grid gap-6 lg:gap-8 max-w-[1100px] mx-auto">
            {/* First row - 3 cards */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {brandValues.slice(0, 3).map((value) => (
                <StaggerItem key={value.id}>
                  <ValueCard
                    title={value.title}
                    description={value.description}
                    materialTexture={value.materialTexture}
                  />
                </StaggerItem>
              ))}
            </div>

            {/* Second row - 2 cards centered */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-[740px] mx-auto">
              {brandValues.slice(3).map((value) => (
                <StaggerItem key={value.id}>
                  <ValueCard
                    title={value.title}
                    description={value.description}
                    materialTexture={value.materialTexture}
                  />
                </StaggerItem>
              ))}
            </div>
          </div>
        </StaggerChildren>
      </Container>
    </section>
  );
}
