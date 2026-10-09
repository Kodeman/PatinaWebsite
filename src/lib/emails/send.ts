/**
 * Minimal Resend wrapper for transactional ack emails from the marketing site.
 * Uses native fetch — no package dependency on resend.
 */

import { errorMessage } from "@/lib/errors";

const RESEND_API = 'https://api.resend.com/emails';
const DEFAULT_FROM = 'Patina <hello@patina.cloud>';

export interface SendOptions {
  to: string | string[];
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

/** Resend's reply as a SendResult: its id on success, its message (or the HTTP status) otherwise. */
async function sendResult(res: Response): Promise<SendResult> {
  const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
  if (!res.ok) {
    return { success: false, error: body.message ?? `Resend HTTP ${res.status}` };
  }
  return { success: true, id: body.id };
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
        to: [options.to].flat(),
        subject: options.subject,
        html: options.html,
        reply_to: options.replyTo,
        tags: options.tags,
      }),
    });
    return await sendResult(res);
  } catch (err) {
    return { success: false, error: errorMessage(err) };
  }
}
