'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/motion';
import { WaitlistForm } from '@/components/ui/WaitlistForm';
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
            <WaitlistForm source="app_cta" variant="dark" ctaText="Join the Waitlist" className="max-w-md mx-auto" />
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
