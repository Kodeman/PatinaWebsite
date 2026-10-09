"use client";

import { useFoundingModal } from "@/components/ui/FoundingCircleModal";
import { track } from "@/lib/analytics";

export function JoinCircleButton({
  source,
  location = "inline",
  className = "",
}: {
  source: string;
  location?: "hero" | "nav" | "footer" | "inline" | "mobile_menu";
  className?: string;
}) {
  const { open } = useFoundingModal();
  return (
    <button
      type="button"
      className={`studio-button ${className}`}
      onClick={() => {
        track("founding_cta_click", { source, element_location: location });
        open({ source, ctaText: "Join the Founding Circle" });
      }}
    >
      Join the Founding Circle <span aria-hidden="true">↗</span>
    </button>
  );
}
