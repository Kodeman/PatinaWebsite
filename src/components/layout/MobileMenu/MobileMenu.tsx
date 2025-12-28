"use client";

import Link from "next/link";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { StrataMark } from "@/components/ui/StrataMark";

interface NavLink {
  href: string;
  label: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-sm bg-[var(--patina-charcoal)] z-50 lg:hidden",
          "transform transition-transform duration-300 ease-[var(--ease-patina-out)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Paper texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[rgba(163,146,124,0.15)]">
            <Link href="/" className="flex flex-col items-start" onClick={onClose}>
              <span className="font-display text-xl font-medium tracking-[0.2em] text-[var(--patina-off-white)]">
                PATINA
              </span>
              <StrataMark size="compact" variant="reversed" align="left" />
            </Link>

            <button
              onClick={onClose}
              className="p-2 -mr-2 text-[var(--patina-off-white)]"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-8 p-6">
            {links.map((link, index) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "font-display text-2xl text-[var(--patina-off-white)]",
                  "transition-colors duration-200 hover:text-[var(--patina-clay-beige)]",
                  // Stagger animation
                  "animate-[fadeInUp_0.5s_ease-out_forwards]",
                  "opacity-0"
                )}
                style={{
                  animationDelay: isOpen ? `${index * 50 + 100}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Footer CTA */}
          <div className="p-6 border-t border-[rgba(163,146,124,0.15)]">
            <Link
              href="/app"
              onClick={onClose}
              className={cn(
                "flex items-center justify-center w-full",
                "px-8 py-4 text-base font-medium",
                "bg-[var(--patina-clay-beige)] text-[var(--patina-off-white)]",
                "rounded-[var(--radius-lg)]",
                "transition-all duration-[var(--duration-normal)] ease-[var(--ease-patina)]",
                "hover:bg-[var(--patina-mocha-brown)]",
                "shadow-[0_4px_12px_rgba(163,146,124,0.25)]"
              )}
            >
              Get the App
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
