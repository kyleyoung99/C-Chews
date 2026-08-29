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
      {
        id: "coffee",
        name: "Savour Post-Coffee",
        flavor: "Cardamom & Sweet Cream",
        pairing: "pairs with: the third espresso",
        accent: "#6F4E37",
        accentDark: "#4A331F",
      },
      {
        id: "wine",
        name: "Savour Post-Wine",
        flavor: "Dark Cherry & Sage",
        pairing: "pairs with: the last pour before the check",
        accent: "#5B2333",
        accentDark: "#3A1521",
      },
    ],
  },

  pricing: {
    // Change this one number and the whole site recalculates.
    basePricePerTin: 20.0,

    bundles: [
      { id: "single", tins: 1, price: 20.0, label: "One Tin", badge: null },
      {
        id: "duo",
        tins: 2,
        price: 36.0,
        label: "The Pair (Coffee + Wine)",
        badge: "Most Popular",
      },
      {
        id: "trio",
        tins: 3,
        price: 50.0,
        label: "The Full Set + Spare",
        badge: "Best Value",
      },
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
    // "waitlist" | "presale" | "live" — only "waitlist" is implemented.
    mode: "waitlist",
    batchLabel: "Batch 001",
    // Display only. Never fake a live-decrementing counter from this.
    foundersBatchUnits: 500,
    priceLockCopy: "Founders Batch price, locked for life.",
  },
};
