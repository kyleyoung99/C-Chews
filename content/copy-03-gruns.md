# Copy — `03-gruns` (modeled on Gruns)

Voice: confident, funny, faintly exasperated **on the reader's behalf**.
The joke is always aimed at **the format and the ritual** — never the
customer, never a named competitor. Short sentences. Fragments.
Imperatives. The comic turn lands on the last word.

The spine, carried over from Gruns' format-substitution pitch:
**you already know mints don't work — the format was never built for
this.** Competitors are named by format only ("a mint," "gum,"
"mouthwash"), never by brand.

Every efficacy claim is hedged: *supports, helps, designed to,
formulated to*. Never *removes, whitens, eliminates, prevents, cures*.
The jokes are marketing voice, not a license to overclaim.

---

## PLACEHOLDER CHECKLIST (every placeholder used in this template)

| Placeholder | Where |
|---|---|
| `[SOURCE NEEDED — dental/chemistry citation]` | §5 The problem (residue-bonding mechanism) |
| `[SOURCE NEEDED — mechanism-of-action citation]` | §7 How it works (MELT / enamel-surface claim) |
| `[SOURCE NEEDED — dental/chemistry citation]` | §8 What's in it (cooling agent mechanism) |
| `[SOURCE NEEDED — dental/chemistry citation]` | §8 What's in it (salivary-flood / acid mechanism) |
| `[SOURCE NEEDED — dental/chemistry citation]` | §11 Standards (safe-to-swallow substantiation) |
| `[SOURCE NEEDED — food-safety documentation]` | §11 Standards (food-grade ingredient substantiation) |
| `[SOURCE NEEDED — dental/chemistry citation]` | §15 FAQ 1 and FAQ 5 |
| `[INGREDIENT COUNT — pending final formulation]` | §8 What's in it — the display-size numeral |
| `[REVIEW SLOT]` × 3 | §12 Reviews — the three empty review cards |
| `[STAR RATING — pending launch]` | §12 Reviews — aggregate rating position |
| `[REVIEW COUNT — pending launch]` | §12 Reviews — aggregate count position |
| `[CERTIFICATION SLOT — pending launch]` | §11 Standards — third certification badge |
| Image placeholders (CSS/SVG cutout art, art direction in HTML comments) | §3 hero, §8 ingredients ×3, §10 taste ×2, §16 final CTA |

**Nothing fabricated anywhere:** no invented names, headshots, star
values, review counts, press logos, statistics, countdown timers, or
"N people viewing." Scarcity language comes only from
`config.launch.foundersBatchUnits`, phrased as a stated batch size.

**Everything numeric that touches money renders at runtime** from
`shared/config.js` via `shared/pricing.js`. Prices, per-chew cost,
subscription discount, free-shipping threshold, guarantee days, chews per
tin, batch label, and the founders-batch unit count are all `[LIVE]`
below — there is not one hardcoded figure in `index.html`.

**VOC quotes used: 1, 3, 5, 9, 11, 13 — and no others.**

---

## §1 — Announcement bar

> FREE SHIPPING OVER `[LIVE: freeShippingThreshold]` · SKIP TO THE TIN →

(ALL CAPS, under 60 characters, links to the pricing block.)

---

## §2 — Nav (sticky)

Wordmark: **Savour**
Links: Shop · Why a chew · What's in it · FAQ
Pill CTA: **Get my tin** (opens the waitlist modal)
Cart icon (label: "Cart — nothing in it yet, we haven't launched")

---

## §3 — Hero

**Eyebrow:** POST-COFFEE & POST-WINE CHEWS

**H1:** Mints were never going to fix this.

**Sub:** One chew, about thirty seconds, swallowed. Designed to lift what
your coffee just left behind — instead of parking a mint on top of it.

**Primary CTA:** Get my tin
**Secondary CTA:** Show me the receipts

**Trust row (micro-caps):** 30 SECONDS · NO RINSE · SWALLOW IT · FITS ANY POCKET

*Art direction:* tin + loose chews, knocked out and floated on a flat
`--brand` ground, hard saturated studio light. Coffee-bean and grape
cutout shapes orbiting. No moody grading.

---

## §4 — Thin proof strip (VOC marquee)

**Label:** WHAT PEOPLE TOLD US — CUSTOMER RESEARCH, NOT REVIEWS

Marquee items (quotes 1, 3, 5, 9, 11, 13, verbatim):

1. "I'll go straight from my afternoon coffee into a client call and just pray nobody's close enough to smell it."
3. "I keep gum in every bag, every car, every desk drawer — and it still doesn't really fix it."
5. "Mint gum after red wine tastes disgusting — it's like the two flavors are fighting each other."
9. "I've legitimately skipped ordering a second glass of wine before a work event because I didn't want to deal with it."
11. "If something actually worked in the moment, I'd keep it on me at all times — car, purse, desk, everywhere."
13. "The second I saw 'swallow it, no rinse needed' I was in — that's the whole reason mouthwash never worked for me on the go."

No press logos. Not a logo band. Pause control; frozen entirely under
`prefers-reduced-motion`.

---

## §5 — The problem

**H2:** The mint ritual, in three unflattering acts.

1. **A tin in every bag.** Every car. Every desk drawer. Still not enough.
2. **Five minutes of cover.** Then it's back, and now you're chewing again.
3. **Mint. After a Malbec.** Two flavors, one mouth, no survivors.

**Kicker:** Meanwhile the actual thing — coffee oils and wine pigments
bonding to enamel while you're still mid-sentence — goes completely
unaddressed. `[SOURCE NEEDED — dental/chemistry citation]`

---

## §6 — The comparison (the engine of the page)

**Eyebrow:** HEAD TO HEAD
**H2:** A mint vs. an eraser.
**Sub:** One covers. One's designed to lift. Only one of them is a plan.

| | **A mint** | **Savour** |
|---|---|---|
| Cover it or lift it | ✗ Covers it | ✓ Designed to lift it |
| Fresh coffee & wine residue | ✗ Not its job | ✓ Formulated to help |
| Sink, spitting, bathroom mirror | ✗ Where this usually ends | ✓ Never. Chew and swallow |
| Clashes with what you just drank | ✗ Famously | ✓ Composed to follow it |
| How long it takes | ✗ Five minutes of cover | ✓ About thirty seconds, done |
| Cost per use | ✗ Cheap. Also nothing | ✓ `[LIVE: formatPerChew]` a chew |

Left column: `--drab` ground, gray X marks, muted type, no border.
Right column: `--brand` ground, thick ink border, slight scale-up,
filled check marks. Mobile stacks with **Savour first**.

---

## §7 — How it works

**Eyebrow:** THREE STEPS. THAT'S THE WHOLE THING.
**H2:** Snap. Melt. Wash.

**01 SNAP** — Bite it. The shell cracks and the actives get to work while
the residue is still fresh.

**02 MELT** — Erythritol goes cold on contact. The chill is designed to
tighten enamel's surface. `[SOURCE NEEDED — mechanism-of-action citation]`

**03 WASH** — Malic acid brings on a flood of your own saliva, formulated
to help carry oils and pigments off before they settle. Then you swallow
it. No sink. No ceremony.

**Kicker:** Yes, that's it. The simplicity is the point.

---

## §8 — What's in it

**Eyebrow:** THE CREDIBILITY PART
**Display numeral:** `[INGREDIENT COUNT — pending final formulation]`
**Under it:** ingredients. All of them pronounceable.

**Marquee (two rows, opposite directions, ★ separators):**
ERYTHRITOL ★ MALIC ACID ★ CARDAMOM ★ SWEET CREAM ★ DARK CHERRY ★ SAGE ★
NO MINT ★ NO FOAM ★ NO RINSE

**The cooling agent — erythritol.** The cold snap you feel. It's there to
cool the mouth and support enamel's surface, not to taste like a candy
cane. `[SOURCE NEEDED — dental/chemistry citation]`

**The acid — malic acid.** Found in apples. Designed to trigger a
salivary flood that helps carry residue off before it bonds.
`[SOURCE NEEDED — dental/chemistry citation]`

**The flavor — built per drink.** Cardamom and sweet cream after coffee.
Dark cherry and sage after wine. Chosen to agree with what's already in
your mouth.

---

## §9 — What's *not* in it

**H2:** The list we're proudest of.

✗ No mint · ✗ No foam · ✗ No rinsing · ✗ No spitting · ✗ No plastic pen

**Kicker:** Nothing here needs a bathroom, a mirror, or an excuse to
leave the table.

---

## §10 — Taste

**Eyebrow:** THE PART NOBODY ELSE BOTHERS WITH
**H2:** Composed to follow your drink, not fight it.

**Savour Post-Coffee — cardamom & sweet cream.** Warm, faintly spiced,
finishes soft. Reads like the last third of the cup, not a course
correction.

**Savour Post-Wine — dark cherry & sage.** Fruit up front, herb on the
finish. Dessert energy. Zero dental-office energy.

---

## §11 — Standards

**Eyebrow:** BORING BUT LOAD-BEARING
**H2:** We'd rather show our work than shout.

Badges (chunky, rotated, colored — not gray seals):
- FOOD-GRADE INGREDIENTS `[SOURCE NEEDED — food-safety documentation]`
- FORMULATED TO BE SWALLOWED `[SOURCE NEEDED — dental/chemistry citation]`
- `[CERTIFICATION SLOT — pending launch]`

**Kicker:** Never sober up just to be believed.

---

## §12 — Reviews

**H2:** This is where the reviews go.

Three cards, real layout, structurally empty:
`[REVIEW SLOT]` `[REVIEW SLOT]` `[REVIEW SLOT]`
Aggregate row: `[STAR RATING — pending launch]` · `[REVIEW COUNT — pending launch]`

**Note:** We're pre-launch. Nobody has reviewed this yet, so nobody's
pretending to. Check back after `[LIVE: batchLabel]`.

---

## §13 — Pricing block

**Eyebrow:** `[LIVE: batchLabel]` · `[LIVE: foundersBatchUnits]` TINS
**H2:** Pick your rhythm.

**Option A — Subscribe** (pre-selected, badged "Most popular"):
`[LIVE: subscriptionPrice]` · `[LIVE: discountPercent]`% off, every 30
days. Skip or cancel whenever. Founders Batch price, locked for life.

**Option B — One-time:** `[LIVE: bundle price]` · One tin,
`[LIVE: chewsPerTin]` chews, no commitment.

**Per-chew callout (the conversion device):**
That's about `[LIVE: formatPerChew]` a chew. Roughly what you tip on the
coffee that caused the problem.

**CTA:** Get my tin
**Under the button:** `[LIVE: guaranteeDays]`-day money-back guarantee.
Free shipping over `[LIVE: freeShippingThreshold]`.

---

## §14 — Guarantee sticker

Rotated sticker on a color band:

**`[LIVE: guaranteeDays]` DAYS**
Chew it. Judge it. If it's not for you, we'll refund it. No form to fill
in, no essay about why.

---

## §15 — FAQ (all nine objections, in voice, all closed by default)

**1. Is it actually safe to swallow every day?**
That's the design brief, not an afterthought. Every ingredient is
food-grade and intended to be eaten — erythritol and malic acid both turn
up in the produce aisle. Nothing here is meant to be spat out, because
nothing here needs a sink.
`[SOURCE NEEDED — dental/chemistry citation]`

**2. Isn't this just an expensive mint?**
A mint covers a smell for a few minutes. Savour is formulated to work on
the residue itself — a cold snap designed to tighten enamel's surface,
then a malic-acid-driven saliva flood designed to help carry coffee oils
and wine pigments off before they settle. Different job, different
format, same pocket.

**3. Will it work fast enough to matter mid-meeting or mid-date?**
About thirty seconds, start to swallow. No rinsing, no spitting, nowhere
to be. You can do it under the table and nobody will clock it — though
we'd love it if they did.

**4. Won't the flavor clash the way mint does?**
That's the entire reason there are two of them. Post-Coffee is cardamom
and sweet cream. Post-Wine is dark cherry and sage. Both were composed to
agree with what you just drank instead of declaring war on it.

**5. Is this backed by anything?**
It's built on established chemistry: coffee oils and wine's anthocyanin
pigments bond to enamel within minutes, and volatile sulfur compounds are
what actually linger.
`[SOURCE NEEDED — dental/chemistry citation]` We're pre-launch, so we're
not going to wave around a clinical trial we haven't run. When there's
data, it goes on this page with the citation attached.

**6. Why two products instead of one?**
Because one flavor that suits both coffee and red wine doesn't exist, and
building it would mean building something that suits neither. Coffee ends
warm and round. Wine ends dark and tannic. Different finishes, different
chew.

**7. Feels expensive — why not just buy gum?**
Do the per-chew math. A tin works out to about `[LIVE: formatPerChew]` a
chew, which is less than the tip on the coffee that started this. Gum is
cheaper, and it's doing something else entirely. You're not comparing
prices. You're comparing outcomes.

**8. New brand, new category — will it ship and does it work?**
Fair. We're pre-launch, in `[LIVE: batchLabel]`, capped at
`[LIVE: foundersBatchUnits]` tins. Join the list and you'll get the ship
date from us before you get it anywhere else. Every tin carries a
`[LIVE: guaranteeDays]`-day money-back guarantee, which is our way of
putting the risk on our side of the table.

**9. Do I have to change my coffee or wine habits?**
No. God, no. That's the whole pitch. Order the second glass. Get the
afternoon Americano. Savour is designed to handle the aftermath so the
habit stays exactly where you left it.

---

## §16 — Final CTA band

**H2:** Keep the coffee. Keep the wine. Lose the tin of mints.
**CTA:** Get my tin
**Under:** `[LIVE: batchLabel]` · `[LIVE: foundersBatchUnits]` tins ·
`[LIVE: guaranteeDays]`-day money-back guarantee

---

## §17 — Footer

Columns: Shop · Learn · Company · Fine print (inert `#` links).

**Email capture:** "Get on the list before the tins go."
Placeholder: `you@wherever.com` — Button: "Save me a tin"

Legal: pre-launch disclosure, no medical claims, not a substitute for
brushing.

---

## Waitlist modal micro-copy (in voice, not "Submit")

**Heading:** Save me a tin.
**Body:** `[LIVE: batchLabel]` is `[LIVE: foundersBatchUnits]` tins.
Leave an email and we'll tell you the second it's real.
**Email placeholder:** you@wherever.com
**Variant select label:** Which one are you here for?
**Button:** Put me on the list
**Error state:** That email's missing something. Have another go.
**Success state:** You're on the list. Go finish your coffee — we'll take
it from here.
**Close label:** Close
