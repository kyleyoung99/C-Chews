# C-Chews — Savour Landing Page Templates (v3, live-storefront update)

Three landing pages for **Savour**, a pre-launch DTC oral-care brand. Built
per **build prompt v3** (`Prompt-For-Landing-Pages` branch), then updated
to that branch's live-storefront revision: each template is a close
structural and visual reproduction of a specific, proven DTC landing
page — not an invented design "inspired by" it — rebuilt with Savour's own
product, copy, and design tokens, and now shipped as a page that reads as
a finished, live store rather than a wireframe (see "The live-storefront
update" below).

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

## The live-storefront update

The build prompt was revised (`Prompt-For-Landing-Pages` branch, commits
`c976acc`/`b4cd2b6`/`5c72bd7`) from "ship an honest wireframe with visible
`[SLOT]` brackets" to "ship a page that reads as a finished, live store."
Every visible `[SOURCE NEEDED]`, `[REVIEW SLOT]`, `[TESTIMONIAL SLOT]`,
`[FOUNDER VIDEO SLOT]`, `[GIFT ITEM SLOT]`, `[CERTIFICATION SLOT]`, and
`[INGREDIENT COUNT — pending]` bracket that shipped in the earlier build
is gone from all three templates — either rewritten into real, honestly-
hedged copy, or (where the underlying content was genuinely still art
direction, not a claim) moved into an HTML comment. `grep -o
'\[[A-Z][A-Z ]*[A-Z]\]' templates/*/index.html` now returns nothing.

**`shared/config.js` → `launch`:**

```js
launch: {
  mode: "live",           // page reads as a live store; checkout is still a stub
  showDemoProof: true,     // true = seeded reviews/ratings render; false = they vanish
  batchLabel: "Batch 001",
  foundersBatchUnits: 500,
  priceLockCopy: "Founders Batch price, locked for life.",
}
```

**Seeded reviews.** `content/demo-proof.js` holds 12 written-in-voice
reviews (4 per template, distributed Post-Coffee → 01-ag1, Post-Wine →
02-bloom, mixed → 03-gruns) plus one shared aggregate (4.8★, 214
reviews — a plausible founding-batch figure, not an inflated one). The
file's own top-of-file comment is load-bearing: it states this is sample
data, not real customer reviews, and every entry carries `verified:
false`. Every element each template renders from this file — the
aggregate rating, the review cards — carries `data-demo="true"` in the
DOM, gated entirely by `CFG.launch.showDemoProof`. Set that flag to
`false` and reload: the seeded reviews and ratings disappear from all
three pages with zero HTML edits. Verified via a real Playwright pass
(route-intercepting `shared/config.js` with the flag flipped) rather than
by inspection alone.

**Claim tiers.** `CLAIMS.md` documents every substantive claim on all
three pages against the build prompt's four-tier system (design facts,
mechanism, outcomes, comparative) — no page states a numeric efficacy
figure or an unhedged verb ("removes," "cures," "eliminates"). Where the
earlier build hedged a claim behind a `[SOURCE NEEDED]` bracket, the
claim is now either stated in its proper tier's register (mechanism
claims state actively, e.g. "Malic acid triggers a salivary flood…") or
left as an honest, non-bracketed disclosure of what still needs
publishing before launch (e.g. "Full concentrations and sourcing will be
published here before Batch 001 ships").

**Real cart, stub checkout.** Every template now has an actual bag
drawer: line items, quantity +/− controls, a live free-shipping progress
bar, all computed from `shared/pricing.js` against whatever is actually
in the cart (not a fixed $0, as in the earlier build). "Add to bag" / "Get
my tin" CTAs push a bundle or variant into that cart and open the drawer;
the drawer's own "Checkout" button opens a **separate** checkout modal
(distinct from the waitlist modal, which still exists for genuine
top-of-funnel email capture) reading "Checkout opens when Batch 001
ships…", collecting only an email. Submitting it validates client-side,
shows a success state, and `console.log`s the payload with a `// TODO:
wire to ESP and payment provider` comment — no network request is made
anywhere in this repo. `launch.mode` is `"live"` for copy purposes only;
there is still no real checkout to switch on. To wire a real one: replace
each template's `initCheckout()` submit handler (search `script.js` for
that `TODO`) with a real endpoint call.

No press logos, and no numeric efficacy claim, are used anywhere even in
demo mode — see `CLAIMS.md` §"What the build prompt will not write" for
why, and what each template shows in that slot instead (01-ag1's "Made
and tested" band; 02-bloom's "How it's made" ingredient strip; 03-gruns'
three-badge standards row).

---

## Verification — build prompt v3 §13

All seven grep checks and the manual checklist were run and, after fixes
below, pass:

```
1. Hex colors shared across templates (besides white): none.
2. Font stacks: Archivo/Inter · Poppins/DM Sans · Fredoka/Hanken Grotesk
   — fully disjoint.
3. Repeated H1/H2 text: one deliberate exception. All three H1s now read
   "What your mint wishes it was." — the offer brief's primary hook —
   installed identically on client instruction after the §13 check was
   originally run clean. Footer column labels ("Shop"/"Learn"/"Company")
   are demoted from <h2> to <h3> as their own fix (footer sub-groupings,
   not page sections). Adding the bag drawer, checkout modal, and
   reviews heading to all three templates in the live-storefront update
   briefly introduced three more accidental repeats ("Your bag",
   "What people are saying.", "Checkout opens when…") — each was rewritten
   in its own template's voice ("Your order" / "What's in here" · "Early
   word." / "The reviews are in." · "Checkout unlocks the second Batch
   001 ships." / "Checkout's not live yet. Your spot can be.") so the
   shared H1 remains the only deliberate repeat.
4. border-radius / box-shadow counts differ per template (29/68/34 and
   5/5/12 respectively).
5. Section counts: 16 / 15 / 17, exactly as specified — unchanged by the
   live-storefront update (no sections added or removed, only rewritten).
6. Google Fonts loaded on all three (2 link tags each: preconnect + stylesheet).
7. No un-interpolated template literals in static markup.
8. (Added for the live-storefront update) No visible `[SLOT]` bracket
   anywhere: `grep -o '\[[A-Z][A-Z ]*[A-Z]\]' templates/*/index.html`
   returns nothing on all three templates.
```

Manual checklist: price-config test passed (below); each template's
section order matches its own §7/§8/§9 spec; all nine objections answered
per template in that template's own register; each Snap/Melt/Wash visual
is a separately hand-drawn inline SVG per template; each template owns
its own waitlist modal markup/heading/skin *and now its own checkout
modal*, distinct from the waitlist modal; zero fabricated social proof
outside the clearly-flagged `data-demo` reviews; nothing suggests
drinking less coffee or wine; keyboard-only pass confirmed (modal/drawer
focus trap + Esc, accordions, marquee pause controls) via a real
Playwright run, not just code review; marquees freeze under
`prefers-reduced-motion`; no horizontal scroll at 360px on any template;
every review, rating and aggregate carries `data-demo="true"` and
vanishes when `showDemoProof` is flipped false (verified live, not by
inspection); all three open correctly from `file://` (verified the same
way).

**Price-config self-test, live-storefront revision.** `basePricePerTin`
and all three `bundles[].price` values were changed (`20/36/50` →
`24/44/60`) via a route-intercepted `shared/config.js`, and all three
templates reloaded. Every displayed figure updated correctly with zero
HTML edits, including the bundle grids that only reveal the raw bundle
price under the "one time" plan toggle (the default "subscribe" view
shows the discounted price, which is expected, not a bug). The file on
disk was never touched — confirmed via `git diff shared/config.js`
returning empty before every commit.

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
- (Live-storefront update) `02-bloom`'s `.rating` and `.proof__grid`
  classes both set `display: flex`/`display: grid` with no `[hidden]`
  guard — the same class of bug as the modal fix above, this time hiding
  the newly-populated reviews when `showDemoProof` is set to false. Added
  `.rating[hidden] { display: none; }` and `.proof__grid[hidden] {
  display: none; }`. Found by the same route-intercepted Playwright
  flag-toggle test used for the demo-proof verification above, not by
  inspection.

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
