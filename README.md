# BUILD PROMPT v3 — Savour: Three Landing Pages Modeled on AG1, Bloom, and Gruns

> **v3 replaces v1 and v2 entirely.** Earlier versions asked for three invented design directions and got three near-identical pages. v3 removes the invention: each template is a close structural and visual reproduction of a specific, proven DTC landing page, rebuilt with Savour's product and copy. **Do not reinterpret these references creatively.** Their layouts convert because of specific, repeated mechanics; your job is to carry those mechanics over faithfully and swap in Savour's content — not to design something new "inspired by" them.

| Template | Modeled on | The thing that makes it work |
|---|---|---|
| `01-ag1` | **AG1 / Athletic Greens** — drinkag1.com | Subscription-first, single-product premium credibility |
| `02-bloom` | **Bloom Nutrition** — bloomnu.com | Flavor merchandising and social-proof density |
| `03-gruns` | **Gruns** — gruns.co | Format-vs-incumbent comparison, playful and loud |

---

## 0. SOURCING — READ FIRST

The specs in §7–§9 are **not guesses**. Palettes, type families, radii, section counts and real heading order were extracted from saved copies of all three live pages, and hero compositions, nav patterns and component geometry were read off screenshots of all three. `REFERENCE-TOKENS.md` in this repo records what was sampled, what was estimated from an image, and what is still unknown.

Values marked *(sampled)* came from the pages' own CSS. Values written as `≈#XXXXXX` were estimated from a screenshot and are close but not exact. Where a table gives both a reference value and a Savour value, the reference value tells you what the target looks like; the Savour value is what you build.

**If you have network access, open the three URLs and correct anything that has changed since**, recording the correction in `REFERENCE-NOTES.md`. The pages run promotions, so offers, banner artwork and some headings will differ from what is described here — structure, palette, type and component geometry are the stable parts. If the domains are blocked for you, say so in your final report and build from these specs; do not present unverified values as sampled.

**Still unknown, and worth confirming if you can:** exact section padding in px, the full type scale, and the precise brand-green values behind AG1's `go-green` token. None of these block the build.

**Fidelity and its limits.** Reproduce **layout, structure, component patterns, proportions and mechanics**. Do not copy their logos, wordmarks, photography, illustrations or body copy, and do not imply any association between Savour and these brands. You are rebuilding a page pattern, not cloning a website.

---

## 1. REPO + DELIVERY

- Repository: `kyleyoung99/C-Chews`. Work on branch `claude/awaiting-instructions-k9uxic` (create it from the default branch if it does not exist).
- Commit in logical chunks. Push with `git push -u origin claude/awaiting-instructions-k9uxic`. **Do not open a pull request.**
- No build step, no package installs, no bundler. Every page opens by double-clicking the `.html` file (`file://`) and over a static server.

```
index.html                     # gallery linking all three
REFERENCE-NOTES.md             # what you observed on the three sites (§0)
DESIGN.md                      # the three token sets, written before any CSS
/shared/
  config.js                    # single source of truth for pricing + product facts
  pricing.js                   # every displayed number derives from config.js
  waitlist.js                  # modal LOGIC only — no styling, no copy
  base.css                     # reset + a11y utilities ONLY: no color, no font, no spacing scale
/templates/
  01-ag1/index.html            # + style.css, script.js
  02-bloom/index.html          # + style.css, script.js
  03-gruns/index.html          # + style.css, script.js
/content/
  facts.md                     # shared product truths — the only shared content
  copy-01-ag1.md               # three separate copy banks, three different voices
  copy-02-bloom.md
  copy-03-gruns.md
README.md                      # price-change workflow, what each template is, placeholder inventory
```

Only `config.js`, `pricing.js`, `waitlist.js`, and a styling-free `base.css` are shared. Everything visual, and every marketing sentence, is per-template.

## 2. PRICING IS FULLY ADJUSTABLE — NON-NEGOTIABLE

Hard-coded prices in HTML are a build failure. Every price, per-unit price, per-chew cost, savings amount, savings percentage, shipping threshold and subscription discount renders at runtime from `shared/config.js`.

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
    basePricePerTin: 20.00,        // change this one number, the whole site updates
    bundles: [
      { id: "single", tins: 1, price: 20.00, label: "One Tin",      badge: null },
      { id: "duo",    tins: 2, price: 36.00, label: "The Pair",     badge: "Most Popular" },
      { id: "trio",   tins: 3, price: 50.00, label: "The Full Set", badge: "Best Value" }
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

`shared/pricing.js` exposes `perTin`, `savingsVsBase` ($ and %), `perChew`, `subscriptionPrice`, `qualifiesForFreeShipping`, `formatMoney`. Variant accent colors are deliberately **not** in config — each template takes its palette from its reference brand.

**Self-test:** set `basePricePerTin` to `24.00`, change every bundle price, reload all three, confirm every number updates with zero HTML edits. Document the workflow in the README.

**Guard:** because those examples are JS-shaped, it is easy to paste one into markup and ship a visible `${config.launch.batchLabel}`. Before committing, strip `<script>` blocks and grep the remaining markup for `${` — a match inside a script's template literal is correct and interpolates at runtime; a match in static HTML renders as literal text.

## 3. PRODUCT FACTS (`/content/facts.md` — shared, identical across all three)

**Savour** — swallowable single-chew tablets in a pocket tin, taken immediately after coffee or red wine.

- **Savour Post-Coffee** — cardamom & sweet cream
- **Savour Post-Wine** — dark cherry & sage

Flavors complement the drink they follow rather than fighting it the way mint does. ~30 seconds. No rinse, no spitting, no sink. Chew and swallow.

**The problem mechanism.** Coffee oils and wine's anthocyanin pigments chemically bond to enamel within minutes of drinking; volatile sulfur compounds cause the lingering smell. Masking the smell with mint does nothing about the bond forming on the teeth. It is not a freshness problem — it is a chemical residue setting in real time.

**The solution mechanism — Snap → Melt → Wash.**
1. **SNAP** — the bite cracks the shell, releasing actives while residue is freshest and most liftable.
2. **MELT** — an endothermic erythritol melt cools the mouth and closes enamel's pores.
3. **WASH** — a malic-acid-driven salivary flood (not foam, not mint) washes oils and pigments off before they bond, then is swallowed.

Works with the user's own saliva as the delivery system, not a synthetic rinse.

**Central metaphor:** an eraser, not an air freshener.

## 4. THE CUSTOMER

**"The Polished Professional."** 26–45 (core 28–38), ~65% female / ~35% male, urban and suburban US metros, $75–$250/month on self-care and grooming. Client-facing, image-conscious roles. They already whiten their teeth and read skincare ingredient lists.

- Driven by social self-monitoring — acutely aware of how they're perceived.
- Want an upgrade and a ritual, not a remedy. Design and status matter as much as function.
- **They will not give up coffee or wine.** Any hint of restriction alienates them. The promise is: keep the habit, erase the consequence.
- Respond to ingredient transparency and mechanism explanations.

**Awareness:** problem-aware bordering solution-aware — they know the problem intimately and have never heard of this solution. **Sophistication:** stage 3→4; "freshens breath" and "whitens teeth" are dead claims. **Consciousness:** low-mid; lead with the embarrassment, layer in the discerning ritual.

### Voice-of-customer research quotes

Real research quotes. Use as copy seeds and clearly-labeled "sound familiar" blocks — never as product testimonials with invented names, photos, or star ratings. §7–§9 assign different quotes to different templates; do not reuse one across two pages.

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

## 5. OBJECTIONS — all nine answered on every template, in that template's own voice

1. "Is it actually safe to swallow every day?"
2. "Isn't this just an expensive mint?"
3. "Will it work fast enough to matter mid-meeting or mid-date?"
4. "Won't the flavor clash the way mint does?"
5. "Is this backed by anything?"
6. "Why two products instead of one?"
7. "$20 feels expensive — why not just buy gum?" *(answer with live per-chew math)*
8. "New brand, new category — will it ship and does it work?"
9. "Do I have to change my coffee or wine habits?" *(no — that's the point)*

Do not reuse FAQ wording across templates. Each reference brand answers questions in a different register; match it.

## 6. PROOF, CLAIMS AND DEMO DATA — the page ships complete

**Posture: build this as a live storefront, not a wireframe.** Every section is fully written and fully populated. No `[SLOT]` brackets in visible copy, no empty review rails, no collapsed sections. Someone opening this page should see a finished, shippable store — because that is what a stakeholder review, a screenshot, an investor deck, and a design sign-off all need.

The proof components are therefore **built and populated with seeded demo data**, exactly the way a staging environment works.

### 6.1 The demo-proof flag

Add to `shared/config.js`:

```js
launch: {
  mode: "live",              // "waitlist" | "presale" | "live" — page reads as a live store
  showDemoProof: true,       // true = seeded reviews/ratings render; false = they disappear
  batchLabel: "Batch 001",
  foundersBatchUnits: 500,
  priceLockCopy: "Founders Batch price, locked for life."
}
```

Everything sourced from `content/demo-proof.js` renders only when `showDemoProof` is true, and every such element carries `data-demo="true"` in the DOM. That gives three things at once: the page looks live today, one boolean strips it for the real launch, and `document.querySelectorAll('[data-demo]')` is a complete audit of what still needs real data.

**In `content/demo-proof.js`, put this at the top of the file, verbatim:**

```js
/**
 * SAMPLE DATA — NOT REAL CUSTOMER REVIEWS.
 * Written to populate the UI for design review and stakeholder demos.
 * Savour has not shipped; no one in this file is a real customer.
 * Replace with verified reviews before any public launch, or set
 * config.launch.showDemoProof = false to remove them from the page.
 */
```

That comment is the one thing that must not be edited out. It is what keeps a demo build from silently becoming a live one — and it costs nothing, because visitors never see source comments.

**The one thing to keep honest even in demo mode:** the aggregate figures. Use `4.8 ★ · 214 reviews` — a believable founding-batch number, not "12,000+ reviews" or "1,000,000 members." A demo that overstates by two orders of magnitude trains everyone who sees it to expect a page you can't legally ship, and it is the number most likely to survive into production by accident. Small and plausible now; real and larger later.

### 6.2 What I will not write, and what to do instead

Two things do not get invented even in demo data, because they are the two that create real exposure the day the page goes public:

- **Press logos.** Using a real publication's mark without coverage is a trademark and advertising problem, and no flag fixes it. Grüns runs a black wordmark strip under the hero; Savour's version of that band is **"Made and tested"** — the manufacturing standard, the ingredient sourcing, the testing lab — in the same visual slot with the same weight. It does the same trust work and it will be true.
- **Numeric efficacy claims.** No "removes 90% of stains," no "3× faster than mints," no invented clinical figures. §6.4 gives you assertive, specific copy that doesn't need a number — and §6.5 tells you how to *have* real numbers within a few weeks if you want them.

The 14 voice-of-customer quotes in §4 are **real research**, and they can ship as-is, attributed as customer research. They are the strongest honest proof available today, so use them prominently — the "Sound familiar?" blocks are not a consolation prize.

### 6.3 Seeded review copy — write these into `demo-proof.js`

Realistic, specific, in-voice. First name plus last initial, a variant, a date within the last 60 days, and a `verified: false` field. Distribute across templates as marked; do not repeat one review on two pages.

**Post-Coffee — for template 01:**
1. ★★★★★ *"I do three back-to-back client calls after lunch and I used to just angle away from the camera. Genuinely have not thought about it in two weeks."* — Dana R.
2. ★★★★★ *"The cardamom thing sounds weird and then it makes total sense. It finishes the coffee instead of arguing with it."* — Marcus T.
3. ★★★★☆ *"Works. My only note is I wish the tin were slightly slimmer for a jacket pocket."* — Priya N.
4. ★★★★★ *"I keep one in my car console. Thirty seconds at a red light and I walk into the showing fine."* — Alexis W.

**Post-Wine — for template 02:**
5. ★★★★★ *"Wedding season was the test. Four events, zero purple-smile photos. That's the whole review."* — Jordan M.
6. ★★★★★ *"I've stopped doing the thing where I check my teeth in my phone camera between courses."* — Bea C.
7. ★★★★★ *"Dark cherry and sage sounds fussy. It tastes like the end of the glass, which is exactly right."* — Nina H.
8. ★★★★☆ *"Took me a couple of tries to stop rinsing out of habit. You really do just swallow it."* — Tom A.

**Mixed — for template 03:**
9. ★★★★★ *"Bought it as a gimmick. It is not a gimmick."* — Ryan K.
10. ★★★★★ *"I have gum in every bag I own and it never actually fixed anything. This does something different and you can feel it."* — Carmen D.
11. ★★★★★ *"The cooling part is the tell. You can feel it working, which no mint has ever done for me."* — Sam O.
12. ★★★★☆ *"Wish the pair came in a bundle with a refill. Otherwise no notes."* — Elise F.

Card layout: stars, quote, first name and last initial, variant purchased, date. **Omit the "Verified Buyer" badge entirely while `showDemoProof` is on** — that badge is a specific factual assertion, and the review component should read it from `verified`, which is `false` for every entry here.

### 6.4 Claim tiers — how to write assertively without fabricating

Most weak launch copy hedges everything, which reads evasive. The fix is to know which claims need no hedge at all.

| Tier | What it is | How to write it | Example |
|---|---|---|---|
| **1 — Design facts** | What the product *is*. Verifiable by looking at it. | **State flatly. No hedging.** | "One chew. Thirty seconds. No rinse, no sink, no spitting." · "Two formulas, one for coffee and one for red wine." · "Swallowable — nothing to spit out." |
| **2 — Mechanism** | What the ingredients do, by chemistry | **State actively**, describing the mechanism rather than promising a result | "Malic acid triggers salivary flow." · "Erythritol melts endothermically — that's the cooling you feel." · "It works with your own saliva instead of a synthetic rinse." |
| **3 — Outcomes** | What the user ends up experiencing | **Frame as designed intent or as experience**, not as a measured result | "Built for the thirty seconds after your last sip." · "Designed to lift what coffee and wine leave behind, before it sets." Never: "removes 90% of staining." |
| **4 — Comparative** | Versus mints, gum, mouthwash | **Compare on mechanism and format, which are factual**, not on performance percentages | "A mint adds a flavor on top. This one is built to lift the residue itself." · Comparison-table rows: *needs a sink · clashes with what you just drank · cost per use* |

The comparison table in template 03 is the highest-risk element on any of the three pages, because every row is an implicit claim about a competitor. **Keep every row to format and mechanism** — needs a sink, must be spat out, adds a competing flavor, works in seconds vs. weeks — all of which are true by observation and none of which require a study.

Write `CLAIMS.md` alongside the copy files: every claim that appears on any page, its tier, the exact wording used, and what would substantiate it. That file is what a lawyer reads in twenty minutes instead of crawling three pages.

### 6.5 Real proof that is obtainable before launch

If the goal is a page that is *both* complete and true on day one, these are cheap and fast, and each one converts a demo element into a real one:

- **A tasting panel.** 20–30 people, both variants, a five-question form. Yields real quotes, a real preference split, and a real rating — in about a week. This single step replaces the entire seeded review set.
- **Before/after photographs.** Standardized lighting, a red-wine swatch, shot at 0 and 60 seconds. Yields the visual proof the mechanism sections are currently describing in words.
- **A certificate of analysis** from the contract manufacturer. Turns `[THIRD-PARTY TESTING]` into a real badge with a real lab name.
- **One dentist or dental hygienist review** of the mechanism copy. Cheap, fast, and it lets you say the copy was reviewed by a dental professional — which is a real, checkable claim.
- **Founding-customer count.** If the waitlist is live, "1,400 people on the list" is a true number you can print today.

Ship with demo data now; swap these in as they land. The components never change — only the source of their data does.
## 6b. THE DIFFERENTIATION MATRIX

Copy this into `DESIGN.md` and confirm it as you build. Every column differs from every other column in every row that matters.

| | **01 — AG1** | **02 — Bloom** | **03 — Grüns** |
|---|---|---|---|
| Page ground | White + photography | White | **Cream `#FBF3E2`** |
| Dominant color | Espresso `#1E1712` | Deep wine `#6B1030` | Deep wine + bright `#C81D4A` |
| Signal accent | Amber `#F2B705`, **black label** | Pastel-per-SKU | Yellow `#FFD84D` circles |
| Display face | **Light serif** (`Instrument Serif`) | **Heavy serif** (`Prata`) | **Heavy rounded sans** (`Fredoka`) |
| Body face | `Inter` | `Poppins` | `DM Sans` |
| Third face | **Mono** (`IBM Plex Mono`) | — | — |
| Nav pattern | White bar, 3 links, underlined Sign In | White bar, left links, **centered wordmark** | **Floating pills**, no bar |
| Hero | Full-bleed photo, text overlaid left, angled stickers | Gradient banner carousel, oversized 3D serif | Left text / right rounded photo, stat circles |
| Card radius | 14px | 8–24px | 20–28px |
| Shadow budget | ≤4 soft | 0–4 soft | ≤3 **hard-offset only** |
| Section count | 17 | 15 | 17 |
| Word count | Highest | Medium | Lowest (~900–1,400) |
| Recurring component | Spec table + mono label | Product card with swatches | Comparison column + marquee |
| Voice | Calm, declarative | Warm, upbeat | Funny, exasperated |
| CTA | Amber pill, black label, `→` | Wine pill, inner border | Bright pill, white bold, offer stated |

**Two rows genuinely coincide and should not be forced apart:** all three references use fully-rounded pill CTAs, and two of three use a white page ground. Departing from that would mean departing from the references, which is the opposite of this build's purpose. Distinctness here comes from **type personality (light serif / heavy serif / rounded sans), nav pattern, hero composition, shadow style and density** — which is why §13's verification leans on the squint test rather than requiring different background values.
## 7. TEMPLATE 01 — `01-ag1`, modeled on **AG1** (drinkag1.com)

**What this page is for:** cold, skeptical, higher-intent traffic. Premium editorial surface, subscription offer, credibility carried by restraint.

**The transferable argument.** AG1's pitch is consolidation, not superiority: *you currently make six confusing purchases and this replaces them.* Savour has that argument and has never used it — mints in every bag, gum in the car, a whitening pen in the drawer, mouthwash you can't use without a sink. **One chew replaces the drawer.** Build on that.

### Tokens — sampled from the live page, mapped to Savour

| Role | AG1 (sampled) | Savour |
|---|---|---|
| Page ground | `#FFFFFF` | `#FFFFFF` |
| Dark ground / product field | `#071a24` deep navy-teal | `#1E1712` espresso |
| **Signal accent** | **bright lime ≈`#8BE01F`** | **amber `#F2B705`** |
| Accent label color | **black**, never white | **black** |
| Ink | `#0B0B0B` | `#0B0B0B` |
| Muted | `#5A6560` | `#645B50` |
| Rule | `#E5E5E2` | `#E5E3DE` |

**The accent is the whole trick.** A near-neon high-chroma color, used sparingly, always carrying **black** text — on the announcement bar, on the CTA pill, on angled sticker graphics. Everything else on the page is black, white, or photography. Do not tint body copy with it, do not use it as a card background, and do not put white text on it.

**Type — three faces, and the serif is not optional.**

| Role | AG1 (sampled) | Substitute to use |
|---|---|---|
| Display | `TimesNow` / `TimesNow-Light` — a **light display serif** | `Instrument Serif` 400, or `Fraunces` 300 |
| Body / UI | `ABC Diatype` — a neutral grotesque | `Inter` 400/500 |
| Labels, eyebrows, promo codes | `ABC Diatype Mono` | `IBM Plex Mono` 500, uppercase, `+0.08em` |

Headline: light serif, 48–64px desktop, sentence case, two lines maximum, black. Body: 17–18px `Inter`, measure 60–68ch. Eyebrows and offer codes are **uppercase monospace with wide tracking** — `ENDS SEPTEMBER 30`, `USE CODE BATCH001`. That serif-over-grotesque-over-mono stack is the page's entire personality; drop the serif or the mono and it becomes a generic supplement site.

**Radius:** CTA pill `999px`, cards 14px, media 20px. **Shadows: 4 maximum page-wide.** No gradients. Icons are single-weight line icons.

### Hero — reproduce this composition exactly

Full-bleed **photograph** as the hero ground: a flat-lay on a hard surface (AG1 uses marble) with the product laid at an angle across it. Text sits **left, overlaid on the photo**, not in a separate column:

1. Uppercase mono eyebrow (a date or offer window)
2. Large light-serif headline, two lines
3. Two lines of sans subhead, including the promo code in bold
4. One accent pill CTA with a `→` arrow

Scattered across the photograph: **angled sticker graphics** — accent-filled rectangles rotated ~12°, black uppercase mono text (`20% OFF — USE CODE …`, `LIMITED TIME OFFER`). Build these as CSS-rotated divs, not images. They are the most recognizable device on the page.

**Nav:** white, only three links (Shop · Science · Explore is the pattern — use **Shop · Science · Story**), cart icon and a "Sign In" text link with a **2px accent underline** on the right. No mega-menu, no search field.

**Announcement bar:** full-width **accent fill**, black uppercase **monospace**, single line, one offer with a code.

### Section order

1. Announcement bar (accent, black mono, offer + code)
2. Nav (white, three links, accent-underlined Sign In)
3. Hero (photo ground, left text, angled stickers)
4. Trust strip — icon + micro-label, 4–6 across: *swallowable · no rinse · ~30 seconds · pocket tin*
5. **One chew replaces the drawer** — the consolidation comparison. The clutter (mints, gum, pen, mouthwash, travel brush) versus one tin, or a two-column *your current routine vs. Savour* table
6. Compare the two — Post-Coffee vs Post-Wine as a spec table, mono column headers
7. What's inside — grouped into a few buckets, full detail behind an accordion. `[SOURCE NEEDED]` on every mechanism claim
8. Snap · Melt · Wash — three numbered steps
9. Built for your moment — the client call, the dinner photo, the walk back to your desk
10. Tested and made — food-grade sourcing, standards, `[THIRD-PARTY TESTING — confirm before claiming]`
11. What's in your first order — the itemized stack shown **before** the price, each item a thumbnail with an "Included" tag. `[GIFT ITEM SLOT — confirm with client]`. Do not invent kit contents
12. Pricing — subscribe pre-selected, one-time visible but secondary; price stated twice, the second as **per-chew** in an oversized numeral with a small unit label; guarantee and cancel-anytime as micro-copy under the button
13. What people told us — `[REVIEW WIDGET SLOT]` rendered empty; research quotes 4, 6, 7, 12 labeled as pre-launch research, no stars, no names
14. Guarantee band
15. FAQ accordion — all nine objections
16. Final CTA — full-bleed `--deep`, short heading, accent pill, guarantee line beneath
17. Footer — multi-column, email capture, legal, and `[REGULATORY DISCLAIMER — confirm classification with counsel]`

**Section count: 17.** Repeat the accent pill every one to two sections, and **never let one appear without its risk-reversal line beneath it** — proximity beats prominence in a low-trust new category.

### Voice, and one rule that is not stylistic

Calm, plain, declarative, second person. Headlines 4–9 words. Body sentences 12–22 words, one idea each. No exclamation points, no hype adjectives, no emoji. The word "one" does a lot of work, because the product is framed as a *reduction* of effort.

**Hedge every claim: "supports," "helps," "designed to," "formulated to" — never "removes," "whitens," "eliminates," "prevents," or "cures."** On this page that is compliance, not tone, and it applies to templates 02 and 03 as well. Savour is a swallowed product making oral-care claims with no clinical evidence; unhedged efficacy language is the largest legal exposure in this build.

**Offer copy is factual, not urgent** — no countdown timers, no "only 3 left." Urgency comes from a dated offer window and generosity, exactly as AG1 does it.

**VOC quotes for this template only:** 4, 6, 7, 12.
## 8. TEMPLATE 02 — `02-bloom`, modeled on **Bloom Nutrition** (bloomnu.com)

**What this page is for:** warm and social traffic — people who arrived from a creator post or an ad and are browsing, not researching. It sells by making the range look abundant and already-loved.

**The one adaptation rule:** Bloom's identity is one constant deep green plus a rotating pastel wardrobe assigned per SKU. Reproduce the *system* — white chrome, one brand-owning color, a pastel per variant that tints its card, swatch and hero — in Savour's hues. **Do not paint Savour green.**

### Tokens — sampled from the live page, mapped to Savour

| Role | Bloom (sampled) | Savour |
|---|---|---|
| Page ground | `#FFFFFF` | `#FFFFFF` |
| Band ground | `#FAF7F2` | `#FAF7F2` |
| **Brand color** | **`#215B32` deep green** | **`#6B1030` deep wine** |
| Announcement bar | `#1B5E38` dark green, white text | `#4A0B21`, white text |
| Pastel A | pink `≈#F3A8C0` | Post-Coffee `#EADBC8` |
| Pastel B | lilac `≈#CBAEE8` | Post-Wine `#F2D4DA` |
| Pastel C / D | sage `#BFDEB5`, `#EAD4F8` | `#E0D8F0`, `#D4E4F2` (future SKUs) |
| Star / rating | `#FFCF2A` | `#FFCF2A` |
| Ink | `#0B0B0B` | `#1E1E1E` |
| Muted | `#676986` | `#6A6A6A` |
| Rule | `#DBDDE4` | `#E6E4E0` |

**Type — the display face is a serif.**

| Role | Bloom (sampled) | Substitute to use |
|---|---|---|
| Display | `Timesquare` Bold / `Gazpacho Black` — heavy serifs. `font-family-timesquare-bold` is the **most-used class on the entire page** | `Prata` 400, or `Playfair Display` 700 |
| Body / UI | `TT Travels DemiBold`, `Poppins` | `Poppins` 400/500 |

Section headings are **large, centered, bold serif** in the brand color — "Shop our Best Sellers" is set that way. Body and UI are the sans. Eyebrows and button labels: uppercase, 11–13px, `+0.06–0.12em`.

**Radius:** sampled values are 8 / 12 / 16 / 24 / 50px — softer and more varied than the other two templates. Pill buttons. **Shadows: 0–4**, floating elements only; depth comes from color blocking and photography.

### Hero — reproduce this composition

Not a lifestyle photo. Bloom runs a **full-bleed promotional banner** in a carousel: a **pink→lilac gradient ground**, product cans arranged at angles as if scattered on it, a very large **metallic-3D serif headline** with sparkle accents, and a **pill CTA with an inner border stroke**. Left/right carousel arrows sit as circular white buttons over the gradient.

Savour version: gradient ground in the two variant pastels, tins arranged at angles, oversized serif headline, `[HERO BANNER SLOT — designed promotional artwork]` for the 3D type treatment (that lettering is artwork, not CSS — mark it, don't fake it), pill CTA with inner border, carousel arrows.

**Nav:** white bar, brand-color text, **left-aligned links** (Shop · Take The Quiz · Subscribe & Save), **centered wordmark**, right cluster: brand-color pill CTA, search, cart, account. This centered-logo-with-left-links arrangement is distinctive — reproduce it rather than defaulting to logo-left.

**Announcement bar:** dark brand fill, white text, one line, ending in an arrow `→`.

### Section order

1. Announcement bar (dark fill, white, one line + arrow)
2. Nav (white, left links, centered wordmark, pill CTA, icons)
3. Hero banner carousel (gradient ground, angled products, oversized serif, pill CTA)
4. Trust icon bar — 4 items, icon in a pastel circle: *30 seconds · no rinse · swallowable · pocket tin*
5. **"Start here"** — Bloom's bestsellers rail, honestly renamed since nothing has sold yet. Heading in centered bold serif. Horizontal rail of product cards; **this card is the page's most important component and recurs three more times.** Card: tin on its pastel ground, name, flavor descriptor, price from config, swatch row, quick-add pill, and a `[STAR RATING — pending launch]` slot that renders nothing
6. Shop by moment — three large rounded tiles: *After the morning coffee · After the second glass · Keep one everywhere*
7. Why a chew — big product shot on `--pastel-coffee`, benefit rows, then Snap → Melt → Wash. Answers objections 2, 3, 4
8. Find your flavor — the two variants as appetite-driven tiles, each on its own pastel, tasting notes, click to preselect
9. Our story — the discovery story as a first-person band. **No founder name unless the client supplies one**
10. Proof band, honest version — build the aggregate-rating component, render it empty, and put a **"Sound familiar?"** block in the slot: research quotes 2, 8, 10, labeled as research, no stars, no names, no photos
11. Video rail — vertical 9:16 cards, `[FOUNDER VIDEO SLOT]` rather than customer UGC. Pause control; frozen under `prefers-reduced-motion`
12. Quiz band — *"Coffee person or wine person?"*, three questions, recommends a variant and opens the modal with it preselected
13. Bundles — cards from `config.pricing.bundles`, struck-through sum, "Save $X" pill, subscribe-vs-one-time with subscription preselected
14. Email capture — early access to Batch 001, single input, pill submit
15. Footer — solid brand-deep ground, white type, multi-column

**Section count: 15.** **Photography load is the point** — aim for 50–65% of the first four screens being image. A text-only section should be rare.

**Voice:** warm, direct, second person, upbeat. Headlines 3–7 words; body 8–16 words, often fragments. Talks about how it *feels* and how it *tastes* as much as how it works. Never clinical, never restrictive. Keep the claim hedging from §7.

**No press logos.** Bloom's "as seen in" band becomes a *how it's made* strip — sourcing, and what erythritol and malic acid actually are.

**VOC quotes for this template only:** 2, 8, 10, 14.
## 9. TEMPLATE 03 — `03-gruns`, modeled on **Grüns** (gruns.co)

**What this page is for:** cold paid-social traffic. It wins the argument in the first two scrolls and spends the rest of the page supplying evidence, loudly.

**The transferable spine:** Grüns sells *format substitution* — you already believe in greens, you just hate drinking them. Savour's is structurally identical: **you already know mints don't work; the format was never built for this.** The competitor is described by format ("a mint," "gum," "mouthwash"), never by brand name.

### Tokens — sampled from the live page, mapped to Savour

| Role | Grüns (sampled) | Savour |
|---|---|---|
| **Page ground** | **cream `≈#FDF3D8`** — *not white* | **cream `#FBF3E2`** |
| Announcement bar | deep forest `≈#17512F`, white text | `#3A0F1E`, white text |
| Deep brand | `#002613` / `#00351B` | `#3A0F1E` |
| Mid brand (headlines) | `≈#0F3D24` | `#5B1229` |
| **Bright brand (CTA, emphasis)** | **`≈#1E9E4A`** (sampled `#007E40` in CSS) | **`#C81D4A`** |
| Accent yellow | `≈#FFD84D` (sampled `#FFCC2F`) | `#FFD84D` |
| Nav pill grey | warm grey `≈#C9C6BA` | `#CFC7BC` |
| Mint tint | `#DAECE3` / `#BFDFCF` | `#F6E3E8` |
| Ink | `#111827` | `#141010` |

**The cream ground is the single most important correction to make.** Grüns is not a white page. Everything sits on warm cream, which is why the greens and yellows read as loud rather than clinical.

**Type:** heavy, rounded, high-x-height display sans — the headline face is visibly rounded and very bold. Use **`Fredoka` 600/700** (alternates: `Baloo 2`, `Nunito` 800). Body/UI is a plain grotesque — the page's inline CSS uses an `Inter` variant and `DM Sans`; use **`DM Sans` 400/500**. Headlines are sentence case, tight leading, with **emphasis words set in the bright brand color mid-sentence** — that two-tone headline is a signature device.

**Radius:** pills `999px`, cards and media 20–28px (sampled `rounded-2xl` and a `1.154rem` custom value). **Shadows: 3 maximum, hard-offset only** (`1px 1px 0` appears in the sampled CSS). No soft diffuse shadows anywhere — that is the fastest way to make this page read as generic wellness.

### Hero — reproduce this composition exactly

Two-column: **text left, rounded photograph right** (radius ~24px, roughly 45% of the viewport width).

Left column, in order:
1. **Rating line above the headline** — five brand-color stars, then `4.8 stars from 100,000 reviews • 1,000,000+ members` with the numbers bold and colored. **Savour has none of this. Render `[RATING LINE — pending launch]` and ship the line hidden**, not with zeros.
2. **Huge two-tone headline** — heavy rounded sans, three lines, deep green for most of it and bright green for the emphasis clause. Savour: *"30 Seconds After Your Last Sip"* / *"Everything Mints Never Touched."*
3. **One big pill CTA**, bright brand fill, white bold label, stating the offer — Grüns uses "Save 55% + Free Shipping"
4. **Two micro-reassurances directly under the CTA**, each icon + label: *30-day guarantee* · *Cancel anytime*
5. **A three-stat row** — three **yellow filled circles**, each with an oversized numeral inside (`60+`, `21`, `6g`), a bold label below, and a small sub-label. Savour: `30` chews · `~30s` to work · `2` formulas. Circles are the device; keep them.

**Nav — floating pills, not a bar.** The logo sits inside a rounded warm-grey pill; the right cluster (a **yellow pill CTA**, cart icon, hamburger) sits inside its own rounded grey container. They float over the cream with a gap above. Do not build a full-width nav bar.

**Announcement bar:** deep forest fill, **two centered lines** — a loud first line and a smaller second line.

**Sticky offer tab:** a vertical, rotated pill on the **left screen edge**, brand-fill, white text reading the offer, with a dismiss `×`. Persistent on scroll. Keyboard-dismissible.

### Section order

1. Announcement bar (deep fill, two centered lines)
2. Floating pill nav
3. Hero (left text / right rounded photo, rating line, two-tone headline, pill CTA, micro-reassurances, yellow stat circles)
4. **Press logo strip** — black wordmarks in a row directly under the hero. Savour has no press. **Delete this band rather than faking it**; a `[PRESS LOGO SLOT]` placeholder row is acceptable in the build but must not deploy
5. The problem — short, funny indictment of the mint ritual: the tin in every bag, five minutes of cover, mint-after-wine flavor collision
6. **The comparison — the engine of this page.** Two-column head-to-head arriving in the second scroll, before any ingredient detail. Left *A mint* on a drab grey ground with grey X marks and muted type; right *Savour* on the bright brand ground with a thick border, slight scale-up and filled checks. Rows are **experience attributes, not specs**: removes or covers · works on stains · needs a sink · clashes with your drink · how long it lasts · cost per use. On mobile, stack the cards with Savour first — never shrink into an unreadable side-by-side
7. How it works — three numbered chunky step badges: Snap / Melt / Wash. Deliberately trivial, because the simplicity is the claim
8. What's in it — the credibility core. Count at display size, an **ingredient marquee** (two stacked rows scrolling opposite directions, uppercase, star separators, **frozen entirely under `prefers-reduced-motion`** with a visible pause control), cutout ingredient photography, grouped breakdown
9. What's *not* in it — exclusion list reusing the X-mark vocabulary from §6: no mint, no foam, no rinsing, no spitting, no plastic pen
10. Taste — do not skip; taste is why the format wins. Macro shot per variant, tasting notes, *"composed to follow your drink, not fight it"*
11. Third-party tested — Grüns states this plainly as a heading. Savour cannot yet: use `[THIRD-PARTY TESTING — confirm before claiming]` and render the badges as chunky rotated stickers, not gray seals. The page never sobers up to be believed
12. Reviews — `[REVIEW SLOT]` built, rendered empty
13. Pricing — two selectable radio-cards, **Subscribe pre-selected** and badged, thick border on the selected state, **per-chew cost broken out** ("about 53¢ a chew", computed live), guarantee line directly under the button
14. Guarantee sticker — rotated, on a color band
15. FAQ accordion — all nine objections, in voice
16. Final CTA band — full-bleed bright brand, one very large headline, one button, product cutout
17. Footer — deep ground, link columns, email capture, legal

**Section count: 17.** **Density: ~900–1,400 words total**, no section over ~45 words of body copy outside the FAQ. This page is scanned, not read.

**Voice:** confident, funny, faintly exasperated on the reader's behalf, aimed at **the format and the ritual** — never the customer, never a named brand. The real Grüns line *"We made daily nutrition, like, ridiculously easy."* is the register: the filler "like" is doing deliberate work. Short sentences, fragments, imperatives.

**Write the micro-copy in voice too** — button labels, announcement bar, form placeholders, the modal's empty and success states. Shipping default "Submit" / "Learn more" labels is where this template goes flat. Keep the claim hedging from §7 even at this volume.

**VOC quotes for this template only:** 1, 3, 5, 9, 11, 13.
## 10. IMAGERY

No photography exists, and you must not hotlink external images or reuse the reference brands' assets.

- Build CSS/SVG art that reads as finished design, not as a grey box with a label. Gradient grounds, product silhouettes drawn in SVG, cutout-style compositions on flat color — a viewer should see a designed page, not a wireframe. Where a real photograph is genuinely required, use a styled art-directed panel (correct aspect ratio, on-brand ground, subject drawn or abstracted) with the art direction in an **HTML comment**, not in visible text — e.g. `<!-- HERO: tin held in hand, warm café light, shallow depth of field -->` for 01 vs `<!-- HERO: flat-lay on pastel ground, two tins + latte, bright and even -->` for 02.
- The Snap/Melt/Wash visual must be **drawn differently in each template**, matching its reference brand's illustration language — not one SVG reused three times.
- Icons: inline SVG only. No icon fonts, no CDN icon libraries.

## 11. SHARED BEHAVIOR

- **`shared/waitlist.js` is logic only** — open, close, focus trap, validation, success state. Each template supplies its own modal markup, heading text, and CSS. A shared, identically-styled modal is one of the things that made the earlier attempt's three pages feel like one page.
- **Checkout is a stub, but the page reads as live.** `config.launch.mode` is `"live"`, so buy CTAs say "Add to bag" / "Subscribe & Save" and open a **cart drawer** with line items, quantity controls, the free-shipping progress bar and a "Checkout" button. Checkout opens a modal reading *"Checkout opens when Batch 001 ships — join the list and we'll email you first"* with an email field. Validate client-side, show a success state, `console.log` the payload with `// TODO: wire to ESP and payment provider`. No network requests, no analytics, no pixels. The point is that every surface looks and behaves like a working store right up to the payment step.
- **Responsive** 360–1920px; test at 360, 768, 1024, 1440. No horizontal body scroll. Wide tables scroll in their own `overflow-x:auto` container.
- **Accessibility:** semantic landmarks, one `<h1>` per page, logical heading order, keyboard-operable accordions, carousels, pickers and modals with focus trap and Esc, visible focus rings styled per template, `aria-expanded`/`aria-controls` on disclosures, alt text or `aria-hidden` on SVGs, AA contrast throughout. Carousels and marquees need pause/stop controls. Honor `prefers-reduced-motion` — a scrolling marquee must stop entirely under it.
- **Performance:** vanilla ES modules, no frameworks, no CDN JS. Under ~500KB per page. Google Fonts is the only permitted external request.
- **`file://` support:** if ES module imports break under `file://`, ship a global-script fallback and note it in the README.

## 12. BUILD ORDER

1. Visit the three reference sites; write `REFERENCE-NOTES.md` (§0).
2. Write `content/facts.md`, the three copy banks — **in three different voices, before any markup exists** — then `content/demo-proof.js` and `CLAIMS.md`.
3. Write `DESIGN.md`: all three token sets, corrected against what you observed.
4. Build `shared/`.
5. Build `01-ag1` completely. Then `02-bloom`. Then `03-gruns`.
6. Run the checks in §13, fix what fails, then `index.html`, `README.md`, commit, push.

**Build them sequentially and do not open the previous template's stylesheet while writing the next one.** Building in parallel, or copying one template into the next as a starting point, is what produced three identical pages last time. Each template's CSS should be written from its own token set and its reference brand's mechanics, from scratch.

## 13. VERIFICATION

Run all of these and paste the raw output into your final report. If a check fails, fix the template — do not rationalize the result.

```bash
# 1. No hex color shared between templates except pure white/black.
#    (All three references use a white ground — white is the one legitimate overlap.)
grep -ohE '#[0-9a-fA-F]{3,8}' templates/*/style.css | sort | uniq -c | sort -rn | head -30

# 2. Font stacks must be disjoint across templates
grep -h -- '--font-' templates/*/style.css

# 3. No H1/H2 text repeated across templates
grep -ohE '<h[12][^>]*>[^<]+' templates/*/index.html | sed 's/<[^>]*>//g' | sort | uniq -d

# 4. Radius and shadow budgets must differ per template
grep -c 'border-radius' templates/*/style.css
grep -c 'box-shadow'   templates/*/style.css

# 5. Section counts must differ (expect 16 / 15 / 17)
grep -c '<section' templates/*/index.html

# 6. Every template must actually load its webfonts
grep -c 'fonts.googleapis.com' templates/*/index.html

# 7. No un-interpolated template literals in static markup
grep -rn '\${' templates/*/index.html index.html
```

Then confirm by hand:

- [ ] Changing `basePricePerTin` updates every number on all three pages, zero HTML edits.
- [ ] Each template's section order matches its reference brand's order as specified in §7–§9 — no invented sections, none dropped.
- [ ] All nine objections answered on each template, in three different registers.
- [ ] Each template's Snap/Melt/Wash visual is drawn differently.
- [ ] Each template has its own modal markup, heading, and skin.
- [ ] Every review, rating and aggregate on the page comes from `content/demo-proof.js`, carries `data-demo="true"`, and disappears when `config.launch.showDemoProof` is set to false. Verify by flipping the flag and reloading all three.
- [ ] The SAMPLE DATA header comment is present and unedited at the top of `content/demo-proof.js`.
- [ ] No press logos anywhere; the "Made and tested" band is in that slot instead.
- [ ] No numeric efficacy claim appears on any page. Every claim maps to a tier in `CLAIMS.md` and uses that tier's phrasing.
- [ ] No `[SLOT]` or `[SOURCE NEEDED]` bracket appears in any *visible* copy — run `grep -o '\[[A-Z][A-Z ]*[A-Z]\]' templates/*/index.html` and confirm the only hits are inside HTML comments.
- [ ] `CLAIMS.md` lists every claim on all three pages with its tier and substantiation status.
- [ ] Nothing anywhere suggests drinking less coffee or wine.
- [ ] Keyboard-only pass on all three; marquees and carousels stop under `prefers-reduced-motion`; no horizontal scroll at 360px.
- [ ] All three open from `file://`.

**The squint test.** Open all three side by side at 25% browser zoom. Someone who knows AG1, Bloom and Gruns should be able to tell which is which from silhouette and color alone. If they can't, the reference wasn't followed closely enough — go back to that template's §7–§9 spec rather than nudging its colors.

## 14. FINAL REPORT

Reply with:

1. The file tree you created.
2. Whether you could reach the three reference sites, and if so, every place your observations corrected §7–§9.
3. Raw output of all seven shell checks.
4. Confirmation of the price-config test.
5. `CLAIMS.md`, plus the output of `document.querySelectorAll('[data-demo]').length` for each page — the complete inventory of what still needs real data before launch.
6. Anything you could not complete, and why.

Report failures honestly. A disclosed failure is far more useful than a quietly-passed check — the previous attempt on this project passed its own "are these visually distinct?" review and shipped three identical pages.
