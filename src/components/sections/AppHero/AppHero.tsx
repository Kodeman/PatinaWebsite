'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Container } from '@/components/layout/Container';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { WaitlistForm } from '@/components/ui/WaitlistForm';
import { appHeroContent } from '@/data/appContent';

interface AppHeroProps {
  eyebrow?: string;
  headline?: string;
  headlineEmphasis?: string;
  subheadline?: string;
  secondaryLine?: string;
  primaryCta?: string | { label: string; href?: string };
  secondaryCta?: string | { label: string; href?: string };
  androidNote?: string;
}

/**
 * AppHero - Revised hero section for /app page
 * Features Aesthete Engine branding and story-driven copy
 */
export function AppHero({
  eyebrow,
  headline,
  headlineEmphasis,
  subheadline,
  secondaryLine,
  secondaryCta,
  androidNote,
}: AppHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section className="relative pt-32 pb-20 lg:pb-28 bg-gradient-to-b from-[var(--patina-soft-cream)] to-[var(--patina-warm-white)] overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.p
              className="text-label text-[var(--patina-clay-beige)] mb-3"
              variants={itemVariants}
            >
              {eyebrow || appHeroContent.eyebrow}
            </motion.p>

            {/* Headline */}
            <motion.h1
              className="text-display-1 text-[var(--patina-charcoal)] mb-4"
              variants={itemVariants}
            >
              {headline || appHeroContent.headline}
              <br />
              <em className="italic text-[var(--patina-mocha-brown)]">
                {headlineEmphasis || appHeroContent.headlineEmphasis}
              </em>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-xl text-[var(--patina-mocha-brown)] leading-relaxed mb-4"
              variants={itemVariants}
            >
              {subheadline || appHeroContent.subheadline}
            </motion.p>

            {/* Secondary line */}
            <motion.p
              className="text-base text-[var(--patina-mocha-brown)]/80 mb-10"
              variants={itemVariants}
            >
              {secondaryLine || appHeroContent.secondaryLine}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              {/* Primary CTA - Waitlist */}
              <WaitlistForm source="app_hero" ctaText="Join the Waitlist" className="w-full sm:w-auto" />

              {/* Secondary CTA - Anchor */}
              <a
                href={appHeroContent.secondaryCTA.href}
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'px-6 py-3',
                  'text-[var(--patina-mocha-brown)]',
                  'border border-[var(--patina-clay-beige)]/30',
                  'rounded-[var(--radius-lg)]',
                  'transition-all duration-300',
                  'hover:border-[var(--patina-clay-beige)] hover:bg-[var(--patina-soft-cream)]'
                )}
              >
                {typeof secondaryCta === 'string' ? secondaryCta : secondaryCta?.label || appHeroContent.secondaryCTA.label}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </motion.div>

            {/* Waitlist note */}
            <motion.p
              className="mt-4 text-sm text-[var(--patina-mocha-brown)]/60 text-center lg:text-left"
              variants={itemVariants}
            >
              {androidNote || "Join the waitlist — we'll notify you when it's ready."}
            </motion.p>
          </motion.div>

          {/* App Mockup */}
          <motion.div
            className="relative mx-auto max-w-[300px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div className="aspect-[9/19] bg-[var(--patina-charcoal)] rounded-[40px] p-3 shadow-2xl">
              <PlaceholderImage
                meta={appHeroContent.mockupPlaceholder}
                className="w-full h-full rounded-[32px]"
                showMetadata={false}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
