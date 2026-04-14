/**
 * Minimal Resend wrapper for transactional ack emails from the marketing site.
 * Uses native fetch — no package dependency on resend.
 */

const RESEND_API = 'https://api.resend.com/emails';
const DEFAULT_FROM = 'Patina <hello@notify.patina.com>';

export interface SendOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  tags?: Array<{ name: string; value: string }>;
}

export interface SendResult {
  success: boolean;
  id?: string;
  error?: string;
}

export async function sendHtmlEmail(options: SendOptions): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('[email] RESEND_API_KEY not configured — skipping send');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  try {
    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: options.from ?? DEFAULT_FROM,
        to: [options.to],
        subject: options.subject,
        html: options.html,
        reply_to: options.replyTo,
        tags: options.tags,
      }),
    });
    const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
    if (!res.ok) {
      return { success: false, error: body.message ?? `Resend HTTP ${res.status}` };
    }
    return { success: true, id: body.id };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown send error',
    };
  }
}
