"use client";

import Link from "next/link";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    title: "See It In Your Space",
    description: "Use AR to place furniture in your room before you buy. No guessing, no measuring—just clarity.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Know the Makers",
    description: "Every piece comes with its story—the craftspeople, traditions, and materials that make it special.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Quality That Lasts",
    description: "Furniture built to become heirlooms. Materials and craftsmanship that age beautifully.",
  },
];

export function ValuePropositionSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-label text-[var(--patina-clay-beige)] mb-3">
            Why Patina
          </p>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
            Furniture with <em className="italic text-[var(--patina-mocha-brown)]">meaning</em>
          </h2>
          <p className="text-lg text-[var(--patina-mocha-brown)] max-w-xl mx-auto">
            Every piece tells a story of craftsmanship, materials, and the makers who bring them to life.
          </p>
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <div className="bg-[var(--patina-warm-white)] rounded-[var(--radius-xl)] p-8 text-center shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-300 h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--patina-off-white)] text-[var(--patina-clay-beige)] mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-heading-3 text-[var(--patina-charcoal)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--patina-mocha-brown)]">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

export function AppCTASection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden">
      {/* Paper texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <FadeIn className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-label text-[var(--patina-clay-beige)] mb-3">
          Get Started
        </p>
        <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-4">
          Ready to find your next <em className="italic text-[var(--patina-clay-beige)]">heirloom</em>?
        </h2>
        <p className="text-lg text-[rgba(237,233,228,0.75)] max-w-xl mx-auto mb-10">
          Download the Patina app to explore furniture in AR, discover makers, and connect with designers.
        </p>

        <Link
          href="/app"
          className="inline-flex items-center gap-3 bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] px-8 py-4 rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-off-white)] shadow-lg"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Download on the App Store
        </Link>
      </FadeIn>
    </section>
  );
}
