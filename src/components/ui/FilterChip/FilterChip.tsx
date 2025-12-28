"use client";

import { cn } from "@/lib/utils";

export interface FilterChipProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  count?: number;
}

export function FilterChip({
  label,
  isActive = false,
  onClick,
  count,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
        "transition-all duration-[var(--duration-normal)] ease-[var(--ease-patina)]",
        "border",
        isActive
          ? "bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] border-[var(--patina-charcoal)]"
          : "bg-transparent text-[var(--patina-mocha-brown)] border-[rgba(163,146,124,0.3)] hover:border-[var(--patina-clay-beige)] hover:bg-[var(--patina-soft-cream)]"
      )}
    >
      {label}
      {typeof count === "number" && (
        <span
          className={cn(
            "text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
            isActive
              ? "bg-[var(--patina-off-white)]/20 text-[var(--patina-off-white)]"
              : "bg-[var(--patina-clay-beige)]/20 text-[var(--patina-clay-beige)]"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
