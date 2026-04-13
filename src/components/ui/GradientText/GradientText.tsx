import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "em";
}

export function GradientText({
  children,
  className,
  as: Tag = "em",
}: GradientTextProps) {
  return (
    <Tag
      className={cn("italic", className)}
      style={{
        background:
          "linear-gradient(135deg, var(--patina-clay-light), var(--patina-golden))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </Tag>
  );
}
