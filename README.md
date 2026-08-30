# C-Chews — Savour Landing Page Templates (v3)

Three landing pages for **Savour**, a pre-launch DTC oral-care brand. Built
per **build prompt v3** (`Prompt-For-Landing-Pages` branch): each template
is a close structural and visual reproduction of a specific, proven DTC
landing page — not an invented design "inspired by" it — rebuilt with
Savour's own product, copy, and design tokens.

| Template | Modeled on | Traffic it's built for |
|---|---|---|
| `templates/01-ag1/` | AG1 / Athletic Greens | Cold, skeptical, higher-intent |
| `templates/02-bloom/` | Bloom Nutrition | Warm and social |
| `templates/03-gruns/` | Gruns | Cold paid-social |

Open `index.html` for the gallery, or go straight to a template. Every
page opens correctly by double-clicking the `.html` file from disk
(`file://`) or from a static server — no build step, no installs.

See `REFERENCE-NOTES.md` for what could and couldn't be verified against
the live reference sites, and `DESIGN.md` for the full token set (colors,
type, radius, shadow budget, section order) behind each template.

---

## How to change prices

Every dollar figure on every template — bundle prices, per-tin price,
per-chew price, savings $/%, subscription price, and free-shipping
progress — is computed at runtime from **one file**:

```
shared/config.js
```

Edit `pricing.basePricePerTin` and/or `pricing.bundles`, save, reload any
template. No HTML edits are ever required. `shared/pricing.js` holds the
derivation logic (`perTin`, `savingsVsBase`, `perChew`, `subscriptionPrice`,
`qualifiesForFreeShipping`, `amountToFreeShipping`,
`freeShippingProgressPercent`, `formatMoney`, `formatPerChew`) and every
template calls into it from its own `script.js`.

**Price-config acceptance test — result: PASSED.** `basePricePerTin` and
the `single` bundle price were changed from `20.00` to `24.00`, and all
three templates were reloaded via a real headless-Chromium pass. Every
displayed figure — bundle prices, per-tin price, per-chew math (including
the live "per chew" callouts in the FAQ, pricing block, and comparison
table), and the sticky/announcement free-shipping copy — updated
correctly with zero HTML edits. The file was reverted afterward.

Note: `product.variants` in `shared/config.js` intentionally has **no**
accent-color field — each template takes its palette from its own
reference brand (see `DESIGN.md`), not from shared config.

---

## Why global scripts instead of ES modules

Every template loads `shared/config.js` → `shared/pricing.js` →
`shared/waitlist.js` → its own `script.js`, in that order, as plain,
non-module `<script src="...">` tags. ES module `import`/`export` is
blocked by CORS in Chromium (and inconsistent elsewhere) when loaded from
a `file://` URL, so nothing here uses `type="module"` — this works
identically under `file://` and a static server, satisfying build prompt
v3 §11's `file://` requirement without needing a separate fallback build.

---

## What's shared vs. per-template

Per build prompt v3 §1, only four files are shared, and none of them
carries color, type, or copy:

- `shared/config.js` — pricing + product facts (the single source of truth)
- `shared/pricing.js` — pure derivation functions over config
- `shared/waitlist.js` — **logic only**: open/close, focus trap, Esc,
  email validation, success-state swap. It builds no DOM and owns no
  CSS or copy. Each template supplies its own modal markup, heading
  text, and skin, wired against a fixed data-attribute contract
  (`data-savour-modal`, `data-savour-modal-form`,
  `data-savour-modal-email`, `data-savour-modal-variant`,
  `data-savour-modal-error`, `data-savour-modal-success`,
  `data-savour-modal-close`, and `data-waitlist-open` triggers anywhere
  on the page). This is a deliberate change from earlier builds, where a
  shared, identically-styled modal made all three pages feel like one
  page.
- `shared/base.css` — reset + accessibility utilities only (box-sizing,
  `.sr-only`, `.skip-link` positioning, `.scroll-x`, reduced-motion
  neutralization). No color, no font, no spacing scale.

Everything visual and every marketing sentence is per-template:
`content/facts.md` holds the shared product truths (the only shared
*content*), and each template draws from its own `content/copy-0X-*.md`
copy bank, written in its own voice before any markup existed.

---

## `[SOURCE NEEDED]` and other placeholder inventory

Savour is pre-launch with zero customers, zero clinical data, and zero
press coverage. No fabricated testimonials, star ratings, review counts,
press logos, or statistics appear anywhere. Every place one of the
reference brands would show real social proof or a real citation is a
visible, labeled placeholder instead — full inventory, as of this build
(`grep -rn '\[[A-Z][^]]*\]' templates/*/index.html` to find them all):

**`templates/01-ag1/`** (9× `[SOURCE NEEDED]` +:)
`[TESTIMONIAL SLOT]` ×3 · `[REVIEW WIDGET SLOT]` ·
`[REVIEW COUNT — pending launch]` · `[STAR RATING — pending launch]` ·
`[THIRD-PARTY TESTING — confirm before claiming]` ·
`[RESEARCH CITATION SLOT]` ·
`[GIFT ITEM SLOT — confirm with client: pocket sleeve? refill card?
Batch 001 card?]` ·
`[REGULATORY DISCLAIMER — confirm product classification with counsel]` ·
`[MANUFACTURING STANDARD — confirm facility certifications]`

**`templates/02-bloom/`** (4× `[SOURCE NEEDED]` +:)
`[TESTIMONIAL SLOT]` ×3 · `[FOUNDER VIDEO SLOT]` ×3 ·
`[NAME — pending launch]` ×3 · `[REVIEW COUNT — pending launch]` ·
`[STAR RATING — pending launch]`

**`templates/03-gruns/`** (6× `[SOURCE NEEDED — dental/chemistry
citation]`, 1× `[SOURCE NEEDED — food-safety documentation]`, 1×
`[SOURCE NEEDED — mechanism-of-action citation]` +:)
`[REVIEW SLOT]` ×6 · `[STAR RATING — pending launch]` ×4 ·
`[REVIEW COUNT — pending launch]` ·
`[INGREDIENT COUNT — pending final formulation]` ·
`[CERTIFICATION SLOT — pending launch]`

No `[PRESS LOGO SLOT]` appears anywhere — per spec, those bands are
deleted rather than faked on all three templates (01-ag1 skips the press
strip entirely; 02-bloom replaces it with an honest "how it's made"
ingredient-sourcing strip; 03-gruns runs a VOC-quote marquee in that slot
instead).

Every unhedged efficacy claim is written with hedge language ("supports,"
"helps," "designed to," "formulated to") rather than "removes," "cures,"
or "eliminates" — this holds across all three voices, including 03-gruns'
louder, funnier register.

---

## Switching `launch.mode` when checkout goes live

`shared/config.js` → `launch.mode` is currently `"waitlist"`. Every
buy/CTA button on every template opens that template's own waitlist
modal — there is no real checkout, no payment collection, and no network
requests anywhere in this repo. On submit, each modal logs its payload to
the console with a `// TODO: wire to ESP` comment (see each template's
`script.js`) instead of sending it anywhere.

To go live: change `launch.mode` to `"presale"` or `"live"`, then wire
each template's submit handler (search its `script.js` for `TODO: wire to
ESP`) to a real endpoint. `launch.mode` values other than `"waitlist"` are
not implemented yet — no template branches on this value today. CTA copy
("Subscribe & Save" / "Add to bag" / "Get my tin") is static per template
voice, not derived from `launch.mode`.

---

## Verification — build prompt v3 §13

All seven grep checks and the manual checklist were run and, after fixes
below, pass:

```
1. Hex colors shared across templates (besides white): none, after fixing
   a stray literal #4A4A4A in 02-bloom that should have been var(--muted)
   (#6A6A6A) — it collided with 03-gruns' own --muted (#4A4A4A).
2. Font stacks: Archivo/Inter · Poppins/DM Sans · Fredoka/Hanken Grotesk
   — fully disjoint.
3. Repeated H1/H2 text: one deliberate exception. All three H1s now read
   "What your mint wishes it was." — the offer brief's primary hook —
   installed identically on client instruction after the §13 check was
   originally run clean. Footer column labels ("Shop"/"Learn"/"Company")
   are still demoted from <h2> to <h3> as their own fix (they're footer
   sub-groupings, not page sections, and the nav already carries its own
   aria-label), so the shared H1 is the only remaining repeat.
4. border-radius / box-shadow counts differ per template (22/67/31 and
   4/5/10 respectively).
5. Section counts: 16 / 15 / 17, exactly as specified.
6. Google Fonts loaded on all three (2 link tags each: preconnect + stylesheet).
7. No un-interpolated template literals in static markup.
```

Manual checklist: price-config test passed (above); each template's
section order matches its own §7/§8/§9 spec; all nine objections answered
per template in that template's own register; each Snap/Melt/Wash visual
is a separately hand-drawn inline SVG per template; each template owns
its own waitlist modal markup/heading/skin; zero fabricated social proof
anywhere; nothing suggests drinking less coffee or wine; keyboard-only
pass confirmed (modal focus trap + Esc, accordions, marquee pause
controls) via a real Playwright run, not just code review; marquees
freeze under `prefers-reduced-motion`; no horizontal scroll at 360px on
any template (two real bugs were found and fixed — see below); all three
open correctly from `file://` (verified the same way).

**Bugs found and fixed during QA** (a real headless-Chromium pass, not
just static review):
- `01-ag1` and `02-bloom`'s `.modal` CSS set `display: flex` with no
  `[hidden]` guard, so the waitlist modal visually covered the page and
  blocked clicks even while marked `hidden`. Added `.modal[hidden] {
  display: none; }` to both.
- `02-bloom`'s `.src` ("SOURCE NEEDED") badge had `white-space: nowrap`,
  which forced its longest citation text wider than its card at 360px,
  causing horizontal scroll. Removed the `nowrap`.
- `03-gruns`'s comparison-table `.row dd` also used `white-space: nowrap`
  inside a CSS Grid column with no `min-width: 0` on `.col`, letting a
  long answer row force the grid track wider than the viewport at 360px.
  Removed the `nowrap` and added `min-width: 0` to `.col`.

**The squint test.** All three were opened side by side. 01-ag1 reads as
calm/editorial (sand-and-brass, hairline borders, soft 4-shadow budget);
02-bloom reads as warm/photographic (white-and-berry with per-flavor
pastels, heavy image-shaped placeholders); 03-gruns reads as
loud/cutout (saturated berry ground, thick ink borders, hard-offset
stickers, zero soft shadows) — distinguishable from silhouette and color
alone.

---

## What I could not verify

`REFERENCE-NOTES.md` has the full detail: drinkag1.com, bloomnu.com, and
gruns.co are all network-egress-blocked in this session (confirmed via
direct fetch attempts, each returning `EGRESS_BLOCKED`), matching the
build prompt's own stated caveat that its authoring session hit the same
block. Every token, section order, and component description in
`DESIGN.md` and each template is taken from the build prompt's documented
spec, not sampled from the live pages — nothing here is presented as
verified against the current state of those sites.
