/**
 * SAVOUR — PRICING HELPERS
 * ---------------------------------------------------------------
 * Pure functions that turn shared/config.js into the numbers every
 * template displays. Nothing in here is template-specific; nothing
 * in a template's own script.js should compute a price by hand.
 *
 * Loaded as a plain global script exposing window.SavourPricing.
 * Depends on window.SAVOUR_CONFIG (load config.js first).
 */
(function () {
  const CFG = window.SAVOUR_CONFIG;

  /** price per tin within a bundle, e.g. $36 / 2 tins -> $18.00 */
  function perTin(bundle) {
    return bundle.price / bundle.tins;
  }

  /** absolute $ and % saved vs. buying `bundle.tins` at basePricePerTin each */
  function savingsVsBase(bundle) {
    const baseTotal = CFG.pricing.basePricePerTin * bundle.tins;
    const amount = Math.max(0, baseTotal - bundle.price);
    const percent = baseTotal > 0 ? (amount / baseTotal) * 100 : 0;
    return { amount, percent, baseTotal };
  }

  /** price per individual chew, e.g. $20 tin / 30 chews -> $0.67 */
  function perChew(bundle) {
    const totalChews = bundle.tins * CFG.product.chewsPerTin;
    return totalChews > 0 ? bundle.price / totalChews : 0;
  }

  /** subscribed price for a bundle, after the config discount */
  function subscriptionPrice(bundle) {
    const discount = CFG.pricing.subscription.discountPercent / 100;
    return bundle.price * (1 - discount);
  }

  /** does a cart/bundle total clear the free-shipping threshold? */
  function qualifiesForFreeShipping(price) {
    return price >= CFG.pricing.freeShippingThreshold;
  }

  /** how much more (in dollars, floored at 0) is needed for free shipping */
  function amountToFreeShipping(price) {
    return Math.max(0, CFG.pricing.freeShippingThreshold - price);
  }

  /** 0–100 progress toward the free-shipping threshold, for progress bars */
  function freeShippingProgressPercent(price) {
    const threshold = CFG.pricing.freeShippingThreshold;
    if (threshold <= 0) return 100;
    return Math.min(100, (price / threshold) * 100);
  }

  /** locale-aware currency string, e.g. 18 -> "$18.00" */
  function formatMoney(n) {
    return new Intl.NumberFormat(CFG.currency.locale, {
      style: "currency",
      currency: CFG.currency.code,
    }).format(n);
  }

  /** formatted per-chew string used in "That's $0.67 a chew" callouts */
  function formatPerChew(bundle) {
    return formatMoney(perChew(bundle));
  }

  /** find a bundle by id from config.pricing.bundles */
  function getBundle(id) {
    return CFG.pricing.bundles.find((b) => b.id === id) || null;
  }

  /** find a product variant by id from config.product.variants */
  function getVariant(id) {
    return CFG.product.variants.find((v) => v.id === id) || null;
  }

  window.SavourPricing = {
    perTin,
    savingsVsBase,
    perChew,
    subscriptionPrice,
    qualifiesForFreeShipping,
    amountToFreeShipping,
    freeShippingProgressPercent,
    formatMoney,
    formatPerChew,
    getBundle,
    getVariant,
  };
})();
