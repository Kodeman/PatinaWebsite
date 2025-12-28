import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
  size?: "sm" | "default" | "lg" | "xl" | "full";
  className?: string;
  as?: "div" | "section" | "article" | "main";
}

/**
 * Container component for consistent max-width and padding
 */
export function Container({
  children,
  size = "default",
  className,
  as: Component = "div",
}: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-[640px]",
    default: "max-w-[1100px]",
    lg: "max-w-[1200px]",
    xl: "max-w-[1400px]",
    full: "max-w-full",
  };

  return (
    <Component
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
