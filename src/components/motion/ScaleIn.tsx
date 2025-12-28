"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

/**
 * Scale in animation - grows from smaller size
 */
export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
}: ScaleInProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.175, 0.885, 0.32, 1.275], // patina-spring
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
