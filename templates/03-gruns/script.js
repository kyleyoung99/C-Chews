/**
 * SAVOUR — 03-gruns
 * ---------------------------------------------------------------
 * Plain global script (no ES modules, so file:// works). Everything
 * numeric on the page is rendered here from window.SAVOUR_CONFIG via
 * window.SavourPricing. There is not one hardcoded price, per-chew
 * figure, discount, threshold or unit count in index.html.
 *
 * Owns: value injection, both marquees + their pause controls, the
 * comparison block's live per-use row, the pricing radio-cards, the
 * FAQ accordion, the footer capture hand-off, and SavourWaitlist.init().
 */
(function () {
  "use strict";

  var CFG = window.SAVOUR_CONFIG;
  var P = window.SavourPricing;

  /* ---------------------------------------------------------------
   * Money formatting
   * ------------------------------------------------------------- */

  /** formatMoney(), with a bare ".00" trimmed so headline figures read
   *  as "$35" rather than "$35.00". Still 100% derived at runtime. */
  function tidy(n) {
    var s = P.formatMoney(n);
    return s.replace(/([.,])00\b/, "");
  }

  /* ---------------------------------------------------------------
   * The value table — every figure the markup asks for by name
   * ------------------------------------------------------------- */

  var single = P.getBundle("single") || CFG.pricing.bundles[0];
  var chewsPerTin = CFG.product.chewsPerTin;

  function perChewSubscribed(bundle) {
    var chews = bundle.tins * chewsPerTin;
    return chews > 0 ? P.subscriptionPrice(bundle) / chews : 0;
  }

  var VALUES = {
    shipThreshold: tidy(CFG.pricing.freeShippingThreshold),
    guaranteeDays: String(CFG.pricing.guaranteeDays),
    chewsPerTin: String(chewsPerTin),
    batchLabel: CFG.launch.batchLabel,
    batchUnits: new Intl.NumberFormat(CFG.currency.locale).format(
      CFG.launch.foundersBatchUnits
    ),
    subDiscount: String(CFG.pricing.subscription.discountPercent),
    subInterval: CFG.pricing.subscription.intervalLabel,
    priceLock: CFG.launch.priceLockCopy,
    subPrice: tidy(P.subscriptionPrice(single)),
    oncePrice: tidy(single.price),
    perChewOneTime: P.formatPerChew(single),
    perChewSub: P.formatMoney(perChewSubscribed(single))
  };

  function injectValues() {
    var nodes = document.querySelectorAll("[data-savour-val]");
    Array.prototype.forEach.call(nodes, function (el) {
      var key = el.getAttribute("data-savour-val");
      if (Object.prototype.hasOwnProperty.call(VALUES, key)) {
        el.textContent = VALUES[key];
      }
    });
  }

  /* ---------------------------------------------------------------
   * Marquees (§4 VOC strip, §8 ingredient list)
   * Frozen entirely under prefers-reduced-motion — the CSS only ever
   * defines the animation inside a no-preference block, and here we
   * remove the pause control, which has nothing left to pause.
   * ------------------------------------------------------------- */

  function reducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function initMarquees() {
    var toggles = document.querySelectorAll("[data-marquee-toggle]");
    var frozen = reducedMotion();

    Array.prototype.forEach.call(toggles, function (btn) {
      var name = btn.getAttribute("data-marquee-toggle");
      var box = document.querySelector('[data-marquee="' + name + '"]');
      if (!box) return;

      if (frozen) {
        box.setAttribute("data-paused", "true");
        btn.hidden = true;
        return;
      }

      btn.addEventListener("click", function () {
        var paused = box.getAttribute("data-paused") === "true";
        box.setAttribute("data-paused", paused ? "false" : "true");
        btn.setAttribute("aria-pressed", paused ? "false" : "true");
        var label = btn.querySelector("[data-marquee-label]");
        if (label) label.textContent = paused ? "Pause" : "Play";
      });
    });
  }

  /* ---------------------------------------------------------------
   * Pricing radio-cards (§13) + the live per-chew callout
   * ------------------------------------------------------------- */

  function initPlans() {
    var form = document.querySelector("[data-plan-form]");
    if (!form) return;

    var inputs = form.querySelectorAll("[data-plan-input]");
    var out = form.querySelector("[data-perchew-value]");

    function sync() {
      Array.prototype.forEach.call(inputs, function (input) {
        var label = input.closest("[data-plan]");
        if (label) {
          if (input.checked) label.setAttribute("data-selected", "true");
          else label.removeAttribute("data-selected");
        }
        if (input.checked && out) {
          out.textContent =
            input.value === "sub" ? VALUES.perChewSub : VALUES.perChewOneTime;
        }
      });
    }

    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener("change", sync);
    });

    sync();
  }

  /* ---------------------------------------------------------------
   * FAQ accordion (§15) — all closed on load, keyboard-operable
   * ------------------------------------------------------------- */

  function initAccordion() {
    var buttons = document.querySelectorAll(".acc__btn");
    Array.prototype.forEach.call(buttons, function (btn) {
      btn.setAttribute("aria-expanded", "false");
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (panel) panel.hidden = true;

      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        if (panel) panel.hidden = open;
      });
    });
  }

  /* ---------------------------------------------------------------
   * Footer email capture hands off to the same waitlist modal
   * ------------------------------------------------------------- */

  function initFooterCapture() {
    var form = document.querySelector("[data-foot-form]");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var typed = form.querySelector('input[type="email"]');
      var value = typed ? typed.value.trim() : "";

      window.SavourWaitlist.open();

      if (value) {
        var modalEmail = document.querySelector("[data-savour-modal-email]");
        if (modalEmail) modalEmail.value = value;
      }
      form.reset();
    });
  }

  /* ---------------------------------------------------------------
   * Boot
   * ------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    injectValues();
    initMarquees();
    initPlans();
    initAccordion();
    initFooterCapture();
    window.SavourWaitlist.init();
  });
})();
