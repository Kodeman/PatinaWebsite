"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "dark" | "outline" | "white";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function MagneticButton({
  children,
  href,
  variant = "dark",
  className,
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)";
    }
  }, []);

  const variantClasses = {
    dark: "bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] hover:bg-[var(--patina-charcoal-deep)]",
    outline:
      "bg-transparent border border-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] hover:bg-[var(--patina-charcoal)] hover:text-[var(--patina-off-white)] hover:border-[var(--patina-charcoal)]",
    white:
      "bg-[var(--patina-off-white)] text-[var(--patina-charcoal)] hover:bg-[var(--patina-pearl)]",
  };

  const baseClasses = cn(
    "inline-block relative font-body text-[14px] font-medium",
    "px-10 py-[18px] tracking-[0.03em]",
    "transition-[background-color,border-color,color] duration-300",
    "cursor-pointer",
    variantClasses[variant],
    className
  );

  const motionStyle = {
    transition: `transform 0.4s var(--ease-out-quart), background-color 0.3s, border-color 0.3s, color 0.3s`,
  };

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={baseClasses}
        style={motionStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={baseClasses}
      style={motionStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
