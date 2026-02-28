'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/motion';
import { FoundingCircleForm } from '@/components/ui/FoundingCircleForm';
import { FoundingCounter } from '@/components/ui/FoundingCounter';
import { StrataMark } from '@/components/ui/StrataMark';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { foundersTogetherImage } from '@/data/aboutContent';

const benefits = [
  {
    icon: '★',
    title: 'Named Recognition',
    body: "Founding members get credited at launch. Your name on the thing you helped build.",
  },
  {
    icon: '◈',
    title: 'Behind the Curtain',
    body: "Exclusive updates from Kody & Leah as the catalog grows, makers sign on, and the AI learns. The real, unpolished building story.",
  },
  {
    icon: '⟡',
    title: 'Real Influence',
    body: "Monthly questions on what matters: which makers to partner with, which style categories to prioritize. Your input shapes the product.",
  },
  {
    icon: '⌂',
    title: 'First Access',
    body: "When the app launches, you're first through the door — and first to test it as we build. Your feedback makes it better for everyone.",
  },
];

export function FoundingPageContent() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[var(--patina-warm-white)]">
        <Container>
          <div className="max-w-[700px] mx-auto text-center">
            <FadeIn>
              <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
                JOIN US
              </span>
              <h1 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] font-normal text-[var(--patina-charcoal)] mb-6 leading-tight">
                The Founding Circle
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed mb-4">
                We&apos;re building a furniture platform where real designers teach the AI,
                real makers craft the pieces, and your room gets the attention it deserves.
              </p>
              <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed mb-10">
                We&apos;re not ready to launch yet — but we&apos;d love your help getting there.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <FoundingCircleForm
                source="founding_hero"
                ctaText="Join the Founding Circle →"
                className="max-w-md mx-auto"
              />
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-6">
                <FoundingCounter />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ===== WHAT YOU GET ===== */}
      <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
        <Container>
          <FadeIn className="text-center mb-12">
            <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
              WHAT YOU GET
            </span>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal text-[var(--patina-charcoal)]">
              More than early access
            </h2>
          </FadeIn>

          <StaggerChildren staggerDelay={0.1} className="max-w-[900px] mx-auto">
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <StaggerItem key={benefit.title}>
                  <div className="bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[rgba(163,146,124,0.08)] h-full">
                    <span className="text-2xl mb-4 block">{benefit.icon}</span>
                    <h3 className="font-display text-xl font-medium text-[var(--patina-charcoal)] mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-[0.9375rem] text-[var(--patina-mocha-brown)] leading-relaxed">
                      {benefit.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>
        </Container>
      </section>

      {/* ===== WHAT WE'RE BUILDING ===== */}
      <section className="py-20 lg:py-28 bg-[var(--patina-warm-white)]">
        <Container>
          <div className="max-w-[700px] mx-auto">
            <FadeIn className="mb-8">
              <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
                THE VISION
              </span>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal text-[var(--patina-charcoal)]">
                What We&apos;re Building
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-[var(--patina-mocha-brown)] text-[1.0625rem] leading-relaxed">
                <p>
                  Patina is a furniture platform that works the way a great designer thinks —
                  in complete rooms, not isolated products.
                </p>
                <p>
                  Our Aesthete Engine is an AI recommendation system taught by professional
                  interior designers. Not trained on click data or ad revenue — trained on
                  the instincts that make a room feel right.
                </p>
                <p>
                  We&apos;re curating a catalog of heritage makers and trusted brands, building
                  AR room visualization tools, and developing style profiles that actually
                  understand your taste.
                </p>
                <p className="text-[var(--patina-charcoal)] font-medium">
                  It&apos;s not ready yet. But it&apos;s getting closer every week.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
        <Container>
          <FadeIn className="text-center mb-12">
            <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
              THE TEAM
            </span>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal text-[var(--patina-charcoal)]">
              Who We Are
            </h2>
          </FadeIn>

          <div className="max-w-[900px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden">
                <PlaceholderImage meta={foundersTogetherImage} className="w-full h-full" />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-[var(--patina-mocha-brown)] text-[1.0625rem] leading-relaxed">
                <h3 className="font-display text-2xl font-normal text-[var(--patina-charcoal)]">
                  Kody &amp; Leah
                </h3>
                <p>
                  Leah runs Middlewest Studio, an interior design practice in Madison, Wisconsin.
                  Her clients trust her taste — and her taste is what teaches the
                  Aesthete Engine.
                </p>
                <p>
                  Kody builds the technology. His background is in enterprise software
                  (Starbucks Corporate, Microsoft-funded startups), but his heart is
                  in making tools that actually help real people make better decisions
                  about their homes.
                </p>
                <p className="text-[var(--patina-charcoal)] font-medium">
                  Together, we&apos;re building what we wish existed: a way to get the benefit
                  of working with a great designer, whether or not you hire one.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden">
        {/* Paper texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="max-w-[600px] mx-auto text-center">
            <FadeIn>
              <div className="flex justify-center mb-8">
                <StrataMark size="medium" variant="reversed" />
              </div>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal text-[var(--patina-off-white)] mb-6">
                Ready to help us build this?
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <FoundingCircleForm
                source="founding_bottom"
                variant="dark"
                ctaText="Join the Founding Circle →"
                className="max-w-md mx-auto"
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-6">
                <FoundingCounter variant="dark" />
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Link
                href="/about"
                className="inline-block mt-8 text-sm text-[rgba(237,233,228,0.6)] hover:text-[var(--patina-off-white)] transition-colors"
              >
                Back to Our Story
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
