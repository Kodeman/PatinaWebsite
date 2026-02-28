'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FoundingCounterProps {
  variant?: 'default' | 'dark';
  className?: string;
}

export function FoundingCounter({ variant = 'default', className }: FoundingCounterProps) {
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

  // Hide if count is below 50 or unavailable
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
