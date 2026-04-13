"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";

export function BehindTheScenes() {
  return (
    <section data-bg="light" className="py-[clamp(100px,12vh,160px)] relative">
      <div className="max-w-[1200px] mx-auto px-[clamp(24px,5vw,72px)]">
        <div className="grid grid-cols-1 min-[901px]:grid-cols-[1.1fr_1fr] gap-10 min-[901px]:gap-20 items-center">
          {/* Left — Image */}
          <FadeIn>
            <div className="relative overflow-hidden max-[900px]:h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1631396328075-9c65a7406f09?w=900&h=1100&fit=crop&q=80"
                alt="Craftsman in workshop"
                loading="lazy"
                className="w-full h-auto max-[900px]:h-full max-[900px]:object-cover block transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 80px rgba(26,24,22,0.06)" }}
              />
              <span className="absolute bottom-4 left-4 font-mono text-[9px] text-[var(--patina-off-white)] tracking-[0.12em] uppercase bg-[rgba(63,59,55,0.7)] px-2.5 py-1 backdrop-blur-lg">
                Middlewest Studio &mdash; Madison, WI
              </span>
            </div>
          </FadeIn>

          {/* Right — Content */}
          <div>
            <FadeIn>
              <p className="section-label mb-4">Behind the Scenes</p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2
                className="font-display font-normal leading-[1.2] mb-6"
                style={{ fontSize: "clamp(28px, 3.8vw, 40px)" }}
              >
                The people who make
                <br />
                the recommendations{" "}
                <em className="italic text-[var(--patina-clay-beige)]">real.</em>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-[15px] font-light text-[var(--patina-mocha-brown)] leading-[1.85] mb-5">
                Every recommendation in Patina carries the eye of working designers and makers &mdash;
                people who classify products, set quality standards, and build the intelligence that
                powers what you see. The app gets smarter because they keep showing up and doing the
                work.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-[15px] font-light text-[var(--patina-mocha-brown)] leading-[1.85] mb-0">
                No sponsored placements. No pay-to-play. Every maker earned their place through craft,
                not budget.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="border-l-2 border-[var(--patina-clay-beige)] pl-7 py-5 mt-8 mb-2">
                <p className="font-display text-lg italic font-normal text-[var(--patina-charcoal)] leading-[1.55]">
                  &ldquo;I&apos;ve sourced furniture for clients for years. The tools never matched
                  how designers actually think. So we&apos;re building the one I wish existed.&rdquo;
                </p>
              </div>
              <p className="font-mono text-[11px] text-[var(--patina-clay-beige)] tracking-[0.04em] mb-6">
                &mdash; Leah Kochaver, Co-Founder
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <Link
                href="/about"
                className="text-[13px] font-medium text-[var(--patina-charcoal)] border-b border-[var(--patina-clay-beige)] pb-0.5 transition-colors duration-300 hover:border-[var(--patina-charcoal)]"
              >
                Meet the founders &rarr;
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
