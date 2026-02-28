"use client";

import { useEffect } from "react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";
import { useInView } from "@/hooks/useInView";
import { track } from "@/lib/analytics";
import { tierConfig } from "@/types/sanity";

interface PromiseFeature {
  title: string;
  description: string;
  icon?: string;
}

interface ThePromiseProps {
  overline?: string;
  headline?: string;
  body?: string;
  features?: PromiseFeature[];
}

const defaultFeatures: { key: "partner" | "curated" | "sourced"; title: string; description: string }[] = [
  {
    key: "partner",
    title: tierConfig.partner.label,
    description:
      "Handcrafted anchor pieces from makers we know personally. The ones your kids will fight over someday.",
  },
  {
    key: "curated",
    title: tierConfig.curated.label,
    description:
      "Sofas, rugs, and lighting chosen by our designers from brands they trust and use in their own projects.",
  },
  {
    key: "sourced",
    title: tierConfig.sourced.label,
    description:
      "Paint colors, hardware, throw pillows — the finishing touches that make a room feel complete.",
  },
];

export function ThePromise({ overline, headline, body, features }: ThePromiseProps) {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.3 });

  useEffect(() => {
    if (isInView) {
      track("promise_section_viewed", {});
    }
  }, [isInView]);

  const displayFeatures = features?.length
    ? features.map((f, i) => ({
        ...f,
        key: (["partner", "curated", "sourced"] as const)[i] || "sourced",
      }))
    : defaultFeatures;

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[var(--patina-off-white)]"
      id="the-promise"
    >
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-label text-[var(--patina-clay-beige)] mb-3">
            {overline || "THE PATINA DIFFERENCE"}
          </p>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-6 leading-tight">
            {headline || (
              <>
                A great room isn&apos;t one perfect piece.{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">
                  It&apos;s fifty perfect choices.
                </em>
              </>
            )}
          </h2>
          {body && (
            <p className="text-lg text-[var(--patina-mocha-brown)] max-w-[600px] mx-auto leading-relaxed">
              {body}
            </p>
          )}
        </FadeIn>

        <StaggerChildren
          className="grid sm:grid-cols-3 gap-8 sm:gap-6"
          staggerDelay={0.12}
        >
          {displayFeatures.map((feature) => {
            const tier = tierConfig[feature.key];
            return (
              <StaggerItem key={feature.key}>
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${tier.color}20`, color: tier.color }}
                  >
                    {tier.icon}
                  </div>
                  <h3 className="font-display text-lg font-medium text-[var(--patina-charcoal)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--patina-mocha-brown)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
