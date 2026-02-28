"use client";

import { tierConfig } from "@/types/sanity";
import type { RoomHotspotData } from "./types";

interface ProductHotspotCardProps {
  hotspot: RoomHotspotData;
  onClose: () => void;
}

export function ProductHotspotCard({ hotspot, onClose }: ProductHotspotCardProps) {
  const tier = tierConfig[hotspot.tier];

  return (
    <div className="bg-white rounded-[var(--radius-lg)] shadow-[0_12px_40px_rgba(0,0,0,0.15)] p-5 w-[280px] relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] transition-colors"
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
      </button>

      {/* Tier badge */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
          style={{ backgroundColor: `${tier.color}20`, color: tier.color }}
        >
          {tier.icon}
        </span>
        <span className="text-[0.7rem] font-medium tracking-wide uppercase text-[var(--patina-mocha-brown)]">
          {tier.label}
        </span>
      </div>

      {/* Product info */}
      <h4 className="font-display text-base font-medium text-[var(--patina-charcoal)] mb-1">
        {hotspot.productName}
      </h4>

      {hotspot.productMaker && hotspot.tier === "partner" && (
        <p className="text-xs text-[var(--patina-mocha-brown)] mb-2">
          by {hotspot.productMaker}
        </p>
      )}

      <p className="text-sm font-medium text-[var(--patina-charcoal)] mb-3">
        ${hotspot.productPrice.toLocaleString()}
      </p>

      {/* Designer note */}
      {hotspot.designerNote && (
        <p className="text-xs text-[var(--patina-mocha-brown)] italic border-t border-[var(--patina-clay-beige)]/15 pt-3 mb-3 leading-relaxed">
          &ldquo;{hotspot.designerNote}&rdquo;
        </p>
      )}

      {/* CTA by tier */}
      {hotspot.tier === "partner" && (
        <a
          href={hotspot.ctaUrl || "#"}
          className="text-xs font-medium text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] transition-colors flex items-center gap-1"
        >
          See the maker&apos;s story
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4.5 2.5l4 3.5-4 3.5" />
          </svg>
        </a>
      )}
      {hotspot.tier === "curated" && (
        <a
          href={hotspot.ctaUrl || "#"}
          className="text-xs font-medium text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] transition-colors flex items-center gap-1"
        >
          {hotspot.ctaLabel || `Buy from ${hotspot.productMaker || "brand"}`}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4.5 2.5l4 3.5-4 3.5" />
          </svg>
        </a>
      )}
      {hotspot.tier === "sourced" && (
        <a
          href={hotspot.ctaUrl || "#"}
          className="text-xs font-medium text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] transition-colors flex items-center gap-1"
        >
          {hotspot.ctaLabel || "Find your local dealer"}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4.5 2.5l4 3.5-4 3.5" />
          </svg>
        </a>
      )}
    </div>
  );
}
