'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { EnginePillar as EnginePillarType } from '@/types/app';

interface EnginePillarProps {
  pillar: EnginePillarType;
}

/**
 * EnginePillar - Individual card for the Aesthete Engine 3-pillar layout
 */
export function EnginePillar({ pillar }: EnginePillarProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        'bg-[var(--patina-warm-white)]/10',
        'backdrop-blur-sm',
        'rounded-[var(--radius-xl)]',
        'p-6 lg:p-8',
        'border border-[var(--patina-off-white)]/10'
      )}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Title */}
      <h3 className="text-heading-3 text-[var(--patina-off-white)] mb-3">{pillar.title}</h3>

      {/* Description */}
      <p className="text-body-sm text-[var(--patina-off-white)]/80 leading-relaxed mb-4">
        {pillar.description}
      </p>

      {/* Highlight (if present) */}
      {pillar.highlight && (
        <div className="mb-4">
          <span
            className={cn(
              'inline-block',
              'px-3 py-1.5',
              'bg-[var(--patina-clay-beige)]',
              'text-[var(--patina-charcoal)]',
              'text-sm font-semibold',
              'rounded-[var(--radius-md)]'
            )}
          >
            {pillar.highlight}
          </span>
        </div>
      )}

      {/* Examples */}
      {pillar.examples && pillar.examples.length > 0 && (
        <ul className="space-y-2">
          {pillar.examples.map((example, index) => (
            <li
              key={index}
              className={cn(
                'text-body-sm',
                'text-[var(--patina-clay-beige)]',
                'italic leading-relaxed'
              )}
            >
              {example}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
