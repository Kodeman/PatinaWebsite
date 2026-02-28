"use client";

import { useEffect } from "react";
import { FadeIn } from "@/components/motion";
import { useInView } from "@/hooks/useInView";
import { track } from "@/lib/analytics";
import { tierConfig } from "@/types/sanity";
import type { RoomHotspotData } from "./types";

interface ProjectSummaryStripProps {
  hotspots: RoomHotspotData[];
}

export function ProjectSummaryStrip({ hotspots }: ProjectSummaryStripProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.5 });

  const partnerCount = hotspots.filter((h) => h.tier === "partner").length;
  const curatedCount = hotspots.filter((h) => h.tier === "curated").length;
  const sourcedCount = hotspots.filter((h) => h.tier === "sourced").length;

  useEffect(() => {
    if (isInView) {
      track("room_summary_viewed", {
        total_products: hotspots.length,
        partner_count: partnerCount,
        curated_count: curatedCount,
        sourced_count: sourcedCount,
      });
    }
  }, [isInView, hotspots.length, partnerCount, curatedCount, sourcedCount]);

  return (
    <FadeIn delay={0.2}>
      <div
        ref={ref}
        className="mt-8 flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-white rounded-[var(--radius-lg)] border border-[var(--patina-clay-beige)]/10 shadow-[var(--shadow-sm)]"
      >
        <div className="flex flex-wrap items-center gap-6">
          <span className="text-sm font-medium text-[var(--patina-charcoal)]">
            {hotspots.length} products in this room
          </span>

          <div className="hidden sm:flex items-center gap-4">
            {[
              { tier: "partner" as const, count: partnerCount },
              { tier: "curated" as const, count: curatedCount },
              { tier: "sourced" as const, count: sourcedCount },
            ].map(
              ({ tier, count }) =>
                count > 0 && (
                  <span
                    key={tier}
                    className="flex items-center gap-1.5 text-xs text-[var(--patina-mocha-brown)]"
                  >
                    <span style={{ color: tierConfig[tier].color }}>
                      {tierConfig[tier].icon}
                    </span>
                    {count} {tierConfig[tier].label}
                  </span>
                )
            )}
          </div>
        </div>

        <p className="text-sm text-[var(--patina-mocha-brown)] italic max-w-[220px] text-right">
          Rooms like this, curated for you — coming soon to founding members.
        </p>
      </div>
    </FadeIn>
  );
}
