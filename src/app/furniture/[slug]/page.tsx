import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ProductGallery } from "@/components/features/ProductGallery";
import { ARPreviewButton } from "@/components/features/ARPreviewButton";
import { ProductCard } from "@/components/features/ProductCard";
import { MaterialTag } from "@/components/ui/MaterialTag";
import { formatPrice } from "@/lib/utils";
import { sanityFetch } from "../../../../sanity/lib/client";
import { productBySlugQuery, relatedProductsQuery } from "../../../../sanity/lib/queries";
import type { Product, ProductCard as ProductCardType } from "@/types/sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();

  const product = await sanityFetch<Product | null>({
    query: productBySlugQuery,
    params: { slug },
    isDraftMode: isDraft,
  });

  if (!product) {
    return {
      title: "Product Not Found | Patina",
    };
  }

  return {
    title: `${product.name} | Patina`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();

  const product = await sanityFetch<Product | null>({
    query: productBySlugQuery,
    params: { slug },
    isDraftMode: isDraft,
  });

  // Fetch related products
  const relatedProducts = product
    ? await sanityFetch<ProductCardType[]>({
        query: relatedProductsQuery,
        params: { category: product.category, currentSlug: slug },
        isDraftMode: isDraft,
      })
    : [];

  if (!product) {
    notFound();
  }

  const galleryImages = product.gallery?.map((img) => ({
    url: img.asset?.url || "",
    alt: img.alt,
    caption: img.caption,
  })) || [];

  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Breadcrumb */}
        <div className="pt-24 pb-6 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] transition-colors"
              >
                Home
              </Link>
              <span className="text-[var(--patina-clay-beige)]">/</span>
              <Link
                href="/furniture"
                className="text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] transition-colors"
              >
                Furniture
              </Link>
              <span className="text-[var(--patina-clay-beige)]">/</span>
              <span className="text-[var(--patina-charcoal)]">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Content */}
        <section className="py-12 lg:py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Gallery */}
              <div>
                <ProductGallery
                  images={galleryImages}
                  productName={product.name}
                />
              </div>

              {/* Product Info */}
              <div>
                {/* Maker Badge */}
                {product.maker?.badges?.[0] && (
                  <div className="inline-flex items-center gap-2 bg-[var(--patina-soft-cream)] px-3 py-1.5 rounded-full mb-4">
                    <span className="w-2 h-2 bg-[var(--patina-clay-beige)] rounded-full" />
                    <span className="text-xs font-medium text-[var(--patina-charcoal)]">
                      {product.maker.badges[0]}
                    </span>
                  </div>
                )}

                {/* Title & Price */}
                <h1 className="text-display-2 text-[var(--patina-charcoal)] mb-2">
                  {product.name}
                </h1>
                <p className="text-2xl font-display text-[var(--patina-mocha-brown)] mb-6">
                  {formatPrice(product.price)}
                </p>

                {/* Description */}
                <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Material Tag */}
                {product.material && (
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-wider text-[var(--patina-clay-beige)] mb-3">
                      Primary Material
                    </p>
                    <MaterialTag
                      name={product.material.name}
                      origin={product.material.origin}
                      colorHex={product.material.colorHex}
                    />
                  </div>
                )}

                {/* Dimensions */}
                {product.dimensions && (
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-wider text-[var(--patina-clay-beige)] mb-3">
                      Dimensions
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {product.dimensions.width && (
                        <div>
                          <p className="text-sm text-[var(--patina-mocha-brown)]">
                            Width
                          </p>
                          <p className="text-lg font-medium text-[var(--patina-charcoal)]">
                            {product.dimensions.width}
                          </p>
                        </div>
                      )}
                      {product.dimensions.depth && (
                        <div>
                          <p className="text-sm text-[var(--patina-mocha-brown)]">
                            Depth
                          </p>
                          <p className="text-lg font-medium text-[var(--patina-charcoal)]">
                            {product.dimensions.depth}
                          </p>
                        </div>
                      )}
                      {product.dimensions.height && (
                        <div>
                          <p className="text-sm text-[var(--patina-mocha-brown)]">
                            Height
                          </p>
                          <p className="text-lg font-medium text-[var(--patina-charcoal)]">
                            {product.dimensions.height}
                          </p>
                        </div>
                      )}
                      {product.dimensions.seatHeight && (
                        <div>
                          <p className="text-sm text-[var(--patina-mocha-brown)]">
                            Seat Height
                          </p>
                          <p className="text-lg font-medium text-[var(--patina-charcoal)]">
                            {product.dimensions.seatHeight}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Lead Time */}
                {product.leadTime && (
                  <div className="flex items-center gap-3 py-4 mb-8 border-y border-[rgba(163,146,124,0.15)]">
                    <svg
                      className="w-5 h-5 text-[var(--patina-clay-beige)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm text-[var(--patina-mocha-brown)]">
                      Made to order:{" "}
                      <span className="font-medium text-[var(--patina-charcoal)]">
                        {product.leadTime}
                      </span>
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-4">
                  <ARPreviewButton
                    arModelUrl={product.arModelUrl}
                    productName={product.name}
                  />

                  <Link
                    href="/services"
                    className="flex items-center justify-center gap-3 px-6 py-3 w-full border-2 border-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium text-sm hover:bg-[var(--patina-soft-cream)] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                      />
                    </svg>
                    Work with a Designer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Maker Story */}
        {product.maker && (
          <section className="py-16 bg-[var(--patina-soft-cream)]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                  The Maker
                </p>
                <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-2">
                  {product.maker.name}
                </h2>
                {product.maker.location && (
                  <p className="text-lg text-[var(--patina-mocha-brown)] mb-6">
                    {product.maker.location}
                    {product.maker.yearsOfCraft &&
                      ` · ${product.maker.yearsOfCraft} years of craft`}
                  </p>
                )}
                {product.maker.quote && (
                  <blockquote className="text-xl italic text-[var(--patina-mocha-brown)] leading-relaxed">
                    &ldquo;{product.maker.quote}&rdquo;
                  </blockquote>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Care & Shipping Info */}
        {(product.careInstructions || product.shipping) && (
          <section className="py-16">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Care Instructions */}
                {product.careInstructions && product.careInstructions.length > 0 && (
                  <div className="bg-[var(--patina-soft-cream)] rounded-[var(--radius-xl)] p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[var(--patina-warm-white)] rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-[var(--patina-clay-beige)]"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-display font-semibold text-[var(--patina-charcoal)]">
                        Care Instructions
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {product.careInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-[var(--patina-clay-beige)] mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                          <span className="text-[var(--patina-mocha-brown)]">
                            {instruction}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Shipping Info */}
                {product.shipping && (
                  <div className="bg-[var(--patina-soft-cream)] rounded-[var(--radius-xl)] p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[var(--patina-warm-white)] rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-[var(--patina-clay-beige)]"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-display font-semibold text-[var(--patina-charcoal)]">
                        Shipping & Delivery
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-[var(--patina-clay-beige)] mb-1">
                          Delivery Method
                        </p>
                        <p className="text-[var(--patina-charcoal)] font-medium">
                          {product.shipping.method}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[var(--patina-clay-beige)] mb-1">
                          Estimated Delivery
                        </p>
                        <p className="text-[var(--patina-charcoal)] font-medium">
                          {product.shipping.estimate}
                        </p>
                      </div>
                      {product.shipping.includes && (
                        <div>
                          <p className="text-sm text-[var(--patina-clay-beige)] mb-2">
                            White Glove Service Includes
                          </p>
                          <ul className="space-y-2">
                            {product.shipping.includes.map((item, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <svg
                                  className="w-4 h-4 text-[var(--patina-clay-beige)]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                  />
                                </svg>
                                <span className="text-sm text-[var(--patina-mocha-brown)]">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Related Products */}
        <section className="py-16 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <p className="text-label text-[var(--patina-clay-beige)] mb-2">
                  Complete the Look
                </p>
                <h2 className="text-heading-2 text-[var(--patina-charcoal)]">
                  Pieces that pair{" "}
                  <em className="italic text-[var(--patina-mocha-brown)]">beautifully</em>
                </h2>
              </div>
              <Link
                href="/furniture"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] transition-colors"
              >
                View all furniture
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Generate static params from Sanity
export async function generateStaticParams() {
  const { client } = await import("../../../../sanity/lib/client");
  const slugs = await client.fetch<string[]>(
    `*[_type == "product" && defined(slug.current)].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}
