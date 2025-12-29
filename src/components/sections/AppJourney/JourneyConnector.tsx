'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * JourneyConnector - Animated vertical line connecting journey steps
 */
export function JourneyConnector() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="absolute left-[19px] lg:left-[23px] top-10 lg:top-12 bottom-0 w-0.5 pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full bg-gradient-to-b from-[var(--patina-charcoal)] via-[var(--patina-clay-beige)] to-[var(--patina-clay-beige)]/30"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{
          duration: prefersReducedMotion ? 0 : 1.5,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ transformOrigin: 'top' }}
      />
    </div>
  );
}
