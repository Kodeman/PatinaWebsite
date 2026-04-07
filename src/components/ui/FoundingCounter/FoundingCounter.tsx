'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FoundingCounterProps {
  variant?: 'default' | 'dark';
  showCap?: boolean;
  cap?: number;
  className?: string;
}

export function FoundingCounter({ variant = 'default', showCap = false, cap = 200, className }: FoundingCounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCount() {
      try {
        const res = await fetch('/api/founding/count');
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && typeof data.count === 'number') {
          setCount(data.count);
        }
      } catch {
        // Silently fail — counter just won't show
      }
    }

    fetchCount();

    // Refresh every 5 minutes
    const interval = setInterval(fetchCount, 5 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Cap display mode — always show, even at 0
  if (showCap) {
    const displayCount = count ?? 0;
    const percentage = Math.min((displayCount / cap) * 100, 100);

    return (
      <div className={cn('max-w-xs mx-auto', className)}>
        <p
          className={cn(
            'text-sm font-mono mb-2 text-center',
            variant === 'dark'
              ? 'text-[var(--patina-clay-beige)]'
              : 'text-[var(--patina-mocha-brown)]',
          )}
        >
          {displayCount} of {cap} spots claimed
        </p>
        <div
          className={cn(
            'h-1 rounded-full overflow-hidden',
            variant === 'dark'
              ? 'bg-[rgba(163,146,124,0.2)]'
              : 'bg-[var(--patina-clay-beige)]/20',
          )}
        >
          <div
            className="h-full rounded-full bg-[var(--patina-clay-beige)] transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  // Standard mode — hide if count is below 50 or unavailable
  if (count === null || count < 50) return null;

  return (
    <p
      className={cn(
        'text-sm',
        variant === 'dark'
          ? 'text-[var(--patina-clay-beige)]'
          : 'text-[var(--patina-clay-beige)]',
        className
      )}
    >
      Join {count.toLocaleString()} people already shaping Patina
    </p>
  );
}
