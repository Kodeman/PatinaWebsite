"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks";
import type { Palette } from "./types";

interface PaletteCardProps {
  palette: Palette;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

/**
 * PaletteCard - Full-width cinematic palette card
 * Taller aspect ratio, prominent typography, inset border selection
 */
export function PaletteCard({ palette, isSelected, onSelect }: PaletteCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(palette.id);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(palette.id)}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={isSelected}
      aria-label={`${palette.name}: ${palette.tagline}`}
      className={cn(
        "relative overflow-hidden",
        "w-full",
        "aspect-[4/5] lg:aspect-[3/4]",  // Taller portrait ratio
        "group cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--patina-clay-beige)]"
      )}
      whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={palette.imageUrl}
          alt={palette.name}
          className={cn(
            "w-full h-full object-cover",
            "transition-transform duration-700 ease-[var(--ease-patina)]",
            !prefersReducedMotion && "group-hover:scale-105"
          )}
        />
      </div>

      {/* Gradient Overlay - bottom to top */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-t from-black/90 via-black/40 to-black/10",
          "transition-all duration-300",
          !prefersReducedMotion && "group-hover:from-black/95 group-hover:via-black/50"
        )}
      />

      {/* Selection state - inset border */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 ring-4 ring-inset ring-[var(--patina-clay-beige)] z-10"
        />
      )}

      {/* Checkmark - Selected State */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[var(--patina-clay-beige)] flex items-center justify-center shadow-lg"
        >
          <svg
            className="w-6 h-6 text-[var(--patina-charcoal)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}

      {/* Content - bottom aligned with larger typography */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-8 z-10">
        {/* Name */}
        <h3 className="text-[var(--patina-off-white)] text-xl sm:text-2xl lg:text-3xl font-light mb-2">
          {palette.name}
        </h3>

        {/* Tagline */}
        <p className="text-[var(--patina-off-white)]/80 text-sm sm:text-base lg:text-lg mb-3">
          {palette.tagline}
        </p>

        {/* Description - Fades in on hover/selection */}
        <p
          className={cn(
            "text-[var(--patina-off-white)]/60 text-xs sm:text-sm leading-relaxed",
            "transition-opacity duration-300",
            "opacity-0",
            !prefersReducedMotion && "group-hover:opacity-100",
            isSelected && "opacity-100"
          )}
        >
          {palette.description}
        </p>
      </div>
    </motion.button>
  );
}
