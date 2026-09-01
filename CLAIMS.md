# CLAIMS.md — every substantive claim on the three Savour pages

Per the build prompt §6.4, claims fall into four tiers:

| Tier | What it is | How it's written |
|---|---|---|
| **1 — Design facts** | What the product *is* — verifiable by looking at it | Stated flatly, no hedging |
| **2 — Mechanism** | What the ingredients do, by chemistry | Stated actively, describing the mechanism, not promising a result |
| **3 — Outcomes** | What the user ends up experiencing | Framed as designed intent, never a measured result |
| **4 — Comparative** | Versus mints, gum, mouthwash | Compared on mechanism and format, never on performance percentages |

No claim on any of the three pages uses an unhedged efficacy verb ("removes," "eliminates," "whitens," "cures," "prevents") and no page states a numeric efficacy figure (a "% reduction," a "3x faster," a clinical statistic). Prices, per-chew costs, savings, shipping thresholds, and batch/guarantee figures are not claims — they render at runtime from `shared/config.js` and are true by construction.

This file also inventories the two things the build deliberately does **not** fabricate even in demo mode: press-logo credibility (replaced by "Made and tested" wherever the reference brand would run a press strip) and any numeric efficacy figure.

---

## Shared across all three templates

| Claim | Tier | Wording used | Substantiation needed |
|---|---|---|---|
| Coffee oils and wine pigments bond to enamel within minutes; volatile sulfur compounds cause the lingering smell | 2 | Stated as established food chemistry, no hedge | Dental/chemistry citation before public launch |
| Erythritol's endothermic melt cools the mouth and closes enamel's pores | 2 | "which is what closes enamel's pores" (01/02), "is what tightens enamel's surface" (03) | Mechanism-of-action citation |
| Malic acid triggers a salivary flood that carries oils/pigments away before they bond | 2 | Stated actively, no hedge | Dental/chemistry citation |
| ~30 seconds, chew and swallow, no rinse/sink/spitting | 1 | Stated flatly everywhere | None — true by product design |
| Two flavors, matched to the drink that precedes them | 1 | Stated flatly | None — true by product design |
| Every ingredient is food-grade and intended to be swallowed | 1 | Stated flatly | Facility/ingredient documentation on file before launch |
| A mint covers the smell; Savour is built to work on the residue itself | 4 | Comparative, mechanism/format only, no percentage | None — factual by mechanism, not performance |
| Nobody has used Savour yet / no clinical trial has been run | 1 | Stated flatly as a limitation, not hedged away | None — this is a disclosure, not a promise |
| 4.8★, 214 reviews; 12 seeded reviews | — | Explicitly seeded demo data, `data-demo="true"`, `verified:false` throughout | Replace with real review data (or a real tasting-panel result, §6.5) before launch; strip entirely by setting `config.launch.showDemoProof = false` |
| "Made and tested" (replaces any press-logo slot) | 1/2 | Manufacturing standard + in-house batch testing, no claim of third-party certification | Publish co-manufacturer certifications and any real lab results as they're finalized |

## 01-ag1 (AG1-modeled)

| Claim | Tier | Wording | Substantiation |
|---|---|---|---|
| "One chew replaces the drawer" — consolidation vs. mints/gum/whitening pen/mouthwash | 4 | Comparison table, format-only rows | None — factual by format |
| Erythritol/malic acid full dosage "will be published on the tin and here before Batch 001 ships" | 1 | Disclosure of what's not yet public, not a claim of efficacy | Publish before launch |
| "We taste and quality-check every batch of Batch 001 ourselves before it ships" | 1 | Flat, true today | None |
| "4 ingredients per tin" (see 03-gruns row below — same fact, per-template phrasing) | n/a | Not present on this template | — |

## 02-bloom (Bloom-modeled)

| Claim | Tier | Wording | Substantiation |
|---|---|---|---|
| "Not a mint. An eraser." (central metaphor) | 3 | Framed as designed intent | None — metaphor, not a measured claim |
| "Made in a food facility... Batch 001 is small on purpose so we can taste every run" | 1 | Flat | None |
| Video rail — "Filming now — up next in your inbox" | 1 | Honest present-tense status, not a fabricated video | None — becomes false only if filming isn't actually underway; treat as a placeholder to update alongside real production |

## 03-gruns (Grüns-modeled)

| Claim | Tier | Wording | Substantiation |
|---|---|---|---|
| Head-to-head comparison table (§6): "cover it or lift it," "needs a sink," "clashes with your drink," "cost per use" | 4 | Format/mechanism rows only, no performance percentage | None — factual by format |
| "4 ingredients per tin. All of them pronounceable." | 1 | Flat, counts erythritol + malic acid + the tin's own two flavor notes | None — verifiable against the ingredient marquee on the same page |
| "Tested every batch, ourselves" (badge, replaces the old certification-slot bracket) | 1 | Flat, no third-party claim | Add a real certification badge once one exists |
| "Never sober up just to be believed" (voice line, not a factual claim) | — | Tone, not a claim | — |

---

## What still needs real data before public launch

Run `document.querySelectorAll('[data-demo]').length` on each page for the live count. Everything it returns is seeded — the 12 reviews and the 4.8★/214-review aggregate on all three pages. Setting `SAVOUR_CONFIG.launch.showDemoProof = false` in `shared/config.js` removes every one of those elements from all three pages with zero HTML edits.

Also still open, unrelated to the demo-proof flag:
- Exact manufacturing-facility certifications ("Made and tested" band, all three templates)
- A real third-party lab result or certificate of analysis
- Legal review of the food/oral-care regulatory disclaimer (footer, all three templates)
- Real founder video content (currently "Filming now" status copy on 02-bloom's video rail)
