import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface AgedPaperCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
}

export function AgedPaperCard({ children, className, variant = 'light' }: AgedPaperCardProps) {
  const variantStyles = {
    light: 'bg-[#F5F0E8] text-[var(--patina-charcoal)]',
    dark: 'bg-[#E8E2D8] text-[var(--patina-charcoal)]',
  };

  return (
    <div
      className={cn(
        'relative rounded-[var(--radius-lg)] overflow-hidden',
        'shadow-[var(--shadow-sm)]',
        variantStyles[variant],
        className
      )}
    >
      {/* Aged paper texture overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Subtle vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(139, 115, 85, 0.08) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
