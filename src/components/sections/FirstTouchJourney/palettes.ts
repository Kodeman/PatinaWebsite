import type { Palette } from "./types";

export const palettes: Palette[] = [
  {
    id: "warm-minimalist",
    name: "Warm Minimalist",
    tagline: "Natural wood, soft light, breathing room",
    description: "Clean lines meet organic warmth. Every piece earns its place.",
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724326622944?w=1200&h=1600&fit=crop&q=80",
    responseMessage: "Less, but warmer. We'll find you pieces that breathe.",
  },
  {
    id: "moody-traditional",
    name: "Moody Traditional",
    tagline: "Deep tones, layered textures, storied pieces",
    description: "Rooms that feel collected, not decorated. History in every corner.",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=1600&fit=crop&q=80",
    responseMessage: "Depth and story. We'll find you pieces with presence.",
  },
  {
    id: "coastal-calm",
    name: "Coastal Calm",
    tagline: "Breezy whites, sea-glass blues, linen ease",
    description: "Light, air, and the feeling of salt on skin.",
    imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=1600&fit=crop&q=80",
    responseMessage: "Light and easy. We'll find you pieces that breathe sea air.",
  },
  {
    id: "bold-eclectic",
    name: "Bold Eclectic",
    tagline: "Confident color, curated chaos, personality first",
    description: "Rules are for other people. Your space, your statement.",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=1600&fit=crop&q=80",
    responseMessage: "Fearlessly you. We'll find you pieces that stand out.",
  },
  {
    id: "modern-luxe",
    name: "Modern Luxe",
    tagline: "Cool marble, warm brass, quiet opulence",
    description: "Sophistication without shouting. Luxury in the details.",
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=1600&fit=crop&q=80",
    responseMessage: "Refined restraint. We'll find you pieces that whisper luxury.",
  },
  {
    id: "organic-modern",
    name: "Organic Modern",
    tagline: "Soft curves, living green, earthen warmth",
    description: "Nature inside. Where the outside and in become one.",
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=1600&fit=crop&q=80",
    responseMessage: "Grounded and alive. We'll find you pieces that grow with you.",
  },
];

/**
 * Get a combined response message when multiple palettes are selected
 */
export function getCombinedResponseMessage(selectedIds: string[]): string {
  if (selectedIds.length === 0) return "";

  if (selectedIds.length === 1) {
    const palette = palettes.find((p) => p.id === selectedIds[0]);
    return palette?.responseMessage || "";
  }

  // Multiple selections - create a combined message
  const selectedPalettes = selectedIds
    .map((id) => palettes.find((p) => p.id === id))
    .filter(Boolean) as Palette[];

  if (selectedPalettes.length === 2) {
    return `${selectedPalettes[0].name} meets ${selectedPalettes[1].name}. We love your eclectic vision.`;
  }

  return `${selectedPalettes.map((p) => p.name).join(", ")}. You contain multitudes. So will your space.`;
}
