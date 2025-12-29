'use client';

import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/motion';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { AgedPaperCard } from '@/components/ui/AgedPaperCard';
import { problemContent } from '@/data/aboutContent';

export function ProblemSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-warm-white)]">
      <Container>
        {/* Section header */}
        <FadeIn className="mb-12">
          <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
            {problemContent.heading}
          </span>
        </FadeIn>

        {/* Split image comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left image - The Problem */}
          <FadeIn direction="left" className="relative">
            <div className="aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden">
              <PlaceholderImage
                meta={problemContent.leftImage}
                className="w-full h-full"
              />
            </div>
          </FadeIn>

          {/* Right image - The Possibility */}
          <FadeIn direction="right" delay={0.1} className="relative">
            <div className="aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden">
              <PlaceholderImage
                meta={problemContent.rightImage}
                className="w-full h-full"
              />
            </div>
          </FadeIn>
        </div>

        {/* Description */}
        <FadeIn className="max-w-[700px] mx-auto text-center mb-12">
          <p className="text-xl text-[var(--patina-charcoal)] leading-relaxed">
            {problemContent.description}
          </p>
        </FadeIn>

        {/* Statistic callout */}
        <FadeIn delay={0.2} className="max-w-[500px] mx-auto">
          <AgedPaperCard className="p-8 text-center">
            <p className="text-display-2 text-[var(--patina-clay-beige)] mb-2">
              {problemContent.statistic.value}
            </p>
            <p className="text-body text-[var(--patina-mocha-brown)]">
              {problemContent.statistic.description}
            </p>
          </AgedPaperCard>
        </FadeIn>
      </Container>
    </section>
  );
}
