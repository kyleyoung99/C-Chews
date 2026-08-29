# BUILD PROMPT — Savour: Three Landing Page Templates

You are building the launch landing pages for **Savour**, a pre-launch DTC functional oral-care brand. Build **three complete, visually distinct landing page templates** for the same product and offer. This prompt is self-contained: every fact, claim, and piece of source language you need is below. Do not invent product facts beyond what is here.

---

## 0. REPO + DELIVERY

- Repository: `kyleyoung99/C-Chews` (currently near-empty — a `README.md` and an `Agents` file).
- Work on branch `claude/awaiting-instructions-k9uxic`. Create it from the latest default branch if it does not exist locally.
- Commit in logical chunks with clear messages. Push with `git push -u origin claude/awaiting-instructions-k9uxic`.
- **Do not open a pull request.**
- No build step, no package installs, no bundler. Every page must open correctly by double-clicking the `.html` file from disk (`file://`) and over a static server.

### File structure to produce

```
index.html                      # gallery: screenshots/links to all 3 templates, side-by-side
/shared/
  config.js                     # SINGLE SOURCE OF TRUTH for pricing + product facts
  pricing.js                    # derives all displayed prices/savings from config.js
  waitlist.js                   # email capture modal (shared by all 3)
  base.css                      # reset + shared utilities ONLY (no template styling)
/templates/
  01-mechanism/index.html       # + style.css, script.js
  02-ritual/index.html          # + style.css, script.js
  03-poison-picker/index.html   # + style.css, script.js
/content/
  copy.md                       # approved copy bank — all 3 templates draw from this
README.md                       # how to change prices, swap copy, deploy, what each template is for
```

Each template gets its **own** `style.css` and `script.js`. Do not share a design system across the three — they must look and feel like three different brands' takes on the same product. Only `config.js`, `pricing.js`, `waitlist.js`, and a minimal `base.css` are shared.

---

## 1. NON-NEGOTIABLE: PRICING MUST BE FULLY ADJUSTABLE

Hard-coded prices anywhere in HTML are a build failure. Every price, per-unit price, per-chew cost, savings amount, savings percentage, shipping threshold, and subscription discount must render at runtime from `shared/config.js`.

Build `shared/config.js` roughly like this (tune structure as needed, keep the intent):

```js
export const SAVOUR_CONFIG = {
  currency: { code: "USD", symbol: "$", locale: "en-US" },

  product: {
    chewsPerTin: 30,
    variants: [
      { id: "coffee", name: "Savour Post-Coffee", flavor: "Cardamom & Sweet Cream", accent: "#6F4E37" },
      { id: "wine",   name: "Savour Post-Wine",   flavor: "Dark Cherry & Sage",     accent: "#5B2333" }
    ]
  },

  pricing: {
    basePricePerTin: 20.00,          // <- change this one number, whole site updates
    bundles: [
      { id: "single", tins: 1, price: 20.00, label: "One Tin",              badge: null },
      { id: "duo",    tins: 2, price: 36.00, label: "The Pair (Coffee + Wine)", badge: "Most Popular" },
      { id: "trio",   tins: 3, price: 50.00, label: "The Full Set + Spare", badge: "Best Value" }
    ],
    subscription: { enabled: true, discountPercent: 20, intervalLabel: "every 30 days" },
    freeShippingThreshold: 35.00,
    guaranteeDays: 30
  },

  launch: {
    mode: "waitlist",                 // "waitlist" | "presale" | "live"
    batchLabel: "Batch 001",
    foundersBatchUnits: 500,          // display only — never fake a live countdown
    priceLockCopy: "Founders Batch price, locked for life."
  }
};
```

`shared/pricing.js` must expose helpers used by all three templates:

- `perTin(bundle)` → bundle.price / bundle.tins
- `savingsVsBase(bundle)` → absolute $ and % saved vs `basePricePerTin × tins`
- `perChew(bundle)` → price / (tins × chewsPerTin), formatted to cents
- `subscriptionPrice(bundle)` → price × (1 − discountPercent/100)
- `qualifiesForFreeShipping(price)` → boolean
- `formatMoney(n)` → locale-aware currency string

**Acceptance test you must run yourself:** change `basePricePerTin` to `24.00` and every bundle price to new values, reload all three templates, and confirm every displayed number — including "$0.67 per chew" style math, savings badges, and free-shipping progress — updates with zero HTML edits. Document this test in the README.

Also drive these from config, not markup: product names, flavor names, chews per tin, guarantee days, batch label.

---

## 2. THE PRODUCT (facts you may state)

**Savour** — swallowable single-chew tablets in a pocket tin, taken immediately after coffee or red wine. Two SKUs:

- **Savour Post-Coffee** — cardamom & sweet cream
- **Savour Post-Wine** — dark cherry & sage

Flavors are composed to *complement* the drink they follow, not fight it the way mint does. ~30 seconds. No rinse, no spitting, no sink. Chew and swallow.

### Unique Mechanism of the Problem (UMP) — the reframe the whole site rests on

Coffee oils and wine's anthocyanin pigments chemically bond to enamel within minutes of drinking, and volatile sulfur compounds cause the lingering smell. Masking the smell with mint does nothing about the bond forming on your teeth. **It isn't a freshness problem. It's a chemical residue setting in real time.**

### Unique Mechanism of the Solution (UMS) — Snap → Melt → Wash

1. **SNAP** — the bite cracks the shell, releasing actives exactly when residue is freshest and most liftable.
2. **MELT** — an endothermic erythritol melt cools the mouth and closes enamel's pores.
3. **WASH** — a malic-acid-driven salivary flood (not foam, not mint) physically washes the oils and pigments off before they bond, then is swallowed.

It works with your own saliva as the delivery system, not a synthetic rinse. This three-step mechanism is the single most important thing on every page. Every template must explain it visually, in sequence, in plain language.

### Central metaphor

> **"An eraser, not an air freshener."**

Mints spray perfume over the problem; Savour lifts the mark itself, the way an eraser removes pencil instead of drawing over it.

Secondary: *"A reset button for your palate."*

### Existing brand lines (keep in rotation)

- "What's your poison?" (established hero line)
- "Reset your palate."
- Batch-001 / founders-batch labeling

---

## 3. THE CUSTOMER — write to this person, not a demographic

**"The Polished Professional."** 26–45 (core 28–38). ~65% female / ~35% male. Urban and suburban US metros — NYC, LA, Chicago, Austin, Nashville, SF. $75–$250/month on self-care, grooming, whitening, skincare. Client-facing, image-conscious roles: sales, marketing, consulting, hospitality, real estate, creators, healthcare-adjacent. They already whiten their teeth and read skincare ingredient lists.

**Core psychology:**
- Driven by **social self-monitoring** — acutely aware of how they're perceived at work and on dates.
- Want a solution that feels like an **upgrade and a ritual** (a tin you crack, not a product you use). Design and status matter as much as function.
- **They will not give up coffee or wine.** Any message of restriction, moderation, or "cut back" alienates them. The promise is: *keep the habit, erase the consequence.*
- They respond to **engineered self-care** — ingredient transparency and mechanism explanations.

**Awareness & sophistication (this dictates page structure):**
- **Problem-Aware, bordering Solution-Aware.** They know the problem intimately; they have never heard of this solution because the category doesn't exist. So: validate the problem in the first screen (never explain it to them), then introduce the mechanism as the missing piece they didn't know to look for.
- **Market Sophistication Stage 3→4.** "Freshens breath" and "whitens teeth" are dead claims. Win on *mechanism*, and position against the entire mint/gum/mouthwash/whitening-pen category — not against one competitor.
- **Consciousness: Low-Mid.** Lead with the low-consciousness pain (embarrassment, being caught, being judged) and layer in the mid-consciousness reward (a considered ritual, feeling discerning). Do not lead with self-actualization.

### Voice-of-customer language — use this, don't invent new quotes

These are real research quotes. Use them as section headers, pull quotes, and copy seeds. **Attribute them honestly** — as customer research, in a "Sound familiar?" style block — never as fake product testimonials with invented names, headshots, star ratings, or "verified buyer" badges.

- "I'll go straight from my afternoon coffee into a client call and just pray nobody's close enough to smell it."
- "I've gotten photos back from dinner where I'm just not smiling with teeth anymore because of the wine."
- "I keep gum in every bag, every car, every desk drawer — and it still doesn't really fix it."
- "Mints just mask it for a few minutes and then it's back."
- "Mint gum after red wine tastes disgusting — it's like the two flavors are fighting each other."
- "I shouldn't have to choose between my coffee and feeling confident for the rest of the day."
- "I notice other people's coffee breath immediately, so I assume everyone notices mine."
- "I caught myself covering my mouth when I laughed at dinner because I knew the wine had gotten to my teeth."
- "I've legitimately skipped ordering a second glass of wine before a work event because I didn't want to deal with it."
- "I was so annoyed scrubbing my teeth in a restaurant bathroom mirror before a date."
- "If something actually worked in the moment, I'd keep it on me at all times — car, purse, desk, everywhere."
- "I'd pay more for something that actually solved this than for another tin of mints that does nothing."
- "The second I saw 'swallow it, no rinse needed' I was in — that's the whole reason mouthwash never worked for me on the go."
- "I like that it feels like a little ritual instead of just 'fixing a problem' — it makes me feel more put together, not just less embarrassed."

---

## 4. THE BELIEF CHAIN — this is the required section order

Every template, regardless of style, must move the reader through these six beliefs **in this order**. Structure your sections around them; the visual treatment is what changes between templates, not the sequence.

1. **"This happens to me more than I realize, and other people notice."** → Problem validation. Real moments, not abstractions.
2. **"What I'm doing about it now — mints, gum, brushing harder — isn't fixing anything, it's covering it up for a few minutes."** → Discredit the existing solution set *before* introducing Savour.
3. **"This happens because of a specific chemical reaction in my mouth, not because I'm not 'fresh' enough — which is why nothing I've tried works."** → The UMP reframe. Makes every prior solution feel structurally mismatched rather than merely weak.
4. **"Savour was built specifically to interrupt that reaction, not to smell nice on top of it."** → Snap/Melt/Wash. This is what the whole mechanism explanation exists to install.
5. **"It will actually work, fast enough, in the real moment I need it — not 20 minutes later, not just in theory."** → The 30-second proof. This is the single biggest gap between "interesting" and "I'd buy it."
6. **"It's safe enough and premium enough to become part of what I already do — not a gimmick I try once."** → Safety + ingredients + ritual + the offer.

---

## 5. OBJECTIONS — all nine must be answered on every template

Answer them in FAQ copy, comparison tables, badges, or inline microcopy. Never leave one unaddressed.

1. "Is it actually safe to swallow every day?"
2. "Isn't this just an expensive mint?"
3. "Will it work fast enough to matter in a real moment — mid-meeting, mid-date?"
4. "Won't the flavor clash with coffee/wine the same way mint does?"
5. "Is this backed by anything, or just marketing claims?"
6. "Why do I need two products instead of one that does both?"
7. "$20 for mints feels expensive — why not just buy gum?" *(answer with per-chew math from `pricing.js`, computed live)*
8. "It's a new brand and a new category — will it actually ship, and does it work as advertised?"
9. "Do I have to change my coffee/wine habits?" *(answer: no — that's the entire point)*

---

## 6. CLAIM DISCIPLINE — read this before writing a single line of copy

This is a pre-launch brand with no shipped product and no clinical trials. Honesty here is a hard requirement, not a stylistic preference.

**Never generate:**
- Fake testimonials, invented customer names, headshots, star ratings, or review counts.
- "As seen in" press logos, or any real publication's name or mark.
- Invented statistics, percentages, study results, "clinically proven," "dentist recommended," or "9 out of 10 users."
- Fake live countdown timers, fake "12 people are viewing this," or fake inventory counters.
- Medical or therapeutic claims (does not "cure," "treat," "whiten teeth permanently," or replace brushing).

**Instead:**
- Anywhere a real citation, study, or dental source belongs, render a visible `[SOURCE NEEDED — dental/chemistry citation]` placeholder styled so it's obvious in review and trivial to grep out later.
- Anywhere a testimonial belongs, render a clearly-labeled `[TESTIMONIAL SLOT — real customer quote pending launch]` component with correct layout and dummy structure, plus a comment in the HTML explaining what goes there.
- Scarcity may only come from `config.launch.foundersBatchUnits` and must be phrased as a stated batch size ("Batch 001 is limited to 500 tins"), never a live-decrementing fake counter.
- The safety line should be honest and specific: erythritol and malic acid are common food-grade ingredients; say what they are and what they do, and add `[SOURCE NEEDED]` for any efficacy claim.
- Add a line to the README listing every `[SOURCE NEEDED]` and `[TESTIMONIAL SLOT]` occurrence so they're easy to fill before launch.

---

## 7. IMAGERY & ASSETS

No photography exists yet, and you must not hotlink external images or copy competitors' assets.

- Build **CSS/SVG placeholder art**: a tin rendered in CSS, abstract gradient fields, a chew-cross-section SVG, an enamel-surface diagram, a 0:00→0:30 timeline.
- Every place a real photo belongs gets a labeled placeholder box with a short art direction note in the HTML comment (e.g. `<!-- HERO IMAGE: tin held between thumb and forefinger, shallow depth of field, warm café light -->`).
- The Snap/Melt/Wash diagram must be **hand-authored inline SVG**, not a placeholder — it's the core of the pitch. Animate it (respecting `prefers-reduced-motion`).
- Icons: inline SVG only. No icon-font CDNs, no external requests except a webfont from Google Fonts if you want one.

---

## 8. THE THREE TEMPLATES

All three: same product, same offer, same belief chain, same nine objections. Radically different execution. Do not reskin one design three times — a reviewer must be able to tell them apart from a thumbnail.

### TEMPLATE 01 — "The Mechanism"
**Reference energy:** long-form direct response; Magic Spoon and Olipop's "here's the science" arc; a Stefan Georgi VSL rendered as a scrolling page.
**Job:** convert cold, skeptical, problem-aware traffic through argument. Copy-heavy. Highest word count of the three.
**Design:** high-contrast, near-editorial-newspaper structure. One accent color. Big type, generous line length limits (65–75ch), heavy use of subheads as a skimmable argument spine. Scroll-driven reveals.

Sections in order:
1. **Hero** — "Mints Mask It. This Erases It." / sub: "The 30-second chew that undoes your last drink." Single CTA, minimal nav.
2. **Problem validation** — three moment cards: mid-meeting after the afternoon coffee, the dinner photo, the pre-date bathroom mirror. Pull directly from VOC quotes.
3. **"Your mint isn't broken. It was never built for this."** — dismantle mints, gum, whitening pens, mouthwash, brushing harder. One failure reason each.
4. **The reframe** — "It's not a freshness problem. It's a chemistry problem." UMP explainer with a simple timeline diagram: sip → 0–5 min → oils/anthocyanins bond to enamel; VSCs generate the smell. `[SOURCE NEEDED]` markers.
5. **The mechanism** — Snap → Melt → Wash. Scroll-linked animated SVG. Each step gets plain-language copy plus a collapsible "the technical version."
6. **The 30-second proof** — 0:00 snap / 0:10 melt / 0:30 wash and swallow. Answers objection #3 head-on.
7. **Two variants** — why Coffee and Wine are separate products (objection #6): different chemistry, different flavor architecture.
8. **Comparison table** — Savour vs. mints vs. gum vs. whitening pens vs. mouthwash vs. brushing, across: works in 30 seconds / needs a sink / removes vs. masks / clashes with your drink / portable / swallowable.
9. **Objection FAQ** — all nine, in accordion.
10. **Safety & ingredients** — honest panel, `[SOURCE NEEDED]` where needed.
11. **The offer** — bundle ladder, subscription option, per-chew math, guarantee, Founders Batch price lock.
12. **Close** — restate the eraser metaphor, final CTA, waitlist capture.

### TEMPLATE 02 — "The Ritual"
**Reference energy:** Ritual and Thorne's ingredient transparency and editorial restraint; Ridge's premium product-object presentation.
**Job:** convert on desire, taste, and credibility rather than argument. Sells the identity: *effortlessly put together.*
**Design:** quiet luxury. Muted palette (bone, ink, one deep drink-toned accent). A serif display face paired with a clean sans. Enormous whitespace. Short lines, confident fragments. Slow, subtle motion. Feels like a magazine spread, not a funnel — but it still walks all six beliefs and answers all nine objections, just in a lower-key register.

Sections in order:
1. **Full-bleed hero** — "What's your poison?" Two quiet entry points: Coffee / Wine.
2. **Manifesto** — one tight paragraph: you're not going to stop drinking what you love; you shouldn't have to pay for it in photos and meetings. *(beliefs 1–2)*
3. **Product study** — the tin as an object. Macro placeholder slots. `Batch 001` stamp. Tasting-notes card per variant (like a wine label: notes, finish, pairing — "pairs with: the third espresso").
4. **"The thirty seconds after"** — short editorial essay establishing that the window right after the last sip is the whole product. *(belief 5)*
5. **How it works** — Snap / Melt / Wash as three quiet illustrated panels with a single line of copy each; a "the chemistry" expandable for readers who want it. *(beliefs 3–4)*
6. **Ingredient transparency table** — Ritual/Thorne style: ingredient, form, what it does, why it's in here, `[SOURCE NEEDED]`. This is the credibility engine of this template. *(objections 1, 5)*
7. **The discovery story** — the founding moment: someone in a client-facing job realizing mid-meeting that their last coffee was working against them, reaching for mint after mint and realizing each one just added a second, competing flavor. The R&D question wasn't "how do we make breath smell better" but "what is coffee actually doing to your mouth chemically, and how do you reverse it in the time you actually have — the walk back to your desk, the gap between courses." Landed on a chew, not a rinse or a strip, because it had to work anywhere, without a sink, in under a minute.
8. **The ritual** — one tin lives wherever the coffee or the wine does: desk, bag, car, kitchen counter.
9. **Questions** — understated FAQ, all nine objections, no accordion drama.
10. **Editions** — pricing presented as restrained cards, subscription framed as "standing order," guarantee stated in one line.
11. **Footer** — newsletter / waitlist, batch language.

### TEMPLATE 03 — "The Poison Picker"
**Reference energy:** AG1, Bloom, LMNT, Gruns — bundle machinery, sticky ATC, flavor pickers, subscription upsell, playful confident voice.
**Job:** maximum conversion mechanics for warm/retargeted traffic. Highest interactivity.
**Design:** bold, saturated, fast. The **entire page re-themes** based on the Coffee/Wine choice — CSS custom properties swap accent colors, hero art, flavor copy, and headline emphasis. Punchy, wry, short sentences.

Sections in order:
1. **Announcement bar** — free shipping threshold pulled from config.
2. **Hero = the picker** — "What's your poison?" Two large choice cards (Coffee / Wine). Selection persists (`localStorage`, wrapped in try/catch) and themes everything below.
3. **Sticky buy bar** — appears on scroll: variant, quantity, live price, CTA. Free-shipping progress bar computed from `pricing.js`.
4. **Trust rail** — swallowable / no rinse / 30 seconds / pocket-sized / guarantee days from config. Honest badges only.
5. **Benefit grid** — icon + one line each. *(belief 1–2)*
6. **"Mints mask. Savour erases."** — the metaphor as a punchy two-column visual. *(belief 3)*
7. **Snap / Melt / Wash** — three animated cards, fast and legible. *(belief 4)*
8. **The 30-second timer** — an actual interactive 30-second visual demo the user can trigger. *(belief 5)*
9. **Social proof rail** — `[TESTIMONIAL SLOT]` components with real layout, clearly marked as pending; plus a "Sound familiar?" block using the honest VOC research quotes.
10. **Bundle ladder** — cards for each `config.pricing.bundles` entry, with auto-computed per-tin price, savings $ and %, and badges from config. Toggle: one-time vs. subscribe-and-save (discount from config).
11. **Per-chew math callout** — "That's $0.67 a chew" style, computed live. Kills objection #7.
12. **Quick comparison strip** vs. gum and mints.
13. **FAQ accordion** — all nine objections.
14. **Guarantee + final CTA**, with a waitlist modal (also offered on exit-intent, once per session, dismissible).

---

## 9. SHARED BEHAVIOR REQUIREMENTS

- **No real checkout.** `config.launch.mode` is `"waitlist"`. Every buy CTA opens the shared waitlist modal: email field, optional "which one?" (Coffee / Wine / Both), Founders Batch price-lock messaging. Validate client-side, show a success state, and `console.log` the payload with a clear `// TODO: wire to ESP` comment. No network requests, no third-party scripts, no analytics/pixels.
- **Responsive**: 360px → 1920px. Test at 360, 768, 1024, 1440. No horizontal body scroll at any width; wide tables scroll inside their own `overflow-x:auto` container.
- **Accessibility**: semantic landmarks, one `<h1>` per page, logical heading order, keyboard-operable accordions/tabs/modals (focus trap, Esc to close, focus restored on close), visible focus rings, `aria-expanded`/`aria-controls` on disclosures, alt text or `aria-hidden` on every SVG, and AA contrast throughout. Honor `prefers-reduced-motion: reduce` for every animation.
- **Performance**: no framework, no jQuery, no CDN JS. Vanilla ES modules. Total page weight under ~500KB. Animate with CSS transforms/opacity; use `IntersectionObserver` for scroll reveals.
- **Browser support**: current Chrome/Safari/Firefox/Edge. Must also work from `file://` — if ES module imports break under `file://`, fall back to a plain global-script build of the shared files and note it in the README.
- **Code quality**: CSS custom properties for the full design token set in each template (`--color-*`, `--space-*`, `--type-*`). Comment each major section with which belief-chain step it serves.

---

## 10. `/content/copy.md`

Write this file first, before any HTML. It is the approved copy bank all three templates draw from: headline bank, subheads, the UMP paragraph, the three mechanism steps in long and short form, the nine objections with their answers, the VOC quote list, the discovery story, the guarantee language, and the Founders Batch language. Note which belief-chain step each block serves. If a template needs a new line, add it here first.

Headline bank to start from (all approved):
- "Mints Mask It. This Erases It." / "The 30-Second Chew That Undoes Your Last Drink."
- "Coffee Breath and Wine Stains Aren't a Freshness Problem." / "They're a Chemistry Problem — Here's What Actually Fixes It."
- "What's your poison?" / "Reset your palate before anyone notices."
- "Built for the 30 Seconds After Your Last Sip."
- "Your Mint Isn't Broken. It Was Never Built for This."

---

## 11. `index.html` (root gallery)

A simple, clean chooser: the Savour name, one line of context, and three cards — one per template — each with its name, its intended traffic and job ("cold DR traffic," "brand/organic and PR," "warm retargeting"), and a link. Include a short note that prices are controlled from `/shared/config.js`.

---

## 12. SELF-QA BEFORE YOU COMMIT

Run through this list and fix everything you find. Report the results honestly in your final message — if something is incomplete, say so plainly rather than claiming it's done.

- [ ] Change `basePricePerTin` and all bundle prices in `config.js` → all three templates show updated prices, per-tin, per-chew, savings $, savings %, and free-shipping progress. Zero HTML edits needed.
- [ ] All six belief-chain steps appear, in order, on all three templates.
- [ ] All nine objections are answered on all three templates.
- [ ] Snap → Melt → Wash appears, in sequence, with the correct mechanism for each step, on all three.
- [ ] Zero fabricated testimonials, names, stars, review counts, press logos, statistics, or clinical claims anywhere.
- [ ] Every unsourced factual claim carries a visible `[SOURCE NEEDED]` marker; every testimonial position carries `[TESTIMONIAL SLOT]`.
- [ ] No message anywhere suggests cutting back on coffee or wine.
- [ ] The three templates are visually distinct — different type systems, palettes, layout logic, and voice registers.
- [ ] Keyboard-only pass: every interactive element reachable and operable; modal traps and restores focus.
- [ ] `prefers-reduced-motion` disables non-essential animation.
- [ ] No horizontal scroll at 360px on any page.
- [ ] Every page opens correctly from `file://`.
- [ ] No external requests except (optionally) Google Fonts.
- [ ] README documents: the price-change workflow, what each template is for, the full list of `[SOURCE NEEDED]` / `[TESTIMONIAL SLOT]` locations, and how to switch `launch.mode` when checkout goes live.

## 13. FINAL REPORT

When done, reply with: the file tree you created, a 2–3 sentence description of each template's positioning, confirmation that the price-config test passed, the list of `[SOURCE NEEDED]` and `[TESTIMONIAL SLOT]` placeholders awaiting real content, and anything you could not complete and why.
