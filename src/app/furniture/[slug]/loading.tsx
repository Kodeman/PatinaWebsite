import { Navigation } from "@/components/layout/Navigation";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductDetailLoading() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Breadcrumb Skeleton */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-4">
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Main Product Section */}
        <section className="pb-16 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Gallery Skeleton */}
              <div className="space-y-4">
                <Skeleton className="aspect-[4/3] rounded-[var(--radius-2xl)]" />
                <div className="flex gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="w-20 h-20 rounded-lg flex-shrink-0" />
                  ))}
                </div>
              </div>

              {/* Product Info Skeleton */}
              <div className="lg:pt-8 space-y-8">
                {/* Maker Badge */}
                <Skeleton className="h-6 w-32 rounded-full" />

                {/* Title & Price */}
                <div className="space-y-4">
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-8 w-32" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Material Tag */}
                <Skeleton className="h-12 w-64 rounded-full" />

                {/* Dimensions */}
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-4 pt-4">
                  <Skeleton className="h-14 w-full rounded-lg" />
                  <Skeleton className="h-14 w-full rounded-lg" />
                </div>

                {/* Lead Time */}
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Care & Shipping Skeleton */}
        <section className="py-16 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-5 w-full" />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-5 w-48" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-5 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
