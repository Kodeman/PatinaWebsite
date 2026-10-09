"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { JoinCircleButton } from "./JoinCircleButton";
import { MotionControl, useStudioMotion } from "./StudioMotion";
import styles from "./LivingStudy.module.css";

const scenes = [
  {
    id: "room",
    label: "In a room",
    kicker: "Considered spaces. A life of your own.",
    title: (
      <>
        Where Time
        <br />
        Adds Value.
      </>
    ),
    description:
      "A more personal way to find what belongs. Shaped by designers, grounded in craft, and being built with you.",
  },
  {
    id: "study",
    label: "As a study",
    kicker: "A closer look changes everything.",
    title: (
      <>
        An eye for
        <br />
        what belongs.
      </>
    ),
    description:
      "The curve of a frame. The warmth of the grain. Good design begins with paying attention.",
  },
  {
    id: "making",
    label: "In the making",
    kicker: "Behind every piece, a person.",
    title: (
      <>
        Care is in
        <br />
        the details.
      </>
    ),
    description:
      "The hands, the judgment, the time. We’re building a place where the story of a piece stays with it.",
  },
] as const;
const materials = [
  { name: "Walnut", detail: "A warm grain, made richer by the passing years." },
  {
    name: "Linen",
    detail: "An easy texture. A little irregularity. Room to settle in.",
  },
  {
    name: "Olive",
    detail: "A quiet, grounding color that brings the materials together.",
  },
];

export function LivingStudy() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const current = useRef(0);
  const metrics = useRef({ top: 0, distance: 0, height: 0, past: false });
  const [scene, setScene] = useState(0);
  const [material, setMaterial] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const { enabled } = useStudioMotion();
  const previousMotion = useRef(enabled);
  useLayoutEffect(() => {
    if (previousMotion.current === enabled || !track.current || !stage.current)
      return;
    const previous = metrics.current;
    const distance = Math.max(
      0,
      track.current.offsetHeight - stage.current.offsetHeight,
    );
    if (previous.height > 0) {
      // The paused track is only one stage tall. Its visible lower portion is
      // still the opening, even after scrolling to a control near the bottom.
      const withinOpening =
        window.scrollY < previous.top + previous.height;
      if (withinOpening)
        window.scrollTo({
          top:
            previous.top +
            (enabled ? distance * [0, 0.42, 0.83][current.current] : 0),
          behavior: "instant",
        });
      else
        window.scrollTo({
          top: window.scrollY + track.current.offsetHeight - previous.height,
          behavior: "instant",
        });
    }
    previousMotion.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const root = track.current;
    const panel = stage.current;
    if (!root || !panel) return;
    let frame = 0;
    let previousAnnouncement = "";
    const compact = window.matchMedia(
      "(max-height: 540px), (min-width: 761px) and (max-height: 700px)",
    );
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const distance = Math.max(0, root.offsetHeight - panel.offsetHeight);
      const progress =
        distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0;
      const past = rect.bottom <= panel.offsetHeight / 2;
      metrics.current = {
        top: rect.top + window.scrollY,
        distance,
        height: root.offsetHeight,
        past,
      };
      root.style.setProperty("--progress", String(progress));
      if (enabled && !compact.matches && distance > 0) {
        let next = current.current;
        if (progress > 0.645) next = 2;
        else if (progress < 0.195) next = 0;
        else if (progress > 0.245 && progress < 0.595) next = 1;
        if (next !== current.current) {
          // A scroll must not leave keyboard focus inside a newly hidden scene.
          if (
            panel
              .querySelector('[data-scene-context="active"]')
              ?.contains(document.activeElement)
          )
            buttons.current[next]?.focus({ preventScroll: true });
          current.current = next;
          setScene(next);
        }
      }
      const announcement = `${current.current}:${past}`;
      if (announcement !== previousAnnouncement) {
        window.dispatchEvent(
          new CustomEvent("patina:scene", {
            detail: { scene: scenes[current.current].id, past },
          }),
        );
        previousAnnouncement = announcement;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = () => {
      setScrollable(!compact.matches);
      schedule();
    };
    resize();
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
    };
  }, [enabled]);

  function selectScene(index: number) {
    if (scrollable && enabled) {
      const rect = track.current!.getBoundingClientRect();
      const distance =
        track.current!.offsetHeight - stage.current!.offsetHeight;
      window.scrollTo({
        top: window.scrollY + rect.top + distance * [0, 0.42, 0.83][index],
        behavior: "smooth",
      });
    } else {
      current.current = index;
      setScene(index);
      window.dispatchEvent(
        new CustomEvent("patina:scene", {
          detail: { scene: scenes[index].id, past: false },
        }),
      );
    }
  }

  return (
    <div
      ref={track}
      className={styles.track}
      data-scene={scenes[scene].id}
      data-scroll={enabled && scrollable}
    >
      <section
        ref={stage}
        className={styles.stage}
        aria-label="Explore the living study"
      >
        <Image
          className={`${styles.photo} ${styles.room}`}
          src="/images/studio/room.jpg"
          fill
          sizes="100vw"
          priority
          aria-hidden={scene !== 0}
          alt="Illustrative sunlit room with warm timber, tactile fabrics, and a walnut lounge chair"
        />
        <Image
          className={`${styles.photo} ${styles.making}`}
          src="/images/studio/workbench.jpg"
          fill
          sizes="100vw"
          aria-hidden={scene !== 2}
          alt="Illustrative workshop study of hands shaping a wooden frame"
        />
        <div className={styles.shade} />
        <div className={styles.copy}>
          <p className={styles.kicker}>{scenes[scene].kicker}</p>
          <h1>{scenes[scene].title}</h1>
          <p className={styles.description}>{scenes[scene].description}</p>
          <div
            className={styles.context}
            data-scene-context={scene === 0 ? "active" : "inactive"}
            aria-hidden={scene !== 0}
            inert={scene !== 0}
          >
            <div className={styles.heroJoin}>
              <JoinCircleButton
                source="studio_hero"
                className="studio-button-light"
              />
              <a href="#founding-circle">
                Help shape Patina. See what’s included.
              </a>
            </div>
          </div>
        </div>
        <figure className={styles.chair} aria-hidden={scene === 0}>
          <Image
            src="/images/studio/chair.png"
            fill
            sizes="(max-width: 760px) 85vw, 60vw"
            alt="Illustrative walnut chair with a timber frame and a warm leather seat"
          />
          <figcaption>Study No. 01 / form &amp; feeling</figcaption>
        </figure>
        <div
          className={`${styles.context} ${styles.roomCue}`}
          data-scene-context={scene === 0 ? "active" : "inactive"}
          aria-hidden={scene !== 0}
          inert={scene !== 0}
        >
          <button
            type="button"
            onClick={() => selectScene(1)}
            aria-label="Look closer at the chair"
          >
            +
          </button>
          <p>
            There’s more to it.<span>Take a closer look</span>
          </p>
        </div>
        <div
          className={`${styles.context} ${styles.studySide}`}
          data-scene-context={scene === 1 ? "active" : "inactive"}
          aria-hidden={scene !== 1}
          inert={scene !== 1}
        >
          <p>
            A small material study.
            <br />
            Three things that feel right together.
          </p>
          <div
            className={styles.fan}
            role="group"
            aria-label="Explore the study materials"
          >
            {materials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={styles.swatch}
                data-material={index}
                aria-pressed={index === material}
                onClick={() => setMaterial(index)}
              >
                <span className={styles.texture} />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
          <p className={styles.materialCaption} aria-live="polite">
            <strong>{materials[material].name}</strong>
            {materials[material].detail}
          </p>
        </div>
        <p
          className={`${styles.context} ${styles.annotation}`}
          data-scene-context={scene === 1 ? "active" : "inactive"}
          aria-hidden={scene !== 1}
        >
          <span>Considered, from every angle.</span>Good things reward a second
          look.
        </p>
        <div
          className={`${styles.context} ${styles.makingNote}`}
          data-scene-context={scene === 2 ? "active" : "inactive"}
          aria-hidden={scene !== 2}
          inert={scene !== 2}
        >
          <p>
            A maker’s care deserves to be part of the story. We’re making room
            for it.
          </p>
          <Link href="/makers" className="studio-link">
            Meet the making <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className={styles.dock}>
          <div className={styles.scrollNote}>
            <p>
              <span>0{scene + 1} / 03</span>{" "}
              {enabled && scrollable
                ? "Scroll to explore the studio"
                : "Explore the three views"}
            </p>
            <a href="#beginnings">Continue to our story ↓</a>
          </div>
          <div
            className={styles.switch}
            role="group"
            aria-label="Studio views"
            style={{ "--index": scene } as CSSProperties}
          >
            {scenes.map((item, index) => (
              <button
                key={item.id}
                ref={(element) => {
                  buttons.current[index] = element;
                }}
                type="button"
                aria-pressed={scene === index}
                onClick={() => selectScene(index)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className={styles.dockEnd}>
            <MotionControl />
            <p>Illustrative imagery — awaiting partner photography.</p>
          </div>
        </div>
        <div className={styles.progress} aria-hidden="true" />
      </section>
    </div>
  );
}

export function FounderJourney() {
  const section = useRef<HTMLElement>(null);
  const { enabled } = useStudioMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start center", "end center"],
  });
  const opacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const y = useTransform(scrollYProgress, [0.25, 0.55], [70, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 2]);
  return (
    <>
      <div className={styles.beginnings} id="beginnings">
        <p className={styles.chapterLabel}>01 / A shared instinct</p>
        <div>
          <h2>
            Behind the study,
            <br />
            two people.
            <br />
            <em>One shared instinct.</em>
          </h2>
          <p className={styles.small}>
            Rooted in Madison. Made for a wider circle.
          </p>
        </div>
      </div>
      <section
        ref={section}
        className={styles.founders}
        aria-label="Why we’re building Patina"
      >
        <div className={styles.founderArt}>
          <motion.figure
            className={styles.founderPhoto}
            style={enabled ? { rotate } : undefined}
          >
            <Image
              src="/images/studio/materials.jpg"
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
              alt="Illustrative composition of wood, linen, and color samples on a studio table"
            />
          </motion.figure>
          <motion.div
            className={styles.founderPaper}
            style={enabled ? { opacity, y } : { opacity: 0 }}
          >
            <p>The living study / notes in progress</p>
            <Image
              src="/images/studio/chair.png"
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
              alt=""
            />
            <span>A little room to think differently.</span>
          </motion.div>
          <div className={styles.founderSlip}>
            <p>
              Leave room for
              <br />
              the creative part.
            </p>
            <span>A note from the studio</span>
          </div>
          <p className={styles.founderCaption}>
            Illustrative imagery — awaiting partner photography.
          </p>
        </div>
        <div className={styles.founderText}>
          <article>
            <p className={styles.person}>
              01 <span>Leah / the designer’s eye</span>
            </p>
            <h2>
              A room is more
              <br />
              than the things
              <br />
              in it.
            </h2>
            <p>
              Through her work at Middlewest Studio, Leah sees what makes a home
              feel personal: how someone lives, what they keep, and the details
              they’re drawn to.
            </p>
            <p>
              Patina carries that attention into the search for furniture. A
              designer’s judgment belongs in the process from the beginning.
            </p>
            <blockquote>
              “The tools never matched how designers actually think.”
            </blockquote>
          </article>
          <article>
            <p className={styles.person}>
              02 <span>Kody / room for a different tool</span>
            </p>
            <h2>
              The process
              <br />
              should feel
              <br />
              creative, too.
            </h2>
            <p>
              Kody saw a gap in the tools around that work. The rooms were
              personal. The process of finding what belonged in them often felt
              sterile.
            </p>
            <p>
              He’s building Patina to bring those worlds closer: a place to
              explore, make connections, and follow an idea with a designer’s
              perspective alongside you.
            </p>
            <Link href="/about" className="studio-link">
              Our story, still being written <span aria-hidden="true">↗</span>
            </Link>
          </article>
        </div>
      </section>
      <section className={styles.belief}>
        <p className={styles.chapterLabel}>02 / What brings us together</p>
        <div>
          <h2>
            Your eye.
            <br />A designer’s care.
            <br />
            Something that’s yours.
          </h2>
          <p>
            We’re building a way to explore your taste and your space, then
            bring a designer into the conversation with a thoughtful starting
            point.
          </p>
          <Link href="/app" className="studio-link">
            See what we’re building <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
