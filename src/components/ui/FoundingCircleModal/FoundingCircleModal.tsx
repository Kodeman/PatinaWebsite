"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useFoundingModal } from "./FoundingModalContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useStudioMotion } from "@/components/studio/StudioMotion";
import { StrataMark } from "@/components/ui/StrataMark";
import { track } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { buildLeadPayload, inferRole, LEAD_HONEYPOT_FIELD } from "@/lib/lead-payload";
import { getPostHogClient } from "@/lib/posthog";
import { systemMessages } from "@/lib/copy/system-messages";
import styles from "./FoundingCircleModal.module.css";

const subscribe = () => () => {};
type FormState = "idle" | "loading" | "success" | "error";

export function FoundingCircleModal() {
  const { isOpen, source, ctaText, close } = useFoundingModal();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dismiss = useCallback((reason: "x" | "esc" | "outside" | "success") => {
    track("founding_modal_closed", { reason });
    close();
  }, [close]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLInputElement>("#founding-first")?.focus({ preventScroll: true });
    }
    else if (!isOpen && dialog.open) dialog.close();
  }, [isOpen, hydrated]);

  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    return () => { html.style.overflow = previousOverflow; };
  }, [isOpen]);

  if (!hydrated) return null;
  return createPortal(
    <dialog ref={dialogRef} className={styles.modal} aria-labelledby="founding-modal-title"
      onKeyDown={event => {
        if (event.key !== "Tab") return;
        const items = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [tabindex]')]
          .filter(item => item.tabIndex >= 0 && item.getAttribute("aria-hidden") !== "true" && item.getClientRects().length > 0);
        const first = items[0];
        const last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}
      onCancel={event => { event.preventDefault(); dismiss("esc"); }}
      onClick={event => { if (event.target === event.currentTarget) dismiss("outside"); }}>
      {isOpen && <EnrollmentCard source={source ?? "unknown"} ctaText={ctaText ?? "Join the Founding Circle"} onDismiss={dismiss} />}
    </dialog>,
    document.body,
  );
}

function EnrollmentCard({ source, ctaText, onDismiss }: {
  source: string; ctaText: string; onDismiss: (reason: "x" | "esc" | "outside" | "success") => void;
}) {
  const { enabled } = useStudioMotion();
  const systemReduced = useReducedMotion();
  const motionEnabled = enabled && !systemReduced;
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [fields, setFields] = useState({ firstName: "", lastName: "", email: "", reason: "" });

  useEffect(() => {
    track("founding_modal_opened", { source, cta_text: ctaText });
    firstFieldRef.current?.focus({ preventScroll: true });
  }, [source, ctaText]);

  useEffect(() => {
    if (formState === "success") successRef.current?.focus({ preventScroll: true });
  }, [formState]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (formState === "loading" || formState === "success") return;
    const email = fields.email.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage(systemMessages.errors.invalidEmail);
      setFormState("error");
      return;
    }
    setFormState("loading");
    setErrorMessage("");
    try {
      const attribution = getAttribution();
      const posthog = getPostHogClient();
      const signupPage = window.location.pathname;
      const role = inferRole(source, signupPage);
      const payload = buildLeadPayload({
        source, signupPage, ctaText, posthogDistinctId: posthog?.get_distinct_id?.() || null,
        extra: { email, source, role, first_name: fields.firstName.trim() || null, [LEAD_HONEYPOT_FIELD]: honeypot },
      });
      payload.first_touch_attribution = {
        ...(attribution?.first_touch || {}),
        first_name: fields.firstName.trim() || null,
        last_name: fields.lastName.trim() || null,
        reason: fields.reason.trim() || null,
      } as typeof payload.first_touch_attribution;
      const response = await fetch("/api/founding", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || systemMessages.errors.generic);
      }
      posthog?.identify(email, { email, founding_source: source });
      setFormState("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : systemMessages.errors.generic);
      setFormState("error");
    }
  }

  return <motion.div className={styles.card}
    initial={motionEnabled ? { opacity: 0, y: 24, rotate: -.5 } : false}
    animate={{ opacity: 1, y: 0, rotate: 0 }}
    transition={{ duration: motionEnabled ? .5 : 0, ease: [.16, 1, .3, 1] }}>
    <button type="button" className={styles.close} onClick={() => onDismiss("x")} aria-label="Close">×</button>
    {formState === "success" ? <div className={styles.success} role="status">
      <StrataMark size="compact" align="left" />
      <p className={styles.eyebrow}>A place in the story</p>
      <h2 id="founding-modal-title" ref={successRef} tabIndex={-1}>{systemMessages.founding.successTitle}</h2>
      <p>{systemMessages.founding.successBody}</p>
      <p className={styles.signature}>Warmly, Kody &amp; Leah</p>
      <button type="button" className={styles.submit} onClick={() => onDismiss("success")}>Return to the site <span aria-hidden="true">↗</span></button>
    </div> : <div className={styles.layout}>
      <aside className={styles.letter}>
        <StrataMark size="compact" align="left" />
        <p className={styles.eyebrow}>Patina / An invitation</p>
        <h2 id="founding-modal-title">The Founding<br /><em>Circle.</em></h2>
        <p>We’re building a place where a designer’s judgment, a maker’s care, and your own point of view come together.</p>
        <p>Join us while it takes shape.</p>
        <p className={styles.signature}>Kody &amp; Leah</p>
        <ul className={styles.benefits}>
          <li>First access when the app launches.</li>
          <li>Monthly questions that help shape Patina.</li>
          <li>Personal updates from behind the scenes.</li>
          <li>Your name credited at launch.</li>
          <li>Founding status that stays with you.</li>
        </ul>
        <p className={styles.cap}>Limited to 200 founding members.<br />Open wherever you call home.</p>
      </aside>
      <div className={styles.formSide}>
        <p className={styles.eyebrow}>Make yourself at home</p>
        <h3>A place at the table.</h3>
        <p className={styles.formIntro}>Your welcome begins with a first letter from Kody.</p>
        <form onSubmit={handleSubmit} className={styles.formArea} noValidate aria-busy={formState === "loading"}>
          <input type="text" name={LEAD_HONEYPOT_FIELD} value={honeypot} onChange={event => setHoneypot(event.target.value)}
            tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.honeypot} />
          <div className={styles.nameRow}>
            <div className={styles.field}><label htmlFor="founding-first">First Name</label><input id="founding-first" ref={firstFieldRef}
              autoComplete="given-name" value={fields.firstName} onChange={event => setFields(value => ({ ...value, firstName: event.target.value }))} /></div>
            <div className={styles.field}><label htmlFor="founding-last">Last Name</label><input id="founding-last"
              autoComplete="family-name" value={fields.lastName} onChange={event => setFields(value => ({ ...value, lastName: event.target.value }))} /></div>
          </div>
          <div className={styles.field}><label htmlFor="founding-email">Email</label><input id="founding-email" type="email" required autoComplete="email" placeholder="you@example.com"
            value={fields.email} aria-invalid={formState === "error"} aria-describedby={formState === "error" ? "founding-error" : undefined}
            onChange={event => { setFields(value => ({ ...value, email: event.target.value })); if (formState === "error") setFormState("idle"); }} /></div>
          <div className={styles.field}><label htmlFor="founding-reason">What brings you to Patina? <span>(optional)</span></label>
            <textarea id="founding-reason" rows={3} placeholder="A room on your mind. A love of making." value={fields.reason}
              onChange={event => setFields(value => ({ ...value, reason: event.target.value }))} /></div>
          {formState === "error" && <p id="founding-error" className={styles.errorText} role="alert">{errorMessage}</p>}
          <button className={styles.submit} type="submit" disabled={formState === "loading"}>
            {formState === "loading" ? "Joining…" : "Join the Founding Circle"} <span aria-hidden="true">↗</span>
          </button>
          <p className={styles.foot}>The app and marketplace are pre-launch.<br />By joining, you agree to our <a href="/privacy">Privacy Policy</a>.</p>
        </form>
      </div>
    </div>}
  </motion.div>;
}
