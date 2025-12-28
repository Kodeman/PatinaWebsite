import { cn } from "@/lib/utils";

export interface SkeletonProps {
  className?: string;
}

/**
 * Base Skeleton component for loading states
 * Uses shimmer animation from design system
 */
export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("skeleton", className)} />;
}

/**
 * Product Card Skeleton for loading states in grids
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-sm)]">
      {/* Image skeleton */}
      <Skeleton className="aspect-square w-full" />

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <Skeleton className="h-4 w-3/4" />
        {/* Maker */}
        <Skeleton className="h-3 w-1/2" />
        {/* Price */}
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}

/**
 * Hero Section Skeleton
 */
export function HeroSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 p-12">
      <div className="space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
      <Skeleton className="aspect-[4/3] rounded-[var(--radius-2xl)]" />
    </div>
  );
}

/**
 * Text Line Skeleton
 */
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-2/3" : "w-full" // Last line is shorter
          )}
        />
      ))}
    </div>
  );
}
