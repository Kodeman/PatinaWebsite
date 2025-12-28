"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ARPreviewButtonProps {
  arModelUrl?: string;
  productName: string;
  productSlug?: string;
  className?: string;
}

export function ARPreviewButton({
  arModelUrl,
  productName,
  productSlug,
  className,
}: ARPreviewButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop">("desktop");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDeviceType("ios");
    } else if (/android/.test(userAgent)) {
      setDeviceType("android");
    } else {
      setDeviceType("desktop");
    }
  }, []);

  const handleClick = () => {
    if (arModelUrl && deviceType !== "desktop") {
      // If AR model exists and on mobile, attempt to open in AR Quick Look (iOS) or Scene Viewer (Android)
      window.open(arModelUrl, "_blank");
    } else {
      // Show modal with app download prompt / QR code
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center gap-3",
          "px-6 py-3 w-full",
          "bg-[var(--patina-charcoal)] text-[var(--patina-off-white)]",
          "rounded-[var(--radius-lg)]",
          "font-medium text-sm",
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-patina)]",
          "hover:bg-[var(--patina-mocha-brown)]",
          "shadow-[0_4px_12px_rgba(63,59,55,0.2)]",
          className
        )}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
        View in Your Space
      </button>

      {/* Coming Soon Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative bg-white rounded-[var(--radius-2xl)] p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--patina-soft-cream)] transition-colors"
            >
              <svg
                className="w-5 h-5 text-[var(--patina-mocha-brown)]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center">
              {deviceType === "desktop" ? (
                <>
                  {/* Desktop: Show QR code */}
                  <div className="w-40 h-40 mx-auto mb-6 bg-white border-2 border-[var(--patina-soft-cream)] rounded-xl flex items-center justify-center">
                    {/* QR Code placeholder - in production would generate actual QR code */}
                    <div className="w-32 h-32 bg-[var(--patina-charcoal)] rounded-lg p-2">
                      <div className="w-full h-full bg-white rounded grid grid-cols-5 gap-0.5 p-1">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "aspect-square rounded-sm",
                              [0,1,2,4,5,6,10,12,14,18,19,20,22,23,24].includes(i)
                                ? "bg-[var(--patina-charcoal)]"
                                : "bg-white"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-semibold text-[var(--patina-charcoal)] mb-2">
                    Scan to View in AR
                  </h3>
                  <p className="text-[var(--patina-mocha-brown)] mb-6">
                    Scan this QR code with your iPhone or Android to see the{" "}
                    {productName} in your space using the Patina app.
                  </p>

                  <div className="flex items-center justify-center gap-4 text-sm text-[var(--patina-clay-beige)]">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                      iOS
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 00-.83.22l-1.88 3.24a11.463 11.463 0 00-8.94 0L5.65 5.67a.643.643 0 00-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 001 18h22a10.78 10.78 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
                      </svg>
                      Android
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {/* Mobile: Show app download */}
                  <div className="w-16 h-16 mx-auto mb-6 bg-[var(--patina-soft-cream)] rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-[var(--patina-clay-beige)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-display font-semibold text-[var(--patina-charcoal)] mb-2">
                    AR Preview Coming Soon
                  </h3>
                  <p className="text-[var(--patina-mocha-brown)] mb-6">
                    We&apos;re working on bringing {productName} to life in augmented
                    reality. Download the Patina app to be notified when this
                    feature launches.
                  </p>

                  <div className="flex flex-col gap-3">
                    <a
                      href="/app"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--patina-clay-beige)] text-white rounded-[var(--radius-lg)] font-medium hover:bg-[var(--patina-mocha-brown)] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                      Get the App
                    </a>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-sm text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] transition-colors"
                    >
                      Maybe later
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
