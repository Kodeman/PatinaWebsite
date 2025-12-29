'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/motion';
import { appCTAContent } from '@/data/appContent';

interface AppCTAProps {
  headline?: string;
  headlineEmphasis?: string;
  subheadline?: string;
  tertiaryLine?: string;
  primaryCta?: string | { label: string; href?: string };
  secondaryText?: string;
  secondaryLink?: string | { label: string; href?: string };
}

/**
 * AppCTA - Final call-to-action section with dark background
 */
export function AppCTA({
  headline,
  headlineEmphasis,
  subheadline,
  tertiaryLine,
  primaryCta,
  secondaryText,
  secondaryLink,
}: AppCTAProps) {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden">
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="max-w-[600px] mx-auto text-center">
          {/* Headline */}
          <FadeIn>
            <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-4">
              {headline || appCTAContent.headline}{' '}
              <em className="italic text-[var(--patina-clay-beige)]">
                {headlineEmphasis || appCTAContent.headlineEmphasis}
              </em>
            </h2>
          </FadeIn>

          {/* Subheadline */}
          <FadeIn delay={0.1}>
            <p className="text-lg text-[rgba(237,233,228,0.75)] mb-4">{subheadline || appCTAContent.subheadline}</p>
          </FadeIn>

          {/* Tertiary line */}
          <FadeIn delay={0.15}>
            <p className="text-sm text-[rgba(237,233,228,0.6)] mb-10">{tertiaryLine || appCTAContent.tertiaryLine}</p>
          </FadeIn>

          {/* Primary CTA */}
          <FadeIn delay={0.2}>
            <a
              href={appCTAContent.primaryCTA.href}
              className={cn(
                'inline-flex items-center justify-center gap-3',
                'px-8 py-4',
                'bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)]',
                'rounded-[var(--radius-lg)] font-medium',
                'transition-all duration-300',
                'hover:bg-[var(--patina-off-white)] shadow-lg'
              )}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              {typeof primaryCta === 'string' ? primaryCta : primaryCta?.label || appCTAContent.primaryCTA.label}
            </a>
          </FadeIn>

          {/* Secondary link */}
          <FadeIn delay={0.3}>
            {(() => {
              const linkLabel = typeof secondaryLink === 'string'
                ? secondaryLink
                : secondaryLink?.label || appCTAContent.secondaryLink.label;
              const fullText = secondaryText || appCTAContent.secondaryText;
              const parts = fullText.split(linkLabel);
              return (
                <p className="mt-6 text-sm text-[rgba(237,233,228,0.5)]">
                  {parts[0]}
                  <Link
                    href={appCTAContent.secondaryLink.href}
                    className="underline hover:text-[var(--patina-clay-beige)] transition-colors"
                  >
                    {linkLabel}
                  </Link>
                  {parts[1]}
                </p>
              );
            })()}
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
