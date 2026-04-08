"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FadeIn, StaggerChildren, StaggerItem, ScaleIn } from "@/components/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { StrataMark } from "@/components/ui/StrataMark";
import { FoundingCircleForm } from "@/components/ui/FoundingCircleForm";
import { FoundingCounter } from "@/components/ui/FoundingCounter";

// ============================================
// Types
// ============================================

interface Maker {
  _id?: string;
  name: string;
  slug?: string;
  location: string;
  foundedYear?: number;
  yearsOfCraft?: number;
  badges?: string[];
  quote?: string;
  imageUrl?: string;
  story?: string;
}

interface Testimonial {
  _id?: string;
  quote: string;
  author: string;
  title?: string;
  location: string;
}

interface SectionHeader {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
}

interface CTA {
  label: string;
  href: string;
}

// ============================================
// Default Data
// ============================================

// No default makers — real makers come from Sanity CMS
const defaultMakers: Maker[] = [];

// No default testimonials — real testimonials come from Sanity CMS

const defaultHandoffItems = [
  "Your room\u2014measured down to the inch",
  "What you\u2019re drawn to, even things you didn\u2019t realize",
  "Every piece you saved along the way",
  "The designer insights that made you pause",
  "Plus every product in your project \u2014 from anchor pieces to paint colors \u2014 with the designer\u2019s notes on why each one was chosen.",
];

// ============================================
// First Touch Section (NEW)
// Interactive style preview
// ============================================

interface MaterialOption {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const materialOptions: MaterialOption[] = [
  {
    id: "warm-wood",
    name: "Warm Wood",
    description: "Oak, walnut, cherry—grains that tell stories",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "cool-stone",
    name: "Cool Stone",
    description: "Marble, slate, terrazzo—surfaces with presence",
    imageUrl: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "soft-fabric",
    name: "Soft Fabric",
    description: "Linen, cotton, wool—textures that invite touch",
    imageUrl: "https://images.unsplash.com/photo-1558171013-50e4b7c0c3c4?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "bold-leather",
    name: "Bold Leather",
    description: "Full-grain, vegetable-tanned—patina that develops",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&q=80",
  },
];

const personalizedResponses: Record<string, string> = {
  'warm-wood': "You're drawn to warmth. We'll remember that.",
  'cool-stone': "Clean and calm. We'll remember that.",
  'soft-fabric': "Comfort first. We'll remember that.",
  'bold-leather': "Character and patina. We'll remember that.",
};

export function FirstTouchSection() {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [showAcknowledgment, setShowAcknowledgment] = useState(false);
  const [responseText, setResponseText] = useState("We'll remember that.");
  const prefersReducedMotion = useReducedMotion();

  const handleSelect = (materialId: string) => {
    setSelectedMaterial(materialId);
    setResponseText(personalizedResponses[materialId] || "We'll remember that.");
    setShowAcknowledgment(true);

    // Reset acknowledgment after delay
    setTimeout(() => {
      setShowAcknowledgment(false);
    }, 3000);
  };

  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-off-white)]">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <p className="text-label text-[var(--patina-clay-beige)] mb-3">
            First, a question
          </p>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
            What <em className="italic text-[var(--patina-mocha-brown)]">draws your eye?</em>
          </h2>
          <p className="text-lg text-[var(--patina-mocha-brown)] max-w-lg mx-auto">
            Tap one—we&apos;ll remember.
          </p>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-2 gap-4 sm:gap-6 max-w-[600px] mx-auto" staggerDelay={0.1}>
          {materialOptions.map((material) => (
            <StaggerItem key={material.id}>
              <button
                onClick={() => handleSelect(material.id)}
                className={`
                  group relative aspect-square rounded-[var(--radius-xl)] overflow-hidden
                  transition-all duration-300 ease-[var(--ease-patina)]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--patina-clay-beige)] focus-visible:ring-offset-2
                  ${selectedMaterial === material.id
                    ? 'ring-2 ring-[var(--patina-clay-beige)] shadow-[var(--shadow-lg)]'
                    : 'hover:shadow-[var(--shadow-md)]'
                  }
                `}
              >
                <Image
                  src={material.imageUrl}
                  alt={material.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 45vw, 280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <p className="text-[var(--patina-off-white)] font-display font-medium text-lg mb-1">
                    {material.name}
                  </p>
                  <p className="text-[var(--patina-off-white)]/70 text-sm hidden sm:block">
                    {material.description}
                  </p>
                </div>
                {selectedMaterial === material.id && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--patina-clay-beige)] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Acknowledgment Message */}
        <div
          className={`
            text-center mt-8 transition-all duration-500
            ${showAcknowledgment ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}
        >
          <p className="font-display text-lg italic text-[var(--patina-mocha-brown)]">
            {responseText}
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Featured Makers Section (Expanded, moved up)
// ============================================

interface FeaturedMakersProps {
  header?: SectionHeader;
  body?: string;
  makers?: Maker[];
  testimonials?: Testimonial[];
}

// Helper to get initials from a name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function FeaturedMakersSection({ header, body, makers, testimonials }: FeaturedMakersProps) {
  const displayMakers = makers?.length ? makers : defaultMakers;

  // Find a maker-related testimonial from Sanity (no hardcoded fallback)
  const makerTestimonial = testimonials?.find(t =>
    t.quote.toLowerCase().includes('notes') ||
    t.quote.toLowerCase().includes('piece')
  );

  // If real makers exist from Sanity, show the maker cards
  if (displayMakers.length > 0) {
    return (
      <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]" id="makers">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              {header?.eyebrow || "The craftspeople"}
            </p>
            <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
              {header?.headline || "The anchor pieces."} <em className="italic text-[var(--patina-mocha-brown)]">Generations of craft.</em>
            </h2>
            <p className="text-lg text-[var(--patina-mocha-brown)] max-w-[600px] mx-auto leading-relaxed">
              {body || "Every Patina room starts with a story \u2014 a piece handcrafted by makers we know personally. These are the anchor pieces that define your space. The ones your kids will fight over someday. Everything else in the room? Chosen by our designers to make these pieces shine."}
            </p>
          </FadeIn>

          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" staggerDelay={0.1}>
            {displayMakers.slice(0, 3).map((maker, index) => (
              <StaggerItem key={maker._id || index}>
                <article className="bg-white rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-400 hover:-translate-y-1.5 h-full border border-[var(--patina-clay-beige)]/10">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[var(--patina-soft-cream)] to-[var(--patina-off-white)]">
                    {maker.imageUrl ? (
                      <Image
                        src={maker.imageUrl}
                        alt={`${maker.name} workshop`}
                        fill
                        className="object-cover transition-transform duration-600 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-[var(--patina-clay-beige)]/10">
                        <span className="text-[var(--patina-clay-beige)] text-sm">Workshop</span>
                      </div>
                    )}
                    {maker.badges && maker.badges[0] && (
                      <span className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded text-[0.65rem] font-medium tracking-wide uppercase text-[var(--patina-mocha-brown)]">
                        {maker.badges[0]}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-medium text-[var(--patina-charcoal)] mb-1">
                      {maker.name}
                    </h3>
                    <p className="text-sm text-[var(--patina-mocha-brown)] mb-2">
                      {maker.location}
                    </p>
                    {(maker.foundedYear || maker.yearsOfCraft) && (
                      <p className="text-xs text-[var(--patina-clay-beige)] flex items-center gap-2 mb-4">
                        <span className="w-5 h-px bg-[var(--patina-clay-beige)]" />
                        {maker.foundedYear && `Est. ${maker.foundedYear}`}
                        {maker.yearsOfCraft && ` · ${maker.yearsOfCraft} years`}
                      </p>
                    )}
                    {maker.story && (
                      <p className="text-[0.95rem] text-[var(--patina-mocha-brown)] leading-relaxed pt-4 border-t border-[var(--patina-clay-beige)]/10">
                        {maker.story}
                      </p>
                    )}
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>

          {makerTestimonial && (
            <FadeIn delay={0.3}>
              <div className="mt-12 p-8 bg-white rounded-[var(--radius-xl)] border border-[var(--patina-clay-beige)]/10 flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--patina-clay-beige)] to-[var(--patina-mocha-brown)] flex-shrink-0 flex items-center justify-center">
                  <span className="font-display text-xl text-[var(--patina-off-white)]">
                    {getInitials(makerTestimonial.author)}
                  </span>
                </div>
                <div className="text-center md:text-left">
                  <blockquote className="font-display text-lg lg:text-xl italic text-[var(--patina-charcoal)] leading-relaxed mb-4">
                    &ldquo;{makerTestimonial.quote}&rdquo;
                  </blockquote>
                  <footer className="text-sm text-[var(--patina-mocha-brown)]">
                    <strong className="text-[var(--patina-charcoal)]">{makerTestimonial.author}</strong> · {makerTestimonial.location}
                  </footer>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    );
  }

  // No real makers yet — show "Founding Partners" invitation
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]" id="makers">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <p className="text-label text-[var(--patina-clay-beige)] mb-3">
            {header?.eyebrow || "The makers"}
          </p>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
            Founding Partners &mdash; <em className="italic text-[var(--patina-mocha-brown)]">hand-selected by our designers</em>
          </h2>
          <p className="text-lg text-[var(--patina-mocha-brown)] max-w-[650px] mx-auto leading-relaxed mb-8">
            We&apos;re building our launch collection with 15 makers we know personally &mdash; artisans whose craft, values, and commitment to quality match our own. Founding Partners get featured placement, designer classification of their full catalog, and a voice in how the platform evolves.
          </p>

          <Link
            href="/makers/apply"
            className="inline-flex items-center gap-3 px-8 py-4 text-[0.9375rem] font-medium bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] rounded-[var(--radius-lg)] transition-all duration-400 hover:bg-[var(--patina-mocha-brown)] hover:-translate-y-0.5 mb-8"
          >
            Apply to be a Founding Partner
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          <p className="font-mono text-sm text-[var(--patina-mocha-brown)]/70">
            0 of 15 founding partners confirmed
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================
// Material Stories Section (NEW)
// Sensory interlude - pure feeling, minimal text
// ============================================

const materialStories = [
  {
    id: "oak-grain",
    name: "Weathered Oak",
    origin: "Pacific Northwest reclaimed barns",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80",
    alt: "Oak grain in morning light",
  },
  {
    id: "aged-leather",
    name: "Full-Grain Leather",
    origin: "Only gets better with time",
    imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=600&fit=crop&q=80",
    alt: "Patina on aged leather",
  },
  {
    id: "linen-weave",
    name: "Belgian Linen",
    origin: "Softens with every wash",
    imageUrl: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&h=600&fit=crop&q=80",
    alt: "Linen weave close-up",
  },
];

export function MaterialStoriesSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed 3-column image grid */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {materialStories.map((material) => (
          <div
            key={material.id}
            className="relative aspect-square md:aspect-square overflow-hidden group"
          >
            <Image
              src={material.imageUrl}
              alt={material.alt}
              fill
              className="object-cover transition-transform duration-800 ease-[var(--ease-patina)] group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Hover overlay with material info */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--patina-charcoal)]/60 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-8">
              <span className="font-display text-2xl text-[var(--patina-off-white)] mb-1">
                {material.name}
              </span>
              <span className="text-sm text-[var(--patina-off-white)]/80">
                {material.origin}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================
// The Journey Section (NEW)
// Alternating left/right layout with full images
// ============================================

interface JourneyStep {
  title: string;
  titleEmphasis: string;
  text: string;
  secondaryText?: string;
  imageUrl: string;
  quote?: {
    text: string;
    author: string;
    location: string;
  };
}

const journeySteps: JourneyStep[] = [
  {
    title: "First, you",
    titleEmphasis: "walk your room with us",
    text: "Point your phone and move through the space. While you scan, gentle questions emerge—not a quiz, just a conversation about what you're looking for.",
    secondaryText: "By the time your room is mapped, we already understand more than any questionnaire could capture.",
    imageUrl: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&h=600&fit=crop&q=80",
  },
  {
    title: "Then, you see",
    titleEmphasis: "your whole room — not a single chair",
    text: "Every recommendation is vetted by professional designers who think in complete rooms. Not just \"customers also bought\" — but anchor pieces, supporting brands, paint colors, and finishing details, all chosen to work together.",
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop&q=80",
  },
  {
    title: "Watch the",
    titleEmphasis: "morning light catch the grain",
    text: "See the piece in your actual room. Not a floating 3D model—placed where it would live, casting real shadows, catching your light.",
    secondaryText: "Slide through sunrise to sunset. Watch how leather warms in afternoon sun. Know it works before it arrives.",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80",
  },
  {
    title: "Finally, you",
    titleEmphasis: "bring it all home",
    text: "Every product in your room \u2014 from the handcrafted dining table to the paint color on the walls \u2014 ships with the story of why it was chosen and how to care for it.",
    secondaryText: "And if you ever want to go deeper, your profile transfers seamlessly to a professional designer. No starting over. No re-explaining. They already know your room.",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&q=80",
  },
];

interface TheJourneyProps {
  testimonials?: Testimonial[];
}

export function TheJourneySection({ testimonials }: TheJourneyProps) {
  return (
    <section className="py-24 lg:py-40 bg-[var(--patina-off-white)]" id="journey">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-20">
          <p className="font-mono text-xs tracking-widest uppercase text-[var(--patina-clay-beige)] mb-4">
            Coming to founding members first
          </p>
          <p className="text-label text-[var(--patina-clay-beige)] mb-3">
            The experience
          </p>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
            How it <em className="italic text-[var(--patina-mocha-brown)]">feels</em>
          </h2>
          <p className="text-lg text-[var(--patina-mocha-brown)] max-w-[550px] mx-auto">
            Not a product tour. A way of discovering what belongs in your home.
          </p>
        </FadeIn>

        {/* Journey Steps - Alternating Layout */}
        <div className="space-y-24 lg:space-y-32">
          {journeySteps.map((step, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <div className="relative aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden bg-[var(--patina-soft-cream)]">
                    <Image
                      src={step.imageUrl}
                      alt={step.titleEmphasis}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--patina-clay-beige)]/10 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <h3 className="font-display text-2xl lg:text-[1.75rem] font-normal text-[var(--patina-charcoal)] mb-4 leading-snug">
                    {step.title} <em className="italic text-[var(--patina-mocha-brown)]">{step.titleEmphasis}</em>
                  </h3>
                  <p className="text-[var(--patina-mocha-brown)] leading-relaxed mb-4">
                    {step.text}
                  </p>
                  {step.secondaryText && (
                    <p className="text-[var(--patina-mocha-brown)] leading-relaxed mb-6">
                      {step.secondaryText}
                    </p>
                  )}

                  {/* Inline Quote */}
                  {step.quote && (
                    <div className="p-5 bg-[var(--patina-soft-cream)] rounded-[var(--radius-lg)] border-l-[3px] border-[var(--patina-clay-beige)]">
                      <blockquote className="text-[0.95rem] italic text-[var(--patina-charcoal)] leading-relaxed mb-2">
                        &ldquo;{step.quote.text}&rdquo;
                      </blockquote>
                      <cite className="text-xs not-italic text-[var(--patina-mocha-brown)]">
                        — {step.quote.author}, {step.quote.location}
                      </cite>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// Designer Services Section (Elevated)
// ============================================

interface DesignerServicesProps {
  header?: SectionHeader;
  body?: string;
  benefit?: string;
  handoffItems?: string[];
  cta?: CTA;
  imageUrl?: string;
  testimonials?: Testimonial[];
}

export function DesignerServicesSection({ header, body, benefit, handoffItems, cta, imageUrl, testimonials }: DesignerServicesProps) {
  const displayItems = handoffItems?.length ? handoffItems : defaultHandoffItems;

  // Founder quote for the floating card
  const floatingTestimonial = {
    quote: "Every recommendation carries a designer\u2019s instinct \u2014 because a real designer taught it.",
    author: "Leah Kochaver",
    title: "Founder, Middlewest Studio",
  };

  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden" id="services">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--patina-clay-beige)] to-transparent" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              {header?.eyebrow || "When you're ready for more"}
            </p>
            <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-6 leading-tight">
              {header?.headline || "Your profile"} <em className="italic text-[var(--patina-clay-beige)]">{header?.subheadline || "becomes your designer's starting point"}</em>
            </h2>
            <p className="text-lg text-[var(--patina-off-white)]/85 leading-relaxed mb-8">
              {body || "Some projects need more than an app. When you're ready, everything you've discovered—your room dimensions, your style instincts, every piece that made you pause—transfers to a professional designer."}
            </p>

            <ul className="space-y-4 mb-10">
              {displayItems.map((item, index) => (
                <li key={index} className="flex items-start gap-4 text-[var(--patina-off-white)]/90 border-b border-[var(--patina-clay-beige)]/20 pb-3 last:border-0">
                  <svg className="w-[18px] h-[18px] text-[var(--patina-clay-beige)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={cta?.href || "/services"}
              className="inline-flex items-center gap-3 px-8 py-4 text-[0.9375rem] font-medium bg-[var(--patina-off-white)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] transition-all duration-400 hover:bg-[var(--patina-clay-beige)] hover:text-[var(--patina-off-white)] hover:-translate-y-0.5"
            >
              {cta?.label || "Learn About Design Services"}
            </Link>
          </FadeIn>

          <ScaleIn delay={0.2}>
            <div className="relative">
              {/* Main image - taller aspect ratio */}
              <div className="relative aspect-[4/5] rounded-[var(--radius-xl)] overflow-hidden">
                <Image
                  src={imageUrl || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=750&fit=crop&q=80"}
                  alt="Designer reviewing plans with client"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Overlapping testimonial card */}
              <div className="absolute -bottom-8 -left-8 right-8 lg:-bottom-10 lg:-left-10 lg:right-10 bg-white rounded-[var(--radius-lg)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <blockquote className="text-[0.95rem] italic text-[var(--patina-charcoal)] leading-relaxed mb-3">
                  &ldquo;{floatingTestimonial.quote}&rdquo;
                </blockquote>
                <cite className="text-xs not-italic text-[var(--patina-mocha-brown)]">
                  — {floatingTestimonial.author}, {floatingTestimonial.title}
                </cite>
              </div>
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Voices Section (Testimonials - no stats)
// ============================================

interface VoicesSectionProps {
  header?: SectionHeader;
  testimonials?: Testimonial[];
}

// Founding principles for the "From the Founders" section
const foundingPrinciples = [
  {
    title: "Designer Intelligence",
    description: "Real designers teach the system what\u2019s beautiful \u2014 not algorithms guessing from purchase data.",
  },
  {
    title: "Complete Rooms",
    description: "Not just a chair. The table, the lighting, the rug, the paint color \u2014 all chosen to work together.",
  },
  {
    title: "Honest Craft",
    description: "Every maker is someone we know personally. Every story is real. Every material is what we say it is.",
  },
];

export function VoicesSection({ header, testimonials }: VoicesSectionProps) {
  // If real testimonials exist in Sanity, show those
  if (testimonials?.length) {
    return (
      <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
              {header?.headline || "What people"} <em className="italic text-[var(--patina-mocha-brown)]">are saying</em>
            </h2>
          </FadeIn>

          <StaggerChildren className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <StaggerItem key={index}>
                <div className="bg-white rounded-[var(--radius-xl)] p-8 h-full flex flex-col border border-[var(--patina-clay-beige)]/10 transition-all duration-400 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                  <blockquote className="text-[var(--patina-charcoal)] leading-relaxed flex-grow mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <footer className="flex items-center gap-3 mt-auto">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--patina-clay-beige)] to-[var(--patina-mocha-brown)] flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-sm text-[var(--patina-off-white)]">
                        {getInitials(testimonial.author)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--patina-charcoal)]">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-[var(--patina-mocha-brown)]">
                        {testimonial.location}
                      </p>
                    </div>
                  </footer>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeIn delay={0.3} className="mt-10 text-center">
            <FoundingCounter />
          </FadeIn>
        </div>
      </section>
    );
  }

  // Default: "From the Founders" section with real quote + principles
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <p className="text-label text-[var(--patina-clay-beige)] mb-3">
            From the founders
          </p>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-6">
            Why we&apos;re <em className="italic text-[var(--patina-mocha-brown)]">building this</em>
          </h2>
        </FadeIn>

        {/* Founder Quote */}
        <FadeIn delay={0.1}>
          <div className="max-w-[700px] mx-auto mb-16 p-8 bg-white rounded-[var(--radius-xl)] border border-[var(--patina-clay-beige)]/10">
            <blockquote className="font-display text-xl lg:text-2xl italic text-[var(--patina-charcoal)] leading-relaxed mb-4 text-center">
              &ldquo;We&apos;re building what we wish existed &mdash; a way to get the benefit of working with a great designer, whether or not you hire one.&rdquo;
            </blockquote>
            <cite className="block text-sm not-italic text-[var(--patina-mocha-brown)] text-center">
              &mdash; Kody &amp; Leah, Founders
            </cite>
          </div>
        </FadeIn>

        {/* Principles Grid */}
        <StaggerChildren className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {foundingPrinciples.map((principle, index) => (
            <StaggerItem key={index}>
              <div className="bg-white rounded-[var(--radius-xl)] p-8 h-full border border-[var(--patina-clay-beige)]/10 transition-all duration-400 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                <h3 className="font-display text-lg text-[var(--patina-charcoal)] mb-3">
                  {principle.title}
                </h3>
                <p className="text-[var(--patina-mocha-brown)] leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.3} className="mt-10 text-center">
          <FoundingCounter />
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================
// How It Works Section (Collapsible)
// ============================================

export function HowItWorksSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-16 bg-[var(--patina-off-white)] text-center">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-3 text-lg text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] transition-colors py-4 px-6"
        >
          Curious how it works?
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-[var(--ease-patina)] ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="pt-6 pb-4 text-left">
            <h3 className="font-display text-2xl text-[var(--patina-charcoal)] mb-4 text-center">
              Designer-taught recommendations
            </h3>
            <p className="text-[var(--patina-mocha-brown)] leading-relaxed mb-4">
              Interior designers have spent decades learning what makes a room feel right. We asked them to teach what they know—and built something that remembers.
            </p>
            <p className="text-[var(--patina-mocha-brown)] leading-relaxed mb-4">
              Every piece in our catalog is analyzed by professional designers who add the insights you won&apos;t find on a product page: &ldquo;This leather only gets better with Sunday afternoons.&rdquo; &ldquo;Marble needs coasters—always.&rdquo; &ldquo;Perfect for pet-free homes.&rdquo;
            </p>
            <p className="text-[var(--patina-mocha-brown)] leading-relaxed mb-4">
              The more you explore, the better the recommendations become. Not because we&apos;re tracking you&mdash;because we&apos;re learning your language. Some preferences are hard to put into words. Maybe you linger on weathered oak but scroll past polished chrome. Maybe warm tones make you pause. We pay attention so you don&apos;t have to explain.
            </p>
            <p className="text-[var(--patina-mocha-brown)] leading-relaxed">
              Our Aesthete Engine doesn&apos;t just recommend individual pieces&mdash;it learns how rooms work together. Which anchor pieces pair with which brands. Which finishing details complete a palette. Over time, it assembles compositions that feel intentional, not algorithmic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Why This Is Different — Competitive Positioning
// ============================================

interface WhyDifferentProps {
  overline?: string;
  headline?: string;
  headlineEmphasis?: string;
  paragraphs?: string[];
  closingBold?: string;
}

export function WhyDifferentSection({
  overline,
  headline,
  headlineEmphasis,
  paragraphs,
  closingBold,
}: WhyDifferentProps = {}) {
  const eyebrow = overline || "Why this is different";
  const headlineText = headline || "The platforms that came before treated designers as labor.";
  const emphasisText = headlineEmphasis || "We treat them as the intelligence layer.";
  const bodyParagraphs = paragraphs && paragraphs.length > 0 ? paragraphs : [
    "Modsy and Havenly tried to replace design expertise with technology. They commoditized designers, burned cash on 3D rendering, and died without a moat. Patina does the opposite \u2014 technology amplifies the designer\u2019s taste, and every interaction makes the system smarter.",
    "This isn\u2019t another marketplace. It\u2019s an ecosystem where professional designers teach the AI what\u2019s beautiful, manufacturers reach the consumers who\u2019ll love their work, and consumers get recommendations with the credibility of a designer\u2019s eye.",
    "The AI doesn\u2019t guess. It learns from working professionals who classify products using their own vocabulary \u2014 not someone else\u2019s categories.",
  ];
  const closing = closingBold ?? "That\u2019s a moat no competitor can copy.";

  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-warm-white)]">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-label text-[var(--patina-clay-beige)] mb-3 text-center">
            {eyebrow}
          </p>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-10 text-center leading-tight">
            {headlineText}{emphasisText ? <> <em className="italic text-[var(--patina-mocha-brown)]">{emphasisText}</em></> : null}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-8 text-[var(--patina-mocha-brown)] text-[1.0625rem] leading-relaxed">
            {bodyParagraphs.map((p, i) => {
              const isLast = i === bodyParagraphs.length - 1;
              return (
                <p key={i}>
                  {p}
                  {isLast && closing ? (
                    <> <strong className="text-[var(--patina-charcoal)]">{closing}</strong></>
                  ) : null}
                </p>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================
// Middlewest Studio — Founder Credibility
// ============================================

export function MiddlewestSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <p className="text-label text-[var(--patina-clay-beige)] mb-3">
            The foundation
          </p>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-6">
            Born from real design work at <em className="italic text-[var(--patina-mocha-brown)]">Middlewest Studio</em>
          </h2>
          <p className="text-lg text-[var(--patina-mocha-brown)] max-w-[650px] mx-auto leading-relaxed mb-10">
            Patina didn&apos;t come from a business plan. It came from years of real interior design work &mdash; sourcing products for real clients, managing real projects, and wishing the tools were better. Every feature solves a problem Leah encounters daily at her practice in Madison, Wisconsin.
          </p>

          <div className="flex justify-center gap-12 mb-10">
            <div>
              <p className="font-display text-4xl text-[var(--patina-charcoal)]">100+</p>
              <p className="font-mono text-xs text-[var(--patina-mocha-brown)]/70 mt-1">Products sourced per project</p>
            </div>
            <div>
              <p className="font-display text-4xl text-[var(--patina-charcoal)]">2023</p>
              <p className="font-mono text-xs text-[var(--patina-mocha-brown)]/70 mt-1">Middlewest Studio founded</p>
            </div>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] transition-colors font-medium"
          >
            Meet the founders
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================
// Final CTA Section (Story-based, no metrics)
// ============================================

interface FinalCTAProps {
  header?: SectionHeader;
  body?: string;
  primaryCta?: CTA;
  secondaryLink?: CTA;
}

export function FinalCTASection({ header, body, secondaryLink }: FinalCTAProps) {
  return (
    <section
      className="py-32 lg:py-40 relative overflow-hidden text-center"
      style={{
        background: 'linear-gradient(180deg, var(--patina-off-white) 0%, var(--patina-warm-white) 100%)',
      }}
    >
      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[var(--patina-clay-beige)] to-transparent" />

      <FadeIn className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-normal text-[var(--patina-charcoal)] mb-6 leading-tight">
          {header?.headline || "Ready to help us "}<em className="italic text-[var(--patina-mocha-brown)]">{header?.subheadline || "build this?"}</em>
        </h2>
        <p className="text-lg text-[var(--patina-mocha-brown)] max-w-xl mx-auto mb-10 leading-relaxed">
          {body || "The best platforms are shaped by their earliest members. Join the Founding Circle and help define how furniture discovery should work."}
        </p>

        <div className="flex flex-col items-center gap-4 mb-16">
          <FoundingCircleForm
            source="final_cta"
            ctaText="Join the Founding Circle"
            className="max-w-md w-full"
          />

          <Link
            href={secondaryLink?.href || "/makers"}
            className="text-[0.95rem] text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] transition-colors"
          >
            {secondaryLink?.label || "Meet the Makers"}
          </Link>
        </div>

        {/* Strata Mark as signature */}
        <div className="flex justify-center">
          <StrataMark size="medium" variant="default" />
        </div>
      </FadeIn>
    </section>
  );
}

// ============================================
// Scroll Depth Tracker (renders nothing, just fires events)
// ============================================

export function HomeScrollDepthTracker() {
  useScrollDepth("/");
  return null;
}
