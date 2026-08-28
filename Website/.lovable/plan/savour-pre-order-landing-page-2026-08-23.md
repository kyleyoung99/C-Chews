# Savour — Pre-Order Landing Page

A premium, mobile-first pre-order landing page for Savour, a functional oral care brand. Single-page experience at `/` with a clinical, specialty-coffee/skincare aesthetic.

## Design system

- **Palette** (semantic tokens in `src/styles.css`, oklch):
  - Base: soft crema off-white background, warm ink foreground
  - Post-Coffee accent: warm espresso brown
  - Post-Wine accent: deep matte burgundy, supported by charcoal
  - The active hero variant (Coffee vs Wine) tints accents across the page
- **Typography**: geometric sans pair — Space Grotesk (display/headlines) + Inter (body), loaded via `<link>` in `src/routes/__root.tsx` and registered as `--font-display` / `--font-sans` theme tokens
- **Motion**: subtle scroll-triggered fade/slide-up reveals via a small `useReveal` IntersectionObserver hook; gentle hover lifts on cards; smooth variant cross-fade in the hero toggle

## Product imagery

Generate two photorealistic transparent-PNG product renders (imagegen):
1. Brushed aluminum tin, espresso/crema label — "Savour Post-Coffee"
2. Brushed aluminum tin, matte burgundy/charcoal label — "Savour Post-Wine"

## Page structure (`src/routes/index.tsx` + components)

1. **Sticky header** — minimal wordmark left, variant-aware "Reserve Founders Batch" button right (links to placeholder checkout URL); condenses on scroll
2. **Hero** — headline "Reset Your Palate.", subheadline "The 30-second swallowable chew to neutralize coffee and wine.", primary CTA "Reserve Founders Batch" + secondary "See how it works" anchor. A segmented Coffee/Wine toggle swaps the featured tin, accent color, and tasting notes with a cross-fade; on mobile the toggle stacks above the tin image
3. **The Mechanism** — 3-step minimalist timeline with numbered markers and simple line icons: 01 The Snap (the satisfying bite), 02 The Melt (endothermic cooling), 03 The Wash (effervescent swish & swallow) — with a "Stain Shield" callout strip explaining sodium bicarbonate's stain-prevention role
4. **Ingredients grid** — clean 2x2 (desktop) / stacked (mobile) card grid with simple SVG line icons: Micro-encapsulated Mastic, Erythritol (Cooling), Sodium Bicarbonate (Stain Shield — visually emphasized), Botanicals (Cardamom & White Tea)
5. **Checkout / waitlist section** — full-bleed high-contrast charcoal band: Founders Batch pitch, email input + "Join the waitlist" (client-side success state, no backend), and a direct "Pre-order now" CTA to the placeholder Shopify checkout URL
6. **Footer** — minimal wordmark, tagline, placeholder links

## Technical details

- All CTAs point to a single `CHECKOUT_URL` placeholder constant (e.g. `https://checkout.savour.example/founders-batch`) — one-line swap when the real Shopify link exists; no Shopify integration needed for placeholders
- New files: `src/components/savour/{Header,Hero,Mechanism,Ingredients,Waitlist,Footer}.tsx`, `src/hooks/use-reveal.ts`, tin images under `src/assets/`
- Strictly mobile-first: single-column stacking, toggle above imagery on phones, grids collapse to one column, sticky CTA reachable at all sizes
- SEO head() on the index route: unique title/description, og:title/og:description, og:type, twitter:card; root route gets proper defaults replacing "Lovable App"; semantic HTML (single h1, sections, alt text)
- No backend, no new dependencies
