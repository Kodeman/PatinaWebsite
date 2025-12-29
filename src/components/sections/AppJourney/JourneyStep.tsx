'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { StepIcon } from './StepIcon';
import type { JourneyStep as JourneyStepType } from '@/types/app';

interface JourneyStepProps {
  step: JourneyStepType;
  isLast: boolean;
}

/**
 * JourneyStep - Individual step card for the journey timeline
 */
export function JourneyStep({ step, isLast }: JourneyStepProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <li className={cn('relative pl-16 lg:pl-24', !isLast && 'pb-12 lg:pb-16')}>
      {/* Step Number Circle */}
      <div
        className={cn(
          'absolute left-0 top-0',
          'w-10 h-10 lg:w-12 lg:h-12',
          'rounded-full',
          'bg-[var(--patina-charcoal)] text-[var(--patina-off-white)]',
          'flex items-center justify-center',
          'font-display font-semibold text-lg lg:text-xl',
          'shadow-md z-10'
        )}
      >
        {step.stepNumber}
      </div>

      {/* Content Card */}
      <motion.div
        className={cn(
          'bg-[var(--patina-warm-white)]',
          'rounded-[var(--radius-xl)]',
          'p-6 lg:p-8',
          'shadow-[var(--shadow-sm)]',
          'hover:shadow-[var(--shadow-md)]',
          'transition-shadow duration-300'
        )}
        whileHover={prefersReducedMotion ? {} : { y: -2 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
          {/* Icon */}
          <div
            className={cn(
              'flex-shrink-0',
              'w-12 h-12 lg:w-14 lg:h-14',
              'rounded-full',
              'bg-[var(--patina-soft-cream)]',
              'flex items-center justify-center'
            )}
          >
            <StepIcon type={step.icon} />
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <h3 className="text-heading-2 text-[var(--patina-charcoal)] mb-2">{step.title}</h3>
            <p className="text-body text-[var(--patina-mocha-brown)] leading-relaxed mb-3">
              {step.description}
            </p>
            <p className="text-body-sm text-[var(--patina-clay-beige)] italic">{step.tagline}</p>
          </div>
        </div>
      </motion.div>
    </li>
  );
}
