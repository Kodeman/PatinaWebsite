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
import { TrackedLink } from "@/components/ui/TrackedLink";
import { BackgroundVideo } from "./BackgroundVideo";
import { JoinCircleButton } from "./JoinCircleButton";
import { MotionControl, useStudioMotion } from "./StudioMotion";
import styles from "./LivingStudy.module.css";

const scenes = [
  {
    id: "room",
    label: "Your table",
    kicker: "At your kitchen table.",
    title: (
      <>
        On the same page
        <br />
        as your designer.
      </>
    ),
    description:
      "We’re building one page for you and your designer: what you agreed, from the brief to the install.",
  },
  {
    id: "study",
    label: "Up close",
    kicker: "The samples come home.",
    title: (
      <>
        Hold it in
        <br />
        your own light.
      </>
    ),
    description:
      "Oak, linen, zellige, a green door. Choose them at home, then keep the choice on the page you share.",
  },
  {
    id: "making",
    label: "The install",
    kicker: "The people who build it.",
    title: (
      <>
        Fewer surprises
        <br />
        on install day.
      </>
    ),
    description:
      "Your contractor and cabinetmaker will work from the page you agreed: the same door, the same finish, the same plan.",
  },
] as const;
const materials = [
  {
    name: "White oak",
    detail: "A warm grain that deepens as the kitchen is used.",
  },
  {
    name: "Linen",
    detail: "Soft and a little uneven. It relaxes as you live with it.",
  },
  {
    name: "Zellige",
    detail: "No two tiles alike, so the wall catches the light.",
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
        aria-label="Explore one home, from table to install"
      >
        <BackgroundVideo
          className={`${styles.photo} ${styles.room}`}
          webmSrc="/videos/studio/home-table.webm"
          mp4Src="/videos/studio/home-table.mp4"
          mobileWebmSrc="/videos/studio/home-table-mobile.webm"
          mobileMp4Src="/videos/studio/home-table-mobile.mp4"
          poster="/images/studio/home-table.jpg"
          active={scene === 0}
        />
        <BackgroundVideo
          className={`${styles.photo} ${styles.making}`}
          webmSrc="/videos/studio/home-install.webm"
          mp4Src="/videos/studio/home-install.mp4"
          mobileWebmSrc="/videos/studio/home-install-mobile.webm"
          mobileMp4Src="/videos/studio/home-install-mobile.mp4"
          poster="/images/studio/home-install.jpg"
          active={scene === 2}
          playbackRate={0.7}
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
                source="home_hero"
                location="hero"
                className="studio-button-light"
              />
              <TrackedLink
                href="/designers"
                location="home_hero_designers"
                className="studio-link"
              >
                For designers <span aria-hidden="true">↗</span>
              </TrackedLink>
            </div>
          </div>
        </div>
        <figure className={styles.scheme} aria-hidden={scene === 0}>
          <Image
            src="/images/studio/material-scheme.jpg"
            fill
            sizes="(max-width: 760px) 90vw, 40vw"
            alt="Illustration: white oak, a green-painted cabinet door, quartzite, zellige tiles and linen laid out on a printed kitchen plan"
          />
          <figcaption>Illustration.</figcaption>
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
            aria-label="Look closer at the materials"
          >
            +
          </button>
          <p>
            See the samples.<span>Take a closer look</span>
          </p>
        </div>
        <div
          className={`${styles.context} ${styles.studySide}`}
          data-scene-context={scene === 1 ? "active" : "inactive"}
          aria-hidden={scene !== 1}
          inert={scene !== 1}
        >
          <p>
            Your kitchen, in samples.
            <br />
            Three that sit well together.
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
          <span>Morning light, then lamplight.</span>Live with them before you
          decide.
        </p>
        <div
          className={`${styles.context} ${styles.makingNote}`}
          data-scene-context={scene === 2 ? "active" : "inactive"}
          aria-hidden={scene !== 2}
          inert={scene !== 2}
        >
          <p>
            The hands behind your kitchen deserve a name. We’re making room for
            that.
          </p>
          <Link href="/makers" className="studio-link">
            Meet the makers <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className={styles.dock}>
          <div className={styles.scrollNote}>
            <p>
              <span>0{scene + 1} / 03</span>{" "}
              {enabled && scrollable
                ? "Scroll from table to install"
                : "Three moments in one home"}
            </p>
            <a href="#beginnings">Meet Kody and Leah ↓</a>
          </div>
          <div
            className={styles.switch}
            role="group"
            aria-label="Moments in one home"
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
            <p>Illustration. Not a real project.</p>
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
        <p className={styles.chapterLabel}>01 / Who is behind it</p>
        <div>
          <h2>
            Behind Patina,
            <br />
            two people.
            <br />
            <em>One house at a time.</em>
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
              src="/images/founders/windy-peak-detail.jpg"
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
              alt="Glazed tile, brass hardware, and ceramics in a Windy Peak kitchen detail by Middle West Studio"
            />
          </motion.figure>
          <motion.div
            className={styles.founderPaper}
            style={enabled ? { opacity, y } : { opacity: 0 }}
          >
            <p>The living study / Illustration.</p>
            <Image
              src="/images/studio/home-letter.jpg"
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
              alt="Illustration: two hands beside an opened envelope, a blank letter and samples taped to kraft card on a painted table."
            />
            <span>A little room to think it over.</span>
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
            <TrackedLink
              href="https://www.middlewest.studio/saraha-circle-1-1"
              location="home_founder_credit"
              target="_blank"
              rel="noreferrer"
            >
              Windy Peak / Middle West Studio
            </TrackedLink>
            <br />
            Interior design by Leah Kochaver. Photography by Ashley Hicks.
          </p>
        </div>
        <div className={styles.founderText}>
          <article>
            <p className={styles.person}>
              01 <span>Leah / the designer’s eye</span>
            </p>
            <h2>
              Your house
              <br />
              already has
              <br />a point of view.
            </h2>
            <p>
              Leah designs homes at Middle West Studio in Madison. She starts
              with how you live: what you keep, where the morning light lands,
              the things you reach for without thinking.
            </p>
            <p>
              At Patina she leads design, so the page you share with your
              designer reads the way a good designer thinks.
            </p>
            <p className={styles.pullLine}>
              Your taste, written down where your designer can see it.
            </p>
          </article>
          <article>
            <p className={styles.person}>
              02 <span>Kody / the one building it</span>
            </p>
            <h2>
              What you decide
              <br />
              shouldn’t get lost
              <br />
              in a text thread.
            </h2>
            <p>
              Kody saw a gap around Leah’s work. The rooms were personal. The
              decisions behind them lived in emails, texts and notebooks.
            </p>
            <p>
              He’s building Patina so what you choose with your designer stays
              on one page, from the brief to the install, where the people
              building your kitchen can see it too.
            </p>
            <Link href="/about" className="studio-link">
              Our story, still being written <span aria-hidden="true">↗</span>
            </Link>
          </article>
        </div>
      </section>
      <section className={styles.belief}>
        <p className={styles.chapterLabel}>02 / Where you come in</p>
        <div>
          <h2>
            Your eye.
            <br />A designer’s care.
            <br />
            Something that’s yours.
          </h2>
          <p>
            We’re building a way for your taste and a designer’s judgment to
            meet on one page. The Founding Circle helps shape it.
          </p>
          <Link href="/app" className="studio-link">
            See what we’re building <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
