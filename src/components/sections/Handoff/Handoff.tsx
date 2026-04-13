"use client";

import { GradientText } from "@/components/ui/GradientText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FadeIn } from "@/components/motion/FadeIn";

export function Handoff() {
  return (
    <section data-bg="dark" className="bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] py-[clamp(100px,14vh,180px)] relative overflow-hidden">
      {/* Ambient light */}
      <div
        className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(163,146,124,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[700px] mx-auto px-[clamp(24px,5vw,72px)] text-center relative z-10">
        <FadeIn>
          <div className="w-12 h-px bg-[var(--patina-clay-beige)] opacity-30 mx-auto mb-7" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="section-label mb-5">When You&apos;re Ready</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2
            className="font-display font-normal leading-[1.1] tracking-[-0.02em] mb-7"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            A designer who already knows
            <br />
            <GradientText>what you love.</GradientText>
          </h2>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-base font-light text-[var(--patina-clay-light)] leading-[1.85] max-w-[540px] mx-auto mb-10">
            Everything you build in Patina &mdash; your room scan, your style profile, every piece
            you&apos;ve saved &mdash; transfers seamlessly to a professional designer. They don&apos;t
            start from scratch. They continue the conversation you&apos;ve already started.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <MagneticButton
            href="/services"
            variant="outline"
            className="!text-[var(--patina-off-white)] !border-[var(--patina-clay-beige)]"
          >
            Learn about design services
          </MagneticButton>
        </FadeIn>

        <FadeIn delay={0.5}>
          <p className="text-[13px] font-light italic text-[var(--patina-clay-beige)] mt-5">
            No re-explaining. No starting over.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
