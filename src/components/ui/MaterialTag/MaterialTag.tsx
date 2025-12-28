import { cn } from "@/lib/utils";

export interface MaterialTagProps {
  name: string;
  origin?: string;
  colorHex?: string;
  size?: "sm" | "md";
  className?: string;
}

export function MaterialTag({
  name,
  origin,
  colorHex = "#8B7355",
  size = "md",
  className,
}: MaterialTagProps) {
  const sizeStyles = {
    sm: {
      container: "px-2.5 py-1.5 gap-1.5",
      swatch: "w-4 h-4",
      text: "text-[0.625rem]",
    },
    md: {
      container: "px-4 py-3 gap-2",
      swatch: "w-6 h-6",
      text: "text-[0.6875rem]",
    },
  };

  const styles = sizeStyles[size];

  return (
    <div
      className={cn(
        "inline-flex items-center bg-white/[0.92] backdrop-blur-sm rounded-[var(--radius-md)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
        styles.container,
        className
      )}
    >
      <div
        className={cn(
          "rounded-full border-2 border-white/80",
          styles.swatch
        )}
        style={{
          background: `linear-gradient(135deg, ${colorHex} 0%, ${adjustColor(colorHex, -20)} 100%)`,
        }}
      />
      <div className={cn("leading-tight", styles.text)}>
        <div className="font-semibold text-[var(--patina-charcoal)]">{name}</div>
        {origin && (
          <div className="text-[var(--patina-clay-beige)]">{origin}</div>
        )}
      </div>
    </div>
  );
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
