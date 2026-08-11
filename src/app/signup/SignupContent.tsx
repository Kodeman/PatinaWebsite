'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/motion';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';
import { getPostHogClient } from '@/lib/posthog';
import { buildLeadPayload, LEAD_HONEYPOT_FIELD } from '@/lib/lead-payload';
import { SMS_CONSENT_TEXT, systemMessages } from '@/lib/copy/system-messages';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Split the frozen compliance copy around the two phrases that need to become
// links. Never retype SMS_CONSENT_TEXT — always derive from the constant.
const [consentBeforePrivacy, consentAfterPrivacy] = SMS_CONSENT_TEXT.split('Privacy Policy');
const [consentBetween, consentAfterTerms] = consentAfterPrivacy.split('SMS Terms');

export function SignupContent() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const honeypotRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'loading' || state === 'success') return;

    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedFirstName = firstName.trim();

    if (!trimmedEmail || !EMAIL_PATTERN.test(trimmedEmail)) {
      setErrorMessage(systemMessages.errors.invalidEmail);
      setState('error');
      return;
    }

    if (smsConsent && !trimmedPhone) {
      setErrorMessage(systemMessages.signup.consentPhoneMissing);
      setState('error');
      return;
    }

    if (trimmedPhone) {
      const digits = trimmedPhone.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 15) {
        setErrorMessage(systemMessages.signup.invalidPhone);
        setState('error');
        return;
      }
    }

    setState('loading');
    setErrorMessage('');

    try {
      const posthog = getPostHogClient();
      const signupPage = typeof window !== 'undefined' ? window.location.pathname : '';
      const smsConsentGranted = smsConsent && trimmedPhone.length > 0;

      const extra: Record<string, unknown> = {
        email: trimmedEmail,
        first_name: trimmedFirstName,
        sms_consent: smsConsentGranted,
        [LEAD_HONEYPOT_FIELD]: honeypotRef.current?.value || '',
      };
      if (trimmedPhone) {
        extra.phone = trimmedPhone;
      }

      const payload = buildLeadPayload({
        source: 'signup_page',
        signupPage,
        ctaText: 'Create Account',
        posthogDistinctId: posthog?.get_distinct_id?.() || null,
        extra,
      });

      const res = await fetch('/api/founding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Signup failed');
      }

      setState('success');

      const emailDomain = trimmedEmail.split('@')[1] || '';
      const trackPayload = {
        email_domain: emailDomain,
        source: 'signup_page',
        signup_page: '/signup',
        cta_text: 'Create Account',
        has_utm: !!payload.utm_source,
        sms_consent: smsConsentGranted,
      };
      track('waitlist_signup', trackPayload);

      posthog?.identify(trimmedEmail, { email: trimmedEmail });
    } catch {
      setErrorMessage(systemMessages.errors.generic);
      setState('error');
    }
  }

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[var(--patina-warm-white)]">
      <Container>
        <div className="max-w-[560px] mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <span className="text-label text-[var(--patina-clay-beige)] mb-4 block">
                Create Account
              </span>
              <h1 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] font-normal text-[var(--patina-charcoal)] mb-4 leading-tight">
                Create your Patina account
              </h1>
              <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed">
                Patina is pre-launch. Creating an account today makes you a member of the
                Founding Circle — you&apos;ll get honest letters from Leah as we build, and
                first access when the app launches.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[rgba(163,146,124,0.08)]">
              {state === 'success' ? (
                <div className="flex items-center gap-3 py-2">
                  <svg
                    className="w-6 h-6 shrink-0 text-[var(--patina-mocha-brown)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-base font-medium text-[var(--patina-mocha-brown)]">
                    Welcome to the Founding Circle. Leah&apos;s first letter is on its way.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Honeypot — hidden from users, catches bots that auto-fill every field. */}
                  <input
                    ref={honeypotRef}
                    type="text"
                    name={LEAD_HONEYPOT_FIELD}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="signup-first-name"
                      className="text-sm font-medium text-[var(--patina-charcoal)]"
                    >
                      {systemMessages.signup.labels.firstName}
                    </label>
                    <input
                      id="signup-first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (state === 'error') setState('idle');
                      }}
                      className={cn(
                        'rounded-[var(--radius-lg)] transition-all duration-200 outline-none',
                        'px-4 py-3 text-[0.9375rem]',
                        'bg-white text-[var(--patina-charcoal)] placeholder:text-[var(--patina-mocha-brown)]/50',
                        'border border-[rgba(163,146,124,0.25)] focus:border-[var(--patina-clay-beige)]'
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="signup-email"
                      className="text-sm font-medium text-[var(--patina-charcoal)]"
                    >
                      {systemMessages.signup.labels.email}
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (state === 'error') setState('idle');
                      }}
                      required
                      className={cn(
                        'rounded-[var(--radius-lg)] transition-all duration-200 outline-none',
                        'px-4 py-3 text-[0.9375rem]',
                        'bg-white text-[var(--patina-charcoal)] placeholder:text-[var(--patina-mocha-brown)]/50',
                        'border border-[rgba(163,146,124,0.25)] focus:border-[var(--patina-clay-beige)]'
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="signup-phone"
                      className="text-sm font-medium text-[var(--patina-charcoal)]"
                    >
                      {systemMessages.signup.labels.phone}
                    </label>
                    <input
                      id="signup-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (state === 'error') setState('idle');
                      }}
                      className={cn(
                        'rounded-[var(--radius-lg)] transition-all duration-200 outline-none',
                        'px-4 py-3 text-[0.9375rem]',
                        'bg-white text-[var(--patina-charcoal)] placeholder:text-[var(--patina-mocha-brown)]/50',
                        'border border-[rgba(163,146,124,0.25)] focus:border-[var(--patina-clay-beige)]'
                      )}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="signup-sms-consent"
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => {
                        setSmsConsent(e.target.checked);
                        if (state === 'error') setState('idle');
                      }}
                      className="mt-1 h-5 w-5 shrink-0 rounded border-[rgba(163,146,124,0.4)] accent-[var(--patina-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--patina-clay-beige)] cursor-pointer"
                    />
                    <label
                      htmlFor="signup-sms-consent"
                      className="text-sm text-[var(--patina-mocha-brown)] leading-relaxed cursor-pointer"
                    >
                      {consentBeforePrivacy}
                      <Link
                        href="/privacy"
                        className="underline underline-offset-2 hover:text-[var(--patina-charcoal)]"
                      >
                        Privacy Policy
                      </Link>
                      {consentBetween}
                      <Link
                        href="/terms#sms"
                        className="underline underline-offset-2 hover:text-[var(--patina-charcoal)]"
                      >
                        SMS Terms
                      </Link>
                      {consentAfterTerms}
                    </label>
                  </div>

                  {state === 'error' && errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    className={cn(
                      'inline-flex items-center justify-center font-medium rounded-[var(--radius-lg)]',
                      'transition-all duration-300 ease-[var(--ease-patina)]',
                      'px-6 py-3 text-[0.9375rem]',
                      'bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] hover:bg-[var(--patina-mocha-brown)]',
                      'disabled:opacity-60 disabled:cursor-not-allowed'
                    )}
                  >
                    {state === 'loading' ? (
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
