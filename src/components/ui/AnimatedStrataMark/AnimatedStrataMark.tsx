'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

export interface AnimatedStrataMarkProps {
  size?: 'compact' | 'medium' | 'large';
  variant?: 'default' | 'reversed' | 'on-clay';
  align?: 'left' | 'center';
  className?: string;
  delay?: number;
}

export function AnimatedStrataMark({
  size = 'medium',
  variant = 'default',
  align = 'center',
  className,
  delay = 0,
}: AnimatedStrataMarkProps) {
  const prefersReducedMotion = useReducedMotion();

  const sizeConfig = {
    compact: {
      baseWidth: 40,
      lineHeight: 2,
      gap: 3,
    },
    medium: {
      baseWidth: 80,
      lineHeight: 3,
      gap: 5,
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
    'on-clay': {
      line1: 'bg-[var(--patina-off-white)]',
      line2: 'bg-[var(--patina-off-white)] opacity-70',
      line3: 'bg-[var(--patina-off-white)] opacity-40',
    },
  };

  const { baseWidth, lineHeight, gap } = sizeConfig[size];
  const colors = colorConfig[variant];
  const alignmentClass = align === 'center' ? 'items-center' : 'items-start';

  const lines = [
    {
      width: baseWidth,
      height: lineHeight,
      color: colors.line1,
      delay: delay,
    },
    {
      width: baseWidth * 0.8,
      height: lineHeight * 0.85,
      color: colors.line2,
      delay: delay + 0.2,
    },
    {
      width: baseWidth * 0.6,
      height: lineHeight * 0.7,
      color: colors.line3,
      delay: delay + 0.35,
    },
  ];

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
          duration: prefersReducedMotion ? 0 : 0.3,
          delay: prefersReducedMotion ? 0 : lines[i].delay,
          ease: [0.4, 0, 0.2, 1] as const,
        },
        opacity: {
          duration: prefersReducedMotion ? 0 : 0.2,
          delay: prefersReducedMotion ? 0 : lines[i].delay,
        },
      },
    }),
  };

  return (
    <motion.div
      className={cn('flex flex-col', alignmentClass, className)}
      style={{ gap: `${gap}px` }}
      role="img"
      aria-label="Patina strata mark"
      initial="hidden"
      animate="visible"
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
