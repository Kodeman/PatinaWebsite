"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { tierConfig } from "@/types/sanity";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { track } from "@/lib/analytics";
import { ProductHotspotCard } from "./ProductHotspotCard";
import type { RoomHotspotData } from "./types";

interface InteractiveRoomViewerProps {
  imageUrl: string;
  hotspots: RoomHotspotData[];
}

export function InteractiveRoomViewer({ imageUrl, hotspots }: InteractiveRoomViewerProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleHotspotClick = useCallback(
    (hotspot: RoomHotspotData) => {
      if (activeHotspot === hotspot.id) {
        setActiveHotspot(null);
        return;
      }
      setActiveHotspot(hotspot.id);
      track("room_hotspot_clicked", {
        hotspot_id: hotspot.id,
        product_name: hotspot.productName,
        tier: hotspot.tier,
      });
    },
    [activeHotspot]
  );

  const handleClose = useCallback(() => {
    setActiveHotspot(null);
  }, []);

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[var(--radius-xl)] overflow-hidden bg-[var(--patina-soft-cream)]">
      <Image
        src={imageUrl}
        alt="Designer-curated room showing the complete Patina experience"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
        priority
      />

      {/* Subtle overlay for hotspot contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

      {/* Hotspot buttons */}
      {hotspots.map((hotspot) => {
        const tier = tierConfig[hotspot.tier];
        const isActive = activeHotspot === hotspot.id;

        return (
          <div
            key={hotspot.id}
            className="absolute"
            style={{
              left: `${hotspot.xPercent}%`,
              top: `${hotspot.yPercent}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Pulse ring (not for reduced motion) */}
            {!prefersReducedMotion && !isActive && (
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{
                  backgroundColor: tier.color,
                  animationDuration: "2.5s",
                }}
              />
            )}

            {/* Hotspot button */}
            <button
              onClick={() => handleHotspotClick(hotspot)}
              className={cn(
                "relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center",
                "border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
                "transition-all duration-300 cursor-pointer",
                "hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2",
                isActive && "scale-110 ring-2 ring-white"
              )}
              style={{ backgroundColor: tier.color }}
              aria-label={`View ${hotspot.productName}`}
              aria-expanded={isActive}
            >
              <span className="text-white text-xs font-medium">
                {tier.icon}
              </span>
            </button>

            {/* Desktop card - positioned near hotspot */}
            {isActive && (
              <div
                className={cn(
                  "hidden sm:block absolute z-20",
                  hotspot.xPercent > 60 ? "right-full mr-3" : "left-full ml-3",
                  "top-1/2 -translate-y-1/2"
                )}
              >
                <ProductHotspotCard hotspot={hotspot} onClose={handleClose} />
              </div>
            )}
          </div>
        );
      })}

      {/* Mobile bottom sheet card */}
      {activeHotspot && (
        <div className="sm:hidden absolute bottom-0 left-0 right-0 z-20 animate-in slide-in-from-bottom duration-300">
          <div className="px-4 pb-4">
            <ProductHotspotCard
              hotspot={hotspots.find((h) => h.id === activeHotspot)!}
              onClose={handleClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}
