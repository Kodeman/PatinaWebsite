"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

interface OpenOptions {
  source: string;
  ctaText?: string;
}

interface FoundingModalContextValue {
  isOpen: boolean;
  source: string | null;
  ctaText: string | null;
  open: (options: OpenOptions) => void;
  close: () => void;
}

const FoundingModalContext = createContext<FoundingModalContextValue | null>(null);

export function FoundingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [ctaText, setCtaText] = useState<string | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const open = useCallback((options: OpenOptions) => {
    // Remember what triggered this so we can restore focus on close
    if (typeof document !== "undefined") {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
    }
    setSource(options.source);
    setCtaText(options.ctaText ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Restore focus after the close animation completes
    const el = triggerElementRef.current;
    if (el && typeof el.focus === "function") {
      setTimeout(() => el.focus(), 500);
    }
  }, []);

  return (
    <FoundingModalContext.Provider value={{ isOpen, source, ctaText, open, close }}>
      {children}
    </FoundingModalContext.Provider>
  );
}

export function useFoundingModal() {
  const ctx = useContext(FoundingModalContext);
  if (!ctx) {
    throw new Error("useFoundingModal must be used within FoundingModalProvider");
  }
  return ctx;
}
