"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface MaterialTagProps {
  name: string;
  origin?: string;
  colorHex?: string;
  description?: string;
  size?: "sm" | "md";
  interactive?: boolean;
  className?: string;
}

export function MaterialTag({
  name,
  origin,
  colorHex = "#8B7355",
  description,
  size = "md",
  interactive = true,
  className,
}: MaterialTagProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sizeStyles = {
    sm: {
      container: "px-2.5 py-1.5 gap-1.5",
      swatch: "w-4 h-4",
      text: "text-[0.625rem]",
    },
    md: {
      container: "px-4 py-3 gap-2",
      swatch: "w-6 h-6",
      text: "text-[0.6875rem]",
    },
  };

  const styles = sizeStyles[size];
  const hasExpandedContent = interactive && (description || origin);

  return (
    <div
      className={cn(
        "relative group",
        className
      )}
      onMouseEnter={() => hasExpandedContent && setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Base Tag */}
      <div
        className={cn(
          "inline-flex items-center bg-white/[0.92] backdrop-blur-sm rounded-[var(--radius-md)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
          "transition-all duration-200",
          hasExpandedContent && "cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]",
          styles.container
        )}
      >
        <div
          className={cn(
            "rounded-full border-2 border-white/80 transition-transform duration-200",
            hasExpandedContent && "group-hover:scale-110",
            styles.swatch
          )}
          style={{
            background: `linear-gradient(135deg, ${colorHex} 0%, ${adjustColor(colorHex, -20)} 100%)`,
          }}
        />
        <div className={cn("leading-tight", styles.text)}>
          <div className="font-semibold text-[var(--patina-charcoal)]">{name}</div>
          {origin && !isExpanded && (
            <div className="text-[var(--patina-clay-beige)]">{origin}</div>
          )}
        </div>
        {hasExpandedContent && (
          <svg
            className={cn(
              "w-3 h-3 text-[var(--patina-clay-beige)] transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        )}
      </div>

      {/* Expanded Content */}
      {hasExpandedContent && (
        <div
          className={cn(
            "absolute left-0 top-full mt-1 z-10 min-w-[200px] max-w-[280px]",
            "bg-white rounded-[var(--radius-lg)] shadow-[0_8px_24px_rgba(0,0,0,0.15)]",
            "overflow-hidden transition-all duration-200 origin-top",
            isExpanded
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          )}
        >
          <div className="p-4">
            {/* Material Color Bar */}
            <div
              className="h-2 rounded-full mb-3"
              style={{
                background: `linear-gradient(90deg, ${colorHex} 0%, ${adjustColor(colorHex, 30)} 100%)`,
              }}
            />

            {/* Material Info */}
            <h4 className="font-display font-semibold text-sm text-[var(--patina-charcoal)] mb-1">
              {name}
            </h4>

            {origin && (
              <p className="text-xs text-[var(--patina-clay-beige)] flex items-center gap-1 mb-2">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {origin}
              </p>
            )}

            {description && (
              <p className="text-xs text-[var(--patina-mocha-brown)] leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
