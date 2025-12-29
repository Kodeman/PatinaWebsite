"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
  lqip?: string;
}

export interface ProductGalleryProps {
  images: GalleryImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden bg-gradient-to-br from-[#D8D2C8] to-[#C4BDB0] flex items-center justify-center">
        <span className="text-xs tracking-widest uppercase text-[var(--patina-mocha-brown)] bg-white/80 px-4 py-2 rounded-md">
          Product Gallery
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden bg-gradient-to-br from-[#D8D2C8] to-[#C4BDB0]">
        {images[activeIndex]?.url ? (
          <Image
            src={images[activeIndex].url}
            alt={images[activeIndex].alt || `${productName} - Image ${activeIndex + 1}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-[var(--patina-mocha-brown)] bg-white/80 px-4 py-2 rounded-md">
              {productName}
            </span>
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div
            className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="sr-only">Viewing image </span>
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {/* Caption */}
        {images[activeIndex]?.caption && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[var(--patina-charcoal)] text-sm px-4 py-2 rounded-lg max-w-xs">
            {images[activeIndex].caption}
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-[var(--patina-clay-beige)] focus-visible:ring-offset-2"
              aria-label="Previous image"
            >
              <svg
                className="w-5 h-5 text-[var(--patina-charcoal)]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-[var(--patina-clay-beige)] focus-visible:ring-offset-2"
              aria-label="Next image"
            >
              <svg
                className="w-5 h-5 text-[var(--patina-charcoal)]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden",
                "transition-all duration-200",
                "ring-2 ring-offset-2",
                "focus-visible:ring-[var(--patina-clay-beige)]",
                index === activeIndex
                  ? "ring-[var(--patina-clay-beige)]"
                  : "ring-transparent hover:ring-[var(--patina-clay-beige)]/50"
              )}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              {image.url ? (
                <Image
                  src={image.url}
                  alt={image.alt || `${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#D8D2C8] to-[#C4BDB0]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
