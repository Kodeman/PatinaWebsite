"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useFoundingModal } from "./FoundingModalContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { track } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { getPostHogClient } from "@/lib/posthog";
import styles from "./FoundingCircleModal.module.css";

type FormState = "idle" | "loading" | "success" | "error";

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  reason: string;
}

// Returns true only on the client after hydration, avoiding SSR DOM access.
function useIsHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function FoundingCircleModal() {
  const { isOpen, source, ctaText, close } = useFoundingModal();
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useIsHydrated();
  // Keep ModalChrome mounted for a beat after isOpen flips so exit animations can play
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setPhase("enter");
      return;
    }
    if (!visible) return;
    setPhase("exit");
    const delay = prefersReducedMotion ? 180 : 520;
    const timer = setTimeout(() => setVisible(false), delay);
    return () => clearTimeout(timer);
  }, [isOpen, prefersReducedMotion, visible]);

  if (!hydrated || !visible) return null;

  return createPortal(
    <ModalChrome
      key="founding-modal"
      source={source ?? "unknown"}
      ctaText={ctaText ?? undefined}
      phase={phase}
      onClose={(reason) => {
        track("founding_modal_closed", { reason });
        close();
      }}
      prefersReducedMotion={prefersReducedMotion}
    />,
    document.body
  );
}

interface ModalChromeProps {
  source: string;
  ctaText?: string;
  phase: "enter" | "exit";
  onClose: (reason: "x" | "esc" | "outside" | "success") => void;
  prefersReducedMotion: boolean;
}

function ModalChrome({ source, ctaText, phase, onClose, prefersReducedMotion }: ModalChromeProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [spotsRemaining, setSpotsRemaining] = useState<number | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [socialHint, setSocialHint] = useState<string | null>(null);
  const [fields, setFields] = useState<FormFields>({
    firstName: "",
    lastName: "",
    email: "",
    reason: "",
  });

  // Fire open event once on mount
  useEffect(() => {
    track("founding_modal_opened", { source, cta_text: ctaText });
  }, [source, ctaText]);

  // Lock body scroll while open
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  // ESC + focus on first input
  useEffect(() => {
    const timer = setTimeout(() => firstFieldRef.current?.focus(), 1100);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose("esc");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = card.querySelectorAll<HTMLElement>(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !card.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    card.addEventListener("keydown", onKeyDown);
    return () => card.removeEventListener("keydown", onKeyDown);
  }, []);

  // Spots counter
  useEffect(() => {
    let cancelled = false;
    fetch("/api/founding/count")
      .then((r) => r.json())
      .then((data: { count?: number }) => {
        if (cancelled) return;
        const count = typeof data.count === "number" ? data.count : 0;
        const remaining = Math.max(0, 200 - count);
        setSpotsRemaining(remaining);
      })
      .catch(() => {
        // Silent failure — counter just hides
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formState === "loading" || formState === "success") return;

    const email = fields.email.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email");
      setFormState("error");
      return;
    }

    setFormState("loading");
    setErrorMessage("");

    try {
      const attribution = getAttribution();
      const posthog = getPostHogClient();

      const res = await fetch("/api/founding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          signup_page: typeof window !== "undefined" ? window.location.pathname : "",
          cta_text: ctaText ?? "Join the Founding Circle",
          utm: attribution?.last_touch,
          posthog_distinct_id: posthog?.get_distinct_id?.() || null,
          first_touch_attribution: {
            ...(attribution?.first_touch || {}),
            first_name: fields.firstName.trim() || null,
            last_name: fields.lastName.trim() || null,
            reason: fields.reason.trim() || null,
          },
          last_touch_attribution: attribution?.last_touch || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Signup failed");
      }

      const emailDomain = email.split("@")[1] || "";
      track("founding_circle_signup", {
        email_domain: emailDomain,
        source,
        signup_page: typeof window !== "undefined" ? window.location.pathname : "",
        cta_text: ctaText ?? "Join the Founding Circle",
        has_utm: !!attribution?.last_touch?.utm_source,
      });
      posthog?.identify(email, { email, founding_source: source });

      setFormState("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setFormState("error");
    }
  }

  function handleSocial(provider: "apple" | "google") {
    track("founding_modal_social_click", { provider });
    setSocialHint("Email signup is live — social login at launch.");
  }

  // Motion configs
  const overlayTransition = prefersReducedMotion
    ? { duration: 0.2 }
    : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };

  const curtainVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
        hidden: { clipPath: "inset(100% 0% 0% 0%)" },
        visible: {
          clipPath: "inset(0% 0% 0% 0%)",
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
        },
        exit: {
          clipPath: "inset(0% 0% 100% 0%)",
          transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] as const },
        },
      };

  const cardVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        hidden: { opacity: 0, y: 16, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const },
        },
        exit: {
          opacity: 0,
          y: 8,
          scale: 0.98,
          transition: { duration: 0.22, ease: [0.7, 0, 0.84, 0] as const },
        },
      };

  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.2, delay: 0 } },
          exit: { opacity: 0, transition: { duration: 0.12 } },
        }
      : {
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const },
          },
          exit: { opacity: 0, transition: { duration: 0.15 } },
        };

  const currentAnimate = phase === "exit" ? "exit" : "visible";

  return (
    <>
      {/* Dim backdrop for contrast */}
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={
          phase === "exit"
            ? { opacity: 0, transition: { duration: 0.3 } }
            : { opacity: 1, transition: overlayTransition }
        }
        onClick={() => onClose("outside")}
        aria-hidden="true"
      />

      {/* Warm-white full-bleed curtain with paper texture */}
      <motion.div
        className={styles.curtain}
        initial="hidden"
        animate={currentAnimate}
        variants={curtainVariants}
        aria-hidden="true"
      >
        <div className={styles.paperTexture} aria-hidden="true" />
        {/* Decorative corner strata marks */}
        <div className={`${styles.cornerStrata} ${styles.cornerTopLeft}`} aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className={`${styles.cornerStrata} ${styles.cornerBottomRight}`} aria-hidden="true">
          <span /><span /><span />
        </div>
      </motion.div>

      {/* Modal */}
      <div
        className={styles.modalWrap}
        role="dialog"
        aria-modal="true"
        aria-labelledby="founding-modal-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose("outside");
        }}
      >
        <motion.div
          ref={cardRef}
          className={styles.card}
          variants={cardVariants}
          initial="hidden"
          animate={currentAnimate}
        >
          <div className={styles.accentBar} aria-hidden="true" />

          <button
            type="button"
            className={styles.close}
            onClick={() => onClose("x")}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 1L13 13M13 1L1 13" strokeLinecap="round" />
            </svg>
          </button>

          <div className={styles.inner}>
            {formState === "success" ? (
              <SuccessBlock onClose={() => onClose("success")} />
            ) : (
              <>
                {/* Masthead */}
                <motion.div
                  className={styles.masthead}
                  variants={fadeUp(0.55)}
                  initial="hidden"
                  animate={currentAnimate}
                >
                  <div className={styles.logo}>Patina</div>
                  <div className={styles.strata} aria-hidden="true">
                    <span /><span /><span />
                  </div>
                  <h2 id="founding-modal-title" className={styles.title}>
                    The Founding <em>Circle</em>
                  </h2>
                  <p className={styles.tagline}>
                    Help us build how furniture discovery should work.
                  </p>
                </motion.div>

                {/* Quote */}
                <motion.div
                  className={styles.quoteBlock}
                  variants={fadeUp(0.7)}
                  initial="hidden"
                  animate={currentAnimate}
                >
                  <p className={styles.quoteText}>
                    &ldquo;I&apos;ve sourced furniture for clients for years. The tools never matched how
                    designers actually think. So we&apos;re building the one I wish existed.&rdquo;
                  </p>
                  <p className={styles.quoteAttr}>
                    Leah Kochaver, Co-Founder · Middlewest Studio · Madison, WI
                  </p>
                </motion.div>

                {/* Benefits */}
                <motion.div
                  className={styles.benefits}
                  variants={fadeUp(0.85)}
                  initial="hidden"
                  animate={currentAnimate}
                >
                  {BENEFITS.map((b) => (
                    <div key={b.name} className={styles.ben}>
                      <div className={styles.benIcon}>{b.icon}</div>
                      <div className={styles.benName}>{b.name}</div>
                      <div className={styles.benDesc}>{b.desc}</div>
                    </div>
                  ))}
                </motion.div>

                {/* Spots counter */}
                {spotsRemaining !== null && spotsRemaining > 0 && (
                  <motion.div
                    className={styles.spots}
                    variants={fadeUp(0.95)}
                    initial="hidden"
                    animate="visible"
                  >
                    <span className={styles.spotDot} aria-hidden="true" />
                    <span className={styles.spotLabel}>
                      <strong>{spotsRemaining} of 200 spots remaining</strong> · Madison, WI
                    </span>
                  </motion.div>
                )}

                {/* Form */}
                <motion.form
                  className={styles.formArea}
                  onSubmit={handleSubmit}
                  variants={fadeUp(1.0)}
                  initial="hidden"
                  animate="visible"
                  noValidate
                >
                  <div className={styles.nameRow}>
                    <div className={styles.field}>
                      <label htmlFor="founding-first">First Name</label>
                      <input
                        id="founding-first"
                        ref={firstFieldRef}
                        type="text"
                        placeholder="Leah"
                        value={fields.firstName}
                        onChange={(e) => setFields((f) => ({ ...f, firstName: e.target.value }))}
                        autoComplete="given-name"
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="founding-last">Last Name</label>
                      <input
                        id="founding-last"
                        type="text"
                        placeholder="Kochaver"
                        value={fields.lastName}
                        onChange={(e) => setFields((f) => ({ ...f, lastName: e.target.value }))}
                        autoComplete="family-name"
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="founding-email">Email</label>
                    <input
                      id="founding-email"
                      type="email"
                      placeholder="you@home.com"
                      value={fields.email}
                      onChange={(e) => {
                        setFields((f) => ({ ...f, email: e.target.value }));
                        if (formState === "error") setFormState("idle");
                      }}
                      autoComplete="email"
                      required
                      aria-invalid={formState === "error"}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="founding-reason">
                      What brings you to Patina? <span className={styles.opt}>(optional)</span>
                    </label>
                    <input
                      id="founding-reason"
                      type="text"
                      placeholder="Furnishing our first home, love the maker focus..."
                      value={fields.reason}
                      onChange={(e) => setFields((f) => ({ ...f, reason: e.target.value }))}
                    />
                  </div>

                  {formState === "error" && errorMessage && (
                    <p className={styles.errorText}>{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    className={styles.submit}
                    disabled={formState === "loading"}
                  >
                    {formState === "loading" ? (
                      <span className={styles.spinner} aria-label="Submitting" />
                    ) : (
                      <>
                        Join the Founding Circle <span className={styles.arr}>→</span>
                      </>
                    )}
                  </button>

                  <div className={styles.or}>
                    <span>or join with</span>
                  </div>

                  <div className={styles.socials}>
                    <button type="button" className={styles.soc} onClick={() => handleSocial("apple")}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                      Apple
                    </button>
                    <button type="button" className={styles.soc} onClick={() => handleSocial("google")}>
                      <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </button>
                  </div>
                  {socialHint && <p className={styles.socialHint}>{socialHint}</p>}

                  <p className={styles.foot}>
                    By joining you agree to our{" "}
                    <a href="/privacy">Privacy Policy</a> · No spam, ever.
                  </p>
                </motion.form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

function SuccessBlock({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={styles.success}
    >
      <div className={styles.strata} aria-hidden="true">
        <span /><span /><span />
      </div>
      <h2 className={styles.successTitle}>Welcome to the Founding Circle.</h2>
      <p className={styles.successBody}>
        Watch your inbox for a first letter from Leah. We build in public — you&apos;ll see every
        step.
      </p>
      <button type="button" className={styles.successClose} onClick={onClose}>
        Return to the site
      </button>
    </motion.div>
  );
}

const BENEFITS = [
  { icon: "★", name: "Named at Launch", desc: "Your name on what you helped build" },
  { icon: "◈", name: "Behind the Curtain", desc: "The real, unpolished building story" },
  { icon: "⟡", name: "Real Influence", desc: "Shape makers, categories, features" },
  { icon: "⌂", name: "First Access", desc: "First through the door at launch" },
];
