"use client";

/**
 * VoidTransition - 10vh pure black section
 * Brief transition ensuring full black before question reveal
 */
export function VoidTransition() {
  return (
    <div
      className="h-[10vh] bg-black"
      aria-hidden="true"
    />
  );
}
