/**
 * Single source of truth for Patina's "system" copy — the small strings that
 * appear in forms, banners, and confirmations. Centralized so voice stays
 * consistent (warm, honest, never blaming the user) and copy is edited in one
 * place. See docs/messaging/patina-messaging-system.md §9.
 *
 * New surfaces should import from here. Existing forms carry their own inline
 * strings for now and should migrate to these over time.
 */

export const systemMessages = {
  errors: {
    /** Catch-all failure. Human, never blames the user. */
    generic: "Something slipped on our end. Try that again?",
    invalidEmail: "That email doesn't look quite right — mind checking it?",
    rateLimited: "You're going a little fast — give it a moment and try again.",
  },

  founding: {
    successTitle: "Welcome to the Founding Circle.",
    successBody:
      "Watch your inbox for a first letter from Leah. We build in public — you'll see every step.",
    inlineSuccess: "Welcome to the Founding Circle!",
  },

  newsletter: {
    /** Shown right after signup — double opt-in still needs confirming. */
    pending: "Almost there — check your inbox to confirm.",
    /** Shown on the site after a subscriber clicks the confirm link. */
    confirmed: "You're in. Welcome to The Designer's Eye — the first letter is on its way.",
    confirmInvalid: "That confirmation link didn't work. Try subscribing again?",
    confirmError: "Something slipped while confirming your email. Give it another try shortly.",
  },

  contact: {
    successTitle: "Message sent",
    successBody:
      "Thank you for reaching out. We read every message ourselves and usually reply within two business days.",
  },

  consent: {
    body: "We use cookies to understand how you interact with Patina and improve your experience.",
    accept: "Accept",
    decline: "Decline",
    privacyLabel: "See our Privacy Policy",
  },
} as const;

export type NewsletterConfirmStatus = "confirmed" | "invalid" | "error";
