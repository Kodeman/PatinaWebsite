import { cn } from '@/lib/utils';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import type { Founder } from '@/types/about';

interface FounderCardProps {
  founder: Founder;
  className?: string;
}

export function FounderCard({ founder, className }: FounderCardProps) {
  return (
    <div
      className={cn(
        'bg-[var(--patina-warm-white)] rounded-[var(--radius-xl)] overflow-hidden',
        'shadow-[var(--shadow-sm)]',
        className
      )}
    >
      {/* Wood frame effect border */}
      <div className="p-1 bg-gradient-to-br from-[#8B7355] via-[#A08060] to-[#6B5344]">
        {/* Portrait */}
        <div className="aspect-[3/4] relative">
          {founder.imageUrl ? (
            <img
              src={founder.imageUrl}
              alt={`${founder.name}, ${founder.title}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <PlaceholderImage
              meta={founder.imagePlaceholder}
              className="w-full h-full"
              showMetadata={false}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-heading-3 text-[var(--patina-charcoal)] mb-1">{founder.name}</h3>
        <p className="text-label text-[var(--patina-clay-beige)] mb-3">
          {founder.role} | {founder.focus}
        </p>
        <p className="text-body-sm text-[var(--patina-mocha-brown)] leading-relaxed mb-2">
          {founder.bio}
        </p>
        <p className="text-body-sm text-[var(--patina-mocha-brown)]/60">{founder.location}</p>
      </div>
    </div>
  );
}
