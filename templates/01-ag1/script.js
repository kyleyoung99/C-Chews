/**
 * SAVOUR — 01-ag1 (AG1-modeled template)
 * ---------------------------------------------------------------
 * Plain global script (no ES modules, so the page opens from file://).
 * Loaded after shared/config.js, shared/pricing.js, shared/waitlist.js.
 *
 * Every figure this file writes into the DOM is derived at runtime from
 * window.SAVOUR_CONFIG through window.SavourPricing. Nothing here — and
 * nothing in index.html — contains a hard-coded price, per-chew cost,
 * savings figure, shipping threshold, discount percent, guarantee
 * length, or batch size.
 */
(function () {
  "use strict";

  var CFG = window.SAVOUR_CONFIG;
  var P = window.SavourPricing;

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     Static config tokens: every [data-savour="key"] span on the page.
     ------------------------------------------------------------------ */
  function fillTokens() {
    var coffee = P.getVariant("coffee");
    var wine = P.getVariant("wine");

    var tokens = {
      freeShippingThreshold: P.formatMoney(CFG.pricing.freeShippingThreshold),
      basePricePerTin: P.formatMoney(CFG.pricing.basePricePerTin),
      guaranteeDays: String(CFG.pricing.guaranteeDays),
      discountPercent: String(CFG.pricing.subscription.discountPercent),
      intervalLabel: CFG.pricing.subscription.intervalLabel,
      chewsPerTin: String(CFG.product.chewsPerTin),
      batchLabel: CFG.launch.batchLabel,
      priceLockCopy: CFG.launch.priceLockCopy,
      foundersBatchUnits: new Intl.NumberFormat(CFG.currency.locale).format(
        CFG.launch.foundersBatchUnits
      ),
      variantCoffeeName: coffee ? coffee.name : "",
      variantCoffeeFlavor: coffee ? coffee.flavor : "",
      variantWineName: wine ? wine.name : "",
      variantWineFlavor: wine ? wine.flavor : ""
    };

    Object.keys(tokens).forEach(function (key) {
      var nodes = document.querySelectorAll('[data-savour="' + key + '"]');
      Array.prototype.forEach.call(nodes, function (node) {
        node.textContent = tokens[key];
      });
    });
  }

  /* ------------------------------------------------------------------
     1 — Announcement bar: rotate, pausable, frozen under reduced motion.
     ------------------------------------------------------------------ */
  function initAnnounce() {
    var msgs = document.querySelectorAll("[data-announce-msg]");
    var toggle = document.querySelector("[data-announce-toggle]");
    if (msgs.length < 2 || !toggle) return;

    var label = toggle.querySelector("[data-announce-toggle-label]");
    var pauseIcon = toggle.querySelector('[data-announce-icon="pause"]');
    var playIcon = toggle.querySelector('[data-announce-icon="play"]');
    var index = 0;
    var timer = null;

    function show(i) {
      Array.prototype.forEach.call(msgs, function (m, n) {
        m.hidden = n !== i;
      });
    }

    function advance() {
      index = (index + 1) % msgs.length;
      show(index);
    }

    function start() {
      if (timer) return;
      timer = window.setInterval(advance, 5000);
    }

    function stop() {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    }

    function setPaused(paused) {
      toggle.setAttribute("aria-pressed", paused ? "true" : "false");
      if (label) label.textContent = paused ? "Play announcements" : "Pause announcements";
      if (pauseIcon) pauseIcon.hidden = paused;
      if (playIcon) playIcon.hidden = !paused;
      if (paused) stop();
      else start();
    }

    toggle.addEventListener("click", function () {
      setPaused(toggle.getAttribute("aria-pressed") !== "true");
    });

    show(0);

    if (reduceMotion) {
      // One message, no rotation, and the control reads as paused.
      setPaused(true);
      return;
    }

    setPaused(false);

    // Pause while the reader is hovering or keyboard-focused inside the bar.
    var bar = toggle.closest(".announce");
    if (bar) {
      ["mouseenter", "focusin"].forEach(function (evt) {
        bar.addEventListener(evt, function () {
          if (toggle.getAttribute("aria-pressed") !== "true") stop();
        });
      });
      ["mouseleave", "focusout"].forEach(function (evt) {
        bar.addEventListener(evt, function () {
          if (toggle.getAttribute("aria-pressed") !== "true") start();
        });
      });
    }
  }

  /* ------------------------------------------------------------------
     2 — Nav: condense on scroll, mobile panel.
     ------------------------------------------------------------------ */
  function initNav() {
    var nav = document.querySelector("[data-nav]");
    var toggle = document.querySelector("[data-nav-toggle]");
    var links = document.querySelector("[data-navlinks]");

    if (nav) {
      var onScroll = function () {
        if (window.scrollY > 8) nav.classList.add("is-stuck");
        else nav.classList.remove("is-stuck");
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    if (!toggle || !links) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      links.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     11 — Pricing: bundle options + subscribe/one-time, all live.
     ------------------------------------------------------------------ */
  var DEFAULT_BUNDLE = "duo";
  var state = { bundleId: DEFAULT_BUNDLE, plan: "subscribe" };

  function currentBundle() {
    return P.getBundle(state.bundleId) || CFG.pricing.bundles[0];
  }

  /** the bundle as actually charged under the selected plan */
  function effectiveBundle() {
    var b = currentBundle();
    var price = state.plan === "subscribe" ? P.subscriptionPrice(b) : b.price;
    return { id: b.id, tins: b.tins, price: price, label: b.label, badge: b.badge };
  }

  function buildBundleOptions() {
    var host = document.querySelector("[data-bundles]");
    if (!host) return;

    CFG.pricing.bundles.forEach(function (b) {
      var id = "bundle-" + b.id;
      var label = document.createElement("label");
      label.className = "bundle";
      label.setAttribute("for", id);

      var input = document.createElement("input");
      input.type = "radio";
      input.name = "savour-bundle";
      input.id = id;
      input.value = b.id;
      input.checked = b.id === state.bundleId;
      input.setAttribute("data-bundle", "");

      var name = document.createElement("span");
      name.className = "bundle__name";
      name.textContent = b.label + (b.badge ? " — " + b.badge : "");

      var meta = document.createElement("span");
      meta.className = "bundle__meta";
      meta.textContent =
        b.tins + (b.tins === 1 ? " tin" : " tins") +
        " · " + b.tins * CFG.product.chewsPerTin + " chews";

      label.appendChild(input);
      label.appendChild(name);
      label.appendChild(meta);
      host.appendChild(label);

      input.addEventListener("change", function () {
        state.bundleId = b.id;
        renderPricing();
      });
    });
  }

  function markSelection() {
    Array.prototype.forEach.call(
      document.querySelectorAll(".plan, .bundle"),
      function (el) {
        var input = el.querySelector("input");
        el.classList.toggle("is-selected", !!(input && input.checked));
      }
    );
  }

  function setText(selector, text) {
    var el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  function renderPricing() {
    var b = currentBundle();
    var eff = effectiveBundle();
    var savings = P.savingsVsBase(eff);
    var subscribing = state.plan === "subscribe";

    setText(
      "[data-price-label]",
      eff.label + (eff.badge ? " · " + eff.badge : "")
    );

    // headline price, with the undiscounted figure struck through on subscribe
    var now = document.querySelector("[data-price-now]");
    if (now) {
      now.textContent = P.formatMoney(eff.price);
      if (subscribing && eff.price < b.price) {
        var was = document.createElement("span");
        was.className = "price__was";
        was.textContent = P.formatMoney(b.price);
        now.appendChild(was);
      }
    }

    setText(
      "[data-price-meta]",
      P.formatMoney(P.perTin(eff)) + " per tin · " +
        eff.tins + (eff.tins === 1 ? " tin" : " tins") + " · " +
        eff.tins * CFG.product.chewsPerTin + " chews"
    );

    var save = document.querySelector("[data-price-save]");
    if (save) {
      if (savings.amount > 0) {
        save.hidden = false;
        save.textContent =
          "You save " + P.formatMoney(savings.amount) +
          " (" + Math.round(savings.percent) + "%)";
      } else {
        save.hidden = true;
      }
    }

    setText("[data-price-perchew]", P.formatMoney(P.perChew(eff)));

    setText(
      "[data-price-micro]",
      subscribing
        ? "Ships " + CFG.pricing.subscription.intervalLabel +
          ". Skip or cancel anytime. " + CFG.pricing.guaranteeDays +
          "-day money-back guarantee."
        : "One-time order, no repeat charge. " + CFG.pricing.guaranteeDays +
          "-day money-back guarantee."
    );

    setText(
      "[data-price-ship]",
      P.qualifiesForFreeShipping(eff.price)
        ? "Free shipping included at this total."
        : "Add " + P.formatMoney(P.amountToFreeShipping(eff.price)) +
          " for free shipping over " + P.formatMoney(CFG.pricing.freeShippingThreshold) + "."
    );

    renderPriceAnswers(eff);
    markSelection();
  }

  /** FAQ answers that quote live math */
  function renderPriceAnswers(eff) {
    var single = P.getBundle("single") || CFG.pricing.bundles[0];
    var subSingle = { tins: single.tins, price: P.subscriptionPrice(single) };

    setText(
      "[data-faq-perchew]",
      "A tin is " + CFG.product.chewsPerTin + " chews, so one tin at " +
        P.formatMoney(single.price) + " works out to " + P.formatMoney(P.perChew(single)) +
        " a chew, or " + P.formatMoney(P.perChew(subSingle)) +
        " a chew on the subscription. The set you have selected comes to " +
        P.formatMoney(P.perChew(eff)) + " a chew."
    );

    setText(
      "[data-faq-batch]",
      CFG.launch.batchLabel + " is limited to " +
        new Intl.NumberFormat(CFG.currency.locale).format(CFG.launch.foundersBatchUnits) +
        " sets and ships to waitlist members first. " + CFG.launch.priceLockCopy
    );

    setText(
      "[data-faq-tin]",
      CFG.product.chewsPerTin +
        " chews in a flat tin sized for a pocket, a bag, or a laptop sleeve. Nothing needs refrigeration and nothing needs a sink."
    );
  }

  function initPricing() {
    buildBundleOptions();

    Array.prototype.forEach.call(
      document.querySelectorAll("[data-plan]"),
      function (input) {
        input.addEventListener("change", function () {
          state.plan = input.value;
          renderPricing();
        });
      }
    );

    renderPricing();
  }

  /* ------------------------------------------------------------------
     14 — FAQ accordion (aria-expanded / aria-controls, all closed).
     ------------------------------------------------------------------ */
  function initFaq() {
    var buttons = document.querySelectorAll(".faq__btn");
    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener("click", function () {
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        if (panel) panel.hidden = open;
      });
    });
  }

  /* ------------------------------------------------------------------
     9 — Snap / Melt / Wash: one staggered 260ms fade on first view.
     ------------------------------------------------------------------ */
  function initSteps() {
    var host = document.querySelector("[data-steps]");
    if (!host) return;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    host.setAttribute("data-armed", "");
    var steps = host.querySelectorAll("[data-step]");

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          Array.prototype.forEach.call(steps, function (step, i) {
            window.setTimeout(function () {
              step.classList.add("is-in");
            }, i * 120);
          });
          io.disconnect();
        });
      },
      { threshold: 0.2 }
    );

    io.observe(host);
  }

  /* ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    fillTokens();
    initAnnounce();
    initNav();
    initPricing();
    initFaq();
    initSteps();
    if (window.SavourWaitlist) window.SavourWaitlist.init();
  });
})();
