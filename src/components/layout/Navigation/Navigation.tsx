"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { StrataMark } from "@/components/ui/StrataMark";
import { JoinCircleButton } from "@/components/studio/JoinCircleButton";
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
              <Link
                href={link.href}
                key={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
        </nav>
        <JoinCircleButton source="studio_nav" className="studio-nav-join" />
        <button
          type="button"
          ref={triggerRef}
          className="studio-menu-toggle"
          aria-haspopup="dialog"
          aria-controls="studio-menu"
          aria-expanded={menuOpen}
          onClick={() => {
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
              <Link
                href={link.href}
                key={link.href}
                onClick={closeMenu}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          <div
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("button")) closeMenu();
            }}
          >
            <JoinCircleButton source="studio_menu" />
          </div>
          <div className="studio-menu-foot">
            <Link href="/founding" onClick={closeMenu}>
              Explore the Founding Circle
            </Link>
            <MotionControl />
          </div>
        </div>
      </dialog>
    </>
  );
}
