"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { StrataMark } from "@/components/ui/StrataMark";
import { SearchBar } from "@/components/ui/SearchBar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const navLinks = [
  { href: "/furniture", label: "Discover" },
  { href: "/furniture", label: "Furniture" },
  { href: "/designers", label: "Designers" },
  { href: "/about", label: "Our Story" },
];

interface StickyNavProps {
  /** Whether the navigation is visible */
  isVisible: boolean;
}

/**
 * StickyNav - Full navigation that slides in after scrolling past hero
 * Appears when scroll progress > 70% of hero height
 */
export function StickyNav({ isVisible }: StickyNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            className={cn(
              "fixed top-0 left-0 right-0 z-50",
              "bg-[var(--patina-soft-cream)]/95 backdrop-blur-md",
              "border-b border-[rgba(163,146,124,0.1)]",
              "shadow-[var(--shadow-md)]"
            )}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Paper texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.015]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
              <div className="flex items-center justify-between h-[60px] lg:h-[80px]">
                {/* Logo */}
                <Link href="/" className="flex flex-col items-start">
                  <span className="font-display text-xl font-medium tracking-[0.2em] text-[var(--patina-charcoal)]">
                    PATINA
                  </span>
                  <StrataMark size="compact" variant="default" align="left" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="text-sm text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Search and CTA */}
                <div className="hidden lg:flex items-center gap-4">
                  <SearchBar variant="default" />
                  <Link
                    href="/app"
                    className={cn(
                      "inline-flex items-center justify-center",
                      "px-4 py-2 text-sm font-medium rounded-[var(--radius-lg)]",
                      "bg-[var(--patina-charcoal)] text-[var(--patina-off-white)]",
                      "hover:bg-[var(--patina-mocha-brown)]",
                      "transition-all duration-300"
                    )}
                  >
                    Get the App
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden p-2 -mr-2"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <svg
                    className="w-6 h-6 text-[var(--patina-charcoal)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
