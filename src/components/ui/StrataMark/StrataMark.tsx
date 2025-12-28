import { cn } from "@/lib/utils";

export interface StrataMarkProps {
  /** Size of the strata mark */
  size?: "compact" | "medium" | "large";
  /** Color variant based on background */
  variant?: "default" | "reversed" | "on-clay";
  /** Alignment of the lines */
  align?: "left" | "center";
  /** Optional className for customization */
  className?: string;
}

/**
 * StrataMark - The Patina logo mark consisting of three horizontal lines
 * Represents accumulated layers of time and value
 *
 * Line specifications from design docs:
 * - Width ratios: 100% / 80% / 60%
 * - Height ratios: 100% / 85% / 70%
 * - Line 3 opacity: 50%
 */
export function StrataMark({
  size = "medium",
  variant = "default",
  align = "center",
  className,
}: StrataMarkProps) {
  // Size configurations from design docs
  const sizeConfig = {
    compact: {
      baseWidth: 40,
      lineHeight: 2,
      gap: 3,
    },
    medium: {
      baseWidth: 80,
      lineHeight: 3,
      gap: 5,
    },
    large: {
      baseWidth: 120,
      lineHeight: 4,
      gap: 6,
    },
  };

  // Color configurations
  const colorConfig = {
    default: {
      line1: "bg-[var(--patina-mocha-brown)]",
      line2: "bg-[var(--patina-clay-beige)]",
      line3: "bg-[var(--patina-clay-beige)] opacity-50",
    },
    reversed: {
      line1: "bg-[var(--patina-clay-beige)]",
      line2: "bg-[var(--patina-clay-beige)] opacity-70",
      line3: "bg-[var(--patina-clay-beige)] opacity-40",
    },
    "on-clay": {
      line1: "bg-[var(--patina-off-white)]",
      line2: "bg-[var(--patina-off-white)] opacity-70",
      line3: "bg-[var(--patina-off-white)] opacity-40",
    },
  };

  const { baseWidth, lineHeight, gap } = sizeConfig[size];
  const colors = colorConfig[variant];

  const alignmentClass = align === "center" ? "items-center" : "items-start";

  return (
    <div
      className={cn("flex flex-col", alignmentClass, className)}
      style={{ gap: `${gap}px` }}
      role="img"
      aria-label="Patina strata mark"
    >
      {/* Line 1 - 100% width, 100% height */}
      <span
        className={cn("rounded-full", colors.line1)}
        style={{
          width: `${baseWidth}px`,
          height: `${lineHeight}px`,
        }}
      />
      {/* Line 2 - 80% width, 85% height */}
      <span
        className={cn("rounded-full", colors.line2)}
        style={{
          width: `${baseWidth * 0.8}px`,
          height: `${lineHeight * 0.85}px`,
        }}
      />
      {/* Line 3 - 60% width, 70% height, 50% opacity */}
      <span
        className={cn("rounded-full", colors.line3)}
        style={{
          width: `${baseWidth * 0.6}px`,
          height: `${lineHeight * 0.7}px`,
        }}
      />
    </div>
  );
}
