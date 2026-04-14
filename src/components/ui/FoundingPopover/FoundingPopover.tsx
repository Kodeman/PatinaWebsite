"use client";

import { cn } from "@/lib/utils";
import { useFoundingModal } from "@/components/ui/FoundingCircleModal";

interface FoundingPopoverProps {
  isDark?: boolean;
}

export function FoundingPopover({ isDark = false }: FoundingPopoverProps) {
  const { open } = useFoundingModal();

  return (
    <button
      type="button"
      onClick={() =>
        open({ source: "nav", ctaText: "Join the Founding Circle" })
      }
      className={cn(
        "inline-flex items-center justify-center",
        "px-4 py-2 text-sm font-medium rounded-[var(--radius-lg)]",
        "transition-all duration-[var(--duration-normal)] ease-[var(--ease-patina)]",
        isDark
          ? "bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] hover:bg-[var(--patina-off-white)]"
          : "bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] hover:bg-[var(--patina-mocha-brown)]"
      )}
    >
      Join the Founding Circle
    </button>
  );
}
