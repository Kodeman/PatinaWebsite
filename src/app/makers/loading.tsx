import { Navigation } from "@/components/layout/Navigation";
import { Skeleton } from "@/components/ui/Skeleton";

export default function MakersLoading() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Hero Skeleton */}
        <section className="relative pt-32 pb-20 lg:pb-28 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Skeleton className="h-4 w-24 mx-auto mb-3" />
            <Skeleton className="h-12 w-64 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
        </section>

        {/* Makers Grid Skeleton */}
        <section className="py-20 lg:py-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-[var(--patina-soft-cream)] rounded-[var(--radius-xl)] overflow-hidden">
                  <Skeleton className="aspect-[3/2]" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-28" />
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
