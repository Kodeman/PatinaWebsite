/**
 * Shared visual frame for every transactional and lifecycle email Patina sends.
 * One source of truth so all mail carries the same paper-warm identity as the
 * site: #FAF7F2 background, #2C2926 text, #E5E2DD rule, hello@patina.cloud.
 *
 * Used by application-received, newsletter confirmation, founding welcome, and
 * newsletter welcome. When the email look changes, it changes here.
 */

// Honest interim unsubscribe: a monitored mailbox handles opt-outs until a
// one-click unsubscribe endpoint exists. Every marketing email must pass this.
export const UNSUBSCRIBE_MAILTO =
  "mailto:hello@patina.cloud?subject=Unsubscribe%20from%20Patina";

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&#39;",
  );
}

/** Default sign-off. Both founders, matching the brand's "Warmly, Kody & Leah" voice. */
export const signOff = `<p style="margin-top:24px">Warmly,<br/>Kody &amp; Leah<br/>Patina</p>`;

/** Sign-off from a single founder (e.g. a personal first letter from Leah). */
export function signedBy(name: string, meta = "Patina") {
  return `<p style="margin-top:24px">Warmly,<br/>${escapeHtml(name)}<br/>${escapeHtml(meta)}</p>`;
}

/** Primary call-to-action button, styled to match the site's charcoal buttons. */
export function button(href: string, label: string) {
  return `<p style="margin:28px 0"><a href="${escapeHtml(href)}" style="display:inline-block;background:#2C2926;color:#FAF7F2;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:600">${escapeHtml(label)}</a></p>`;
}

interface FrameOptions {
  /** Hidden inbox-preview text shown next to the subject line. */
  preheader?: string;
  /** When set, adds an "Unsubscribe" link to the footer (required for marketing mail). */
  unsubscribeUrl?: string;
}

export function frame(body: string, opts: FrameOptions = {}) {
  const preheader = opts.preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;opacity:0;color:transparent">${escapeHtml(opts.preheader)}</div>`
    : "";
  const unsubscribe = opts.unsubscribeUrl
    ? ` · <a href="${escapeHtml(opts.unsubscribeUrl)}" style="color:#8B7355">Unsubscribe</a>`
    : "";
  return `<!DOCTYPE html>
<html><body style="font-family:-apple-system,'Inter',system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#2C2926;line-height:1.6;background:#FAF7F2">
${preheader}${body}
<hr style="margin:32px 0;border:none;border-top:1px solid #E5E2DD"/>
<p style="font-size:12px;color:#8B7355">Patina · hello@patina.cloud${unsubscribe}</p>
</body></html>`;
}
