'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { AnimatedStrataMark } from '@/components/ui/AnimatedStrataMark';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { useReducedMotion } from '@/hooks';
import { heroContent } from '@/data/aboutContent';

export function AboutHero() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with Ken Burns effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: prefersReducedMotion ? 1 : 1.02 }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <PlaceholderImage
          meta={heroContent.backgroundPlaceholder}
          className="w-full h-full"
          showMetadata={false}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--patina-charcoal)]/70 via-[var(--patina-charcoal)]/50 to-[var(--patina-charcoal)]/70" />

      {/* Wood grain texture overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <Container className="relative z-10 text-center py-20">
        {/* Animated Strata Mark */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.3 }}
        >
          <AnimatedStrataMark size="large" variant="reversed" delay={0.5} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-display-1 text-[var(--patina-off-white)] mb-6 max-w-[800px] mx-auto"
          custom={1.0}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          {heroContent.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-xl text-[var(--patina-off-white)]/80 max-w-[600px] mx-auto leading-relaxed"
          custom={1.4}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          {heroContent.subheadline}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 2 }}
        >
          <ScrollIndicator className="text-[var(--patina-off-white)]" />
        </motion.div>
      </Container>
    </section>
  );
}
