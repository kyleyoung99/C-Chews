# Copy — `02-bloom` (modeled on Bloom Nutrition)

Every line of on-page copy for `templates/02-bloom/index.html`, written
before the markup. Voice: warm, direct, second person, upbeat. Headlines
3–7 words, sentence case or lowercase. Body 8–16 words, often fragments.
Talks about how it feels and how it tastes as much as how it works. Never
clinical, never restrictive. CTA label everywhere: **"Add to bag."**

Facts are from `content/facts.md`. Tokens are from `DESIGN.md` (02-bloom
table). VOC quotes assigned to this template: **2, 8, 10, 14** — no others.

---

## Placeholder checklist (every placeholder used on this page)

| Placeholder | Where it appears |
|---|---|
| `[STAR RATING — pending launch]` | §5 rail cards (×4), §8 flavor cards (×2), §10 proof band header, §13 bundle cards (×3) — rendered as a visibly empty 5-slot row, never a number |
| `[REVIEW COUNT — pending launch]` | §10 proof band header |
| `[TESTIMONIAL SLOT — real customer quote pending launch]` | §10 proof band, ×3 review cards, rendered as real card layout with an empty quote well |
| `[FOUNDER VIDEO SLOT]` | §11 video rail, ×3 vertical 9:16 cards |
| `[SOURCE NEEDED — dental/chemistry citation]` | §7 problem paragraph; §7 MELT step; §14 FAQ "Is this backed by anything?" |
| `[PHOTO — …]` (art direction in an adjacent HTML comment at every position) | §3 hero plates ×2; §5 card plates ×4; §6 moment tiles ×3; §7 hero product shot + how-it's-made strip ×3; §8 flavor plates ×2; §9 story portrait; §10 review card avatars ×3; §11 video posters ×3; §12 quiz plate; §13 bundle plates ×3 |

Nothing on this page states a rating, a review count, a customer name, a
press logo, a statistic, or a countdown. Scarcity language comes only from
`config.launch.foundersBatchUnits` / `batchLabel`, phrased as a stated
batch size, never as a live counter.

**All numerals that config owns render at runtime** via `shared/pricing.js`
— prices, per-tin, per-chew, savings amount and percent, free-shipping
threshold, subscription discount percent and interval, guarantee days,
chews per tin, founders batch units, batch label. None of them are typed
into `index.html`.

---

## §1 — Announcement bar (rotating, ~4.5s, pause control)

Three messages, all rendered from config at runtime:

1. `Free shipping over {freeShippingThreshold}.`
2. `{batchLabel} — {foundersBatchUnits} tins made, then we restock.`
3. `{guaranteeDays} days to change your mind.`

Pause control label: `Pause announcements` / `Play announcements`.

## §2 — Nav

Wordmark: **savour** · Links: Shop · The two · How it works · Our story ·
FAQ · Icons: Search, Bag.

**Cart drawer**

- Heading: `Your bag`
- Empty state: `Nothing in here yet. Pick a tin — we'll hold it for Batch 001.`
- Progress bar label (live): `{amountToFreeShipping} away from free shipping.`
- Qualified state (live): `Free shipping unlocked.`
- Drawer CTA: `Add to bag` → opens the waitlist modal.
- Footnote: `No checkout yet. Batch 001 is a waitlist.`

## §3 — Hero (rotating slides, coffee → wine)

- **H1:** `Coffee, wine, and confidence.`
- **Subhead (objection 9):** `One chew after the cup or the glass. Nothing to
  give up, nothing to rinse.`
- Slide 1 eyebrow: `POST-COFFEE · CARDAMOM & SWEET CREAM`
  Slide 1 line: `For the walk back to your desk.`
- Slide 2 eyebrow: `POST-WINE · DARK CHERRY & SAGE`
  Slide 2 line: `For the gap between courses.`
- Primary CTA: `Add to bag` (preselects the visible slide's variant)
- Secondary text link: `See how it works`
- Pause control: `Pause slideshow` / `Play slideshow`

## §4 — Trust icon bar

`30 seconds` · `No rinse` · `Chew and swallow` · `Pocket tin`

## §5 — "Start here" rail

- Eyebrow: `THE RANGE`
- **H2:** `Start here.`
- Sub: `Two chews, two moments. Most people end up with both.`
- Cards: Post-Coffee · Post-Wine · The Pair · and a fourth "what's next"
  tile on the reserved pastels: `More coming.` / `Batch 002 is already in
  flavor development.` (no CTA, no date promised)
- Each card: pastel plate photo, name, flavor descriptor, empty
  `[STAR RATING — pending launch]` row, live price, flavor swatch row,
  quick-add pill `Add to bag`.
- Rail arrow labels: `Previous products` / `Next products`

## §6 — Shop by moment

- **H2:** `Shop by moment.`
- Tile 1: `After the morning coffee`
- Tile 2: `After the second glass`
- Tile 3: `Keep one everywhere.`

## §7 — Deep dive: why a chew (objections 2, 3, 4)

- Eyebrow: `WHY A CHEW`
- **H2:** `Not a mint. An eraser.`
- Lede: `Mint adds a flavor on top of the one you're worried about. Savour is
  designed to work on what's actually there.`
- Problem paragraph: `Coffee oils and wine pigments start bonding to enamel
  within minutes, and the smell comes from volatile sulfur compounds. So it
  isn't a freshness problem — it's residue, setting in real time.`
  `[SOURCE NEEDED — dental/chemistry citation]`

**Benefit rows**

1. **It's not an expensive mint.** *(objection 2)* — `A mint layers a second
   flavor over the first. This one is formulated to help lift the residue
   itself, then get swallowed. Different job entirely.`
2. **Thirty seconds, no sink.** *(objection 3)* — `Fast enough for the walk
   back to your desk, or the gap between courses. No rinsing, no spitting,
   nowhere to hide.`
3. **Flavors that follow your drink.** *(objection 4)* — `Cardamom and sweet
   cream after coffee. Dark cherry and sage after wine. Chosen to sit on top
   of what you just drank, not fight it.`
4. **Your own saliva does the work.** — `No foam, no synthetic rinse. Just a
   chew designed to work with what your mouth already makes.`

**Snap → Melt → Wash** (hand-drawn inline SVG, warm and rounded)

- SNAP — `Bite. The shell cracks and the actives go to work while the
  residue is freshest.`
- MELT — `The erythritol melt runs cool, which is designed to help enamel's
  pores close up.` `[SOURCE NEEDED — dental/chemistry citation]`
- WASH — `Malic acid brings on a flood of saliva to help wash oils and
  pigment away. Then you swallow it. Done.`

**How it's made strip** (this replaces any "as seen in" press row — no press
logos anywhere on this page)

- `Food-grade erythritol` — `The same sugar alcohol you've eaten in gum and
  fruit. It's what makes the melt run cool.`
- `Food-grade malic acid` — `The tartness in green apples. Here it's doing
  one job: getting saliva moving.`
- `Made in a food facility` — `Not a lab bench. Batch 001 is small on
  purpose so we can taste every run.`

## §8 — Find your flavor (objection 6)

- Eyebrow: `THE TWO`
- **H2:** `Find your flavor.`
- Sub *(objection 6)*: `Why two and not one? Coffee leaves oils behind. Wine
  leaves pigment. Different messes, different flavor to follow them.`
- **Post-Coffee** — tasting note: `Warm cardamom, a little sweet cream, a
  finish that tastes like the good part of the latte. Reads dessert, not
  dental.`
- **Post-Wine** — tasting note: `Dark cherry up front, a green snap of sage
  underneath. Made to follow a red, not clash with it.`
- Tile CTA: `Add to bag`

## §9 — Our story (objection 8, part one) + VOC quote 14

- Eyebrow: `OUR STORY`
- **H2:** `It started with a mint.`
- Body (first person, no founder name): `It started mid-meeting, reaching for
  mint after mint and realizing every one of them just added a second flavor
  on top of the first. Nothing was getting erased. So the question changed —
  not "how do we make breath smell better," but "what is coffee actually
  doing in there, and how do you reverse it in the time you really have?"
  The walk back to your desk. The gap between courses. That's why it's a
  chew and not a rinse or a strip: it had to work anywhere, without a sink,
  in under a minute.`
- Honesty line *(objection 8)*: `We're pre-launch. {batchLabel} is
  {foundersBatchUnits} tins, and you'll hear from us when it ships — or if it
  slips.`
- Pull quote, labeled **customer research, not a review** — VOC **14**:
  `"I like that it feels like a little ritual instead of just 'fixing a
  problem' — it makes me feel more put together, not just less embarrassed."`

## §10 — Proof band (structurally empty) + "Sound familiar?"

- **H2:** `Reviews open at launch.`
- Rating header renders empty: `[STAR RATING — pending launch]` and
  `[REVIEW COUNT — pending launch]`, with the honest line: `Nothing has
  shipped yet, so there's nothing to rate. This is where your review will
  go.`
- Three review cards, real layout, empty wells:
  `[TESTIMONIAL SLOT — real customer quote pending launch]`

**Sound familiar?** — labeled `FROM OUR CUSTOMER RESEARCH — not reviews.
No names, no ratings, no photos.` VOC **2**, **8**, **10** only:

- 2 — `"I've gotten photos back from dinner where I'm just not smiling with
  teeth anymore because of the wine."`
- 8 — `"I caught myself covering my mouth when I laughed at dinner because I
  knew the wine had gotten to my teeth."`
- 10 — `"I was so annoyed scrubbing my teeth in a restaurant bathroom mirror
  before a date."`

## §11 — Video rail

- **H2:** `Straight from the kitchen.`
- Sub: `Nothing filmed yet. These are the three we're shooting first.`
- Cards: `Making Batch 001` · `The taste test` · `Why it's a chew`
- Each: `[FOUNDER VIDEO SLOT]`
- Pause control: `Pause previews` / `Play previews` (frozen entirely under
  reduced motion)

## §12 — Quiz band

- **H2:** `Coffee person or wine person?`
- Sub: `Three questions. Ten seconds. We'll pick your tin.`
- Q1 `Which one are you having twice in a day?` — `A second coffee` /
  `A second glass of red` / `Honestly, both`
- Q2 `When does it hit you that you need this?` — `Right before a 2pm call` /
  `Mid-laugh at dinner` / `In a bathroom mirror, either one`
- Q3 `Pick the flavor you actually want.` — `Cardamom and sweet cream` /
  `Dark cherry and sage` / `Both, obviously`
- Result (coffee): `You're a Post-Coffee.` Result (wine): `You're a
  Post-Wine.` Tie: `You're both. Start with the pair.`
- Result CTA: `Add to bag` → opens the modal with that variant preselected.
- Restart: `Start over`

## §13 — Bundles (objection 7, live per-chew math)

- Eyebrow: `BUNDLES`
- **H2:** `Buy the way you'll actually use it.`
- Toggle: `Subscribe` (preselected, shows live discount % and interval) /
  `One time`
- Every card renders from `config.pricing.bundles`: label, badge, live
  price, struck-through base sum, live `Save {amount}` pill, live
  `{perChew} a chew`, live free-shipping status.
- **Objection 7 line:** `Roughly the price of a coffee, spread over a month
  of them. The per-chew number is right on the card — do the gum math
  yourself.`
- Subscribe note (live): `{discountPercent}% off, {intervalLabel}. Skip or
  cancel whenever.`
- Card CTA: `Add to bag`

## §14 — Email capture (objection 8, part two) + FAQ

- Eyebrow: `EARLY ACCESS`
- **H2:** `Get first pick of Batch 001.`
- Sub: `{foundersBatchUnits} tins. You'll get the email before anyone else,
  and the {priceLockCopy}`
- Input placeholder: `you@email.com` · Button: `Add to bag`
- Consent microcopy: `Email only, launch news only. Unsubscribe in one
  click.`

**FAQ** (keyboard accordion, folded into §14)

1. `Is it safe to swallow every day?` *(objection 1)* — `It's a food-grade
   chew, built to be swallowed — that's the whole design. Erythritol and
   malic acid are both ordinary food ingredients you've almost certainly
   eaten already. It isn't medicine and it doesn't replace brushing.`
   `[SOURCE NEEDED — dental/chemistry citation]`
2. `Is this backed by anything?` *(objection 5)* — `The mechanism is
   everyday food chemistry, and we'll publish our sourcing. What we won't do
   is claim a clinical result we haven't run. Nobody has used this yet, so
   anything we said about outcomes today would be made up.`
   `[SOURCE NEEDED — dental/chemistry citation]`
3. `Do I have to change how I drink?` *(objection 9)* — `No. That's the
   entire point. Same coffee, same wine, same order at dinner.`
4. `Isn't this just a fancy mint?` *(objection 2, echoed)* — `A mint adds a
   flavor. This is designed to help lift what your drink left behind, then
   get swallowed.`
5. `Will it ship?` *(objection 8)* — `{batchLabel} is {foundersBatchUnits}
   tins. We'll email a real date, and if it moves we'll email that too.`
6. `What if I don't love it?` — `{guaranteeDays} days. Tell us and we'll make
   it right.`

## §15 — Footer

Wordmark, one line: `Keep the habit. We'll handle the after.`
Columns — **Shop:** Post-Coffee · Post-Wine · The Pair · Bundles ·
**Learn:** How it works · Our story · Ingredients · FAQ ·
**Company:** Contact · Wholesale · Careers ·
**Legal:** Privacy · Terms · Accessibility · Shipping.
Social: Instagram · TikTok · YouTube.
Bottom line: `Savour is a pre-launch concept. Nothing on this page is a
medical claim, and Savour is not a substitute for brushing or dental care.`

---

## Objection coverage map

| # | Objection | Where it's answered |
|---|---|---|
| 1 | Safe to swallow daily? | §14 FAQ item 1 |
| 2 | Just an expensive mint? | §7 lede + benefit row 1 (echoed §14 FAQ 4) |
| 3 | Fast enough mid-meeting? | §7 benefit row 2 |
| 4 | Flavor clash like mint? | §7 benefit row 3 (+ §8 tasting notes) |
| 5 | Backed by anything? | §14 FAQ item 2 |
| 6 | Why two products? | §8 sub-headline |
| 7 | $20 vs. gum | §13 live per-chew math + copy line |
| 8 | New brand — will it ship? | §9 honesty line + §14 capture + FAQ 5 |
| 9 | Change my habits? | §3 hero subhead (+ §14 FAQ 3) |

## Component-reuse map (the product card)

The product card is this page's recurring component. It appears in **§5**
(rail, ×4), **§8** (flavor tiles, ×2), **§11** (video rail, same card shell
in 9:16), and **§13** (bundles, ×3) — same class, same internals, four
grounds.
