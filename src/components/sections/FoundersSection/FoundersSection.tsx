'use client';

import { Container } from '@/components/layout/Container';
import { FadeIn, ScaleIn, StaggerChildren, StaggerItem } from '@/components/motion';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { FounderCard } from '@/components/ui/FounderCard';
import { StrataMark } from '@/components/ui/StrataMark';
import { founders as defaultFounders, foundersTogetherImage } from '@/data/aboutContent';
import type { Founder } from '@/types/about';

interface FoundersSectionProps {
  founders?: Array<{
    _id: string;
    name: string;
    role: string;
    title?: string;
    bio?: string;
    credentials?: string[];
    imageUrl?: string;
  }>;
}

export function FoundersSection({ founders: foundersProp }: FoundersSectionProps) {
  // Convert CMS data to match local Founder type, or use defaults
  const displayFounders: Founder[] = foundersProp?.length
    ? foundersProp.map((f) => ({
        id: f._id,
        name: f.name,
        role: f.role,
        title: f.title || f.role,
        focus: f.title || f.role,
        bio: f.bio || '',
        credentials: f.credentials || [],
        location: 'Madison, Wisconsin',
        imagePlaceholder: f.imageUrl
          ? {
              id: f._id,
              label: f.name,
              description: `Portrait of ${f.name}`,
              priority: 'critical' as const,
              aspectRatio: '3:4',
              suggestedSources: ['Professional shoot'],
              imageUrl: f.imageUrl,
            }
          : {
              id: f._id,
              label: f.name,
              description: `Portrait of ${f.name}`,
              priority: 'critical' as const,
              aspectRatio: '3:4',
              suggestedSources: ['Professional shoot'],
            },
      }))
    : defaultFounders;
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
      <Container>
        {/* Section header */}
        <FadeIn className="text-center mb-12">
          <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
            The Founders
          </span>
          <h2 className="text-heading-1 text-[var(--patina-charcoal)]">
            A partnership built on{' '}
            <em className="text-[var(--patina-mocha-brown)] not-italic">complementary visions</em>
          </h2>
        </FadeIn>

        {/* Hero image - founders together */}
        <ScaleIn className="mb-12 lg:mb-16">
          <div className="aspect-[16/9] rounded-[var(--radius-xl)] overflow-hidden max-w-[900px] mx-auto">
            <PlaceholderImage meta={foundersTogetherImage} className="w-full h-full" />
          </div>
        </ScaleIn>

        {/* Individual founder cards */}
        <StaggerChildren staggerDelay={0.15} className="max-w-[800px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {displayFounders.map((founder) => (
              <StaggerItem key={founder.id}>
                <FounderCard founder={founder} />
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>

        {/* Bottom quote */}
        <FadeIn delay={0.3} className="mt-12 lg:mt-16 text-center max-w-[700px] mx-auto">
          <div className="flex justify-center mb-6">
            <StrataMark size="compact" />
          </div>
          <blockquote className="text-lg text-[var(--patina-mocha-brown)] italic leading-relaxed">
            &ldquo;The foundation is solid. Built by two people who saw the same problem from
            different angles and realized they could solve it together.&rdquo;
          </blockquote>
        </FadeIn>
      </Container>
    </section>
  );
}
