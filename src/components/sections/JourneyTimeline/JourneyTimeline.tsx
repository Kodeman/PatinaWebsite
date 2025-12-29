'use client';

import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/motion';
import { StrataMark } from '@/components/ui/StrataMark';
import { timeline as defaultTimeline } from '@/data/aboutContent';
import type { TimelineIcon } from '@/types/about';

interface JourneyTimelineProps {
  timeline?: Array<{ year: string; title: string; description: string; icon?: string }>;
}

const iconComponents: Record<TimelineIcon, React.ReactNode> = {
  spark: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ),
  code: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  ar: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  ),
  network: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  ),
};

export function JourneyTimeline({ timeline: timelineProp }: JourneyTimelineProps) {
  const displayTimeline = timelineProp?.length
    ? timelineProp.map((m) => ({
        ...m,
        icon: (m.icon || 'spark') as TimelineIcon,
      }))
    : defaultTimeline;

  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
      <Container>
        {/* Section header */}
        <FadeIn className="text-center mb-12 lg:mb-16">
          <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
            Our Journey
          </span>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)]">
            Building layer by{' '}
            <em className="text-[var(--patina-mocha-brown)] not-italic">layer</em>
          </h2>
        </FadeIn>

        {/* Timeline */}
        <div className="max-w-[800px] mx-auto relative">
          {/* Vertical line - uses Strata Mark colors */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-1/2">
            <div className="h-full w-full bg-gradient-to-b from-[var(--patina-mocha-brown)] via-[var(--patina-clay-beige)] to-[var(--patina-clay-beige)]/50" />
          </div>

          {/* Timeline entries */}
          <ol className="relative space-y-12 lg:space-y-16">
            {displayTimeline.map((milestone, index) => (
              <li key={`${milestone.year}-${milestone.title}`} className="relative">
                <FadeIn
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  distance={30}
                  delay={index * 0.1}
                >
                  <div
                    className={`lg:grid lg:grid-cols-2 lg:gap-8 pl-12 lg:pl-0 ${
                      index % 2 === 0 ? '' : 'lg:direction-rtl'
                    }`}
                  >
                    {/* Content */}
                    <div
                      className={`${
                        index % 2 === 0
                          ? 'lg:text-right lg:pr-8'
                          : 'lg:col-start-2 lg:text-left lg:pl-8'
                      }`}
                      style={{ direction: 'ltr' }}
                    >
                      <span className="text-label text-[var(--patina-clay-beige)] block mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="text-heading-2 text-[var(--patina-charcoal)] mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-body text-[var(--patina-mocha-brown)] leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Empty column for alternating layout */}
                    <div
                      className={`hidden lg:block ${
                        index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'
                      }`}
                    />
                  </div>
                </FadeIn>

                {/* Dot marker with icon */}
                <div className="absolute left-0 lg:left-1/2 top-0 lg:-translate-x-1/2 w-8 h-8 rounded-full bg-[var(--patina-warm-white)] border-2 border-[var(--patina-clay-beige)] flex items-center justify-center text-[var(--patina-clay-beige)]">
                  {iconComponents[milestone.icon]}
                </div>
              </li>
            ))}
          </ol>

          {/* Bottom strata mark */}
          <div className="flex justify-center mt-12 lg:mt-16">
            <StrataMark size="compact" />
          </div>
        </div>
      </Container>
    </section>
  );
}
