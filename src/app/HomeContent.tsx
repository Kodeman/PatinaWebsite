"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn, StaggerChildren, StaggerItem, ScaleIn } from "@/components/motion";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    title: "Discover Your Style",
    description: "The Aesthete Engine learns what draws your eye—then shows you furniture that fits not just your room, but your life. No questionnaires. Just intuition.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Know the Makers",
    description: "Every piece comes with its story—the craftspeople, traditions, and materials that make it special. Plus designer insights you won't find anywhere else.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Quality That Lasts",
    description: "Furniture built to become heirlooms. Materials and craftsmanship that age beautifully. Curated by designers who know what lasts.",
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

// ============================================
// Aesthete Engine Section (NEW)
// ============================================

const homeEnginePillars = [
  {
    id: "designer-taught",
    title: "Designer-Taught Intelligence",
    description: "Real interior designers encode their expertise into every recommendation:",
    examples: [
      '"This leather only gets better with age"',
      '"Marble needs coasters—always"',
      '"Perfect for pet-free homes"',
    ],
  },
  {
    id: "invisible-learning",
    title: "Invisible Learning",
    description: "Your actions reveal authentic preferences. Quick taps show confidence. Slow swipes reveal thoughtfulness. Time spent viewing signals genuine interest.",
    highlight: "We notice what you don't realize you're telling us.",
  },
  {
    id: "always-improving",
    title: "Always Improving",
    description: "Start at 75% match accuracy. Reach 90%+ over time. The Aesthete Engine doesn't just remember your preferences—it understands the patterns behind them.",
    highlight: "75% → 90%+",
  },
];

export function AestheteEngineSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden">
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-12 lg:mb-16">
          <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
            THE INTELLIGENCE
          </span>
          <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-4">
            Other apps show you what&apos;s popular.<br />
            <em className="italic text-[var(--patina-clay-beige)]">Patina shows you what&apos;s right.</em>
          </h2>
          <p className="text-xl text-[var(--patina-off-white)]/80 leading-relaxed max-w-[700px] mx-auto">
            The Aesthete Engine is our proprietary intelligence system where professional interior designers actively teach the AI what no algorithm could discover on its own. The result? Recommendations that feel curated by someone who actually knows you.
          </p>
        </FadeIn>

        {/* Pillars Grid */}
        <StaggerChildren staggerDelay={0.1}>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {homeEnginePillars.map((pillar) => (
              <StaggerItem key={pillar.id}>
                <div className="bg-[rgba(237,233,228,0.05)] rounded-[var(--radius-xl)] p-6 h-full">
                  <h3 className="text-lg font-display font-semibold text-[var(--patina-off-white)] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-[var(--patina-off-white)]/70 text-sm leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                  {pillar.examples && (
                    <ul className="space-y-2">
                      {pillar.examples.map((example, idx) => (
                        <li key={idx} className="text-sm text-[var(--patina-clay-beige)] italic">
                          {example}
                        </li>
                      ))}
                    </ul>
                  )}
                  {pillar.highlight && (
                    <p className="text-sm text-[var(--patina-clay-beige)] font-medium mt-4">
                      {pillar.highlight}
                    </p>
                  )}
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>

        {/* CTA */}
        <FadeIn delay={0.4} className="text-center mt-12">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 text-[var(--patina-clay-beige)] hover:text-[var(--patina-off-white)] transition-colors"
          >
            See how it works in the app
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
// AR Experience Showcase Section
// ============================================

const arSteps = [
  { number: 1, title: "Walk your room together", text: "Point and scan while style questions emerge naturally. No forms. No interrogation." },
  { number: 2, title: "See what fits", text: "Not 10,000 options to sort. 10 pieces that belong—each carrying a designer's insight." },
  { number: 3, title: "Live with it first", text: "Watch morning light catch the grain. See it at sunset. Know it works before it arrives." },
  { number: 4, title: "Purchase with clarity", text: "Every piece vetted by designers. Every fit confirmed by you." },
];

export function ARShowcaseSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-off-white)]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <FadeIn className="order-2 lg:order-1">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              The Experience
            </p>
            <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
              From scan to certainty <em className="italic text-[var(--patina-mocha-brown)]">in under 10 minutes.</em>
            </h2>
            <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed mb-8 max-w-[440px]">
              Walk your room. Discover your style. Find furniture that fits—not just the space, but the life you&apos;re building. The Aesthete Engine does the filtering. You do the deciding.
            </p>

            {/* Steps */}
            <StaggerChildren className="space-y-5 mb-10" staggerDelay={0.1}>
              {arSteps.map((step) => (
                <StaggerItem key={step.number}>
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-[var(--patina-clay-beige)] text-[var(--patina-off-white)] text-sm font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                      {step.number}
                    </span>
                    <div>
                      <p className="font-medium text-[var(--patina-charcoal)] mb-1">{step.title}</p>
                      <p className="text-sm text-[var(--patina-mocha-brown)]">{step.text}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <Link
              href="/app"
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--patina-clay-beige)] text-[var(--patina-off-white)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-mocha-brown)] shadow-[0_4px_12px_rgba(163,146,124,0.25)]"
            >
              Get the App
            </Link>
          </FadeIn>

          {/* Visual - Phone Mockup */}
          <ScaleIn className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[280px] lg:max-w-[320px]">
              <div className="aspect-[9/19] bg-[var(--patina-charcoal)] rounded-[40px] p-3 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-[#D8D2C8] to-[#C4BDB0] rounded-[32px] flex items-center justify-center overflow-hidden relative">
                  {/* Simulated AR view */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#E8E4DE] to-[#D8D2C8]" />
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-16 bg-[#8B7355] rounded-lg shadow-lg opacity-80" />
                  <span className="relative z-10 text-xs tracking-widest uppercase text-[var(--patina-mocha-brown)] bg-white/80 px-4 py-2 rounded-md">
                    AR Preview
                  </span>
                </div>
              </div>
              {/* Phone reflection */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-b from-black/10 to-transparent blur-xl" />
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Featured Makers Section
// ============================================

const featuredMakers = [
  {
    name: "Vermont Woodworks",
    location: "Burlington, Vermont",
    heritage: "Since 1972 · 50+ Years",
    specialty: "Sustainable hardwood",
    imageUrl: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Nakashima Workshop",
    location: "New Hope, Pennsylvania",
    heritage: "Est. 1946 · 3rd Generation",
    specialty: "Live edge wood",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Sashimono Studio",
    location: "Kyoto, Japan",
    heritage: "Since 1923 · Master Craftsman",
    specialty: "Traditional joinery",
    imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Studio Piet",
    location: "Copenhagen, Denmark",
    heritage: "Est. 2015 · Carbon Neutral",
    specialty: "Scandinavian design",
    imageUrl: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=500&fit=crop&q=80",
  },
];

export function FeaturedMakersSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <p className="text-label text-[var(--patina-clay-beige)] mb-3">
            The Makers
          </p>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
            Meet the <em className="italic text-[var(--patina-mocha-brown)]">craftspeople</em>
          </h2>
          <p className="text-lg text-[var(--patina-mocha-brown)] max-w-xl mx-auto">
            Every piece in our collection comes from makers we trust—artisans with generations of expertise. Professional designers evaluate each partnership, so quality is assured before a piece ever reaches your screen.
          </p>
        </FadeIn>
      </div>

      {/* Horizontal Scroll Carousel */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto px-4 sm:px-6 lg:px-[calc((100vw-1100px)/2+1rem)] pb-4 snap-x snap-mandatory scrollbar-hide">
          {featuredMakers.map((maker) => (
            <article
              key={maker.name}
              className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start bg-[var(--patina-warm-white)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--patina-off-white)]">
                <Image
                  src={maker.imageUrl}
                  alt={`${maker.name} workshop`}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-display font-semibold text-[var(--patina-charcoal)] mb-1">
                  {maker.name}
                </h3>
                <p className="text-sm text-[var(--patina-clay-beige)] mb-2">
                  {maker.location}
                </p>
                <p className="text-xs text-[var(--patina-mocha-brown)]">
                  {maker.heritage}
                </p>
                <div className="mt-3 inline-block px-3 py-1 bg-[var(--patina-off-white)] rounded-full">
                  <span className="text-xs font-medium text-[var(--patina-clay-beige)]">
                    {maker.specialty}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Gradient fade indicators */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-[var(--patina-soft-cream)] to-transparent pointer-events-none" />
        <div className="hidden lg:block absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-[var(--patina-soft-cream)] to-transparent pointer-events-none" />
      </div>

      {/* Link to makers page */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center">
        <Link
          href="/makers"
          className="inline-flex items-center gap-2 text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] transition-colors"
        >
          Explore all makers
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

// ============================================
// Testimonials Section
// ============================================

const testimonials = [
  {
    quote: "The AR feature saved me from a huge mistake. I could see the sofa was too large before ordering. Game changer.",
    author: "Sarah M.",
    location: "Chicago, IL",
  },
  {
    quote: "I was skeptical about an app understanding my style. But the recommendations were eerily accurate—it showed me pieces I didn't know I wanted but immediately loved.",
    author: "Alex R.",
    location: "Denver, CO",
  },
  {
    quote: "The little notes on each piece—'better with 9ft ceilings' or 'this fabric shows pet hair'—saved me from mistakes I would have made anywhere else.",
    author: "Rachel K.",
    location: "Minneapolis, MN",
  },
];

const trustBadges = [
  { value: "4.8★", label: "App Store Rating" },
  { value: "10K+", label: "Happy Users" },
  { value: "90%+", label: "Match Accuracy" },
  { value: "50+", label: "Heritage Makers" },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden">
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-label text-[var(--patina-clay-beige)] mb-3">
            Community
          </p>
          <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-4">
            Loved by <em className="italic text-[var(--patina-clay-beige)]">design enthusiasts</em>
          </h2>
        </FadeIn>

        {/* Testimonials Grid */}
        <StaggerChildren className="grid md:grid-cols-3 gap-8 mb-16" staggerDelay={0.15}>
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <blockquote className="bg-[rgba(237,233,228,0.05)] rounded-[var(--radius-xl)] p-6 h-full flex flex-col">
                {/* Quote icon */}
                <svg
                  className="w-8 h-8 text-[var(--patina-clay-beige)] opacity-50 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-[rgba(237,233,228,0.9)] leading-relaxed flex-grow mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="mt-auto">
                  <p className="text-[var(--patina-off-white)] font-medium">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-[var(--patina-clay-beige)]">
                    {testimonial.location}
                  </p>
                </footer>
              </blockquote>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Trust Badges */}
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-display font-bold text-[var(--patina-clay-beige)] mb-1">
                  {badge.value}
                </p>
                <p className="text-sm text-[rgba(237,233,228,0.6)]">
                  {badge.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================
// Designer Services Section
// ============================================

const handoffItems = [
  "Complete room dimensions and 3D model",
  "Your full style profile with confidence scores",
  "Behavioral signals revealing hidden preferences",
  "Saved pieces showing your direction",
];

export function DesignerServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <FadeIn>
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              Professional Help
            </p>
            <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
              When you&apos;re ready for more, <em className="italic text-[var(--patina-mocha-brown)]">so is your profile.</em>
            </h2>
            <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed mb-4 max-w-[440px]">
              Some projects need more than an app. When you&apos;re ready, your room scan, style profile, and saved pieces transfer seamlessly to professional designers.
            </p>
            <p className="text-[var(--patina-mocha-brown)] leading-relaxed mb-6 max-w-[440px]">
              No starting over. No re-explaining. Your designer receives the depth most consultations take weeks to achieve—before the first conversation.
            </p>

            {/* Handoff Items */}
            <ul className="space-y-2 mb-8">
              {handoffItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-[var(--patina-mocha-brown)]">
                  <svg className="w-4 h-4 text-[var(--patina-clay-beige)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 text-[0.9375rem] font-medium bg-transparent text-[var(--patina-charcoal)] border-2 border-[var(--patina-clay-beige)] rounded-[var(--radius-lg)] transition-all duration-300 hover:bg-[var(--patina-warm-white)] hover:border-[var(--patina-mocha-brown)]"
            >
              Learn About Design Services
            </Link>
          </FadeIn>

          {/* Image */}
          <ScaleIn delay={0.2}>
            <div className="relative aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden shadow-[0_20px_60px_rgba(101,91,82,0.15)]">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&q=80"
                alt="Designer reviewing plans with client"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}

// ============================================
// App CTA Section (Final CTA)
// ============================================

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
          Ready to discover <em className="italic text-[var(--patina-clay-beige)]">what belongs?</em>
        </h2>
        <p className="text-lg text-[rgba(237,233,228,0.75)] max-w-xl mx-auto mb-4">
          The best interiors aren&apos;t decorated—they&apos;re cultivated over time, with pieces that grow more beautiful with age. Let The Aesthete Engine show you where to start.
        </p>
        <p className="text-sm text-[rgba(237,233,228,0.6)] max-w-xl mx-auto mb-10">
          Scan your first room in under 10 minutes.
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

        <p className="mt-6 text-sm text-[rgba(237,233,228,0.5)]">
          Or <Link href="/furniture" className="underline hover:text-[var(--patina-clay-beige)] transition-colors">explore furniture on web</Link>
        </p>
      </FadeIn>
    </section>
  );
}
