"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";
import { PaletteCard } from "./PaletteCard";
import { palettes } from "./palettes";

interface PaletteGridProps {
  selectedPalettes: string[];
  onSelect: (id: string) => void;
  className?: string;
}

/**
 * PaletteGrid - Full-width 2-row cinematic grid
 * 3 cards per row × 2 rows, edge-to-edge with staggered reveal
 */
export function PaletteGrid({ selectedPalettes, onSelect, className }: PaletteGridProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 40,
      scale: prefersReducedMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section
      className={cn(
        "bg-black py-6 sm:py-8",
        className
      )}
    >
      {/* Full-width container - no max-width, minimal padding */}
      <div className="w-full">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 gap-[2px] bg-black"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          role="group"
          aria-label="Style palette selection - choose up to 3"
        >
          {palettes.map((palette) => (
            <motion.div key={palette.id} variants={cardVariants}>
              <PaletteCard
                palette={palette}
                isSelected={selectedPalettes.includes(palette.id)}
                onSelect={onSelect}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Selection hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: 0.5 }}
          className="text-center text-[var(--patina-off-white)]/50 text-sm mt-8 px-4"
        >
          We&apos;re building recommendations around styles like these. Founding members help us decide what comes first.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.0, duration: 0.5 }}
          className="text-center text-sm mt-4 px-4"
        >
          <Link
            href="/founding"
            className="text-[var(--patina-clay-beige)] hover:text-[var(--patina-off-white)] transition-colors duration-200"
          >
            Want to help shape which styles launch first? → Join the Founding Circle
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
