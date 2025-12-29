'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/motion';
import { handoffContent, handoffItems } from '@/data/appContent';

/**
 * AppDesignerHandoff - Section explaining the seamless handoff to professional designers
 */
export function AppDesignerHandoff() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-warm-white)]">
      <Container>
        <div className="max-w-[700px] mx-auto text-center">
          {/* Header */}
          <FadeIn>
            <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
              {handoffContent.eyebrow}
            </span>
            <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-6">
              {handoffContent.headline}{' '}
              <em className="italic text-[var(--patina-mocha-brown)]">
                {handoffContent.headlineEmphasis}
              </em>
            </h2>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.1}>
            <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed mb-4">
              {handoffContent.description}
            </p>
            <p className="text-base text-[var(--patina-mocha-brown)]/80 leading-relaxed mb-10">
              {handoffContent.benefit}
            </p>
          </FadeIn>

          {/* What Transfers List */}
          <FadeIn delay={0.2}>
            <p className="text-label text-[var(--patina-clay-beige)] mb-4">What transfers:</p>
          </FadeIn>

          <StaggerChildren staggerDelay={0.08} initialDelay={0.25}>
            <ul className="space-y-3 mb-10 text-left max-w-[400px] mx-auto">
              {handoffItems.map((item) => (
                <StaggerItem key={item.id}>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[var(--patina-clay-beige)] flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-[var(--patina-charcoal)]">{item.text}</span>
                  </li>
                </StaggerItem>
              ))}
            </ul>
          </StaggerChildren>

          {/* CTA */}
          <FadeIn delay={0.4}>
            <Link
              href={handoffContent.cta.href}
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'px-8 py-4',
                'bg-[var(--patina-charcoal)] text-[var(--patina-off-white)]',
                'rounded-[var(--radius-lg)] font-medium',
                'transition-all duration-300',
                'hover:bg-black shadow-lg'
              )}
            >
              {handoffContent.cta.label}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
