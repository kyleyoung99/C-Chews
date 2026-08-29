# BUILD PROMPT v2 — Savour: Three Landing Page Templates

> **v2 supersedes v1.** v1 produced three pages that were structurally and visually identical — same cream palette, same serif/system-sans pairing, same centered single-column rhythm, same section subjects in the same order. v2 fixes that by locking each template to a **prescribed, non-overlapping design system and copy register**, and by replacing "make them visually distinct" (an adjective a builder always self-grades as passing) with **mechanical, greppable distinctness tests** in §13. Read §8, §9, and §13 before writing any code.

You are building the launch landing pages for **Savour**, a pre-launch DTC functional oral-care brand. Build **three complete landing page templates** for the same product and offer. This prompt is self-contained: every fact, claim, and piece of source language you need is below. Do not invent product facts beyond what is here.

---

## 0. REPO + DELIVERY

- Repository: `kyleyoung99/C-Chews`. Work on branch `claude/awaiting-instructions-k9uxic` (create from the default branch if needed).
- Commit in logical chunks. Push with `git push -u origin claude/awaiting-instructions-k9uxic`. **Do not open a pull request.**
- No build step, no package installs, no bundler. Every page must open correctly by double-clicking the `.html` file (`file://`) and over a static server.

### File structure

```
index.html                      # gallery: links + thumbnails for all 3
DESIGN.md                       # the three design systems, written out (see §8)
/shared/
  config.js                     # SINGLE SOURCE OF TRUTH for pricing + product facts
  pricing.js                    # derives all displayed prices/savings from config.js
  waitlist.js                   # modal LOGIC only — zero styling, zero copy (see §10)
  base.css                      # reset + a11y utilities ONLY — no color, no font, no spacing scale
/templates/
  01-mechanism/index.html       # + style.css, script.js
  02-ritual/index.html          # + style.css, script.js
  03-poison-picker/index.html   # + style.css, script.js
/content/
  copy-01-mechanism.md          # three SEPARATE copy banks — see §9
  copy-02-ritual.md
  copy-03-poison-picker.md
  facts.md                      # the shared, non-negotiable product facts only
README.md                       # how to change prices, what each template is for, placeholder inventory
```

**Only `config.js`, `pricing.js`, `waitlist.js` (logic), and a styling-free `base.css` are shared.** Everything visual and every word of marketing copy is per-template.

---

## 1. NON-NEGOTIABLE: PRICING MUST BE FULLY ADJUSTABLE

Hard-coded prices anywhere in HTML are a build failure. Every price, per-unit price, per-chew cost, savings amount, savings percentage, shipping threshold, and subscription discount renders at runtime from `shared/config.js`.

```js
export const SAVOUR_CONFIG = {
  currency: { code: "USD", symbol: "$", locale: "en-US" },
  product: {
    chewsPerTin: 30,
    variants: [
      { id: "coffee", name: "Savour Post-Coffee", flavor: "Cardamom & Sweet Cream" },
      { id: "wine",   name: "Savour Post-Wine",   flavor: "Dark Cherry & Sage" }
    ]
  },
  pricing: {
    basePricePerTin: 20.00,          // change this one number, the whole site updates
    bundles: [
      { id: "single", tins: 1, price: 20.00, label: "One Tin",       badge: null },
      { id: "duo",    tins: 2, price: 36.00, label: "The Pair",      badge: "Most Popular" },
      { id: "trio",   tins: 3, price: 50.00, label: "The Full Set",  badge: "Best Value" }
    ],
    subscription: { enabled: true, discountPercent: 20, intervalLabel: "every 30 days" },
    freeShippingThreshold: 35.00,
    guaranteeDays: 30
  },
  launch: {
    mode: "waitlist",
    batchLabel: "Batch 001",
    foundersBatchUnits: 500,
    priceLockCopy: "Founders Batch price, locked for life."
  }
};
```

Note: variant accent colors are **not** in config — each template picks its own palette per §8.

`shared/pricing.js` exposes: `perTin`, `savingsVsBase` ($ and %), `perChew`, `subscriptionPrice`, `qualifiesForFreeShipping`, `formatMoney`.

**Self-test:** set `basePricePerTin` to `24.00` and change every bundle price, reload all three, confirm every number updates with zero HTML edits. Document this in the README.

### v1 BUG TO NOT REPEAT

All three v1 pages shipped the literal string `${config.launch.batchLabel}` visible in the rendered waitlist modal — a template literal written into static HTML instead of interpolated. **Before committing, run `grep -rn '\${' templates/ index.html` and confirm zero matches in static markup.** Every dynamic value must be injected at runtime by JS or written as a literal.

---

## 2. THE PRODUCT (facts you may state — put these in `/content/facts.md`)

**Savour** — swallowable single-chew tablets in a pocket tin, taken immediately after coffee or red wine.

- **Savour Post-Coffee** — cardamom & sweet cream
- **Savour Post-Wine** — dark cherry & sage

Flavors *complement* the drink they follow rather than fighting it the way mint does. ~30 seconds. No rinse, no spitting, no sink. Chew and swallow.

**Unique Mechanism of the Problem (UMP).** Coffee oils and wine's anthocyanin pigments chemically bond to enamel within minutes of drinking; volatile sulfur compounds cause the lingering smell. Masking the smell with mint does nothing about the bond forming on the teeth. It is not a freshness problem — it is a chemical residue setting in real time.

**Unique Mechanism of the Solution (UMS) — Snap → Melt → Wash.**
1. **SNAP** — the bite cracks the shell, releasing actives when residue is freshest and most liftable.
2. **MELT** — an endothermic erythritol melt cools the mouth and closes enamel's pores.
3. **WASH** — a malic-acid-driven salivary flood (not foam, not mint) washes oils and pigments off before they bond, then is swallowed.

Works with the user's own saliva as the delivery system, not a synthetic rinse.

**Central metaphor:** *an eraser, not an air freshener.* Mints spray perfume over the problem; Savour lifts the mark itself.

---

## 3. THE CUSTOMER

**"The Polished Professional."** 26–45 (core 28–38). ~65% female / ~35% male. Urban and suburban US metros. $75–$250/month on self-care and grooming. Client-facing, image-conscious roles: sales, marketing, consulting, hospitality, real estate, creators, healthcare-adjacent. They already whiten their teeth and read skincare ingredient lists.

- Driven by **social self-monitoring** — acutely aware of how they're perceived.
- Want an **upgrade and a ritual** (a tin you crack, not a product you use). Design and status matter as much as function.
- **They will not give up coffee or wine.** Any hint of restriction or moderation alienates them. The promise is: *keep the habit, erase the consequence.*
- Respond to **engineered self-care** — ingredient transparency and mechanism explanations.

**Awareness:** Problem-Aware bordering Solution-Aware. They know the problem intimately and have never heard of this solution. Validate the problem fast; introduce the mechanism as the missing piece.
**Sophistication:** Stage 3→4. "Freshens breath" and "whitens teeth" are dead claims. Win on mechanism; position against the whole mint/gum/mouthwash/whitening-pen category.
**Consciousness:** Low-Mid. Lead with the low-consciousness pain (embarrassment, being caught) and layer in the mid-consciousness reward (a considered ritual, feeling discerning).

### Voice-of-customer research quotes

Real research quotes. Use as copy seeds and clearly-labeled "sound familiar" blocks. **Never** as product testimonials with invented names, photos, or star ratings. §9 assigns different quotes to different templates — do not use the same quote on two pages.

1. "I'll go straight from my afternoon coffee into a client call and just pray nobody's close enough to smell it."
2. "I've gotten photos back from dinner where I'm just not smiling with teeth anymore because of the wine."
3. "I keep gum in every bag, every car, every desk drawer — and it still doesn't really fix it."
4. "Mints just mask it for a few minutes and then it's back."
5. "Mint gum after red wine tastes disgusting — it's like the two flavors are fighting each other."
6. "I shouldn't have to choose between my coffee and feeling confident for the rest of the day."
7. "I notice other people's coffee breath immediately, so I assume everyone notices mine."
8. "I caught myself covering my mouth when I laughed at dinner because I knew the wine had gotten to my teeth."
9. "I've legitimately skipped ordering a second glass of wine before a work event because I didn't want to deal with it."
10. "I was so annoyed scrubbing my teeth in a restaurant bathroom mirror before a date."
11. "If something actually worked in the moment, I'd keep it on me at all times — car, purse, desk, everywhere."
12. "I'd pay more for something that actually solved this than for another tin of mints that does nothing."
13. "The second I saw 'swallow it, no rinse needed' I was in — that's the whole reason mouthwash never worked for me on the go."
14. "I like that it feels like a little ritual instead of just 'fixing a problem' — it makes me feel more put together, not just less embarrassed."

---

## 4. THE BELIEF CHAIN — coverage is required, ORDER IS NOT

Every template must install all six beliefs. **v1's mistake was mandating one order for all three, which is a large part of why they read the same.** Each template gets its own sequence, specified in §8. Cover all six; follow your template's assigned order.

1. **"This happens to me more than I realize, and other people notice."**
2. **"Mints, gum, brushing harder — none of it fixes anything, it just covers it for a few minutes."**
3. **"It's a specific chemical reaction, not a lack of freshness — which is why nothing I've tried works."**
4. **"Savour was built to interrupt that reaction, not smell nice on top of it."**
5. **"It works fast enough to matter in the real moment — not 20 minutes later."**
6. **"It's safe enough and premium enough to keep doing — not a gimmick I try once."**

## 5. OBJECTIONS — all nine answered on every template, in that template's own voice

1. "Is it actually safe to swallow every day?"
2. "Isn't this just an expensive mint?"
3. "Will it work fast enough to matter mid-meeting or mid-date?"
4. "Won't the flavor clash the way mint does?"
5. "Is this backed by anything?"
6. "Why two products instead of one?"
7. "$20 feels expensive — why not just buy gum?" *(answer with live per-chew math)*
8. "New brand, new category — will it ship and does it work?"
9. "Do I have to change my coffee/wine habits?" *(no — that's the point)*

**Do not** use the same FAQ wording on two templates. §9 assigns each template a different answer register.

---

## 6. CLAIM DISCIPLINE

Pre-launch brand, no shipped product, no clinical trials. Honesty here is a hard requirement.

**Never generate:** fake testimonials, invented names, headshots, star ratings, review counts; "as seen in" press logos; invented statistics or "clinically proven"; fake live countdowns or "12 people viewing"; medical claims (does not cure, treat, permanently whiten, or replace brushing).

**Instead:** render a visible `[SOURCE NEEDED — dental/chemistry citation]` wherever a citation belongs; render `[TESTIMONIAL SLOT — real customer quote pending launch]` with correct layout wherever a testimonial belongs; drive scarcity only from `config.launch.foundersBatchUnits`, phrased as a stated batch size. Say plainly what erythritol and malic acid are. List every placeholder in the README.

## 7. IMAGERY

No photography exists. No external images, no competitor assets.

- Build CSS/SVG placeholder art. Every real-photo position gets a labeled placeholder with an art-direction HTML comment.
- The Snap/Melt/Wash diagram is **hand-authored inline SVG**, and must be **drawn differently in each template** (see §8) — not one SVG reused three times.
- Icons: inline SVG only.

---

## 8. THE THREE DESIGN SYSTEMS — LOCKED, NON-OVERLAPPING

These are specifications, not moods. Implement the exact values. Do not substitute your own palette, and **do not fall back to the warm cream / off-white background with near-black text and a serif display face** — that is the default all three v1 pages collapsed into. Exactly one template (01) is light-neutral, one (02) is dark, one (03) is white-plus-saturated-blocks.

Write `DESIGN.md` documenting all three token sets before you write any CSS.

### TEMPLATE 01 — "THE LAB REPORT"
*Reference DNA: Thorne's clinical restraint and data-forward credibility; the science section of Magic Spoon / Olipop; a technical whitepaper. Directionally: white, cool grays, navy/blue, monospace data labels, zero ornament.*

| Token | Value |
|---|---|
| `--bg` | `#FFFFFF` |
| `--bg-alt` | `#F1F4F8` (cool gray — **not** cream) |
| `--ink` | `#0B0F14` |
| `--muted` | `#5A6672` |
| `--rule` | `#D3DAE3` |
| `--accent` | `#0B5CFF` |
| `--signal` | `#FF4A1C` (used ONLY to mark where masking fails) |
| `--font-display` | `Archivo`, 700/800, tracking `-0.02em`, sentence case |
| `--font-body` | `Inter`, 400/500, 17px, measure 68ch |
| `--font-mono` | `IBM Plex Mono`, 500, uppercase, tracking `0.08em` |

- **Radius: `0` everywhere. Shadows: none — zero `box-shadow` declarations in the file.** Separation comes from 1px rules only.
- **Layout:** 12-column grid, 1240px max. A persistent left rail (200px, sticky ≥1024px) holding a numbered section index `01`–`14`. Body copy in a single 68ch column, **left-aligned — no centered body text anywhere.**
- **Figures:** every diagram sits in a 1px-bordered box with a mono caption `FIG. 03 — HOW A PIGMENT BONDS`.
- **Buttons:** square, solid `--ink`, white mono uppercase label.
- **Motion:** fade-in on figures + the mechanism SVG sequence. Nothing else.
- **Mechanism SVG style:** technical cross-section diagram — enamel surface in section, labeled leader lines, mono callouts, blueprint feel.
- **Hero:** no imagery. Mono kicker, left-aligned headline, subhead, one CTA, and a mono data strip (`30 SECONDS · NO RINSE · 2 FORMULAS`).
- **Density:** highest word count. **12–14 sections.**
- **Belief order:** 1 → 2 → 3 → 4 → 5 → 6 (linear argument; this is the one template that runs the chain in order).

### TEMPLATE 02 — "THE DARK EDITORIAL"
*Reference DNA: Ridge's dark, premium, product-as-object presentation; Ritual's ingredient transparency; high-end apothecary and fashion editorial. Directionally: near-black ground, bone type, brass hairlines, enormous negative space.*

| Token | Value |
|---|---|
| `--bg` | `#14100F` |
| `--panel` | `#1E1917` |
| `--ink` | `#EFE7DA` |
| `--muted` | `#A2968A` |
| `--brass` | `#C9A227` |
| `--hairline` | `rgba(201,162,39,0.35)` |
| `--font-display` | `Playfair Display`, 400/500 |
| `--font-body` | `Jost`, 300/400, 16px, measure 46ch |

- **Radius: 0 on plates, 2px on cards. No shadows** — depth comes from panel value shifts and hairlines.
- **Layout:** asymmetric editorial. Alternating full-bleed plates; text blocks offset left or right, **never a centered single column running the length of the page.** Section padding 160px desktop / 88px mobile.
- **Buttons:** 1px brass outline, transparent fill, uppercase, tracking `0.18em`; fills brass on hover.
- **Motion:** slow only — 600–800ms opacity + 12px translate reveals.
- **Mechanism SVG style:** three minimal line-art vignettes, brass strokes on dark, almost iconographic — no labels, no callouts, no arrows.
- **Hero:** full-bleed dark plate. Small centered wordmark, one large Playfair line, and two quiet underlined text links (Coffee / Wine). **No button in the hero.**
- **Density:** lowest word count — roughly a third of Template 01. **9–10 sections.**
- **Belief order:** 6 → 1 → 3 → 4 → 2 → 5 (opens on identity and ritual, ends on proof).

### TEMPLATE 03 — "THE STOREFRONT"
*Reference DNA: AG1, Bloom, LMNT, Gruns, Vital Proteins — split hero choice, sticky add-to-cart, bundle cards with savings badges, icon benefit rows, review rails, subscribe-and-save toggle. Directionally: white base, big saturated color blocks, chunky rounded UI, high-energy type.*

| Token | Value |
|---|---|
| `--bg` | `#FFFFFF` |
| `--ink` | `#141210` |
| `--coffee` | `#4B2E1E` |
| `--wine` | `#6B1030` |
| `--brand` | swaps to `--coffee` or `--wine` on selection |
| `--pop` | `#C8FF3D` (badges, savings, sticky-bar highlight) |
| `--cta` | `#0E0E0E` fill, white label |
| `--font-display` | `Bricolage Grotesque` 800 (fallback `Poppins` 800), tracking `-0.03em` |
| `--font-body` | `Poppins`, 400/500, 16px |

- **Radius: 999px on buttons and pills, 20px on cards. Shadows required** — at least 8 `box-shadow` declarations (soft `0 12px 32px rgba(0,0,0,.10)` lifts).
- **Layout:** full-bleed saturated color blocks (at least three), card grids, one horizontal-scroll rail, sticky announcement bar at top and sticky buy bar at bottom.
- **Motion:** snappy 150–250ms hover lifts, a count-up on the savings figure, an interactive 30-second demo the user triggers.
- **Mechanism SVG style:** three bold flat-color cards with oversized numerals and a single icon each — poster-like, not diagrammatic.
- **Hero:** 50/50 edge-to-edge split — coffee panel left, wine panel right — each with huge display type. Choosing one themes the entire page via `--brand` and persists in `localStorage` (wrapped in try/catch).
- **Density:** shortest copy blocks, most components. **14–16 sections.**
- **Belief order:** 1 → 4 → 5 → 2 → 3 → 6 (choice and payoff first, chemistry later, offer throughout).

---

## 9. COPY DIFFERENTIATION — THREE BANKS, NO SHARED SENTENCES

v1 gave all three templates one copy bank and one headline list, so all three said the same things in the same order. **Write three separate copy files.** Same facts from `/content/facts.md`; every marketing sentence rewritten per template.

**Hard rule: no `<h1>` or `<h2>` string may appear on more than one template.** Neither may any body sentence longer than eight words. §13 tests this mechanically.

| | 01 Lab Report | 02 Dark Editorial | 03 Storefront |
|---|---|---|---|
| **Register** | Technical, declarative, evidence-first. Numbered claims. Reads like an engineer explaining a finding. | Sparse, sensory, confident fragments. Second person, present tense. Reads like a fashion house's product note. | Fast, wry, direct. Short sentences, contractions, imperatives. Reads like a friend selling you something good. |
| **Hero headline** | "Coffee Breath Is a Bonding Reaction. Not a Freshness Problem." | "What's your poison?" | "Erase Your Last Sip." |
| **Section titles** | Mono, numbered, factual — `03 / WHAT THE MINT NEVER TOUCHED` | Two-to-four words, evocative — `The Object`, `Thirty Seconds`, `What's Inside` | Punchy, second person — `Pick Your Poison`, `Build Your Batch`, `Still Not Sure?` |
| **Mechanism framing** | "Three reactions, in sequence" — chemistry named explicitly | "Snap. Melt. Wash." as three whispered lines | "Bite it. Feel it. Swallow it." |
| **Objection answers** | Full paragraphs with reasoning | One or two sentences, no hedging | One line, conversational, occasionally funny |
| **VOC quotes to use** | 4, 5, 7, 12 | 6, 8, 14 | 1, 2, 3, 9, 10, 11, 13 |
| **CTA label** | `REQUEST BATCH 001` | `Reserve a tin` | `Get My Tin →` |
| **Metaphor use** | Stated once, analytically | Implied, never stated outright | Stated loudly, twice |

Additional distinct headline material — do not cross-pollinate:

- **01 only:** "Your Mint Isn't Broken. It Was Never Built for This." / "What Actually Happens in the Four Minutes After You Swallow." / "Masking and Removing Are Not the Same Operation."
- **02 only:** "Reset your palate." / "The thirty seconds nobody designed for." / "A tin, wherever the wine is."
- **03 only:** "Keep the Habit. Erase the Consequence." / "Mints Mask. Savour Erases." / "That's 53¢ a Chew." *(computed live)*

---

## 10. SHARED BEHAVIOR

- **`shared/waitlist.js` contains logic only** — open/close, focus trap, validation, success state. Each template supplies its own modal markup, heading text, and CSS. In v1 all three shipped an identical modal with an identical heading; that must not recur.
- **No real checkout.** `config.launch.mode` is `"waitlist"`; buy CTAs open that template's modal. Validate client-side, show a success state, `console.log` the payload with `// TODO: wire to ESP`. No network requests, no analytics, no pixels.
- **Responsive** 360–1920px. Test 360, 768, 1024, 1440. No horizontal body scroll; wide tables scroll in their own `overflow-x:auto` container.
- **Accessibility:** semantic landmarks, one `<h1>`, logical heading order, keyboard-operable accordions/tabs/modals with focus trap and Esc, visible focus rings (each template styles its own to match its palette), `aria-expanded`/`aria-controls`, alt text or `aria-hidden` on SVGs, AA contrast — **check 02 carefully, bone-on-near-black needs verifying**. Honor `prefers-reduced-motion`.
- **Performance:** vanilla ES modules, no frameworks, no CDN JS. Under ~500KB per page. Google Fonts is the only permitted external request.
- **`file://` support:** if ES module imports break under `file://`, ship a global-script fallback and note it in the README.

## 11. `/content/` and `index.html`

Write the three copy banks and `facts.md` **before** any HTML. The gallery `index.html` shows the three side by side with each one's name, its design system in a line, and its intended traffic (01: cold DR; 02: brand/organic/PR; 03: warm retargeting).

---

## 12. BUILD ORDER

1. `content/facts.md`, then the three copy banks — **written in three different voices before any markup exists.**
2. `DESIGN.md` — all three token sets written out.
3. `shared/` — config, pricing, waitlist logic, base reset.
4. Template 01 complete. Then 02. Then 03.
5. Run every check in §13, fix what fails, then `index.html`, `README.md`, commit, push.

Building them in parallel or copying one into the next is what produced v1's convergence. Finish each one before starting the next, and do not open the previous template's CSS while writing the next.

## 13. DISTINCTNESS TESTS — MECHANICAL, NOT SELF-GRADED

Run every one of these and paste the results into your final report. If a check fails, fix the template — do not rationalize the failure.

```bash
# 1. No hex color may appear in two templates (except #fff/#000/#ffffff/#000000)
grep -ohE '#[0-9a-fA-F]{3,8}' templates/*/style.css | sort | uniq -c | sort -rn

# 2. Font stacks must be disjoint
grep -h -- '--font-' templates/*/style.css

# 3. No H1/H2 text may repeat across templates
grep -ohE '<h[12][^>]*>[^<]+' templates/*/index.html | sed 's/<[^>]*>//g' | sort | uniq -d

# 4. Shadow budget: 01 must be 0, 03 must be >= 8
grep -c 'box-shadow' templates/01-mechanism/style.css templates/03-poison-picker/style.css

# 5. Radius budget: 01 must have no non-zero radius; 03 must have >= 10 at >= 16px/999px
grep -c 'border-radius' templates/01-mechanism/style.css templates/03-poison-picker/style.css

# 6. Section counts must differ: 01 = 12-14, 02 = 9-10, 03 = 14-16
grep -c '<section' templates/*/index.html

# 7. No un-interpolated template literals in static markup
grep -rn '\${' templates/ index.html

# 8. Body backgrounds must differ (01 white, 02 near-black, 03 white + >=3 saturated blocks)
grep -A3 -E '^\s*body\s*\{' templates/*/style.css | grep -i background
```

Then, by eye: **open all three at 25% browser zoom side by side.** If you cannot tell which is which from silhouette, background value, and type weight alone, the build has failed and you should redo the offending template's design system from §8.

Also confirm manually:
- [ ] Changing `basePricePerTin` updates every number on all three pages, zero HTML edits.
- [ ] All six beliefs present on each template, **in that template's assigned order** — not one shared order.
- [ ] All nine objections answered on each template, in three different registers.
- [ ] Each template's Snap/Melt/Wash SVG is drawn differently.
- [ ] Each template has its own modal markup, heading, and skin.
- [ ] Zero fabricated testimonials, names, stars, review counts, press logos, statistics, or clinical claims.
- [ ] Every unsourced claim carries `[SOURCE NEEDED]`; every testimonial position carries `[TESTIMONIAL SLOT]`.
- [ ] Nothing anywhere suggests drinking less coffee or wine.
- [ ] Keyboard-only pass on all three; `prefers-reduced-motion` respected; no horizontal scroll at 360px.
- [ ] All three open from `file://`.

## 14. FINAL REPORT

Reply with: the file tree; a two-sentence positioning line per template; the raw output of all eight shell checks above; confirmation of the price-config test; the placeholder inventory; and anything you could not complete and why. Report failures honestly — a check that fails and is disclosed is far more useful than one quietly declared passing.
