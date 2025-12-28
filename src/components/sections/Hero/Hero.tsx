import Link from "next/link";
import { cn } from "@/lib/utils";

export interface HeroProps {
  title: string;
  titleEmphasis?: string;
  description: string;
  provenanceLine?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  imageUrl?: string;
  imagePlaceholder?: string;
  materialTag?: {
    name: string;
    origin: string;
  };
}

/**
 * Hero Section - Two-column layout with paper texture and organic shapes
 * From design docs: patina-visual-refined.html
 */
export function Hero({
  title,
  titleEmphasis,
  description,
  provenanceLine,
  primaryCta,
  secondaryCta,
  imageUrl,
  imagePlaceholder = "Hero Photography",
  materialTag,
}: HeroProps) {
  // Split title if emphasis is provided
  const titleParts = titleEmphasis
    ? title.split(titleEmphasis)
    : [title];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--patina-warm-white)] to-[var(--patina-off-white)]">
      {/* Paper grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Organic background shapes */}
      <div
        className="absolute -bottom-12 -left-20 w-[300px] h-[200px] bg-[var(--patina-clay-beige)] opacity-[0.04] pointer-events-none"
        style={{
          borderRadius: "60% 40% 50% 50% / 50% 50% 40% 60%",
          transform: "rotate(-15deg)",
        }}
      />
      <div
        className="absolute top-[15%] right-[35%] w-[150px] h-[100px] bg-[var(--patina-clay-beige)] opacity-[0.04] pointer-events-none"
        style={{
          borderRadius: "60% 40% 50% 50% / 50% 50% 40% 60%",
          transform: "rotate(30deg)",
        }}
      />

      {/* Radial gradient accent */}
      <div
        className="absolute -top-[20%] -right-[10%] w-[50%] h-[80%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(163, 146, 124, 0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="order-2 lg:order-1">
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-6">
              {titleParts[0]}
              {titleEmphasis && (
                <em className="italic text-[var(--patina-mocha-brown)]">
                  {titleEmphasis}
                </em>
              )}
              {titleParts[1]}
            </h1>

            <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed mb-6 max-w-[440px]">
              {description}
            </p>

            {/* Provenance Line */}
            {provenanceLine && (
              <div className="flex items-center gap-3 py-3 mb-8 border-y border-[rgba(163,146,124,0.15)]">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 stroke-[var(--patina-clay-beige)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <span className="text-sm italic text-[var(--patina-mocha-brown)]">
                  {provenanceLine}
                </span>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className={cn(
                    "inline-flex items-center justify-center",
                    "px-8 py-4 text-[0.9375rem] font-medium",
                    "bg-[var(--patina-clay-beige)] text-[var(--patina-off-white)]",
                    "rounded-[var(--radius-lg)]",
                    "transition-all duration-[var(--duration-normal)] ease-[var(--ease-patina)]",
                    "hover:bg-[var(--patina-mocha-brown)]",
                    "shadow-[0_4px_12px_rgba(163,146,124,0.25)]",
                    "hover:shadow-[0_6px_20px_rgba(163,146,124,0.35)]"
                  )}
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className={cn(
                    "inline-flex items-center justify-center",
                    "px-8 py-4 text-[0.9375rem] font-medium",
                    "bg-transparent text-[var(--patina-charcoal)]",
                    "border-2 border-[var(--patina-clay-beige)]",
                    "rounded-[var(--radius-lg)]",
                    "transition-all duration-[var(--duration-normal)] ease-[var(--ease-patina)]",
                    "hover:bg-[var(--patina-soft-cream)]",
                    "hover:border-[var(--patina-mocha-brown)]"
                  )}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          {/* Image Column */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main Image Container */}
              <div
                className={cn(
                  "relative aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden",
                  "bg-gradient-to-br from-[#D8D2C8] to-[#C4BDB0]",
                  "shadow-[0_20px_60px_rgba(101,91,82,0.15)]"
                )}
              >
                {/* Organic frame accent */}
                <div
                  className="absolute inset-[-3px] rounded-[27px] pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(163, 146, 124, 0.2), transparent 50%, rgba(163, 146, 124, 0.1))",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    padding: "3px",
                  }}
                />

                {/* Image or Placeholder */}
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Featured furniture in natural setting"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs tracking-widest uppercase text-[var(--patina-mocha-brown)] bg-white/80 px-4 py-2 rounded-md">
                      {imagePlaceholder}
                    </span>
                  </div>
                )}

                {/* Material Tag */}
                {materialTag && (
                  <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-white/[0.92] backdrop-blur-sm px-4 py-3 rounded-[var(--radius-md)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white/80"
                      style={{
                        background: "linear-gradient(135deg, #8B7355 0%, #6B5344 100%)",
                      }}
                    />
                    <div className="text-[0.6875rem] leading-tight">
                      <div className="font-semibold text-[var(--patina-charcoal)]">
                        {materialTag.name}
                      </div>
                      <div className="text-[var(--patina-clay-beige)]">
                        {materialTag.origin}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
