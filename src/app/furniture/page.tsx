import { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CatalogContent } from "./CatalogContent";
import type { ProductCard } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Furniture Collection | Patina",
  description:
    "Discover handcrafted furniture from artisans around the world. Each piece tells a story of craftsmanship, materials, and the makers who bring them to life.",
};

// Sample products for development (will be replaced with Sanity data)
const sampleProducts: ProductCard[] = [
  {
    _id: "1",
    name: "Noma Dining Chair",
    slug: "noma-dining-chair",
    price: 895,
    description:
      "Hand-shaped white oak with woven paper cord seat. A tribute to Danish craft traditions.",
    imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&h=1000&fit=crop&q=80",
    category: "dining",
    productType: "chair",
    featured: true,
    inStock: true,
    maker: {
      name: "Nakashima Workshop",
      badge: "3rd Generation",
    },
    material: {
      name: "White Oak",
      origin: "Vermont",
      colorHex: "#C4A574",
    },
  },
  {
    _id: "2",
    name: "Atelier Coffee Table",
    slug: "atelier-coffee-table",
    price: 2450,
    description:
      "Live edge walnut slab with hand-forged iron base. Each piece uniquely shaped by nature.",
    imageUrl: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&h=1000&fit=crop&q=80",
    category: "living-room",
    productType: "table",
    featured: true,
    inStock: true,
    maker: {
      name: "Vermont Woodworks",
      badge: "50+ Years",
    },
    material: {
      name: "Black Walnut",
      origin: "Pennsylvania",
      colorHex: "#5C4033",
    },
  },
  {
    _id: "3",
    name: "Kyoto Platform Bed",
    slug: "kyoto-platform-bed",
    price: 3850,
    description:
      "Minimalist solid maple frame with traditional Japanese joinery. No hardware required.",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=1000&fit=crop&q=80",
    category: "bedroom",
    productType: "bed",
    featured: false,
    inStock: true,
    maker: {
      name: "Sashimono Studio",
      badge: "Master Craftsman",
    },
    material: {
      name: "Hard Maple",
      origin: "Quebec",
      colorHex: "#E8D4B8",
    },
  },
  {
    _id: "4",
    name: "Archipelago Bookshelf",
    slug: "archipelago-bookshelf",
    price: 1895,
    description:
      "Modular ash wood shelving with brass accents. Grows with your collection.",
    imageUrl: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=1000&fit=crop&q=80",
    category: "office",
    productType: "storage",
    featured: true,
    inStock: true,
    maker: {
      name: "Studio Piet",
      badge: "Carbon Neutral",
    },
    material: {
      name: "White Ash",
      origin: "Michigan",
      colorHex: "#D4C9B8",
    },
  },
  {
    _id: "5",
    name: "Haven Lounge Chair",
    slug: "haven-lounge-chair",
    price: 2195,
    description:
      "Sculptural form with vegetable-tanned leather. Ages beautifully over decades of use.",
    imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=1000&fit=crop&q=80",
    category: "living-room",
    productType: "chair",
    featured: true,
    inStock: true,
    maker: {
      name: "Woodward & Sons",
      badge: "4th Generation",
    },
    material: {
      name: "Cherry",
      origin: "Virginia",
      colorHex: "#8B4513",
    },
  },
  {
    _id: "6",
    name: "Fjord Sideboard",
    slug: "fjord-sideboard",
    price: 4250,
    description:
      "Hand-carved oak with soft-close drawers. Inspired by Scandinavian fjord landscapes.",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop&q=80",
    category: "dining",
    productType: "storage",
    featured: false,
    inStock: false,
    maker: {
      name: "Nordic Atelier",
      badge: "Slow Made",
    },
    material: {
      name: "European Oak",
      origin: "Denmark",
      colorHex: "#A0826D",
    },
  },
];

export default function FurniturePage() {
  // In production, fetch from Sanity:
  // const products = await client.fetch(productsQuery);
  const products = sampleProducts;

  const categories = [
    { value: "all", label: "All" },
    { value: "living-room", label: "Living Room" },
    { value: "dining", label: "Dining" },
    { value: "bedroom", label: "Bedroom" },
    { value: "office", label: "Office" },
  ];

  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-soft-cream)]">
        {/* Page Header */}
        <section className="pt-32 pb-12 bg-[var(--patina-warm-white)]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              Collection
            </p>
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-4">
              Furniture with{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">
                provenance
              </em>
            </h1>
            <p className="text-lg text-[var(--patina-mocha-brown)] max-w-xl">
              Each piece in our collection is handcrafted by artisans who have
              dedicated their lives to their craft. Browse by room or discover
              something unexpected.
            </p>
          </div>
        </section>

        {/* Catalog Content */}
        <CatalogContent products={products} categories={categories} />
      </main>

      <Footer />
    </>
  );
}
