"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { FadeIn } from "@/components/motion/FadeIn";

export function CloseSection() {
  return (
    <section data-bg="dark" className="bg-[var(--patina-ink)] text-[var(--patina-off-white)] text-center py-[clamp(120px,18vh,240px)] relative overflow-hidden">
      {/* Ambient light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center 30%, rgba(163,146,124,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10">
        {/* Strata Mark */}
        <FadeIn>
          <div className="mx-auto mb-10 opacity-50 flex flex-col items-center gap-1.5">
            <span className="h-0.5 rounded-full bg-[var(--patina-off-white)]" style={{ width: 64 }} />
            <span className="h-0.5 rounded-full bg-[var(--patina-off-white)] opacity-70" style={{ width: 45 }} />
            <span className="h-0.5 rounded-full bg-[var(--patina-off-white)] opacity-40" style={{ width: 26 }} />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="font-display font-normal italic tracking-[-0.02em] mb-5"
            style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}
          >
            Ready to help us build this?
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-base font-light text-[var(--patina-clay-light)] max-w-[420px] mx-auto mb-11 leading-[1.75]">
            The best platforms are shaped by their earliest community. Join the Founding Circle and
            help define how furniture discovery should work.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <MagneticButton href="/founding" variant="white">
            Join the Founding Circle
          </MagneticButton>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="font-mono text-[11px] text-[var(--patina-clay-beige)] tracking-[0.08em] mt-11 opacity-50">
            patina.cloud
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
