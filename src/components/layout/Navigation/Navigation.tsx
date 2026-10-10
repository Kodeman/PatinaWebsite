"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { StrataMark } from "@/components/ui/StrataMark";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { track } from "@/lib/analytics";
import { MotionControl } from "@/components/studio/StudioMotion";

const links = [
  { href: "/", label: "The studio" },
  { href: "/about", label: "Our story" },
  { href: "/designers", label: "For designers" },
  { href: "/makers", label: "For makers" },
  { href: "/journal", label: "Journal" },
];

export interface NavigationProps {
  variant?: "default" | "dark" | "transparent";
  hideAtTop?: boolean;
}

export function Navigation({}: NavigationProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scene, setScene] = useState({ scene: "room", past: false });
  useEffect(() => {
    const update = (event: Event) =>
      setScene((event as CustomEvent<{ scene: string; past: boolean }>).detail);
    window.addEventListener("patina:scene", update);
    return () => window.removeEventListener("patina:scene", update);
  }, []);
  useEffect(() => {
    menuRef.current?.close();
  }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previousOverflow;
    };
  }, [menuOpen]);
  const isDark = pathname === "/" && scene.scene !== "study" && !scene.past;
  function closeMenu() {
    menuRef.current?.close();
  }
  return (
    <>
      <header className={`studio-nav ${isDark ? "studio-nav-over-room" : ""}`}>
        <Link href="/" aria-label="Patina home" className="studio-brand">
          <span>PATINA</span>
          <StrataMark
            size="compact"
            align="left"
            variant={isDark ? "on-clay" : "default"}
          />
        </Link>
        <nav className="studio-desktop-links" aria-label="Main navigation">
          {links
            .filter((link) => link.href !== "/")
            .map((link) => (
              <TrackedLink
                href={link.href}
                key={link.href}
                event="nav_link_clicked"
                location="nav"
                label={link.label}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </TrackedLink>
            ))}
        </nav>
        <TrackedLink
          href="/designers"
          location="nav"
          className="studio-button studio-nav-join"
        >
          Bring one live project <span aria-hidden="true">↗</span>
        </TrackedLink>
        <button
          type="button"
          ref={triggerRef}
          className="studio-menu-toggle"
          aria-haspopup="dialog"
          aria-controls="studio-menu"
          aria-expanded={menuOpen}
          onClick={() => {
            track("cta_click", {
              cta_text: "Menu",
              cta_location: "mobile_menu_toggle",
              destination: "#studio-menu",
              page: pathname,
            });
            menuRef.current?.showModal();
            setMenuOpen(true);
          }}
        >
          Menu
        </button>
      </header>
      <dialog
        ref={menuRef}
        id="studio-menu"
        className="studio-menu"
        aria-label="Explore the Patina studio"
        onClose={() => {
          setMenuOpen(false);
          triggerRef.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="studio-menu-sheet">
          <div className="studio-menu-top">
            <StrataMark size="compact" align="left" />
            <button type="button" onClick={closeMenu} aria-label="Close menu">
              Close ×
            </button>
          </div>
          <p className="studio-kicker">Make yourself at home.</p>
          <nav aria-label="Studio navigation">
            {links.map((link) => (
              <TrackedLink
                href={link.href}
                key={link.href}
                event="nav_link_clicked"
                location="mobile_menu"
                label={link.label}
                onClick={closeMenu}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </TrackedLink>
            ))}
          </nav>
          <TrackedLink
            href="/designers"
            location="mobile_menu"
            className="studio-button"
            onClick={closeMenu}
          >
            Bring one live project <span aria-hidden="true">↗</span>
          </TrackedLink>
          <div className="studio-menu-foot">
            <TrackedLink
              href="/founding"
              event="nav_link_clicked"
              location="mobile_menu"
              onClick={closeMenu}
            >
              Explore the Founding Circle
            </TrackedLink>
            <MotionControl />
          </div>
        </div>
      </dialog>
    </>
  );
}
