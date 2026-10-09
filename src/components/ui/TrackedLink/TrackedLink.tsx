"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { track } from "@/lib/analytics";

type TrackedLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  /** Where the link sits: cta_location, nav location, or maker_apply_click source. */
  location: string;
  /** Event to fire on click. Defaults to cta_click. */
  event?: "cta_click" | "nav_link_clicked" | "maker_apply_click";
  /** Text to report; defaults to the link's text without decorative arrows. */
  label?: string;
};

function linkText(el: HTMLElement) {
  return (el.textContent ?? "").replace(/[↗↓→←]/g, "").replace(/\s+/g, " ").trim();
}

function fire(
  event: NonNullable<TrackedLinkProps["event"]>,
  location: string,
  label: string,
  href: string,
) {
  if (event === "nav_link_clicked") {
    track(event, { label, href, location });
  } else if (event === "maker_apply_click") {
    track(event, { source: location });
  } else {
    track(event, {
      cta_text: label,
      cta_location: location,
      destination: href,
      page: window.location.pathname,
    });
  }
}

/**
 * A link that records its click. Internal paths render next/link; outbound,
 * mailto, hash, and download links render a plain anchor. This is the only
 * client boundary, so server pages can use it without becoming client code.
 */
export function TrackedLink({
  href,
  location,
  event = "cta_click",
  label,
  onClick,
  ...rest
}: TrackedLinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    fire(event, location, label ?? linkText(e.currentTarget), href);
    onClick?.(e);
  }

  if (href.startsWith("/") && !rest.download) {
    return <Link href={href} onClick={handleClick} {...rest} />;
  }
  return <a href={href} onClick={handleClick} {...rest} />;
}
