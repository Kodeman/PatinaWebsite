"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  /** Use asChild to render as a different element (e.g., Link) */
  asChild?: boolean;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-medium font-body
      rounded-[var(--radius-lg)]
      transition-all duration-[var(--duration-normal)] ease-[var(--ease-patina)]
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--patina-clay-beige)] focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-[0.98]
    `;

    const variants = {
      primary: `
        bg-[var(--patina-clay-beige)] text-[var(--patina-off-white)]
        hover:bg-[var(--patina-mocha-brown)]
        shadow-[0_4px_12px_rgba(163,146,124,0.25)]
        hover:shadow-[0_6px_20px_rgba(163,146,124,0.35)]
      `,
      secondary: `
        bg-transparent text-[var(--patina-charcoal)]
        border-2 border-[var(--patina-clay-beige)]
        hover:bg-[var(--patina-soft-cream)]
        hover:border-[var(--patina-mocha-brown)]
      `,
      dark: `
        bg-[var(--patina-charcoal)] text-[var(--patina-off-white)]
        hover:bg-[var(--patina-mocha-brown)]
        shadow-[0_4px_12px_rgba(63,59,55,0.2)]
      `,
      ghost: `
        bg-transparent text-[var(--patina-mocha-brown)]
        hover:bg-[var(--patina-soft-cream)]
        hover:text-[var(--patina-charcoal)]
      `,
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-[0.9375rem]",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
