"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./DesignersPage.module.css";

const perspectives = [
  {
    label: "Proportion",
    title: "How it sits in the room.",
    description:
      "The space around an armchair. The scale of a table. The relationship between pieces. You see the room before you see a list of products.",
    image: "/images/studio/room.jpg",
    alt: "Illustrative room study showing the relationship between a lounge chair, sofa, and low table",
  },
  {
    label: "Material",
    title: "What you want to reach for.",
    description:
      "Walnut beside linen. A soft surface against a strong line. Your vocabulary comes from working with materials, and knowing what they bring to a room.",
    image: "/images/studio/materials.jpg",
    alt: "Illustrative composition of timber, linen, leather, and a furniture sketch",
  },
  {
    label: "Character",
    title: "What makes it worth keeping.",
    description:
      "A considered curve. A little irregularity. The detail that makes a piece feel like itself. That kind of judgment deserves a place in the tools you use.",
    image: "/images/studio/chair.png",
    alt: "Illustrative timber and leather lounge chair, isolated to show its form",
  },
] as const;

export function DesignerWorkbench() {
  const [selected, setSelected] = useState(0);
  return (
    <section
      className={styles.workbench}
      aria-labelledby="designer-perspective-title"
    >
      <div className={styles.workbenchArt}>
        {perspectives.map((perspective, index) => (
          <div
            key={perspective.label}
            className={`${styles.studyImage} ${index === 2 ? styles.isolatedStudy : ""}`}
            data-active={selected === index}
            aria-hidden={selected !== index}
          >
            <Image
              src={perspective.image}
              alt={perspective.alt}
              fill
              sizes="(max-width: 850px) 100vw, 58vw"
            />
          </div>
        ))}
        <span className={styles.imageNotation}>
          A closer look / {perspectives[selected].label.toLowerCase()}
        </span>
        <p className={styles.studyCaption}>
          Illustrative imagery — awaiting partner photography.
        </p>
      </div>
      <div className={styles.workbenchCopy}>
        <p className={styles.eyebrow}>A designer’s way of seeing.</p>
        <h2 id="designer-perspective-title">
          Your judgment
          <br />
          lives in the details.
        </h2>
        <div
          className={styles.perspectiveTabs}
          role="group"
          aria-label="Explore a designer’s perspective"
        >
          {perspectives.map((perspective, index) => (
            <button
              key={perspective.label}
              type="button"
              aria-pressed={selected === index}
              aria-controls="perspective-description"
              onClick={() => setSelected(index)}
            >
              {perspective.label}
            </button>
          ))}
        </div>
        <div
          id="perspective-description"
          className={styles.perspectiveDescription}
          aria-live="polite"
        >
          <h3>{perspectives[selected].title}</h3>
          <p>{perspectives[selected].description}</p>
        </div>
      </div>
    </section>
  );
}
