"use client";

import Link from "next/link";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { MaterialTag } from "@/components/ui/MaterialTag";
import { SustainabilityBadge } from "@/components/ui/SustainabilityBadge";
import { useProductViewTracking } from "@/hooks";
import type { ProductCard as ProductCardType } from "@/types/sanity";

export interface ProductCardProps {
  product: ProductCardType;
  priority?: boolean;
  position?: number;
  source?: "catalog" | "related" | "search" | "homepage";
  className?: string;
}

export function ProductCard({
  product,
  priority = false,
  position = 0,
  source = "catalog",
  className,
}: ProductCardProps) {
  // Track when product card comes into view
  const trackingRef = useProductViewTracking<HTMLAnchorElement>({
    product_id: product._id,
    product_name: product.name,
    price: product.price,
    category: product.category,
    maker: product.maker?.name,
    position,
    source,
  });

  return (
    <Link
      ref={trackingRef}
      href={`/furniture/${product.slug}`}
      className={cn(
        "group block rounded-[var(--radius-xl)] overflow-hidden",
        "bg-[var(--patina-warm-white)]",
        "transition-all duration-[var(--duration-normal)] ease-[var(--ease-patina)]",
        "hover:translate-y-[-4px]",
        "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#D8D2C8] to-[#C4BDB0]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-[var(--patina-mocha-brown)] bg-white/80 px-4 py-2 rounded-md">
              Product Image
            </span>
          </div>
        )}

        {/* Badges Container */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          {/* Maker Badge */}
          {product.maker?.badge && (
            <div className="bg-white/[0.88] backdrop-blur-sm px-3 py-1.5 rounded-full">
              <span className="text-xs font-medium text-[var(--patina-charcoal)]">
                {product.maker.badge}
              </span>
            </div>
          )}

          {/* Sustainability Badges */}
          {product.sustainabilityBadges && product.sustainabilityBadges.length > 0 && (
            <div className="flex gap-1">
              {product.sustainabilityBadges.slice(0, 2).map((badge) => (
                <SustainabilityBadge key={badge} badge={badge} size="sm" />
              ))}
            </div>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {product.inStock === false && (
          <div className="absolute inset-0 bg-[var(--patina-charcoal)]/40 flex items-center justify-center">
            <span className="text-sm font-medium text-white bg-[var(--patina-charcoal)]/80 px-4 py-2 rounded-full">
              Currently Unavailable
            </span>
          </div>
        )}

        {/* Material Tag */}
        {product.material && (
          <div className="absolute bottom-4 left-4">
            <MaterialTag
              name={product.material.name}
              origin={product.material.origin}
              colorHex={product.material.colorHex}
              description={product.material.description}
              size="sm"
            />
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--patina-charcoal)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <svg className="w-4 h-4 text-[var(--patina-charcoal)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-medium text-[var(--patina-charcoal)]">Quick View</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Maker Name */}
        {product.maker?.name && (
          <p className="text-xs uppercase tracking-wider text-[var(--patina-clay-beige)] mb-1">
            {product.maker.name}
          </p>
        )}

        {/* Product Name */}
        <h3 className="text-lg font-display font-medium text-[var(--patina-charcoal)] mb-2 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-[var(--patina-mocha-brown)] mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <p className="text-lg font-medium text-[var(--patina-charcoal)]">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
