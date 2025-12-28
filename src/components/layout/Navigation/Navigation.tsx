"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { StrataMark } from "@/components/ui/StrataMark";
import { SearchBar } from "@/components/ui/SearchBar";
import { MobileMenu } from "../MobileMenu";

const navLinks = [
  { href: "/furniture", label: "Discover" },
  { href: "/furniture", label: "Furniture" },
  { href: "/designers", label: "Designers" },
  { href: "/about", label: "Our Story" },
];

export interface NavigationProps {
  /** Use dark variant for dark backgrounds */
  variant?: "default" | "dark" | "transparent";
}

export function Navigation({ variant = "default" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = variant === "dark" || variant === "transparent";

  const containerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    variant === "default" && "bg-[var(--patina-warm-white)] border-b border-[rgba(163,146,124,0.1)]",
    variant === "dark" && "bg-[var(--patina-charcoal)]",
    variant === "transparent" && !isScrolled && "bg-transparent",
    variant === "transparent" && isScrolled && "bg-[var(--patina-charcoal)]/95 backdrop-blur-sm",
    isScrolled && variant === "default" && "shadow-[var(--shadow-md)]"
  );

  const linkClasses = cn(
    "text-sm transition-colors duration-200",
    isDark
      ? "text-[rgba(237,233,228,0.7)] hover:text-[var(--patina-off-white)]"
      : "text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)]"
  );

  const wordmarkClasses = cn(
    "font-display text-xl font-medium tracking-[0.2em]",
    isDark ? "text-[var(--patina-off-white)]" : "text-[var(--patina-charcoal)]"
  );

  return (
    <>
      <nav className={containerClasses}>
        {/* Paper texture overlay for default variant */}
        {variant === "default" && (
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-[60px] lg:h-[80px]">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start">
              <span className={wordmarkClasses}>PATINA</span>
              <StrataMark
                size="compact"
                variant={isDark ? "reversed" : "default"}
                align="left"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link key={link.href + link.label} href={link.href} className={linkClasses}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search and CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <SearchBar variant={isDark ? "dark" : "default"} />

              {/* CTA Button */}
              <Link
                href="/app"
                className={cn(
                  "inline-flex items-center justify-center",
                  "px-4 py-2 text-sm font-medium rounded-[var(--radius-lg)]",
                  "transition-all duration-[var(--duration-normal)] ease-[var(--ease-patina)]",
                  isDark
                    ? "bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] hover:bg-[var(--patina-off-white)]"
                    : "bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] hover:bg-[var(--patina-mocha-brown)]"
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
                className={cn("w-6 h-6", isDark ? "text-[var(--patina-off-white)]" : "text-[var(--patina-charcoal)]")}
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
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
