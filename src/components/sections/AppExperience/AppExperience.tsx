"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FadeIn } from "@/components/motion/FadeIn";

const steps = [
  {
    number: "01",
    title: "Understand your space.",
    body: "Walk your room with your phone. Patina captures dimensions, light, and architecture while style questions surface naturally \u2014 teaching you what works and why.",
  },
  {
    number: "02",
    title: "Find and purchase.",
    body: "Not thousands of options. A focused selection of pieces that fit your room, your taste, and your life \u2014 each one vetted by professional designers. Buy directly from the app.",
  },
  {
    number: "03",
    title: "Go further, seamlessly.",
    body: "Ready for a full room? A renovation? A designer can continue what you\u2019ve started \u2014 with your room scan, style profile, and every saved piece already in hand. No starting over.",
  },
];

const stepImages = [
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&h=1200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&h=1200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&h=1200&fit=crop&q=80",
];

export function AppExperience() {
  const prefersReducedMotion = useReducedMotion();
  const stickyWrapRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Preload images
  useEffect(() => {
    stepImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Sticky scroll logic (desktop only)
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!stickyWrapRef.current) {
            ticking = false;
            return;
          }
          const rect = stickyWrapRef.current.getBoundingClientRect();
          const scrollable = stickyWrapRef.current.offsetHeight - window.innerHeight;
          const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
          const step = Math.min(2, Math.floor(progress * 3));
          setActiveStep(step);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, prefersReducedMotion]);

  // Cross-fade image on step change
  useEffect(() => {
    if (isMobile || !imgRef.current) return;
    const img = imgRef.current;
    img.style.opacity = "0";
    img.style.transform = "scale(1.05)";
    const timeout = setTimeout(() => {
      img.src = stepImages[activeStep];
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
    }, 300);
    return () => clearTimeout(timeout);
  }, [activeStep, isMobile]);

  return (
    <section data-bg="light" className="bg-[var(--patina-off-white)] relative">
      <div className="max-w-[1200px] mx-auto px-[clamp(24px,5vw,72px)]">
        {/* Intro Block */}
        <div className="pt-[clamp(100px,12vh,160px)] pb-[clamp(40px,4vh,60px)]">
          <div className="grid grid-cols-1 min-[901px]:grid-cols-2 gap-6 min-[901px]:gap-16 items-end">
            <div>
              <FadeIn delay={0}>
                <p className="section-label mb-4">The App</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2
                  className="font-display font-normal leading-[1.1] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
                >
                  Learn your space.
                  <br />
                  Find what <em className="italic text-[var(--patina-clay-beige)]">belongs.</em>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <p className="font-body text-base font-light text-[var(--patina-mocha-brown)] leading-[1.85] max-w-[460px]">
                Patina helps you understand what works in your room &mdash; then puts the right
                furniture in front of you. Browse, purchase, and build a space you&apos;re proud of.
                And when a project calls for more, a designer picks up right where you left off.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Sticky Scroll Steps */}
        <div
          ref={stickyWrapRef}
          className={cn(isMobile ? "h-auto" : "h-[300vh]")}
        >
          <div
            className={cn(
              isMobile
                ? "relative h-auto py-12"
                : "sticky top-0 h-screen flex items-center overflow-hidden"
            )}
          >
            <div
              className={cn(
                "w-full max-w-[1200px] mx-auto",
                isMobile
                  ? "flex flex-col gap-10"
                  : "grid grid-cols-2 gap-20 items-center"
              )}
            >
              {/* Step Cards */}
              <div className={cn(isMobile ? "" : "relative min-h-[280px]")}>
                {steps.map((step, i) => (
                  <div
                    key={step.number}
                    className={cn(
                      isMobile
                        ? "mb-10 last:mb-0"
                        : "absolute inset-0 flex flex-col justify-center"
                    )}
                    style={
                      isMobile
                        ? {}
                        : {
                            opacity: activeStep === i ? 1 : 0,
                            transform:
                              activeStep === i
                                ? "translateY(0)"
                                : "translateY(40px)",
                            transition: "opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo)",
                          }
                    }
                  >
                    <div className="font-display text-[80px] font-bold text-[var(--patina-clay-beige)] opacity-[0.12] leading-none mb-2 tracking-[-0.04em]">
                      {step.number}
                    </div>
                    <h3
                      className="font-display font-medium leading-[1.2] mb-4"
                      style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[15px] font-light text-[var(--patina-mocha-brown)] leading-[1.8] max-w-[400px]">
                      {step.body}
                    </p>
                  </div>
                ))}

                {/* Progress Dots (desktop only) */}
                {!isMobile && (
                  <div className="absolute bottom-0 flex gap-2 mt-8">
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-0.5 bg-[var(--patina-pearl)] relative overflow-hidden"
                      >
                        <div
                          className="absolute inset-0 bg-[var(--patina-clay-beige)] origin-left"
                          style={{
                            transform: i <= activeStep ? "scaleX(1)" : "scaleX(0)",
                            transition: "transform 0.6s var(--ease-out-expo)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Step Image */}
              <div
                className={cn(
                  "relative overflow-hidden",
                  isMobile ? "h-[50vh] max-[600px]:h-[40vh]" : "h-[65vh] max-h-[600px]"
                )}
              >
                <img
                  ref={imgRef}
                  src={stepImages[0]}
                  alt="Crafted interior"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{
                    transition: "transform 1.2s var(--ease-out-expo), opacity 0.6s",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 80px rgba(26,24,22,0.08)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
