# Reference tokens — sampled from saved copies of the three pages

**Status: this file is the authority.** Where it disagrees with the token tables in `README.md` §7–§9, this file wins. Those tables were written from knowledge before the pages were available; these values were extracted from saved copies of the live pages.

**What was available:** "Webpage, Complete" saves — full HTML plus inline critical CSS (256KB / 241KB / 129KB respectively). **What was missing:** the `_files/` folders, so the external stylesheets, images and webfont files were not present. Consequences: font *names* are recovered but not the files; colors and geometry come from inline critical CSS and utility classes, which covers the brand tokens well but not every rule on the page. Anything below marked *(inferred)* comes from class names rather than a declaration.

---

## AG1 — drinkag1.com

```css
--ag1-dark:        #071a24;  /* dominant dark ground — a deep navy-teal, NOT forest green */
--ag1-dark-2:      #122231;
--ag1-white:       #ffffff;
--ag1-green:       /* token named `bg-go-green` in markup, 40 uses; value in the missing CSS */
--ag1-accent-blue: #0a7da4;
--ag1-neutral:     #dddddd  #eeeeee  #bbbbbb;
```

**Typefaces:** `ABC Diatype` and `ABC Diatype Mono` (grotesque + mono), and **`TimesNow` / `TimesNow-Light`** — a light display **serif**. Also `TWKLausanne-300`, `Items`.
**Geometry:** `border-radius: 9999px` (pills) and a `--border-radius-lg` token; `rounded-card` and `rounded-full` are the dominant utility classes. `font-mono` appears 37 times — monospace is a real part of this page's voice.
**Sections:** 14. **Real H2s, in order:** AG1 for Every 1 · Compare AG1 Products · Nutrition Built for Your Goals · Over 60,000 Satisfied Customers and Counting · Tested for those that test themselves · The Smarter Way to Invest in Your Health · What People Are Saying · Featured Products · Introducing AG1 Pro · FAQs · Nutrition Facts · Additional Nutritional Details.

### Three corrections to README §7

1. **AG1 uses a serif.** The spec said sans-only and named Archivo + Inter. The page pairs a light display serif (TimesNow) with a grotesque (ABC Diatype) and a mono. Substitute: **`Instrument Serif`** or **`Fraunces`** for display, **`Inter`** for body, **`IBM Plex Mono`** for the labels.
2. **The dark is navy-teal `#071a24`, not deep green.** The green is a CTA/accent token, not the ground.
3. **It is no longer a single-SKU page.** "Compare AG1 Products", "Featured Products" and "Introducing AG1 Pro" mean the consolidation argument now shares the page with a product range. The one-scoop-replaces-the-shelf framing is still the right model for Savour, but do not claim the current page has no product grid.

---

## Bloom Nutrition — bloomnu.com

```css
--bloom-green:      #215b32;  /* the brand green — 47 occurrences, the single most-used brand color */
--bloom-white:      #ffffff;
--bloom-ink:        #0b0b0b;
--bloom-sage:       #bfdeb5;
--bloom-sage-2:     #aaccaa;
--bloom-sage-3:     #91a98a;
--bloom-lilac:      #ead4f8;
--bloom-lilac-2:    #e3d3ff;
--bloom-star-gold:  #ffcf2a;  /* review stars */
--bloom-slate:      #272d45;  #676986;  #dbdde4;
/* #4e34e0 purple belongs to the third-party loyalty widget, not the brand palette */
```

**Typefaces:** **`Timesquare` (Bold and Regular)** and **`Gazpacho Black`** — both **serifs**, and `font-family-timesquare-bold` is the single most-used utility class on the page (30 uses). Body/UI: `TT Travels DemiBold` and `Poppins`.
**Geometry:** radii of 8 / 12 / 16 / 24 / 50px plus a `--border-radius-lg` token — softer and more varied than AG1. Shadows are minimal.
**Sections:** 11. **Real H2s, in order:** Your Cart Is Ready · Shop our Best Sellers · Save 15% with wellness on repeat (×2) · Bloom Into Your Best Self · Blooming looks good on you.

### Two corrections to README §8

1. **Bloom's display face is a serif, not Poppins.** Poppins is present but it is the UI/body face. The headline voice is a bold serif. Substitute: **`Prata`** or **`Playfair Display`** for display, **`Poppins`** for body/UI.
2. **The pastel system is confirmed** — sage, lilac and their variants are real, sitting alongside one constant deep green. The per-SKU color coding in §8 is sound; use these hues as the model.

---

## Grüns — gruns.co

```css
--gruns-green:      #007e40;  /* primary brand green */
--gruns-green-deep: #00572c;
--gruns-green-dark: #00351b;
--gruns-forest:     #002613;
--gruns-mint:       #daece3;
--gruns-mint-2:     #bfdfcf;
--gruns-yellow:     #ffcc2f;
--gruns-brown:      #3d1202;
--gruns-white:      #ffffff;
--gruns-ink:        #111827;
```

**Typefaces:** `Fondue-Inter` (an Inter variant) is the workhorse — 22 declarations. `DM Sans` also present. **No chunky rounded display face appears in the inline CSS**; if one exists it is in the missing stylesheets.
**Geometry:** radii 4 / 8 / 10 / 12 / 16 / 100px, `rounded-full` (66 uses) and `rounded-2xl` (15). `leading-dense` is a custom line-height token. Shadow style includes hard offsets — `1px 1px 0 0 var(--upcart-black)`.
**Sections:** 10. **Real H2s, in order:** Find Your Flavor · We made daily nutrition, like, ridiculously easy. · 3rd party-tested for potency, purity, & safety. · Same Grüns. New Lower Price.

### Two corrections to README §9

1. **The type is Inter, not a rounded display face.** The chunky read comes from *weight and scale* — `font-bold` at large sizes — not from a Fredoka-style face. Replace the Fredoka recommendation with heavy **`Inter`** (700/800) over **`DM Sans`**, unless the missing stylesheets prove otherwise.
2. **The voice sample is real and confirms the register:** *"We made daily nutrition, like, ridiculously easy."* That is the tone to match — the filler "like" is doing deliberate work.

---

## What is still missing, and how to close it

| Gap | Why | Fix |
|---|---|---|
| Full stylesheets | `_files/` folders weren't uploaded | Re-save with the folder, or zip the `_files/` directory and attach it |
| Exact webfont files | Same | Not needed — the substitutes above are close and are legally cleaner anyway |
| Rendered geometry (section padding, real type scale in px) | Requires a live render, not source | Full-page screenshots at 1440px would settle it |
| AG1's `go-green` value | Token referenced in markup, defined in missing CSS | A screenshot of any AG1 CTA would give it |

None of these block the build. The palettes, type families, radii, section order and real headings are all recovered, which is the substance of what §7–§9 needed.

---

## Screenshot pass — what images confirmed and corrected

Desktop screenshots of all three homepages were reviewed. Values written `≈#XXXXXX` are estimated from the image, not sampled from CSS.

### Grüns — three corrections, one of them large

1. **The page ground is cream, not white.** `≈#FDF3D8`, a warm butter tone. This is the largest single correction in this document: the greens and yellows read as loud *because* they sit on cream. On white the page becomes clinical, which is the opposite of the brand.
2. **The display face is heavy and rounded after all.** The earlier CSS pass found an Inter variant and concluded the chunky read came from weight alone — the screenshot shows a genuinely rounded, very bold display face. `Fredoka` (or `Baloo 2` / `Nunito` 800) is the right substitute; Inter is the body face. **This reverses the correction made in the CSS pass above.**
3. **The nav is not a bar.** The logo sits in a rounded warm-grey pill and the right cluster (yellow pill CTA, cart, hamburger) sits in its own rounded grey container, both floating over the cream with a gap above.

Also confirmed: two-tone headlines with the emphasis clause in bright green mid-sentence · a three-stat row of **yellow filled circles** with oversized numerals · two icon micro-reassurances directly under the CTA · a rotated sticky offer tab on the left screen edge with a dismiss × · a black press-logo strip directly under the hero · hero is left-text / right-rounded-photo.

### Bloom — hero archetype corrected

The hero is **not** a lifestyle photograph. It is a full-bleed **promotional banner in a carousel**: a pink→lilac gradient ground, product cans arranged at angles, an oversized **metallic-3D serif headline** with sparkle accents, and a pill CTA with an inner border stroke. Circular white carousel arrows overlay the gradient. That 3D lettering is designed artwork — mark it as an asset slot rather than attempting it in CSS.

Nav confirmed and distinctive: white bar, **left-aligned links**, **centered wordmark**, right cluster of pill CTA plus search / cart / account icons. Section headings are large centered bold serif in the brand green — the serif finding from the CSS pass is confirmed visually.

### AG1 — the accent is now known

The `go-green` token that was missing from the CSS is a **bright lime, `≈#8BE01F`**, and it always carries **black** text, never white. It appears on the announcement bar, the CTA pill, and on angled sticker graphics scattered across the hero photograph.

Confirmed: the announcement bar is lime with **black uppercase monospace** text carrying a promo code · the hero is a full-bleed **photograph** (marble flat-lay, product at an angle) with text overlaid left · the headline is a **large light serif**, confirming the TimesNow finding · the nav is white with only three links and a lime-underlined "Sign In" · the CTA is a lime pill with a black label and a `→`.

The angled sticker graphics — lime rectangles rotated ~12° with black monospace offer text — are the page's most recognizable device and should be built as CSS-rotated elements, not images.

---

## Confidence summary

| Category | Status |
|---|---|
| Brand palettes | **Sampled** from CSS, plus screenshot-estimated values for AG1's lime and Grüns' cream |
| Type families | **Sampled** — all three, with substitutes named |
| Hero compositions, nav patterns | **Observed** from screenshots |
| Radii, shadow style | **Sampled** from CSS |
| Section counts and heading order | **Sampled** from saved markup |
| Section padding, full type scale | **Unknown** — would need the external stylesheets or a live render |
