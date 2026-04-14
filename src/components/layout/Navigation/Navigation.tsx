"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { StrataMark } from "@/components/ui/StrataMark";
import { FoundingPopover } from "@/components/ui/FoundingPopover";
import { MobileMenu } from "../MobileMenu";

const navLinks = [
  { href: "/makers", label: "Our Makers" },
  { href: "/app", label: "The App" },
  { href: "/designers", label: "For Designers" },
  { href: "/about", label: "Our Story" },
  { href: "/journal", label: "Journal" },
];

export interface NavigationProps {
  /** Use dark variant for dark backgrounds */
  variant?: "default" | "dark" | "transparent";
  /** Hide the nav when at the very top of the page (for hero sections) */
  hideAtTop?: boolean;
}

export function Navigation({ variant = "default", hideAtTop = false }: NavigationProps) {
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
    isScrolled && variant === "default" && "shadow-[var(--shadow-md)]",
    hideAtTop && !isScrolled && "opacity-0 pointer-events-none -translate-y-full",
    hideAtTop && isScrolled && "opacity-100 pointer-events-auto translate-y-0",
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
      <nav aria-label="Main navigation" className={containerClasses}>
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

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <FoundingPopover isDark={isDark} />
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
