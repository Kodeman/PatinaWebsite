"use client";

import { useFoundingModal } from "@/components/ui/FoundingCircleModal";

export function JoinCircleButton({
  source,
  className = "",
}: {
  source: string;
  className?: string;
}) {
  const { open } = useFoundingModal();
  return (
    <button
      type="button"
      className={`studio-button ${className}`}
      onClick={() => open({ source, ctaText: "Join the Founding Circle" })}
    >
      Join the Founding Circle <span aria-hidden="true">↗</span>
    </button>
  );
}
