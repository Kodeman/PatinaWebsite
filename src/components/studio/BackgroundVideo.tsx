"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef } from "react";
import { useStudioMotion } from "./StudioMotion";

type BackgroundVideoProps = {
  mp4Src: string;
  webmSrc: string;
  mobileMp4Src?: string;
  mobileWebmSrc?: string;
  poster: string;
  className?: string;
  /** False keeps a stacked, hidden layer from playing or downloading. */
  active?: boolean;
  /** Below 1 slows the loop so it reads as background rather than footage. */
  playbackRate?: number;
};

const MOBILE = "(max-width: 767px)";
const AV1 = 'video/webm; codecs="av01.0.05M.08"';

/**
 * A decorative, muted loop. It plays only while in view, and shows the still
 * poster when motion is off (device setting or the studio toggle) or Save-Data
 * is on.
 */
export function BackgroundVideo({
  mp4Src,
  webmSrc,
  mobileMp4Src,
  mobileWebmSrc,
  poster,
  className,
  active = true,
  playbackRate = 1,
}: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  // `enabled` already folds in prefers-reduced-motion (useReducedMotion).
  const { enabled } = useStudioMotion();
  // The poster is the first paint of a full-bleed hero, so serve it through
  // the image optimizer rather than as the 2400px source.
  const posterSrc = getImageProps({
    src: poster,
    alt: "",
    width: 960,
    height: 540,
  }).props.src;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (!enabled || saveData) {
      // Turning motion off returns the frame to the still poster.
      if (video.played.length) video.load();
      return;
    }
    if (!active) return;
    // React does not always hydrate `muted` as a property, and autoplay
    // policies reject play() on an unmuted element.
    video.muted = true;
    // The default rate survives load(), which resets playbackRate.
    video.defaultPlaybackRate = playbackRate;
    video.playbackRate = playbackRate;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [enabled, active, playbackRate]);

  return (
    <video
      ref={ref}
      className={className}
      poster={posterSrc}
      muted
      playsInline
      loop
      preload="none"
      aria-hidden="true"
    >
      {mobileWebmSrc && <source src={mobileWebmSrc} type={AV1} media={MOBILE} />}
      {mobileMp4Src && <source src={mobileMp4Src} type="video/mp4" media={MOBILE} />}
      <source src={webmSrc} type={AV1} />
      <source src={mp4Src} type="video/mp4" />
    </video>
  );
}
