import { Navigation } from "@/components/layout/Navigation";
import { Skeleton } from "@/components/ui/Skeleton";

export default function FurnitureLoading() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Hero Skeleton */}
        <section className="relative pt-32 pb-12 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <Skeleton className="h-4 w-24 mx-auto mb-3" />
            <Skeleton className="h-12 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
        </section>

        {/* Filter Bar Skeleton */}
        <section className="py-12">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="space-y-6 mb-10 pb-6 border-b border-[rgba(163,146,124,0.15)]">
              {/* Category Filter Skeletons */}
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-24 rounded-full" />
                ))}
              </div>

              {/* Sort/Price Skeletons */}
              <div className="flex flex-wrap items-center gap-4">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-36" />
              </div>
            </div>

            {/* Results Count Skeleton */}
            <Skeleton className="h-5 w-48 mb-8" />

            {/* Product Grid Skeleton */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/5] rounded-[var(--radius-xl)]" />
                  <div className="space-y-2 px-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
