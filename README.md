# C-Chews — Savour Landing Page Templates

Three complete, visually distinct landing page templates for **Savour**, a
pre-launch DTC functional oral-care brand. Same product, same offer, same
six-step belief chain, same nine objections — three different executions
for three different traffic types. Built from the build prompt on the
`Prompt-For-Landing-Pages` branch.

Open `index.html` to see the gallery, or go straight to a template:

- `templates/01-mechanism/index.html` — long-form direct response
- `templates/02-ritual/index.html` — quiet-luxury editorial
- `templates/03-poison-picker/index.html` — bold, interactive conversion page

Every page opens correctly by double-clicking the `.html` file from disk
(`file://`) or from a static server. No build step, no installs.

---

## How to change prices

Every dollar figure on every template — bundle prices, per-tin price,
per-chew price, savings $/%, subscription price, and the free-shipping
progress bar — is computed at runtime from **one file**:

```
shared/config.js
```

To change what the site charges:

1. Open `shared/config.js`.
2. Edit `pricing.basePricePerTin` and/or the `pricing.bundles` array.
3. Save. Reload any template.

No HTML edits are ever required. `shared/pricing.js` holds the derivation
logic (`perTin`, `savingsVsBase`, `perChew`, `subscriptionPrice`,
`qualifiesForFreeShipping`, `formatMoney`, etc.) and every template calls
into it from its own `script.js` rather than computing or hardcoding a
number itself.

**Price-config acceptance test — result: PASSED.**
`basePricePerTin` was changed from `20.00` to `24.00` and every bundle
price in `pricing.bundles` was changed to new values, then all three
templates were reloaded. Every displayed figure — bundle prices, per-tin
price, per-chew math (including the "That's $X a chew" callouts and FAQ
answers), savings $ and %, subscription price, and the sticky bar's
free-shipping progress bar — updated correctly with zero HTML edits. The
values were then reverted to the original numbers shown above.

---

## Why global scripts instead of ES modules

The build prompt calls for every template to open correctly from
`file://`. ES module `import`/`export` is blocked by CORS in Chromium (and
inconsistent elsewhere) when loaded from a `file://` URL, so `shared/*.js`
is written as plain, non-module scripts that attach to `window`
(`window.SAVOUR_CONFIG`, `window.SavourPricing`, `window.SavourWaitlist`)
and are loaded with ordinary `<script src="...">` tags, in this order:
`config.js` → `pricing.js` → `waitlist.js` → the template's own
`script.js`. This works identically under `file://` and a static server,
so no fallback build was needed.

---

## What each template is for

| Template | Job | Traffic | Design language |
|---|---|---|---|
| **01 — The Mechanism** | Convert cold, skeptical, problem-aware traffic through argument | Cold direct-response | High-contrast editorial newspaper, one accent color, scroll-driven reveals, highest word count |
| **02 — The Ritual** | Convert on desire, taste, and credibility | Brand / organic / PR | Quiet luxury — muted palette, serif display type, huge whitespace, ingredient-transparency table as the credibility engine |
| **03 — The Poison Picker** | Maximum conversion mechanics | Warm / retargeted | Bold and saturated; the whole page re-themes on the Coffee/Wine pick; sticky buy bar, interactive 30-second timer, subscribe-and-save bundle ladder |

All three walk the same six-step belief chain (problem validation →
discredit current fixes → the chemistry reframe → the Snap/Melt/Wash
mechanism → the 30-second proof → safety/ritual/offer) and answer the same
nine objections, in each template's own voice.

Shared, non-visual infrastructure lives in `/shared/` (`config.js`,
`pricing.js`, `waitlist.js`, `base.css` — reset + the waitlist modal's
structural CSS only). Each template owns its own `style.css` and
`script.js` and does not borrow another template's design system.
Approved copy for all three lives in `content/copy.md` — if a template
needs a new line, it's added there first.

---

## `[SOURCE NEEDED]` and `[TESTIMONIAL SLOT]` inventory

This is a pre-launch brand with no clinical trials and no real customers
yet. No fabricated testimonials, statistics, or claims appear anywhere.
Every place a real citation or a real customer quote belongs is a visible,
labeled placeholder instead. Full list, as of this build:

**`[SOURCE NEEDED]`** (dental/chemistry/safety citations, one shared list
via `content/copy.md` §3, §4, §9, §10; rendered on each template):

- The UMP paragraph (oils/pigments bonding to enamel) — Templates 01, 02
- The Melt step's mechanism-of-action claim — Template 01
- Erythritol safety/GRAS claim — Templates 01, 02 (ingredient panel)
- Malic acid safety/efficacy claim — Templates 01, 02 (ingredient panel)
- "Does not cure/treat/whiten" efficacy disclaimer — Template 01
- Objection 1 answer (swallow safety) — Templates 01, 02, 03 FAQ
- Objection 5 answer ("backed by anything") — Templates 01, 02, 03 FAQ

**`[TESTIMONIAL SLOT]`** (real customer quotes pending launch):

- Three testimonial-slot components in the social-proof rail — Template
  03 (`templates/03-poison-picker/script.js`, `renderTestimonialSlots`)

Templates 01 and 02 use the honest, attributed VOC research quotes from
`content/copy.md` §11 instead of testimonials (never as fake reviews).
Template 03 uses the same VOC quotes in its "Sound familiar?" block *and*
adds the three testimonial slots above for real reviews once they exist.

Grep for either marker at any time to find every remaining placeholder:

```
grep -rn "SOURCE NEEDED\|TESTIMONIAL SLOT" .
```

---

## Switching `launch.mode` when checkout goes live

`shared/config.js` → `launch.mode` is currently `"waitlist"`. Every buy/CTA
button on every template opens the shared waitlist modal
(`shared/waitlist.js`) — there is no real checkout, no payment collection,
and no network requests anywhere in this repo. On submit, the modal logs
the payload to the console with a `// TODO: wire to ESP` comment instead
of sending it anywhere.

To go live:

1. Change `launch.mode` to `"presale"` or `"live"` in `shared/config.js`.
2. Wire `shared/waitlist.js`'s `handleSubmit()` (search for
   `TODO: wire to ESP`) to a real endpoint — an ESP for `"presale"`, or a
   real checkout flow for `"live"`.
3. Update each template's CTA copy if "Join the Waitlist" no longer fits
   (the button text is static in each `index.html`, not derived from
   `launch.mode`, since copy tone differs by template).
4. `launch.mode` values other than `"waitlist"` are not implemented yet —
   no template branches on this value today.

---

## Self-QA results

- [x] Change `basePricePerTin` and bundle prices → all figures update with
      zero HTML edits (see acceptance test above).
- [x] All six belief-chain steps appear, in order, on all three templates.
- [x] All nine objections are answered on all three templates.
- [x] Snap → Melt → Wash appears, in sequence, on all three.
- [x] No fabricated testimonials, names, stars, review counts, press
      logos, statistics, or clinical claims anywhere.
- [x] Every unsourced factual claim carries `[SOURCE NEEDED]`; every
      testimonial position carries `[TESTIMONIAL SLOT]`.
- [x] No message anywhere suggests cutting back on coffee or wine.
- [x] The three templates are visually distinct — different type systems,
      palettes, layout logic, and voice registers.
- [x] Keyboard-only pass: accordions, the waitlist modal (focus trap, Esc
      to close, focus restored), and Template 03's picker/toggle controls
      are reachable and operable via keyboard.
- [x] `prefers-reduced-motion: reduce` disables scroll reveals, the
      Snap/Melt/Wash SVG animation, and the 30-second timer's spin.
- [x] No horizontal body scroll at 360px on any page; the comparison and
      ingredient tables scroll inside their own `overflow-x: auto` box.
- [x] Every page opens correctly from `file://` (see "Why global scripts"
      above).
- [x] No external requests except Google Fonts on Template 02
      (`fonts.googleapis.com` / `fonts.gstatic.com`); Templates 01 and 03
      use system font stacks only. No CDN JS, no analytics, no pixels.

See the final build report delivered in the session that produced this
repo for anything noted as incomplete.
