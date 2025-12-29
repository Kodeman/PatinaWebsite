import { cn } from '@/lib/utils';
import type { PlaceholderImageMeta } from '@/types/about';

interface PlaceholderImageProps {
  meta: PlaceholderImageMeta;
  className?: string;
  showMetadata?: boolean;
}

const priorityGradients = {
  critical: 'from-[#D8D2C8] to-[#C4BDB0]',
  high: 'from-[#E2DDD6] to-[#D8D2C8]',
  medium: 'from-[#EDE9E4] to-[#E2DDD6]',
  low: 'from-[#F5F2ED] to-[#EDE9E4]',
} as const;

const priorityColors = {
  critical: 'bg-red-100 text-red-800',
  high: 'bg-amber-100 text-amber-800',
  medium: 'bg-blue-100 text-blue-800',
  low: 'bg-gray-100 text-gray-800',
} as const;

export function PlaceholderImage({
  meta,
  className,
  showMetadata = process.env.NODE_ENV === 'development',
}: PlaceholderImageProps) {
  // If an actual image URL is provided, render the real image
  if (meta.imageUrl) {
    return (
      <img
        src={meta.imageUrl}
        alt={meta.description}
        className={cn('object-cover', className)}
        loading="lazy"
      />
    );
  }

  // Otherwise render the placeholder
  return (
    <div
      className={cn(
        'relative bg-gradient-to-br',
        priorityGradients[meta.priority],
        'flex items-center justify-center',
        className
      )}
      role="img"
      aria-label={`Placeholder for: ${meta.description}`}
    >
      <div className="text-center p-4">
        <span className="text-xs tracking-widest uppercase text-[var(--patina-mocha-brown)] bg-white/80 px-4 py-2 rounded-md font-medium">
          {meta.label}
        </span>
        {showMetadata && (
          <div className="mt-3 space-y-2">
            <span
              className={cn(
                'inline-block text-[10px] px-2 py-0.5 rounded-full font-medium',
                priorityColors[meta.priority]
              )}
            >
              {meta.priority.toUpperCase()}
            </span>
            <p className="text-[10px] text-[var(--patina-mocha-brown)]/60 max-w-[200px] mx-auto leading-relaxed">
              {meta.description}
            </p>
            <p className="text-[9px] text-[var(--patina-mocha-brown)]/40">
              {meta.aspectRatio} • {meta.suggestedSources.join(' / ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
