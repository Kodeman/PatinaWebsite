'use client';

import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/motion';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { narrativeBlocks, originStoryHero } from '@/data/aboutContent';

export function OriginStory() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
      <Container>
        {/* Section header */}
        <FadeIn className="text-center mb-12">
          <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
            Our Story
          </span>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)]">
            Where It <em className="text-[var(--patina-mocha-brown)] not-italic">Started</em>
          </h2>
        </FadeIn>

        {/* Kitchen table hero image */}
        <FadeIn className="mb-16">
          <div className="aspect-[16/9] rounded-[var(--radius-xl)] overflow-hidden max-w-[900px] mx-auto">
            <PlaceholderImage meta={originStoryHero} className="w-full h-full" />
          </div>
        </FadeIn>

        {/* Opening quote */}
        <FadeIn className="max-w-[700px] mx-auto text-center mb-16">
          <p className="text-xl text-[var(--patina-charcoal)] italic leading-relaxed">
            &ldquo;It started, as most good things do, with a problem nobody could quite name.&rdquo;
          </p>
        </FadeIn>

        {/* Narrative blocks */}
        <div className="max-w-[900px] mx-auto space-y-16">
          {narrativeBlocks.map((block, index) => (
            <FadeIn key={block.id} delay={index * 0.1}>
              <div
                className={`grid gap-8 items-center ${
                  block.imagePlaceholder
                    ? index % 2 === 0
                      ? 'lg:grid-cols-[1fr,1.2fr]'
                      : 'lg:grid-cols-[1.2fr,1fr]'
                    : ''
                }`}
              >
                {/* Content */}
                <div className={block.imagePlaceholder && index % 2 !== 0 ? 'lg:order-2' : ''}>
                  <h3 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                    {block.title}
                  </h3>
                  {block.quote && (
                    <blockquote className="text-lg text-[var(--patina-mocha-brown)] italic leading-relaxed border-l-2 border-[var(--patina-clay-beige)] pl-6">
                      {block.quote}
                    </blockquote>
                  )}
                  {block.content && (
                    <p className="text-body text-[var(--patina-mocha-brown)] leading-relaxed">
                      {block.content}
                    </p>
                  )}
                </div>

                {/* Image */}
                {block.imagePlaceholder && (
                  <div
                    className={`aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden ${
                      index % 2 !== 0 ? 'lg:order-1' : ''
                    }`}
                  >
                    <PlaceholderImage meta={block.imagePlaceholder} className="w-full h-full" />
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
