# Copy — `01-ag1` (modeled on AG1 / Athletic Greens)

Written before any markup, per build order. Voice: calm, plain,
declarative, second person. Headlines 4–9 words. Body sentences 12–22
words, one idea each. No exclamation points, no hype adjectives, no
emoji. Every efficacy claim hedged ("supports," "helps," "designed to,"
"formulated to") — never "removes," "whitens," "eliminates," "prevents,"
"cures."

The page's argument is **not** "our chew is better than mints." It is
*"you currently make five confusing purchases, and this replaces them."*
One chew replaces the drawer.

VOC quotes used on this template: **4, 6, 7, 12** — and no others.
CTA label everywhere: **Subscribe & Save**.

---

## Placeholder checklist (every placeholder that appears on this page)

| Placeholder | Where it appears |
|---|---|
| `[SOURCE NEEDED — dental/chemistry citation]` | §5 reframe (residue/bonding claim); §6 "what's inside" — cooling-agent bucket and acid bucket, plus both `<details>` bodies; §9 how it works — Melt and Wash steps; §14 FAQ row 5 ("Is this backed by anything?") |
| `[THIRD-PARTY TESTING — confirm before claiming]` | §8 quality and testing band |
| `[RESEARCH CITATION SLOT]` | §8 quality and testing band |
| `[MANUFACTURING STANDARD — confirm facility certifications]` | §8 quality and testing band |
| `[GIFT ITEM SLOT — confirm with client: pocket sleeve? refill card? Batch 001 card?]` | §10 what's in your first order |
| `[REVIEW WIDGET SLOT]` | §12 reviews |
| `[STAR RATING — pending launch]` | §12 reviews (widget header) |
| `[REVIEW COUNT — pending launch]` | §12 reviews (widget header) |
| `[TESTIMONIAL SLOT — real customer quote pending launch]` | §12 reviews (three empty testimonial cards) |
| `[REGULATORY DISCLAIMER — confirm product classification with counsel]` | §16 footer |
| Art-direction image slots (HTML comments + CSS/SVG placeholder art) | §3 hero, §5 reframe cluster, §9 diagram, §10 three kit thumbnails, §11 pricing thumbnail |

No press-logo band exists on this template — by spec, it is not built at
all rather than left as a slot.

**Every number is rendered at runtime** from `shared/config.js` through
`shared/pricing.js`. No price, per-chew figure, savings amount, shipping
threshold, discount percent, guarantee length, or batch size is typed
into `index.html`. Where copy below shows a figure it is written as a
`{token}` — the markup carries an empty `data-savour-*` hook instead.

---

## 1. Announcement bar

Rotating, ~5s, pausable, single static message under
`prefers-reduced-motion`.

1. Free shipping on orders over {freeShippingThreshold}.
2. {batchLabel}: Founders Batch price, locked for life.
3. {guaranteeDays}-day money-back guarantee. Cancel anytime.

Pause control label: "Pause announcements" / "Play announcements".

## 2. Nav

Wordmark: **Savour**
Links: Why Savour · What's Inside · How It Works · Reviews · FAQ
CTA: **Subscribe & Save**

## 3. Hero

Eyebrow: AFTER COFFEE. AFTER WINE.

**H1: One chew after coffee and wine.**

Subhead: A swallowable tablet, taken in the thirty seconds after your
last sip, designed to help lift what coffee and wine leave behind.

CTA: **Subscribe & Save**
Risk reversal directly beneath: Cancel anytime. {guaranteeDays}-day
money-back guarantee.

Hero trust strip: Swallowable · No rinse · About 30 seconds

## 4. Trust strip

Swallowable · No rinse · About 30 seconds · Pocket tin · Food-grade
ingredients

(Same component reused as the hero's compact strip and again above the
pricing block.)

## 5. One chew replaces the drawer

Eyebrow: WHY SAVOUR

**H2: One chew replaces the drawer.**

Lead: You have already solved this problem five times. Mints in every
bag. Gum in the car. A whitening pen in a drawer you forget about.
Mouthwash you cannot use without a sink. A travel toothbrush you have
used twice.

Second paragraph: None of it is one decision, and none of it travels
together. Savour is designed to be the one thing you carry instead.

Third paragraph (objection 2, inline): It is not a stronger mint. A mint
covers the smell and leaves the residue where it is. Coffee oils and
wine pigments bond to enamel within minutes, and volatile sulfur
compounds cause the smell that lingers.
`[SOURCE NEEDED — dental/chemistry citation]`

Comparison table — "Your drawer today" vs "With Savour":

| Your drawer today | With Savour |
|---|---|
| Mints in every bag | One tin |
| Gum in the car | One chew |
| A whitening pen you forget | About 30 seconds |
| Mouthwash that needs a sink | No rinse, no sink |
| A travel toothbrush | Fits a pocket |

Closing line: An eraser, not an air freshener.

## 6. What's inside

Eyebrow: WHAT'S INSIDE

**H2: Three parts, one chew.**

Intro: The formula is short on purpose. Three jobs, one tablet, nothing
you need a dictionary to read.

**The cooling agent — erythritol.** An endothermic melt cools the mouth
and is designed to help close enamel's pores while residue is still
fresh. `[SOURCE NEEDED — dental/chemistry citation]`

**The acid that does the washing — malic acid.** Formulated to prompt a
salivary flood that helps carry coffee oils and wine pigments away
before they bond. Your own saliva is the delivery system, not a
synthetic rinse. `[SOURCE NEEDED — dental/chemistry citation]`

**The flavor system — matched to the drink.** Cardamom and sweet cream
after coffee. Dark cherry and sage after wine. Designed to sit with what
you just drank instead of fighting it the way mint does.

Accordion trigger: "Full ingredient detail" (closed by default, one per
bucket).

## 7. Benefits grid

Eyebrow: WHAT IT'S FOR

**H2: Four things it is designed to do.**

1. **Fresher breath** — Formulated to help address the sulfur compounds
   behind coffee and wine breath, rather than covering them.
2. **Less fresh staining** — Designed to help lift new surface residue
   before it has time to set on enamel.
3. **Works anywhere** — No sink, no rinse, no spitting. A car, a
   stairwell, and a client lobby all work.
4. **No ritual to remember** — One chew after the last sip. There is no
   step two.

## 8. Quality and testing

Full-bleed espresso band, white type.

Eyebrow: STANDARDS

**H2: What we can and cannot say yet.**

Body: Savour is made from food-grade ingredients in a facility that
follows `[MANUFACTURING STANDARD — confirm facility certifications]`. We
would rather show you an empty line than fill it with something we have
not earned.

Three items:
- Food-grade sourcing — Every ingredient is food-grade and intended to
  be swallowed, which is why there is nothing to spit out.
- Third-party testing — `[THIRD-PARTY TESTING — confirm before claiming]`
- Published research — `[RESEARCH CITATION SLOT]`

Closing line: This is a new product from a new brand. Read the
guarantee before you read anything else.

## 9. How it works

Eyebrow: HOW IT WORKS

**H2: Snap, melt, wash.**

1. **Snap** — You bite once. The shell cracks and releases the actives
   while residue is freshest.
2. **Melt** — The erythritol melt cools the mouth and is designed to
   help close enamel's pores.
   `[SOURCE NEEDED — dental/chemistry citation]`
3. **Wash** — A malic-acid-driven salivary flood is formulated to help
   carry oils and pigments away, then you swallow it.
   `[SOURCE NEEDED — dental/chemistry citation]`

Footnote: About thirty seconds, start to finish. Nothing to spit, no
sink required.

## 10. What's in your first order

Eyebrow: YOUR FIRST BOX

**H2: Here is the whole box.**

Intro: Two tins, because coffee and wine leave different things behind
and the flavors are matched to each. That is the answer to "why two
products."

Cards (each tagged "Included"):
- {variant.coffee.name} — {variant.coffee.flavor} — {chewsPerTin} chews
- {variant.wine.name} — {variant.wine.flavor} — {chewsPerTin} chews
- `[GIFT ITEM SLOT — confirm with client: pocket sleeve? refill card?
  Batch 001 card?]`

Footnote: {batchLabel} is limited to {foundersBatchUnits} sets. That is
the batch size, not a countdown.

## 11. Pricing block

Eyebrow: THE OFFER

**H2: One decision, priced plainly.**

Selector: **Subscribe & save {discountPercent}%** (pre-selected) /
One-time purchase

Bundle row: One Tin · The Pair (Most Popular) · The Full Set (Best Value)

Price display: {bundlePrice} — {perTin} per tin — you save
{savingsAmount} ({savingsPercent}%)

Large numeral: {perChew} — "per chew"

CTA: **Subscribe & Save**

Micro-copy under the button: Ships {intervalLabel}. Cancel anytime.
{guaranteeDays}-day money-back guarantee. Free shipping over
{freeShippingThreshold}.

## 12. Reviews

Eyebrow: REVIEWS

**H2: We have no reviews yet.**

Body: Savour has not shipped. Rather than borrow proof from somewhere
else, the review section is built and empty until real customers fill
it.

- `[REVIEW WIDGET SLOT]` with `[STAR RATING — pending launch]` and
  `[REVIEW COUNT — pending launch]`
- Three `[TESTIMONIAL SLOT — real customer quote pending launch]` cards

### What people told us

Label: Pre-launch customer research. Not product reviews. No names, no
photos, no ratings.

> "Mints just mask it for a few minutes and then it's back." *(quote 4)*

> "I shouldn't have to choose between my coffee and feeling confident
> for the rest of the day." *(quote 6)*

> "I notice other people's coffee breath immediately, so I assume
> everyone notices mine." *(quote 7)*

> "I'd pay more for something that actually solved this than for another
> tin of mints that does nothing." *(quote 12)*

## 13. Guarantee

**H2: {guaranteeDays} days, no argument.**

Two sentences: Order a tin, use it after your coffee and your wine, and
decide. If it is not doing what you hoped, tell us within
{guaranteeDays} days and we refund it.

## 14. FAQ (12 rows, all closed by default)

1. **Is it actually safe to swallow every day?** — Every ingredient is
   food-grade and intended to be swallowed, at the amounts used in a
   single chew. It is a food product, not a medicine, and it is not a
   replacement for brushing. If you are pregnant, nursing, or managing a
   medical condition, check with your clinician first.
2. **Isn't this just an expensive mint?** — A mint is designed to cover
   a smell. Savour is formulated to help wash residue off before it
   bonds, then be swallowed. Different job, different chemistry.
   `[SOURCE NEEDED — dental/chemistry citation]`
3. **Will it work fast enough to matter mid-meeting?** — It takes about
   thirty seconds and needs no sink, so it fits between the last sip and
   the next room.
4. **Won't the flavor clash the way mint does?** — Each flavor is built
   for the drink it follows. Cardamom and sweet cream after coffee, dark
   cherry and sage after wine.
5. **Is this backed by anything?** — The mechanism is grounded in
   published chemistry, and we will cite it here rather than paraphrase
   it. `[SOURCE NEEDED — dental/chemistry citation]` We have no clinical
   trial of our own, and we will not claim one.
6. **Why two products instead of one?** — Coffee leaves oils, wine
   leaves pigments, and the flavor that works after one is wrong after
   the other. Two tins is the honest answer.
7. **{basePrice} feels expensive. Why not just buy gum?** — Rendered
   live: a tin is {chewsPerTin} chews, which comes to {perChew} a chew
   on the subscription. Compare that to what the mints, gum, pen, and
   mouthwash cost together over a month.
8. **New brand, new category — will it ship and does it work?** —
   {batchLabel} is limited to {foundersBatchUnits} sets and ships to
   waitlist members first. The {guaranteeDays}-day guarantee is how you
   test the second half of that question at our risk, not yours.
9. **Do I have to change my coffee or wine habits?** — No. That is the
   entire point. Keep the second cup and the second glass.
10. **What does it actually taste like?** — Closer to a dessert note
    than a breath mint. Cool, faintly sweet, and short.
11. **When exactly do I take it?** — Within a few minutes of your last
    sip, while residue is freshest. There is nothing to do afterward.
12. **What is in the tin, and how do I carry it?** — {chewsPerTin}
    chews in a flat tin sized for a pocket, a bag, or a laptop sleeve.

## 15. Final CTA band

**H2: One chew. One tin. One habit.**

CTA: **Subscribe & Save**
Beneath: Cancel anytime, and {guaranteeDays} days to change your mind.

## 16. Footer

Columns:
- **Shop** — Post-Coffee, Post-Wine, The Pair, The Full Set
- **Learn** — Why Savour, What's Inside, How It Works, FAQ
- **Support** — Contact, Shipping, Returns, Guarantee
- **Company** — About, Ingredients policy, Accessibility, Careers

Email capture heading: Join the {batchLabel} waitlist.
Sub: One email when it ships. Nothing else.
Button: Join the waitlist (opens the modal — no separate submit path)

Legal line: © Savour. All rights reserved.

`[REGULATORY DISCLAIMER — confirm product classification with counsel]`
— a swallowed daily chew making oral-care claims may carry disclosure
obligations. This line stays visible and unwritten until counsel drafts
it.

## Waitlist modal

Heading: Join the {batchLabel} waitlist.
Body: Savour has not shipped yet. Leave an email and pick a flavor, and
you will hear from us once, when it does.
Fields: Email address · Which one are you waiting for? (Post-Coffee /
Post-Wine / Both)
Button: Join the waitlist
Error: Enter an email address we can actually reach.
Success: You're on the list. We will email you once, when {batchLabel}
ships.
