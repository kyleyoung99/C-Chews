# DESIGN.md — Three Token Sets

Written before any CSS, per build prompt v3 §12 build order. All three
reference sites (drinkag1.com, bloomnu.com, gruns.co) were
network-egress-blocked in this session — see `REFERENCE-NOTES.md`. Every
value below is taken verbatim from the build prompt's own §6b/§7/§8/§9
token tables, **not** sampled from the live pages, and is not presented as
verified.

---

## The differentiation matrix (build prompt v3 §6b)

| | **01 — AG1** | **02 — Bloom** | **03 — Gruns** |
|---|---|---|---|
| Page ground | White + warm sand `#F3EEE4` | White + `#FAF7F2` | White |
| Dominant band color | Espresso-black `#1E1712` | Rotating pastels | Saturated berry `#C81D4A` |
| Brand color | `#8C6239` roasted brass | `#6B1030` | `#C81D4A` |
| Display / body | `Archivo` / `Inter` | `Poppins` / `DM Sans` | `Fredoka` / `Hanken Grotesk` |
| Card radius | 14px | 12–20px | 20–28px |
| Shadow budget | ≤4, soft, structural only | 0–4, floating elements only | ≤3, hard-offset only |
| Border language | 1px hairlines | Light hairlines, mostly none | 2–3px solid ink |
| Hero archetype | Split, product-forward | Full-bleed lifestyle, rotating slides | Cutout on saturated ground |
| Section count | 16 | 15 | 17 |
| Word count | Highest | Medium | Lowest (~900–1,400) |
| Photography load | Moderate — studio + lifestyle | Very heavy — 50–65% | Cutout product on flat color |
| Recurring component | Benefit card, hedged sentence | Product card with swatches | Comparison column + marquee |
| Voice | Calm, declarative | Warm, upbeat, second person | Funny, exasperated on your behalf |
| CTA label | "Subscribe & Save" | "Add to bag" | "Get my tin" |
| Motion budget | 200–300ms fades only | Card hover, carousels, video | 120–180ms snap, two marquees |

**The caveat, stated plainly (verbatim from the prompt):** all three
reference brands use a predominantly white page ground and fully-rounded
pill buttons. Those two rows genuinely coincide, and forcing them apart
would mean departing from the references. Distinctness here comes from
band color, type personality, density, border language, shadow style, and
component vocabulary — not from the background value.

---

## 01 — `01-ag1` (modeled on AG1 / Athletic Greens)

| Token | Value | Note |
|---|---|---|
| `--bg` | `#FFFFFF` | Dominant. Most sections sit on plain white. |
| `--bg-alt` | `#F3EEE4` | Warm sand, for banding alternate sections. |
| `--deep` | `#1E1712` | Espresso-black. Full-bleed bands, footer, and used as an ink color — headings tint toward it rather than pure black. |
| `--brand` | `#8C6239` | Roasted brass. It *is* the brand; everything else is neutral scaffolding around it. |
| `--ink` | `#1E1712` | |
| `--muted` | `#645B50` | Desaturated warm gray, not neutral gray. |
| `--rule` | `#E3DFD6` on sand, `#E8E6E2` on white | Hairlines only. |
| `--font-display` | Archivo 600/700 | Tall x-height, squarish, neutral-clinical. Do not substitute Poppins, Montserrat, or a display serif. |
| `--font-body` | Inter 400/500 | 17–18px, line-height 1.55, measure 60–68ch. |

Case: sentence case for headings/body; uppercase reserved for eyebrows and
badges (12–13px, `+0.08em`). Headings tracked `-0.02em`. H1 48–64px
desktop / 32–36px mobile, ≤3 lines. H2 32–40px, 3–7 words.

Radius: buttons `999px` pill, cards 14px, media 20px. Shadows: **≤4
declarations page-wide**, only on sticky bar / nav panels / modal. Cards
separate by tinted fill + hairline, not elevation. Zero gradients. Icons:
single-weight line icons, ~1.75px stroke, rounded caps, monochrome.

Accent discipline: `--brand` touches primary buttons, wordmark,
checkmarks/icons, 1–2 emphasized heading words, small badges, deep bands.
Never a body-text color or card background.

Section padding 96px desktop / 56px mobile. Motion: 200–300ms fades,
hover, accordion expansion only. No parallax, no count-ups.

**Section order (16, build in this sequence):** Announcement bar → sticky
nav → hero → trust strip → "one chew replaces the drawer" reframe →
what's inside (accordion) → benefits grid (4 cards) → quality/testing
(`--deep` band) → how it works (Snap/Melt/Wash) → what's in your first
order (itemized stack before price) → pricing block (subscribe
pre-selected + per-chew numeral) → reviews (empty slots + "what people
told us" VOC block) → guarantee band → FAQ accordion (8–12 rows) → final
CTA band (`--deep`) → footer (+ regulatory disclaimer slot).

Voice: calm, plain, declarative, second person. Headlines 4–9 words; body
12–22 words/sentence, one idea each. No exclamation points, no hype
adjectives, no emoji. Hedge every claim ("supports," "helps," "designed
to," "formulated to" — never "removes," "whitens," "eliminates,"
"prevents," "cures"). Offer copy factual, not urgent — no countdowns, no
"only 3 left."

VOC quotes: 4, 6, 7, 12. CTA label: "Subscribe & Save."

---

## 02 — `02-bloom` (modeled on Bloom Nutrition)

| Token | Value | Note |
|---|---|---|
| `--bg` | `#FFFFFF` | True white — resist the cream reflex. |
| `--bg-tint` | `#FAF7F2` | Faint warm off-white, band separation only. |
| `--brand` | `#6B1030` | Constant brand color: wordmark, primary CTAs, footer ground, eyebrows, checkmarks, links. |
| `--brand-deep` | `#4A0B21` | Footer, full-bleed dark bands. |
| `--pastel-coffee` | `#EADBC8` | Post-Coffee's assigned color. |
| `--pastel-wine` | `#F2D4DA` | Post-Wine's assigned color. |
| `--pastel-3` / `--pastel-4` | `#E0D8F0` / `#D4E4F2` | Reserved for future SKUs; used on the "what's next" tile. |
| `--ink` | `#1E1E1E` | Neutral near-black, not warm brown. |
| `--muted` | `#6A6A6A` | |
| `--rule` | `#E6E4E0` | Light hairlines, sparing. |
| `--font-display` | Poppins 500/600/700 | |
| `--font-body` | DM Sans 400/500 | |

Type scale: 12/14/16/18/22/28/40/56/72. Body measure 58–66ch; hero
headline <30ch. Headlines sentence case or lowercase, tight tracking.
Eyebrows/button labels UPPERCASE 11–13px, `+0.06–0.12em` tracking — the
macro-lowercase / micro-uppercase contrast is central to the look.

Radius: pill buttons, cards 12–20px, images 12–24px. Shadows: **0–4
total**, floating elements only (sticky bar, cart drawer, quick-add).
Depth from color blocking + photography, not elevation.

Imagery load is the point: 50–65% of the first four screens photographic
— studio product on pastel, aspirational lifestyle, phone-shot vertical
video. Every photo position is a labeled placeholder with art direction
in an HTML comment.

**Section order (15, build in this sequence):** Announcement bar
(rotating) → sticky nav w/ cart drawer → hero (rotating slides tied to
variants) → trust icon bar → "start here" rail (product cards, recurs 3x)
→ shop by moment (3 tiles) → deep dive: why a chew → find your flavor
(2 variant tiles, per-SKU pastel) → our story → proof band (empty +
"Sound familiar?" VOC block) → video rail (`[FOUNDER VIDEO SLOT]`) → quiz
band → bundles → email capture → footer (`--brand-deep`).

Voice: warm, direct, second person, upbeat. Headlines 3–7 words, body
8–16 words, often fragments. Talks about how it feels/tastes as much as
how it works. Never clinical, never restrictive.

VOC quotes: 2, 8, 10, 14. CTA label: "Add to bag." No press logos — a
"how it's made" strip replaces "as seen in."

---

## 03 — `03-gruns` (modeled on Gruns)

| Token | Value | Note |
|---|---|---|
| `--bg` | `#FFFFFF` | |
| `--brand` | `#C81D4A` | Vivid berry. Loud, not muted — if it starts looking calming, it's wrong. |
| `--brand-deep` | `#8A0F31` | Depth on stacked blocks, text on light brand fills. |
| `--ink` | `#101010` | High-contrast near-black. |
| `--muted` | `#4A4A4A` | |
| `--accent-yellow` | `#FFC53D` | Starbursts, "BEST VALUE" flags. |
| `--accent-orange` | `#FF6B35` | Mid-page jolt block, flavor callouts. |
| `--drab` | `#D9D6D0` | The loser column's ground in the comparison block — deliberately dull. |
| `--font-display` | Fredoka 600/700 | Chunky, rounded, cheerful. |
| `--font-body` | Hanken Grotesk 400/600 | |

Type: hero `clamp(2.75rem, 7vw, 5.5rem)`, h2 `clamp(2rem, 4.5vw, 3.5rem)`,
h3 `1.375rem`, body `1.0625rem`, eyebrows `0.75rem` caps. Sentence case,
tight tracking (`-0.02` to `-0.03em`); ALL-CAPS reserved for eyebrows,
badges, buttons, marquee (`+0.06–0.1em`). No serif anywhere.

Radius: pill buttons, cards 20–28px. Shadows: **≤3, all hard-offset**
(`6px 6px 0 var(--ink)`) on stickers/badges — no soft diffuse shadows
anywhere. Thick 2–3px solid ink borders on cards/stickers/secondary
buttons — hairline gray borders are wrong here.

Accent discipline: `--brand` is a ground and CTA color. Yellow/orange
touch only stickers, badges, marquee stripes, underline swashes,
illustration fills — never body text, never a second section ground more
than once.

Graphic devices: squiggles, starbursts, confetti dots, hand-drawn circles
around a word, stickers rotated −4° to +6°. Cutout product photography on
flat color, hard-lit and saturated. No moody lifestyle grading.

**Section order (17, build in this sequence):** Announcement bar → sticky
nav → hero (cutout on `--brand` ground) → thin proof strip (VOC marquee,
no press logos) → the problem (funny/short) → **the comparison** (mint on
`--drab` vs. Savour on `--brand`, engine of the page) → how it works →
what's in it (ingredient marquee, both directions, freezes under
reduced-motion) → what's *not* in it → taste → standards (rotated chunky
badges) → reviews (empty slots) → pricing block (subscribe pre-selected,
per-chew cost broken out) → guarantee sticker → FAQ → final CTA band →
footer.

Voice: confident, funny, faintly exasperated on the reader's behalf.
Humor targets the format and the ritual, never the customer, never a
named brand. Short sentences, fragments, imperatives, comic turn on the
last word. Write micro-copy (buttons, announcement bar, form
placeholders, modal states) in voice too — default "Submit"/"Learn more"
is where this template goes flat.

VOC quotes: 1, 3, 5, 9, 11, 13. CTA label: "Get my tin." Density target:
~900–1,400 words total, no section >~45 words outside the FAQ.
