// Sanity Document Types

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
      lqip?: string;
    };
  };
  alt?: string;
  caption?: string;
}

export interface Material {
  _id: string;
  name: string;
  origin?: string;
  colorHex?: string;
  description?: string;
}

export interface Maker {
  _id: string;
  name: string;
  slug: string;
  location?: string;
  foundedYear?: number;
  story?: unknown[]; // Portable Text blocks
  quote?: string;
  yearsOfCraft?: number;
  badges?: string[];
  image?: SanityImage;
  imageUrl?: string;
  workshopImages?: SanityImage[];
  products?: ProductCard[];
}

export interface ProductDimensions {
  width?: string;
  depth?: string;
  height?: string;
  seatHeight?: string;
}

export type SustainabilityBadge = "fsc" | "carbon-neutral" | "recycled" | "local" | "handmade";

export const sustainabilityBadgeLabels: Record<SustainabilityBadge, string> = {
  fsc: "FSC Certified",
  "carbon-neutral": "Carbon Neutral",
  recycled: "Recycled Materials",
  local: "Locally Sourced",
  handmade: "Handcrafted",
};

export interface ProductCard {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description?: string;
  imageUrl: string;
  category: ProductCategory;
  productType?: ProductType;
  featured?: boolean;
  inStock?: boolean;
  sustainabilityBadges?: SustainabilityBadge[];
  maker?: {
    name: string;
    badge?: string;
  };
  material?: {
    name: string;
    origin?: string;
    colorHex?: string;
    description?: string;
  };
}

export interface ProductShipping {
  method: string;
  estimate: string;
  includes?: string[];
}

export interface Product extends ProductCard {
  longDescription?: unknown[]; // Portable Text blocks
  leadTime?: string;
  arModelUrl?: string;
  dimensions?: ProductDimensions;
  mainImage: SanityImage;
  gallery?: SanityImage[];
  maker: Maker;
  material?: Material;
  secondaryMaterials?: Material[];
  careInstructions?: string[];
  shipping?: ProductShipping;
}

export type ProductCategory =
  | "living-room"
  | "bedroom"
  | "dining"
  | "office"
  | "outdoor";

export type ProductType =
  | "chair"
  | "table"
  | "sofa"
  | "bed"
  | "storage"
  | "lighting"
  | "accessory";

export const categoryLabels: Record<ProductCategory, string> = {
  "living-room": "Living Room",
  bedroom: "Bedroom",
  dining: "Dining",
  office: "Office",
  outdoor: "Outdoor",
};

export const productTypeLabels: Record<ProductType, string> = {
  chair: "Chairs",
  table: "Tables",
  sofa: "Sofas",
  bed: "Beds",
  storage: "Storage",
  lighting: "Lighting",
  accessory: "Accessories",
};
