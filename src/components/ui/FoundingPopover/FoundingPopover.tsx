"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FoundingCircleForm } from "@/components/ui/FoundingCircleForm";

interface FoundingPopoverProps {
  isDark?: boolean;
}

export function FoundingPopover({ isDark = false }: FoundingPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={popoverRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
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

      {isOpen && (
        <div
          className={cn(
            "absolute top-full right-0 mt-2 w-[320px] p-4 z-50",
            "rounded-[var(--radius-lg)] shadow-lg",
            "border border-[rgba(163,146,124,0.15)]",
            isDark
              ? "bg-[var(--patina-charcoal)]"
              : "bg-[var(--patina-warm-white)]"
          )}
        >
          <p className={cn(
            "text-sm mb-3",
            isDark ? "text-[rgba(237,233,228,0.7)]" : "text-[var(--patina-mocha-brown)]"
          )}>
            Be among the first to shape Patina.
          </p>
          <FoundingCircleForm
            source="navbar"
            variant="compact"
          />
        </div>
      )}
    </div>
  );
}
