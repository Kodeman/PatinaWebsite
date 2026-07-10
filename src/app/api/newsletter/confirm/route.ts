import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { captureLeadEvent } from "@/lib/lead-capture";
import { sendNewsletterWelcome } from "@/lib/emails/newsletter-welcome";
import { SITE_URL } from "@/lib/site-url";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Friendly landing the confirm link bounces to. Query param signals the
// outcome so the page can show a toast if it wants; if nothing reads it the
// user still lands on a valid page (graceful degradation).
function landing(status: "confirmed" | "invalid" | "error") {
  return NextResponse.redirect(`${SITE_URL}/?newsletter=${status}`);
}

/**
 * Double opt-in confirmation endpoint. The confirmation email links here with
 * ?token=...&email=.... We match the row on both fields, flip confirmed=true,
 * and clear the one-time token. Resilient: when Supabase is unconfigured we
 * degrade to a graceful redirect instead of throwing.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token")?.trim();
    const email = searchParams.get("email")?.trim().toLowerCase();

    if (!token || !email || !EMAIL_REGEX.test(email)) {
      return landing("invalid");
    }

    // No backend configured (e.g. local/preview without secrets) — don't throw.
    if (!supabaseAdmin) {
      console.log("[NewsletterConfirm] Supabase not configured, skipping confirm for:", email);
      return landing("confirmed");
    }

    // Match on email + token so a stale or guessed token can't confirm a row.
    const { data: row, error: selectError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("email, confirmed, posthog_distinct_id, source")
      .eq("email", email)
      .eq("confirmation_token", token)
      .maybeSingle();

    if (selectError) {
      console.error("[NewsletterConfirm] Supabase select error:", JSON.stringify({
        code: selectError.code,
        message: selectError.message,
        details: selectError.details,
      }));
      return landing("error");
    }

    // No matching row means the token is wrong, already consumed, or the email
    // never subscribed. Treat as invalid without leaking which case it is.
    if (!row) {
      return landing("invalid");
    }

    // Idempotent: a second click on an already-confirmed link still lands happy.
    if (row.confirmed) {
      return landing("confirmed");
    }

    const { error: updateError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .update({ confirmed: true, confirmation_token: null })
      .eq("email", email)
      .eq("confirmation_token", token);

    if (updateError) {
      console.error("[NewsletterConfirm] Supabase update error:", JSON.stringify({
        code: updateError.code,
        message: updateError.message,
        details: updateError.details,
      }));
      return landing("error");
    }

    // Mark the opt-in as confirmed for analytics. Keyed on the anonymous
    // posthog_distinct_id stored at signup so it merges with the same person.
    captureLeadEvent({
      event: "newsletter_confirmed",
      email,
      posthogDistinctId: row.posthog_distinct_id,
      properties: {
        email_domain: email.split("@")[1],
        source: row.source,
      },
      personProps: { email, newsletter_confirmed: true },
    });

    // Fire-and-forget the genuine "first letter" the signup success promised.
    // Only on this fresh confirm — the already-confirmed path above returns
    // earlier, so a second click won't re-send it. Failures don't block landing.
    sendNewsletterWelcome({ email }).catch((emailErr) => {
      console.error(
        "[NewsletterConfirm] Welcome email failed:",
        emailErr instanceof Error ? emailErr.message : "Unknown error",
      );
    });

    return landing("confirmed");
  } catch (err) {
    console.error(
      "[NewsletterConfirm] Request error:",
      err instanceof Error ? err.message : "Unknown error",
    );
    return landing("error");
  }
}
