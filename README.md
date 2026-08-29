# BUILD PROMPT v3 — Savour: Three Landing Pages Modeled on AG1, Bloom, and Gruns

> **v3 replaces v1 and v2 entirely.** Earlier versions asked for three invented design directions and got three near-identical pages. v3 removes the invention: each template is a close structural and visual reproduction of a specific, proven DTC landing page, rebuilt with Savour's product and copy. **Do not reinterpret these references creatively.** Their layouts convert because of specific, repeated mechanics; your job is to carry those mechanics over faithfully and swap in Savour's content — not to design something new "inspired by" them.

| Template | Modeled on | The thing that makes it work |
|---|---|---|
| `01-ag1` | **AG1 / Athletic Greens** — drinkag1.com | Subscription-first, single-product premium credibility |
| `02-bloom` | **Bloom Nutrition** — bloomnu.com | Flavor merchandising and social-proof density |
| `03-gruns` | **Gruns** — gruns.co | Format-vs-incumbent comparison, playful and loud |

---

## 0. FIRST: GO LOOK AT THE THREE SITES

The design specs in §7–§9 were written **from knowledge, not from fetching the pages** — the authoring session's network policy blocked all three domains. They are directionally right about structure and mechanics, and they carry confidence markers, but exact hex values and current section content are unverified.

**If you have network access, open all three URLs before you write any code.** For each site record, in `REFERENCE-NOTES.md`:

- Sampled hex values: page background, section backgrounds, primary text, CTA fill and label, accent
- Actual font families (from computed styles or the stylesheet links), weights, and case conventions
- Button geometry: border-radius, padding, font-size, weight, letter-spacing
- The real section order, top to bottom, with each section's heading text
- Sticky elements, and what the announcement bar says
- How price, subscription, and any bundle or gift stack are presented

**Where your observations differ from §7–§9, your observations win.** Note the correction in `REFERENCE-NOTES.md` so the difference is visible to a reviewer.

If the domains are blocked for you too, say so plainly in your final report and build from the documented specs as written — but do not silently present unverified values as sampled ones.

A note on fidelity and its limits: reproduce **layout, structure, component patterns, proportions, and mechanics**. Do not copy their logos, wordmarks, photography, illustrations, or body copy verbatim, and do not imply any association between Savour and these brands. You are rebuilding a page pattern, not cloning a website.

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

## 6. CLAIM DISCIPLINE — read before writing a single line of copy

This is the sharpest tension in the whole build. All three reference sites lean hard on social proof: review counts, star ratings, testimonial walls, press logos, customer photos, "trusted by X people." **Savour is pre-launch with zero customers, so none of that can be reproduced honestly.**

Build the components — the layout mechanics matter and the slots need to exist — but fill them with visible, labeled placeholders:

- `[TESTIMONIAL SLOT — real customer quote pending launch]` in the correct card layout
- `[REVIEW COUNT — pending launch]` where a brand would print "12,000+ reviews"
- `[STAR RATING — pending launch]` rather than a drawn 4.8
- `[PRESS LOGO SLOT]` rather than any real publication's mark
- `[SOURCE NEEDED — dental/chemistry citation]` on any efficacy or mechanism claim

**Never generate:** invented customer names, headshots, star ratings, review counts, press logos, statistics, "clinically proven," "dentist recommended," fake countdown timers, fake "N people viewing," or medical claims (does not cure, treat, permanently whiten, or replace brushing). Scarcity comes only from `config.launch.foundersBatchUnits`, phrased as a stated batch size.

The research quotes in §4 are the one form of real voice available. Present them as customer research, clearly labeled as such — not as product reviews.

List every placeholder occurrence in the README so they're easy to fill before launch.
## 6b. THE DIFFERENTIATION MATRIX — and one honest caveat

Fill this into `DESIGN.md` before writing CSS. It is already filled in for you below; confirm it against what you observe on the three sites and correct where they differ.

| | **01 — AG1** | **02 — Bloom** | **03 — Gruns** |
|---|---|---|---|
| Page ground | White + warm sand `#F3EEE4` | White + `#FAF7F2` | White |
| Dominant band color | Espresso-black `#1E1712` | Rotating pastels | Saturated berry `#C81D4A` |
| Brand color | `#8C6239` roasted brass | `#6B1030` | `#C81D4A` |
| Display / body | `Archivo` / `Inter` | `Poppins` / `DM Sans` | `Fredoka` / `Hanken Grotesk` |
| Card radius | 14px | 12–20px | 20–28px |
| Shadow budget | ≤4, soft, structural only | 0–4, floating elements only | ≤3, **hard-offset only** |
| Border language | 1px hairlines | Light hairlines, mostly none | 2–3px solid ink |
| Hero archetype | Split, product-forward | Full-bleed lifestyle, rotating slides | Cutout on saturated ground |
| Section count | 16 | 15 | 17 |
| Word count | Highest | Medium | Lowest (~900–1,400) |
| Photography load | Moderate — studio + lifestyle | **Very heavy — 50–65%** | Cutout product on flat color |
| Recurring component | Benefit card, hedged sentence | Product card with swatches | Comparison column + marquee |
| Voice | Calm, declarative | Warm, upbeat, second person | Funny, exasperated on your behalf |
| CTA label | "Subscribe & Save" | "Add to bag" | "Get my tin" |
| Motion budget | 200–300ms fades only | Card hover, carousels, video | 120–180ms snap, two marquees |

**The caveat, stated plainly:** all three reference brands use a predominantly white page ground and fully-rounded pill buttons. Those two rows genuinely coincide, and forcing them apart would mean departing from the references — which is the opposite of what this build is for. **Distinctness here comes from band color, type personality, density, border language, shadow style, and component vocabulary**, not from the background value. The verification in §13 is written accordingly: it does not require different body backgrounds, and it leans harder on the squint test instead.
## 7. TEMPLATE 01 — `01-ag1`, modeled on **AG1 / Athletic Greens** (drinkag1.com)

**What this page is for:** cold, skeptical, higher-intent traffic. It sells one decision at a premium price by collapsing complexity and making the subscription obviously correct.

**Why this reference fits Savour better than it looks.** AG1's central argument is *not* "our greens are better than their greens" — it's *"you currently make six confusing purchases and this replaces them."* Savour has exactly that argument available and has never used it: mints in every bag, gum in the car, a whitening pen in the drawer, mouthwash you can't use without a sink. **One chew replaces the drawer.** Build the page on that, not on superiority.

### Tokens

| Token | Value | Note |
|---|---|---|
| `--bg` | `#FFFFFF` | Dominant. Most sections sit on plain white. |
| `--bg-alt` | `#F3EEE4` | Warm sand, for banding alternate sections. |
| `--deep` | `#1E1712` | Espresso-black. Full-bleed bands, footer, and used as an ink color — headings tint toward it rather than being pure black. |
| `--brand` | `#8C6239` | Roasted brass. Plays the role AG1's green plays: it *is* the brand, and everything else is neutral scaffolding around it. |
| `--ink` | `#1E1712` | |
| `--muted` | `#645B50` | Desaturated warm gray, not neutral gray. |
| `--rule` | `#E3DFD6` on sand, `#E8E6E2` on white | Hairlines only. |
| `--font-display` | `Archivo` 600/700 | Tall x-height, squarish, neutral-clinical. |
| `--font-body` | `Inter` 400/500 | 17–18px, line-height 1.55, measure 60–68ch. |

**Do not substitute Poppins, Montserrat, or a display serif** — geometric-circular and high-contrast-serif both push this page toward generic wellness, which is precisely what this reference is not.

**Case:** sentence case for all headings and body; uppercase reserved for eyebrows and small badge labels at 12–13px with `+0.08em`. Headings tracked `-0.02em`. H1 48–64px desktop / 32–36px mobile, two or three lines maximum. H2 32–40px, three to seven words. Large numeric callouts (per-chew price, seconds) set oversized in the display weight with a small unit label.

**Radius:** buttons `999px` pill, cards 14px, media 20px. **Shadows: 4 declarations maximum page-wide**, only on the sticky bar, nav panels and the modal. Cards separate by tinted fill and hairline, not elevation. **Zero gradients.** Icons are single-weight line icons, ~1.75px stroke, rounded caps, monochrome — not filled, not duotone.

**Accent discipline:** `--brand` may touch primary buttons, the wordmark, checkmarks and icons, one or two emphasized words in a heading, small badges, and the deep bands. It is **not** a body-text color and **not** a card background. Under-using it is the correct failure mode here.

**Section padding** 96px desktop / 56px mobile. Motion limited to 200–300ms fades, hover states, and accordion expansion. No parallax, no count-ups.

### Section order — build in this sequence

1. **Announcement bar.** ~38px, `--deep`, centered white 13px, 2–3 rotating messages on a ~5s interval with a pause control: free shipping threshold, Batch 001 price lock, the guarantee.
2. **Nav, sticky.** Wordmark left, links (Why Savour · What's Inside · How It Works · Reviews · FAQ), right cluster with a **solid `--brand` pill CTA** that stays visible at every width. Condenses on scroll with a hairline bottom border.
3. **Hero.** Split product-forward composition. Short H1 staking the category claim — not a feature, not an ingredient. One-sentence subhead, one pill CTA, and a compact trust strip immediately beneath (the certification/dietary icon row, **not** a star rating — there are no reviews yet).
4. **Trust strip.** Icon-over-label row, 4–6 across: *swallowable · no rinse · ~30 seconds · pocket tin · food-grade ingredients*. Reappears later in the page. `[PRESS LOGO SLOT]` is **not** populated — delete the band rather than invent outlets.
5. **"One chew replaces the drawer."** The core reframe and the most important section on this page. Visual is a comparison: the cluttered cluster (mints, gum, whitening pen, mouthwash bottle, travel toothbrush) versus one tin — or a two-column *your current routine vs. Savour* table. Copy is about eliminating the workaround, not about beating any one product.
6. **What's inside.** The formula, grouped into a small number of comprehensible buckets rather than a scary list: the cooling agent, the acid that does the washing, the flavor system. Full detail behind an accordion — **the complexity is proof, not pitch; available but never in the reader's way.** `[SOURCE NEEDED]` on every mechanism claim.
7. **Benefits grid.** Four cards, icon + 2–4 word label + one hedged sentence: *fresher breath · less fresh staining · works anywhere · no ritual to remember*. This is the page's most-repeated component.
8. **Quality and testing.** Food-grade sourcing, manufacturing standards, `[THIRD-PARTY TESTING — confirm before claiming]`, `[RESEARCH CITATION SLOT]`. A `--deep` band with white type. Answers the category's biggest objection: why trust a new thing you put in your mouth.
9. **How it works.** Three numbered steps — Snap, Melt, Wash — photographic or icon-led, deliberately short. Reduces perceived effort.
10. **What's in your first order.** AG1's conversion crux, and the mechanic most worth copying. An itemized stack shown *before* the price: both tins (The Pair), plus `[GIFT ITEM SLOT — confirm with client: pocket sleeve? refill card? Batch 001 card?]`, each as a thumbnail card with an "Included" tag. **Do not invent kit contents** — ship labeled slots the client fills in. The point is that the reader sees a full box before they see a number.
11. **Pricing block.** Subscribe-vs-one-time selector with **subscription pre-selected** and one-time visible but visually secondary. Price stated two ways: the bundle price from config, and the emotionally operative **per-chew cost** as a large numeral with a small unit label. Cadence, cancel-anytime, and the guarantee as micro-copy directly under the button.
12. **Reviews.** `[REVIEW WIDGET SLOT]` and `[TESTIMONIAL SLOT]`, rendered empty. In their place, a **"what people told us"** block using research quotes 4, 6, 7 and 12 — labeled as pre-launch customer research, no stars, no names.
13. **Guarantee.** Its own band, `--bg-alt` or `--deep`, one icon, one heading, two sentences. `config.pricing.guaranteeDays` money-back, risk-free.
14. **FAQ accordion.** 8–12 rows, hairline dividers, chevron affordance, all closed by default. All nine objections plus taste, timing, and safety.
15. **Final CTA band.** Full-bleed `--deep`, short heading, one pill CTA, one-line restatement of the guarantee beneath it.
16. **Footer.** Multi-column (Shop / Learn / Support / Company), email capture, social, legal — and a `[REGULATORY DISCLAIMER — confirm product classification with counsel]` line. A swallowed daily chew may carry disclosure obligations; leave the slot visible rather than guessing at the wording.

**Section count: 16.** **Repeat the pill CTA every one to two sections, and never let one appear without its risk-reversal line beneath it.** For a low-trust new category, proximity beats prominence — the objection gets answered in the same eye-fixation as the button.

### Voice — and one rule that is not stylistic

Calm, plain, declarative, second person. Headlines 4–9 words; body sentences 12–22 words, one idea each; paragraphs of one to three sentences. No exclamation points, no hype adjectives, no emoji. The word **"one"** does a lot of work — one chew, one tin, one habit — because the product is framed as a *reduction* of effort.

**Hedge every claim, the way AG1 does: "supports," "helps," "designed to," "formulated to" — never "removes," "whitens," "eliminates," "prevents," or "cures."** On this page that is compliance, not tone. Savour is a swallowed product making oral-care claims with no clinical evidence behind it; unhedged efficacy language is the single largest legal exposure in this whole build. Carry the hedging into 02 and 03 as well — their voices are louder, but the claims underneath must be equally careful.

**Offer copy is factual, not urgent.** No countdown timers, no "only 3 left." Urgency is replaced by generosity (what's in the box) and safety (the guarantee).

**VOC quotes for this template only:** 4, 6, 7, 12.
## 8. TEMPLATE 02 — `02-bloom`, modeled on **Bloom Nutrition** (bloomnu.com)

**What this page is for:** warm and social traffic — people who arrived from a creator post or an ad and are browsing, not researching. It sells by making the range look abundant, appetizing and already-loved.

**The one adaptation rule:** Bloom's identity is a single saturated green plus a rotating pastel wardrobe. Reproduce the *system* — white ground, one brand-owning accent, a pastel assigned to each SKU that tints its card, swatch and hero — but in Savour's hues. **Do not paint Savour green.** Everything else about the page (structure, proportions, component vocabulary, photography load) is a close reproduction.

### Tokens

| Token | Value | Note |
|---|---|---|
| `--bg` | `#FFFFFF` | True white. Resist the cream reflex — Bloom's ground is white, and cream is exactly the default that ruined the previous attempt. |
| `--bg-tint` | `#FAF7F2` | Faint warm off-white for band separation only. |
| `--brand` | `#6B1030` | The constant brand color: wordmark, primary CTAs, footer ground, eyebrows, checkmarks, links. Plays the role Bloom's green plays. |
| `--brand-deep` | `#4A0B21` | Darker step for the footer and full-bleed dark bands. |
| `--pastel-coffee` | `#EADBC8` | Post-Coffee's assigned color. |
| `--pastel-wine` | `#F2D4DA` | Post-Wine's assigned color. |
| `--pastel-3` / `--pastel-4` | `#E0D8F0` / `#D4E4F2` | Reserved for future SKUs; used on the "what's next" tile so the range reads as a system. |
| `--ink` | `#1E1E1E` | Neutral near-black, not warm brown. |
| `--muted` | `#6A6A6A` | |
| `--rule` | `#E6E4E0` | Light hairlines, used sparingly. |
| `--font-display` | `Poppins` 500/600/700 | |
| `--font-body` | `DM Sans` 400/500 | |

Type scale `12 / 14 / 16 / 18 / 22 / 28 / 40 / 56 / 72`. Body measure 58–66ch; hero headline under 30ch. Headlines in **sentence case or lowercase**, tight tracking. Eyebrows and button labels in **uppercase at 11–13px with +0.06–0.12em tracking** — that macro-lowercase / micro-uppercase contrast is a large part of the look.

**Radius:** pill buttons (`999px`), cards 12–20px, images 12–24px. **Shadows: low — 0 to 4 declarations total**, reserved for floating elements (sticky bar, cart-style drawer, quick-add). Depth comes from color blocking and photography, not elevation. Borders are light hairlines; cards more often sit on a tinted ground than inside a stroke.

**Imagery load is the point.** Aim for 50–65% of the first four screens being photographic. Three modes, all present: studio product on flat pastel, aspirational lifestyle (bright kitchen, morning light, a hand reaching for a tin), and phone-shot vertical video. A text-only section should be rare. Every photo position is a labeled placeholder with art direction in an HTML comment.

### Section order — build in this sequence

1. **Announcement bar.** Solid `--brand`, 36–44px, small uppercase, **rotating messages** auto-advancing every ~4.5s with pause-on-hover: free-shipping threshold (from config), the Founders Batch line, the guarantee. Keyboard-reachable pause control.
2. **Nav, sticky.** Wordmark left, links across (Shop, The Two, How It Works, Our Story, FAQ), right side search + cart-style icon opening a **slide-out drawer** with a free-shipping progress bar computed from `pricing.js`.
3. **Hero.** Full-bleed lifestyle plate with type overlaid left, or 50/50 split with the tin on a pastel ground. Short benefit-led headline, one supporting line, one pill CTA, one secondary text link. Rotating 2–3 slide hero tied to the two variants.
4. **Trust icon bar.** Thin band under the hero: 4 items, icon in a pastel circle + 2–4 words — *30 seconds · no rinse · swallowable · pocket tin*. Horizontally scrollable on mobile.
5. **"Start here" rail.** Bloom's bestsellers carousel, honestly renamed — nothing has sold yet. Horizontal rail of product cards, arrows on desktop, swipe on mobile. **This card is the most important component on the page and recurs three more times.** Each card: tin image on its pastel ground, name, flavor descriptor, `[STAR RATING — pending launch]` slot rendered as nothing until real data exists, price from config, swatch row, quick-add pill.
6. **Shop by moment.** 3 large rounded tiles with centered labels: *After the morning coffee · After the second glass · Keep one everywhere.* Links, not cards with buttons.
7. **Deep dive: why a chew.** Big product shot on `--pastel-coffee`, benefit rows (icon + bold label + one sentence) covering the mechanism in plain language, then the Snap → Melt → Wash three-step. Answers objections 2, 3, 4.
8. **"Find your flavor."** The two variants as large appetite-driven tiles, each on its own pastel, with tasting-note copy. Clicking one preselects it in the drawer. This is where the per-SKU color system pays off.
9. **Our story.** The discovery story from `facts.md` as a first-person band with a photo placeholder. **No founder name unless the client supplies one.**
10. **Proof band — honest version.** Bloom runs an aggregate rating plus review cards here. Savour has neither. Build the component, render it empty, and put a **"Sound familiar?"** block in the slot instead: three of the research quotes (2, 8, 10 — do not reuse them on another template), labeled as customer research, no stars, no names, no photos.
11. **Video rail.** Vertical 9:16 autoplay-muted cards. Since there are no customers, these are `[FOUNDER VIDEO SLOT]` — making the product, the taste test, the chemistry — same rail component, honest source. Pause control required; frozen under `prefers-reduced-motion`.
12. **Quiz band.** Full-bleed pastel: *"Coffee person or wine person?"* → 3-question quiz → recommends a variant and opens the waitlist modal with it preselected.
13. **Bundles.** Bundle cards from `config.pricing.bundles`, struck-through sum, "Save $X" pill, subscribe-vs-one-time radio with subscription preselected and the % saving visible.
14. **Email capture.** Discount-free incentive — early access to Batch 001. Single input, pill submit, consent microcopy.
15. **Footer.** Solid `--brand-deep`, white type, multi-column links, social, legal.

**Section count: 15.** **Voice:** warm, direct, second person, upbeat. Headlines 3–7 words, body sentences 8–16 words, often fragments. Talks about how it *feels* and how it *tastes* as much as how it works. Never clinical, never restrictive.

**Objections land at:** 1 and 5 in the FAQ inside §7; 2, 3, 4 in §7's benefit rows; 6 in §8; 7 in §13's per-chew math; 8 in §9 and §14; 9 in the hero subhead.

**VOC quotes for this template only:** 2, 8, 10, 14.

**No press logos.** Bloom's "as seen in" band is replaced by a *how it's made* strip — ingredient sourcing and the food-grade nature of erythritol and malic acid — which does similar trust work honestly.
## 9. TEMPLATE 03 — `03-gruns`, modeled on **Gruns** (gruns.co)

**What this page is for:** cold paid-social traffic. It wins the argument in the first two scrolls and spends the rest of the page supplying evidence, loudly.

**The one adaptation rule:** Gruns' whole pitch is *format substitution* — you already believe in greens, you just hate drinking them. Savour's is structurally identical: **you already know mints don't work; the format was never built for this.** Keep that spine exactly. The competitor is described by format ("a mint," "gum," "mouthwash"), never by brand name.

### Tokens

| Token | Value | Note |
|---|---|---|
| `--bg` | `#FFFFFF` | |
| `--brand` | `#C81D4A` | Vivid berry — plays Gruns' saturated-green role. Loud, not muted. If it starts looking calming, it's wrong. |
| `--brand-deep` | `#8A0F31` | Depth on stacked blocks, text on light brand fills. |
| `--ink` | `#101010` | High-contrast near-black. |
| `--muted` | `#4A4A4A` | |
| `--accent-yellow` | `#FFC53D` | Starbursts, "BEST VALUE" flags. |
| `--accent-orange` | `#FF6B35` | Mid-page jolt block, flavor callouts. |
| `--drab` | `#D9D6D0` | **The loser column's ground in the comparison block.** Deliberately dull. |
| `--font-display` | `Fredoka` 600/700 | Chunky, rounded, cheerful. |
| `--font-body` | `Hanken Grotesk` 400/600 | |

Hero `clamp(2.75rem, 7vw, 5.5rem)`, section h2 `clamp(2rem, 4.5vw, 3.5rem)`, card h3 `1.375rem`, body `1.0625rem`, eyebrows `0.75rem` caps. Display headlines in **sentence case, tight tracking (-0.02 to -0.03em)**; ALL-CAPS reserved for eyebrows, badges, button labels and marquee text with **+0.06 to +0.1em** tracking. No serif anywhere on the page.

**Radius:** pill buttons (`999px`), cards 20–28px. **Shadows: at most 3 declarations, all hard-offset** (`6px 6px 0 var(--ink)`) on stickers and badges. **No soft diffuse shadows anywhere** — that is the single fastest way to make this page read as generic wellness. Thick 2–3px solid ink borders on cards, stickers and secondary buttons. Hairline gray borders are wrong here.

**Accent discipline:** `--brand` is a ground and a CTA color. Yellow and orange touch only stickers, badges, marquee stripes, underline swashes and illustration fills — never body text, and never a second section ground more than once on the page.

**Graphic devices:** squiggles, starbursts, confetti dots, hand-drawn circles around a word, stickers rotated −4° to +6°. Punctuation, not background texture. Cutout product photography on flat color — the tin and loose chews knocked out and floated on the band, hard-lit and saturated. No moody lifestyle grading.

### Section order — build in this sequence

1. **Announcement bar.** Thin `--brand` strip, ALL CAPS micro-type, under 60 characters, single link to the buy block. Free-shipping threshold from config.
2. **Nav, sticky.** Wordmark left; short links (Shop, Why a chew, What's in it, FAQ); right side a **pill CTA** — non-optional, it's the always-available conversion path — plus cart icon.
3. **Hero.** Product-cutout on a saturated `--brand` ground. Eyebrow, big chunky headline landing the format claim in one line, one sub-line, primary pill CTA, tin-plus-loose-chews cutout with coffee-bean and grape cutouts orbiting it. Micro-caps trust row underneath: *30 seconds · no rinse · swallow it · fits any pocket.*
4. **Thin proof strip.** A marquee of the research quotes rather than press logos — clearly labeled as customer research. `[PRESS LOGO SLOT]` is **not** used here; delete the band rather than fake it.
5. **The problem.** Short, funny indictment of the mint ritual: the tin in every bag, the five minutes of cover, the mint-after-wine flavor collision. 3-up of icon + line, or one big statement.
6. **THE COMPARISON — the engine of this page.** Two-column head-to-head, arriving in the second scroll, before any ingredient detail. Left column *A mint* on `--drab` with gray X marks, muted type, no border. Right column *Savour* on `--brand` with a thick ink border, slight scale-up, filled check marks. Rows are **experience attributes, not specs**: does it remove or cover · works on stains · needs a sink · clashes with what you just drank · how long it lasts · what it costs per use. Mobile: stack the two cards, Savour first — never shrink into an unreadable side-by-side.
7. **How it works.** Three numbered chunky step badges: Snap / Melt / Wash. Deliberately trivial, because the simplicity is the claim.
8. **What's in it.** The credibility core. Ingredient count at display size, the **ingredient marquee** — two stacked rows scrolling opposite directions, ALL CAPS with star separators, frozen entirely under `prefers-reduced-motion` — plus cutout ingredient photography and a grouped breakdown (the cooling agent / the acid / the flavor).
9. **What's *not* in it.** Exclusion list reusing the X-mark vocabulary from §6: no mint, no foam, no rinsing, no spitting, no plastic pen.
10. **Taste.** Do not skip this — taste is the whole reason the format wins. Macro shot per variant, tasting notes, *"composed to follow your drink, not fight it."*
11. **Standards.** Food-grade ingredient callouts and `[SOURCE NEEDED]` markers, rendered as chunky rotated colored badges rather than gray certification seals. The page never sobers up to be believed.
12. **Reviews.** `[REVIEW SLOT]` components built and rendered empty. Nothing fabricated.
13. **Pricing block.** Two selectable radio-cards — **Subscribe (pre-selected, badged "Most popular", % from config) vs. One-time** — with a thick border on the selected state and the **per-chew cost broken out** ("about 53¢ a chew", computed live). Guarantee line directly under the button. This per-use reframe is the key conversion device; keep it.
14. **Guarantee sticker.** Money-back promise as a rotated sticker on a color band.
15. **FAQ.** Accordion, all nine objections, answered in the same joking-but-informative voice.
16. **Final CTA band.** Full-bleed `--brand`, one very large headline, one button, product cutout. The loudest moment on the page.
17. **Footer.** Deep ground, link columns, email capture, social, legal. The only quiet part.

**Section count: 17.** **Density: ~900–1,400 words total** — no section over ~45 words of body copy outside the FAQ. This page is scanned, not read.

**Voice:** confident, funny, faintly exasperated on the reader's behalf. The humor targets **the format and the ritual**, never the customer and never a named brand. Short sentences, fragments, imperatives, the comic turn on the last word. Never wellness-speak. **Write the micro-copy in voice too** — button labels, the announcement bar, form placeholders, the modal's empty and success states. Shipping default "Submit" / "Learn more" labels is where this template most often goes flat.

**VOC quotes for this template only:** 1, 3, 5, 9, 11, 13.
## 10. IMAGERY

No photography exists, and you must not hotlink external images or reuse the reference brands' assets.

- Build CSS/SVG placeholder art. Every position that will hold a real photo gets a labeled placeholder box and an HTML comment giving art direction, written to match that template's reference brand — e.g. `<!-- HERO: tin held in hand, warm café light, shallow depth of field -->` for 01 vs `<!-- HERO: flat-lay on pastel ground, two tins + latte, bright and even -->` for 02.
- The Snap/Melt/Wash visual must be **drawn differently in each template**, matching its reference brand's illustration language — not one SVG reused three times.
- Icons: inline SVG only. No icon fonts, no CDN icon libraries.

## 11. SHARED BEHAVIOR

- **`shared/waitlist.js` is logic only** — open, close, focus trap, validation, success state. Each template supplies its own modal markup, heading text, and CSS. A shared, identically-styled modal is one of the things that made the earlier attempt's three pages feel like one page.
- **No real checkout.** `config.launch.mode` is `"waitlist"`; every buy CTA opens that template's modal. Validate client-side, show a success state, `console.log` the payload with `// TODO: wire to ESP`. No network requests, no analytics, no pixels.
- **Responsive** 360–1920px; test at 360, 768, 1024, 1440. No horizontal body scroll. Wide tables scroll in their own `overflow-x:auto` container.
- **Accessibility:** semantic landmarks, one `<h1>` per page, logical heading order, keyboard-operable accordions, carousels, pickers and modals with focus trap and Esc, visible focus rings styled per template, `aria-expanded`/`aria-controls` on disclosures, alt text or `aria-hidden` on SVGs, AA contrast throughout. Carousels and marquees need pause/stop controls. Honor `prefers-reduced-motion` — a scrolling marquee must stop entirely under it.
- **Performance:** vanilla ES modules, no frameworks, no CDN JS. Under ~500KB per page. Google Fonts is the only permitted external request.
- **`file://` support:** if ES module imports break under `file://`, ship a global-script fallback and note it in the README.

## 12. BUILD ORDER

1. Visit the three reference sites; write `REFERENCE-NOTES.md` (§0).
2. Write `content/facts.md`, then the three copy banks — **in three different voices, before any markup exists.**
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
- [ ] Zero fabricated testimonials, names, stars, review counts, press logos, statistics, or clinical claims; every proof slot is a visible labeled placeholder.
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
5. The full placeholder inventory — every `[TESTIMONIAL SLOT]`, `[REVIEW COUNT]`, `[STAR RATING]`, `[PRESS LOGO SLOT]`, `[SOURCE NEEDED]`.
6. Anything you could not complete, and why.

Report failures honestly. A disclosed failure is far more useful than a quietly-passed check — the previous attempt on this project passed its own "are these visually distinct?" review and shipped three identical pages.
