"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useStudioMotion } from "./StudioMotion";
import styles from "./StoryPage.module.css";

const chapters = [
  { id: "leah", label: "Leah" },
  { id: "kody", label: "Kody" },
  { id: "together", label: "Patina" },
  { id: "next", label: "You" },
];

export function StoryChapters() {
  const [active, setActive] = useState("leah");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[visible.length - 1].target.id);
      },
      { rootMargin: "-20% 0px -50% 0px", threshold: 0 },
    );
    chapters.forEach((chapter) => {
      const element = document.getElementById(chapter.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav className={styles.chapterNav} aria-label="Our story chapters">
      <span className={styles.chapterNavTitle}>
        Two paths. A shared beginning.
      </span>
      <div>
        {chapters.map((chapter, index) => (
          <a
            key={chapter.id}
            href={"#" + chapter.id}
            aria-current={active === chapter.id ? "location" : undefined}
            onClick={() => setActive(chapter.id)}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {chapter.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

const views = [
  {
    label: "The room",
    heading: "First, a feeling.",
    body: "Before any one piece, there’s the way a room holds together. The space to gather. A place to pause. A sense that you belong here.",
    image: "/images/founders/windy-peak-room.jpg",
    alt: "Windy Peak living room designed by Middle West Studio, with layered sofas, brass lamps, and a round timber table",
    project: "Windy Peak",
    source: "https://www.middlewest.studio/saraha-circle-1-1",
    position: "50% 62%",
  },
  {
    label: "The details",
    heading: "Then, what you notice.",
    body: "Light on glazed tile. Warm brass beside a quiet finish. These small decisions give a room its depth. A designer holds them in relation to each other.",
    image: "/images/founders/windy-peak-detail.jpg",
    alt: "Glazed tile, brass hardware, and ceramics in a Windy Peak kitchen detail by Middle West Studio",
    project: "Windy Peak",
    source: "https://www.middlewest.studio/saraha-circle-1-1",
    position: "50% 46%",
  },
  {
    label: "Living with it",
    heading: "And room for real life.",
    body: "The view through one room into the next. Somewhere to sit while dinner takes shape. Design has to make sense in the life happening around it.",
    image: "/images/founders/sahara-circle-kitchen.jpg",
    alt: "Sahara Circle kitchen by Middle West Studio, with warm timber cabinetry, a dining table, and pendant lights",
    project: "Sahara Circle",
    source: "https://www.middlewest.studio/saraha-circle",
    position: "50% 56%",
  },
];

export function StoryRoomJourney() {
  const ref = useRef<HTMLElement>(null);
  const { enabled } = useStudioMotion();
  const [selected, setSelected] = useState(0);
  const previousScrollScene = useRef(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.025, 1.085]);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (enabled && window.matchMedia("(min-width: 761px)").matches) {
      const scene = Math.min(2, Math.floor(value * 3));
      // A small scroll should not undo a deliberate choice. Resume the journey
      // when the reader crosses into the next scroll chapter.
      if (scene !== previousScrollScene.current) setSelected(scene);
      previousScrollScene.current = scene;
    }
  });
  return (
    <section
      ref={ref}
      className={styles.roomJourney}
      data-motion={enabled ? "on" : "off"}
      aria-label="Inside Leah’s work"
    >
      <div className={styles.roomStage}>
        <div className={styles.roomImages}>
          {views.map((view, index) => (
            <motion.div
              key={view.label}
              className={styles.roomImage}
              data-active={selected === index}
              aria-hidden={selected !== index}
              style={enabled ? { scale } : undefined}
            >
              <Image
                src={view.image}
                alt={view.alt}
                fill
                sizes="(max-width: 760px) 100vw, 62vw"
                style={{ objectPosition: view.position }}
              />
            </motion.div>
          ))}
          <span className={styles.roomImageLabel}>From Leah’s practice</span>
        </div>
        <div className={styles.roomObservation}>
          <p className={styles.eyebrow}>A room, seen closely.</p>
          <div
            className={styles.roomControls}
            role="group"
            aria-label="Explore Leah’s work"
          >
            {views.map((view, index) => (
              <button
                key={view.label}
                type="button"
                aria-pressed={selected === index}
                aria-controls="story-room-observation"
                onClick={() => setSelected(index)}
              >
                {view.label}
              </button>
            ))}
          </div>
          <div
            id="story-room-observation"
            className={styles.roomObservationText}
          >
            <h3>{views[selected].heading}</h3>
            <p>{views[selected].body}</p>
          </div>
          <div className={styles.roomCredit}>
            <a href={views[selected].source} target="_blank" rel="noreferrer">
              {views[selected].project} / Middle West Studio
            </a>
            <span>
              Interior design by Leah Kochaver.
              <br />
              Photography by Ashley Hicks.
            </span>
          </div>
          <p className={styles.roomInvitation}>
            This is the kind of judgment we want Patina to carry.
          </p>
        </div>
      </div>
    </section>
  );
}
