import type { ProductTier } from "@/types/sanity";

export interface RoomHotspotData {
  id: string;
  xPercent: number;
  yPercent: number;
  productName: string;
  productPrice: number;
  productMaker?: string;
  tier: ProductTier;
  designerNote?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface TheRoomProps {
  header?: {
    eyebrow?: string;
    headline?: string;
    subheadline?: string;
  };
  imageUrl?: string;
  hotspots?: RoomHotspotData[];
}
