# Signup emails from Kody

Open [the three email previews](index.html) to review the Founding Circle welcome,
designer acknowledgement, and maker acknowledgement together. These HTML files
are generated from the actual templates using sample details; no mail is sent.

All three use **Kody at Patina <hello@patina.cloud>**, with replies directed to
**hello@patina.cloud**. The letters are signed by Kody. Designer and maker notes
say Kody will review the application with Leah, with the existing seven-day and
two-week response expectations respectively. They confirm receipt, not acceptance.

The Founding Circle note includes the required unsubscribe link and states that
the app and marketplace are still in development. The Designer’s Eye continues
to use Leah’s editorial voice.

To refresh the previews after editing the templates, run from the repository root:

```sh
node --import tsx scripts/preview-signup-emails.ts
```

The preview script intercepts the actual Resend payload locally. It does not load
environment files, access subscriber records, or contact the email provider.
Inbox delivery and rendering in real email clients require a separate send test.
