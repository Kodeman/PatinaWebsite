"use client";

interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
}

/**
 * Accessible skip link for keyboard navigation
 * Allows users to skip directly to main content
 */
export function SkipLink({
  href = "#main-content",
  children = "Skip to main content",
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--patina-charcoal)] focus:text-[var(--patina-off-white)] focus:rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--patina-clay-beige)] focus:ring-offset-2"
    >
      {children}
    </a>
  );
}
