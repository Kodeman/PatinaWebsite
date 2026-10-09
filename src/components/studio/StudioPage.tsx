import Image from "next/image";
import type { ReactNode } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { StrataMark } from "@/components/ui/StrataMark";
import { StudioMotion } from "./StudioMotion";

interface StudioPageProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  tone?: "paper" | "olive";
  children: ReactNode;
  heroArt?: ReactNode;
  heroAction?: ReactNode;
  className?: string;
}

export function StudioPage({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  imageCaption,
  tone = "paper",
  children,
  heroArt,
  heroAction,
  className = "",
}: StudioPageProps) {
  return (
    <div className={`studio-page ${className}`}>
      <Navigation />
      <main id="main-content">
        <header
          className={`studio-page-intro studio-tone-${tone} ${image || heroArt ? "has-image" : ""}`}
        >
          <div className="studio-page-heading">
            <p className="studio-kicker">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="studio-intro-description">{description}</p>
            {heroAction && (
              <div className="studio-hero-action">{heroAction}</div>
            )}
            <StrataMark
              size="compact"
              align="left"
              variant={tone === "olive" ? "on-clay" : "default"}
            />
          </div>
          {heroArt ? (
            <div className="studio-custom-art">{heroArt}</div>
          ) : (
            image && (
              <StudioMotion className="studio-intro-art" kind="paper">
                <figure>
                  <Image
                    src={image}
                    alt={imageAlt}
                    width={1536}
                    height={1024}
                    sizes="(max-width: 760px) 100vw, 48vw"
                    priority
                  />
                  <figcaption>
                    {imageCaption ||
                      "Illustrative imagery — awaiting partner photography."}
                  </figcaption>
                </figure>
              </StudioMotion>
            )
          )}
        </header>
        {children}
      </main>
      <Footer />
    </div>
  );
}
