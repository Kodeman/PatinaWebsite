"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

interface ServicesCTAProps {
  href: string;
  label: string;
  location: string;
  variant?: "primary-dark" | "primary-light" | "outline-light";
  className?: string;
}

export function ServicesCTA({
  href,
  label,
  location,
  variant = "primary-dark",
  className = "",
}: ServicesCTAProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-8 py-4 font-medium text-sm tracking-wide uppercase transition-all duration-300 rounded-[var(--radius-lg)]";

  const variantClasses = {
    "primary-dark":
      "bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] hover:bg-[var(--patina-mocha-brown)] shadow-lg",
    "primary-light":
      "bg-[var(--patina-off-white)] text-[var(--patina-charcoal)] hover:bg-[var(--patina-clay-beige)] shadow-lg",
    "outline-light":
      "border border-[var(--patina-clay-beige)] text-[var(--patina-off-white)] hover:bg-[rgba(237,233,228,0.08)]",
  };

  const handleClick = () => {
    track("cta_click", {
      cta_text: label,
      cta_location: location,
      destination: href,
      page: "/services",
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {label}
    </Link>
  );
}
