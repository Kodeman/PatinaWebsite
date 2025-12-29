'use client';

import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/motion';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { problemBridgeContent } from '@/data/appContent';

interface AppProblemBridgeProps {
  header?: string;
  paragraphs?: string[];
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
}

/**
 * AppProblemBridge - Problem/Solution section
 * "Other apps show you what's popular. Patina shows you what's right."
 */
export function AppProblemBridge({
  header,
  paragraphs,
  comparisonLeft,
  comparisonRight,
}: AppProblemBridgeProps) {
  const displayParagraphs = paragraphs?.length ? paragraphs : problemBridgeContent.paragraphs;
  const leftComparison = comparisonLeft || problemBridgeContent.comparison.left;
  const rightComparison = comparisonRight || problemBridgeContent.comparison.right;
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-warm-white)]">
      <Container>
        {/* Header */}
        <FadeIn className="text-center mb-12 lg:mb-16">
          <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
            {problemBridgeContent.eyebrow}
          </span>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)] max-w-[700px] mx-auto">
            {problemBridgeContent.headline}
            <br />
            <em className="text-[var(--patina-mocha-brown)] not-italic">
              {problemBridgeContent.headlineEmphasis}
            </em>
          </h2>
        </FadeIn>

        {/* Body Paragraphs */}
        <FadeIn delay={0.1} className="max-w-[700px] mx-auto text-center mb-16">
          <div className="space-y-4">
            {displayParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={cn(
                  'text-lg leading-relaxed',
                  index === displayParagraphs.length - 1
                    ? 'text-[var(--patina-charcoal)] font-medium'
                    : 'text-[var(--patina-mocha-brown)]'
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>

        {/* Comparison Visual */}
        <div className="grid md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
          {/* Left: Old Way */}
          <FadeIn direction="left" delay={0.2}>
            <div className="relative">
              <span className="text-label text-[var(--patina-mocha-brown)]/60 mb-3 block text-center">
                {leftComparison.label}
              </span>
              <div className="aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden border border-[var(--patina-clay-beige)]/20 shadow-sm">
                {problemBridgeContent.comparison.left.imagePlaceholder && (
                  <PlaceholderImage
                    meta={problemBridgeContent.comparison.left.imagePlaceholder}
                    className="w-full h-full"
                  />
                )}
              </div>
              {leftComparison.itemCount && (
                <p className="mt-3 text-center text-sm text-[var(--patina-mocha-brown)]/60">
                  {leftComparison.itemCount}+ items to sort through
                </p>
              )}
            </div>
          </FadeIn>

          {/* Right: Patina Way */}
          <FadeIn direction="right" delay={0.3}>
            <div className="relative">
              <span className="text-label text-[var(--patina-clay-beige)] mb-3 block text-center">
                {rightComparison.label}
              </span>
              <div className="aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden border-2 border-[var(--patina-clay-beige)]/40 shadow-md ring-4 ring-[var(--patina-clay-beige)]/10">
                {problemBridgeContent.comparison.right.imagePlaceholder && (
                  <PlaceholderImage
                    meta={problemBridgeContent.comparison.right.imagePlaceholder}
                    className="w-full h-full"
                  />
                )}
              </div>
              {rightComparison.itemCount && (
                <p className="mt-3 text-center text-sm text-[var(--patina-charcoal)] font-medium">
                  {rightComparison.itemCount} pieces that belong
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
