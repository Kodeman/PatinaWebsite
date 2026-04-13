'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

export interface AnimatedStrataMarkProps {
  size?: 'compact' | 'hero' | 'medium' | 'close' | 'large';
  variant?: 'default' | 'reversed' | 'reversed-gradient' | 'on-clay';
  align?: 'left' | 'center';
  className?: string;
  delay?: number;
  /** Use the homepage spec proportions (100%/70%/40%) instead of default (100%/80%/60%) */
  specProportions?: boolean;
  /** Trigger animation on scroll intersection instead of on mount */
  triggerOnScroll?: boolean;
}

export function AnimatedStrataMark({
  size = 'medium',
  variant = 'default',
  align = 'center',
  className,
  delay = 0,
  specProportions = false,
  triggerOnScroll = false,
}: AnimatedStrataMarkProps) {
  const prefersReducedMotion = useReducedMotion();

  const sizeConfig = {
    compact: {
      baseWidth: 40,
      lineHeight: 2,
      gap: 3,
    },
    'hero': {
      baseWidth: 56,
      lineHeight: 2,
      gap: 6,
    },
    medium: {
      baseWidth: 80,
      lineHeight: 3,
      gap: 5,
    },
    'close': {
      baseWidth: 64,
      lineHeight: 2,
      gap: 6,
    },
    large: {
      baseWidth: 120,
      lineHeight: 4,
      gap: 6,
    },
  };

  const colorConfig = {
    default: {
      line1: 'bg-[var(--patina-mocha-brown)]',
      line2: 'bg-[var(--patina-clay-beige)]',
      line3: 'bg-[var(--patina-clay-beige)] opacity-50',
    },
    reversed: {
      line1: 'bg-[var(--patina-clay-beige)]',
      line2: 'bg-[var(--patina-clay-beige)] opacity-70',
      line3: 'bg-[var(--patina-clay-beige)] opacity-40',
    },
    'reversed-gradient': {
      line1: 'bg-[var(--patina-off-white)]',
      line2: 'bg-[var(--patina-clay-beige)]',
      line3: 'bg-[var(--patina-clay-beige)] opacity-50',
    },
    'on-clay': {
      line1: 'bg-[var(--patina-off-white)]',
      line2: 'bg-[var(--patina-off-white)] opacity-70',
      line3: 'bg-[var(--patina-off-white)] opacity-40',
    },
  };

  const { baseWidth, lineHeight, gap } = sizeConfig[size];
  const colors = colorConfig[variant];
  const alignmentClass = align === 'center' ? 'items-center' : 'items-start';

  const widthRatios = specProportions ? [1, 0.7, 0.4] : [1, 0.8, 0.6];
  const heightRatios = specProportions ? [1, 1, 1] : [1, 0.85, 0.7];
  const staggerDelays = specProportions ? [0, 0.12, 0.24] : [0, 0.2, 0.35];

  const lines = [
    {
      width: baseWidth * widthRatios[0],
      height: lineHeight * heightRatios[0],
      color: colors.line1,
      delay: delay + staggerDelays[0],
    },
    {
      width: baseWidth * widthRatios[1],
      height: lineHeight * heightRatios[1],
      color: colors.line2,
      delay: delay + staggerDelays[1],
    },
    {
      width: baseWidth * widthRatios[2],
      height: lineHeight * heightRatios[2],
      color: colors.line3,
      delay: delay + staggerDelays[2],
    },
  ];

  const easeCurve = specProportions
    ? [0.16, 1, 0.3, 1] as const  // ease-out-expo
    : [0.4, 0, 0.2, 1] as const;

  const animDuration = specProportions ? 0.8 : 0.3;

  const lineVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: (i: number) => ({
      scaleX: 1,
      opacity: 1,
      transition: {
        scaleX: {
          duration: prefersReducedMotion ? 0 : animDuration,
          delay: prefersReducedMotion ? 0 : lines[i].delay,
          ease: easeCurve,
        },
        opacity: {
          duration: prefersReducedMotion ? 0 : 0.2,
          delay: prefersReducedMotion ? 0 : lines[i].delay,
        },
      },
    }),
  };

  const animationProps = triggerOnScroll
    ? { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, margin: "-50px" } }
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <motion.div
      className={cn('flex flex-col', alignmentClass, className)}
      style={{ gap: `${gap}px` }}
      role="img"
      aria-label="Patina strata mark"
      {...animationProps}
    >
      {lines.map((line, index) => (
        <motion.span
          key={index}
          className={cn('rounded-full origin-left', line.color)}
          style={{
            width: `${line.width}px`,
            height: `${line.height}px`,
          }}
          custom={index}
          variants={lineVariants}
        />
      ))}
    </motion.div>
  );
}
