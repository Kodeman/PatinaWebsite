'use client';

import { Container } from '@/components/layout/Container';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/motion';
import { JourneyStep } from './JourneyStep';
import { JourneyConnector } from './JourneyConnector';
import { journeyContent, journeySteps } from '@/data/appContent';

interface AppJourneyProps {
  header?: string;
  steps?: Array<{
    stepNumber: number;
    title: string;
    description: string;
    tagline: string;
    icon: string;
  }>;
}

/**
 * AppJourney - "How It Works" section with 4-step vertical journey
 * Replaces the old 2x2 features grid with a narrative flow
 */
export function AppJourney({ header, steps }: AppJourneyProps) {
  // Convert CMS steps to local format with placeholder images
  const displaySteps = steps?.length
    ? steps.map((s) => ({
        id: `step-${s.stepNumber}`,
        stepNumber: s.stepNumber,
        title: s.title,
        description: s.description,
        tagline: s.tagline,
        icon: s.icon,
        imagePlaceholder: journeySteps.find((js) => js.stepNumber === s.stepNumber)?.imagePlaceholder,
      }))
    : journeySteps;
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]"
    >
      <Container>
        {/* Section Header */}
        <FadeIn className="text-center mb-16 lg:mb-20">
          <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
            {journeyContent.eyebrow}
          </span>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)]">
            {journeyContent.headline}{' '}
            <em className="italic text-[var(--patina-mocha-brown)]">
              {journeyContent.headlineEmphasis}
            </em>
          </h2>
        </FadeIn>

        {/* Journey Steps Container */}
        <div className="relative max-w-[900px] mx-auto">
          {/* Vertical connector line */}
          <JourneyConnector />

          {/* Steps */}
          <StaggerChildren staggerDelay={0.15} initialDelay={0.2}>
            <ol className="relative space-y-0">
              {displaySteps.map((step, index) => (
                <StaggerItem key={step.id}>
                  <JourneyStep step={step as typeof journeySteps[0]} isLast={index === displaySteps.length - 1} />
                </StaggerItem>
              ))}
            </ol>
          </StaggerChildren>
        </div>
      </Container>
    </section>
  );
}
