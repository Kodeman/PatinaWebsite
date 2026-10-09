# Package verification

Prepared 11 September 2026. These checks apply to the launch artifacts, not to a new production website deployment.

- The 12-page landscape launch book renders with local fonts, no missing images or browser errors, and no text crossing the printable footer boundary. Its 390px mobile view has no horizontal overflow. See `review/package-render-checks.json`.
- The launch PDF contains 12 pages; the separate media-background PDF contains 5 pages.
- All six campaign PNGs have their specified export dimensions. The creative team checked text bounds, font readiness, mobile gallery layout, interactive playback, reduced-motion behavior, and original source hashes. See `creative/review/verification.json`.
- The exact Strata proportions were retained. Illustrative imagery carries the requested caption; documentary artwork identifies Middle West Studio and the recorded photographer.
- An independent copy review reconciled monthly member timing, the actual social-post mix, press-pitch IDs, followup timing, and shared-profile attribution.
- The three founder story variants were checked at 50, 150, and 400 words. First-person language remains proposed founder copy; the press announcement does not invent a quotation.
- Tracking URLs in the copy, registry, and calendar were reconciled. UTM tags contain generic channel and asset identifiers, not recipient details.
- Media research records the primary sources and route limitations. Madison Magazine and Chicago magazine have explicit verification holds rather than guessed contact details.
- The final archive and local-link checks are recorded in `review/package-integrity.json`.

No email, application, newsletter signup, social publication, paid placement, or press outreach was triggered. No application code or production setting was changed. The interactive motion preview is supplied; no MP4 export is claimed. The website’s last deployment/analytics work remains separate from this artifact verification.

Public route GET checks from the root preparation environment returned 403; the press researcher could read the public pages through its browser/search tool. Neither constitutes a fresh end-to-end signup/email test. Perform that operator check in a normal browser before campaign distribution.
