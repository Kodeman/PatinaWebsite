"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const MotionContext = createContext({
  enabled: true,
  systemReduced: false,
  toggle: () => {},
});

export function StudioMotionProvider({ children }: { children: ReactNode }) {
  const systemReduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const enabled = !systemReduced && !paused;
  useEffect(() => {
    document.body.dataset.studioMotion = enabled ? "on" : "off";
    return () => {
      delete document.body.dataset.studioMotion;
    };
  }, [enabled]);
  return (
    <MotionContext.Provider
      value={{
        enabled,
        systemReduced,
        toggle: () => setPaused((value) => !value),
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export const useStudioMotion = () => useContext(MotionContext);

export function StudioMotion({
  children,
  className = "",
  kind = "image",
}: {
  children: ReactNode;
  className?: string;
  kind?: "image" | "paper";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useStudioMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    kind === "image" ? [35, -35] : [28, -16],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    kind === "paper" ? [-2, 1] : [0, 0],
  );
  return (
    <motion.div
      ref={ref}
      className={`studio-motion ${className}`}
      style={enabled ? { y, rotate } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function MotionControl({ className = "" }: { className?: string }) {
  const { enabled, systemReduced, toggle } = useStudioMotion();
  return (
    <button
      type="button"
      className={`studio-motion-control ${className}`}
      onClick={toggle}
      disabled={systemReduced}
      aria-pressed={enabled}
      aria-label={
        systemReduced ? "Motion off, following your device setting" : undefined
      }
    >
      Motion {enabled ? "on" : "off"}
    </button>
  );
}
