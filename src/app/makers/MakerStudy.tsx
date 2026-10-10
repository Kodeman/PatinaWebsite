"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useStudioMotion } from "@/components/studio/StudioMotion";
import styles from "./MakersPage.module.css";

const studies = [
  {
    label: "The material",
    title: "What did you choose?",
    copy: "The species, the surface, the source. We want to understand what you work with and why.",
    image: "/images/founders/windy-peak-detail.jpg",
    alt: "A close view of the Windy Peak living room",
    caption: "Interior design: Leah Kochaver, Middle West Studio. Photography: Ashley Hicks.",
  },
  {
    label: "The construction",
    title: "What did you refuse to rush?",
    copy: "A joint, an edge, the finish in the places you only see up close. Tell us where the care goes.",
    image: "/images/studio/cabinet-shop.jpg",
    alt: "A cabinetmaker checking an oak door against a shop drawing",
    caption: "Illustration.",
  },
  {
    label: "The maker’s words",
    title: "What should people know?",
    copy: "Your process, your point of view, and how a piece should live. The maker’s words belong beside the work.",
    image: "/images/founders/sahara-circle-kitchen.jpg",
    alt: "A kitchen at Sahara Circle",
    caption: "Interior design: Leah Kochaver, Middle West Studio. Contractor: Classic Cabinetry. Photography: Ashley Hicks.",
  },
];

export function MakerStudy() {
  const { enabled } = useStudioMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const controls = useRef<Array<HTMLButtonElement | null>>([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage || getComputedStyle(stage).position !== "sticky")
        return;
      const distance = track.offsetHeight - stage.offsetHeight;
      const offset = parseFloat(getComputedStyle(stage).top) || 0;
      const progress = Math.max(
        0,
        Math.min(
          1,
          (offset - track.getBoundingClientRect().top) / Math.max(1, distance),
        ),
      );
      setSelected(progress < 0.3 ? 0 : progress < 0.68 ? 1 : 2);
      track.style.setProperty("--study-progress", String(progress));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [enabled]);

  function select(index: number) {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (
      enabled &&
      track &&
      stage &&
      getComputedStyle(stage).position === "sticky"
    ) {
      const offset = parseFloat(getComputedStyle(stage).top) || 0;
      const distance = track.offsetHeight - stage.offsetHeight;
      window.scrollTo({
        top:
          window.scrollY +
          track.getBoundingClientRect().top -
          offset +
          distance * [0, 0.49, 0.9][index],
        behavior: "smooth",
      });
    } else setSelected(index);
  }

  return (
    <div
      ref={trackRef}
      className={styles.studyTrack}
      data-motion={enabled ? "on" : "off"}
    >
      <section
        ref={stageRef}
        className={styles.studyStage}
        aria-labelledby="maker-study-title"
      >
        <div className={styles.studyCopy}>
          <p className={styles.kicker}>A closer look at the work</p>
          <h2 id="maker-study-title">
            There’s more
            <br />
            to every piece.
          </h2>
          <div className={styles.studyQuestion}>
            {studies.map((study, index) => (
              <div key={study.label} hidden={selected !== index}>
                <span className={styles.studyLabel}>{study.label}</span>
                <h3>{study.title}</h3>
                <p>{study.copy}</p>
              </div>
            ))}
          </div>
          <div
            className={styles.studyControls}
            role="group"
            aria-label="Explore the making"
          >
            {studies.map((study, index) => (
              <button
                key={study.label}
                type="button"
                ref={(element) => {
                  controls.current[index] = element;
                }}
                aria-pressed={selected === index}
                onClick={() => select(index)}
                onKeyDown={(event) => {
                  let next = index;
                  if (event.key === "ArrowRight")
                    next = (index + 1) % studies.length;
                  else if (event.key === "ArrowLeft")
                    next = (index + studies.length - 1) % studies.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = studies.length - 1;
                  else return;
                  event.preventDefault();
                  controls.current[next]?.focus();
                  select(next);
                }}
              >
                <span aria-hidden="true">0{index + 1}</span>
                {study.label}
              </button>
            ))}
          </div>
          <p className={styles.studyDisclaimer}>
            A mix of project photography and illustration.
          </p>
        </div>
        <div className={styles.studyArt}>
          {studies.map((study, index) => (
            <figure
              key={study.image}
              className={styles.studyFigure}
              data-active={selected === index}
              aria-hidden={selected !== index}
            >
              <Image
                src={study.image}
                alt={study.alt}
                fill
                sizes="(max-width: 850px) 100vw, 55vw"
              />
              <figcaption>{study.caption}</figcaption>
            </figure>
          ))}
          <div className={styles.studyRail} aria-hidden="true">
            <span
              style={{ width: `${((selected + 1) / studies.length) * 100}%` }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
