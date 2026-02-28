"use client";

import { FadeIn } from "@/components/motion";
import { InteractiveRoomViewer } from "./InteractiveRoomViewer";
import { ProjectSummaryStrip } from "./ProjectSummaryStrip";
import type { RoomHotspotData, TheRoomProps } from "./types";

const defaultHotspots: RoomHotspotData[] = [
  {
    id: "dining-table",
    xPercent: 48,
    yPercent: 55,
    productName: "Heirloom Dining Table",
    productPrice: 4200,
    productMaker: "Woodward & Sons",
    tier: "partner",
    designerNote: "Hand-joined solid walnut. The grain pattern on this one is exceptional — it'll darken beautifully over the years.",
    ctaUrl: "#",
  },
  {
    id: "pendant-light",
    xPercent: 50,
    yPercent: 15,
    productName: "Woven Pendant Light",
    productPrice: 380,
    productMaker: "Lumière Studio",
    tier: "curated",
    designerNote: "We chose this for the warm diffusion. It makes dinner look candlelit even on a Tuesday.",
    ctaUrl: "#",
  },
  {
    id: "dining-chairs",
    xPercent: 30,
    yPercent: 60,
    productName: "Spindle-Back Dining Chair",
    productPrice: 890,
    productMaker: "Nordic Atelier",
    tier: "partner",
    designerNote: "These actually get more comfortable as the wood wears to your shape.",
    ctaUrl: "#",
  },
  {
    id: "sideboard",
    xPercent: 82,
    yPercent: 48,
    productName: "Mid-Century Credenza",
    productPrice: 1650,
    productMaker: "Room & Board",
    tier: "curated",
    designerNote: "Clean lines that let the dining table be the hero. The walnut tone is a near-perfect match.",
    ctaUrl: "#",
  },
  {
    id: "table-runner",
    xPercent: 48,
    yPercent: 48,
    productName: "Linen Table Runner",
    productPrice: 65,
    tier: "sourced",
    designerNote: "Belgian linen in 'oatmeal' — softens with every wash.",
    ctaUrl: "#",
  },
  {
    id: "wall-art",
    xPercent: 15,
    yPercent: 25,
    productName: "Abstract Landscape Print",
    productPrice: 220,
    productMaker: "Juniper Press",
    tier: "sourced",
    designerNote: "The muted earth tones pull color from the table grain into the rest of the room.",
    ctaUrl: "#",
  },
  {
    id: "ceramics",
    xPercent: 65,
    yPercent: 42,
    productName: "Stoneware Serving Set",
    productPrice: 145,
    productMaker: "East Fork Pottery",
    tier: "curated",
    ctaUrl: "#",
  },
];

const defaultImageUrl =
  "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&h=900&fit=crop&q=80";

export function TheRoom({ header, imageUrl, hotspots }: TheRoomProps) {
  const displayHotspots = hotspots?.length ? hotspots : defaultHotspots;
  const displayImageUrl = imageUrl || defaultImageUrl;

  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]" id="the-room">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <p className="text-label text-[var(--patina-clay-beige)] mb-3">
            {header?.eyebrow || "SEE THE COMPLETE ROOM"}
          </p>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
            {header?.headline || "Every piece,"}{" "}
            <em className="italic text-[var(--patina-mocha-brown)]">
              {header?.subheadline || "one vision"}
            </em>
          </h2>
          <p className="text-lg text-[var(--patina-mocha-brown)] max-w-[600px] mx-auto">
            Tap the hotspots to explore a designer-curated room — from the handcrafted anchor pieces to the finishing details.
          </p>
        </FadeIn>

        <InteractiveRoomViewer
          imageUrl={displayImageUrl}
          hotspots={displayHotspots}
        />

        <ProjectSummaryStrip hotspots={displayHotspots} />
      </div>
    </section>
  );
}
