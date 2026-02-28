import { cn } from '@/lib/utils';

type FeatureStatus = 'in-development' | 'founding-first' | 'at-launch';

interface FeatureStatusBadgeProps {
  status: FeatureStatus;
  className?: string;
}

const statusConfig: Record<FeatureStatus, { label: string; bgClass: string; textClass: string }> = {
  'in-development': {
    label: 'In Development',
    bgClass: 'bg-[var(--patina-clay-beige)]',
    textClass: 'text-[var(--patina-charcoal)]',
  },
  'founding-first': {
    label: 'Founding Members First',
    bgClass: 'bg-[var(--patina-mocha-brown)]',
    textClass: 'text-[var(--patina-off-white)]',
  },
  'at-launch': {
    label: 'At Launch',
    bgClass: 'bg-[var(--patina-charcoal)]',
    textClass: 'text-[var(--patina-off-white)]',
  },
};

export function FeatureStatusBadge({ status, className }: FeatureStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full',
        config.bgClass,
        config.textClass,
        className
      )}
    >
      {config.label}
    </span>
  );
}
