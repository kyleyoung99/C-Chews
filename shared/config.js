/**
 * SAVOUR — SINGLE SOURCE OF TRUTH
 * ---------------------------------------------------------------
 * Every price, per-unit price, per-chew cost, savings figure, and
 * shipping/subscription rule shown anywhere on any template is
 * derived at runtime from this object via shared/pricing.js.
 *
 * To change what the site charges: edit the numbers below, reload
 * any template, and every displayed figure updates. No HTML edits.
 *
 * Variant accent colors are deliberately NOT here — each template
 * takes its palette from its own reference brand (see DESIGN.md),
 * not from a shared config value.
 *
 * Loaded as a plain global script (not an ES module) so every
 * template opens correctly from file:// as well as a static server —
 * see README.md "Why global scripts instead of ES modules."
 */
window.SAVOUR_CONFIG = {
  currency: {
    code: "USD",
    symbol: "$",
    locale: "en-US",
  },

  product: {
    chewsPerTin: 30,
    variants: [
      { id: "coffee", name: "Savour Post-Coffee", flavor: "Cardamom & Sweet Cream" },
      { id: "wine", name: "Savour Post-Wine", flavor: "Dark Cherry & Sage" },
    ],
  },

  pricing: {
    // Change this one number and the whole site recalculates.
    basePricePerTin: 20.0,

    bundles: [
      { id: "single", tins: 1, price: 20.0, label: "One Tin", badge: null },
      { id: "duo", tins: 2, price: 36.0, label: "The Pair", badge: "Most Popular" },
      { id: "trio", tins: 3, price: 50.0, label: "The Full Set", badge: "Best Value" },
    ],

    subscription: {
      enabled: true,
      discountPercent: 20,
      intervalLabel: "every 30 days",
    },

    freeShippingThreshold: 35.0,
    guaranteeDays: 30,
  },

  launch: {
    // "waitlist" | "presale" | "live" — the page reads as a live store either way;
    // checkout itself is always a stub (see shared/waitlist.js and each template's
    // checkout modal). "live" additionally governs showDemoProof below.
    mode: "live",
    // true = seeded reviews/ratings from content/demo-proof.js render, each
    // carrying data-demo="true". Flip to false to strip every seeded proof
    // element from all three pages with zero HTML edits.
    showDemoProof: true,
    batchLabel: "Batch 001",
    // Display only. Never fake a live-decrementing counter from this.
    foundersBatchUnits: 500,
    priceLockCopy: "Founders Batch price, locked for life.",
  },
};
