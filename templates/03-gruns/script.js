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
          currentPlan = input.value;
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
   * Bag drawer + checkout — a real cart (line items, quantities, a
   * live free-shipping bar). Checkout itself is a stub: no payment
   * step exists yet, so it collects an email instead.
   * ------------------------------------------------------------- */

  var cart = [];
  var currentPlan = "sub";

  function cartSubtotal() {
    var total = 0;
    for (var i = 0; i < cart.length; i++) total += cart[i].unitPrice * cart[i].qty;
    return total;
  }

  function addToCart(item) {
    var existing = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id) { existing = cart[i]; break; }
    }
    if (existing) existing.qty += 1;
    else cart.push({ id: item.id, name: item.name, meta: item.meta, unitPrice: item.unitPrice, qty: 1 });
    renderCart();
    openDrawer();
  }

  function addVariantToCart(variantId) {
    var variant = P.getVariant(variantId);
    if (!variant) return;
    addToCart({
      id: "variant-" + variantId,
      name: variant.name,
      meta: variant.flavor + " · " + chewsPerTin + " chews",
      unitPrice: single.price
    });
  }

  function addSingleTinToCart(plan) {
    var subscribing = plan === "sub";
    var price = subscribing ? P.subscriptionPrice(single) : single.price;
    addToCart({
      id: "single-" + plan,
      name: single.label + (subscribing ? " (Subscription)" : " (One-time)"),
      meta: chewsPerTin + " chews",
      unitPrice: price
    });
  }

  function renderCart() {
    var lines = document.querySelector("[data-bag-lines]");
    var empty = document.querySelector("[data-bag-empty]");
    var subtotalEl = document.querySelector("[data-bag-subtotal]");
    var countEls = document.querySelectorAll("[data-bag-count]");
    var drawer = document.getElementById("bag-drawer");
    if (!lines || !drawer) return;

    var count = 0;
    for (var i = 0; i < cart.length; i++) count += cart[i].qty;
    Array.prototype.forEach.call(countEls, function (el) {
      el.textContent = String(count);
    });

    if (empty) empty.hidden = cart.length > 0;

    lines.innerHTML = cart
      .map(function (l) {
        return (
          '<li class="line" data-cart-line="' + l.id + '">' +
          '<div class="line__body"><p class="line__name">' + l.name + "</p>" +
          '<p class="line__meta">' + l.meta + "</p>" +
          '<div class="line__qty">' +
          '<button type="button" data-qty-dec aria-label="Decrease quantity">−</button>' +
          '<span data-qty-value>' + l.qty + "</span>" +
          '<button type="button" data-qty-inc aria-label="Increase quantity">+</button>' +
          "</div></div>" +
          '<p class="line__price">' + tidy(l.unitPrice * l.qty) + "</p>" +
          '<button type="button" class="line__rm" data-line-remove>Remove</button>' +
          "</li>"
        );
      })
      .join("");

    var subtotal = cartSubtotal();
    if (subtotalEl) subtotalEl.textContent = tidy(subtotal);

    var msg = drawer.querySelector("[data-ship-msg]");
    var fill = drawer.querySelector("[data-ship-fill]");
    if (msg && fill) {
      if (cart.length === 0) {
        msg.textContent = "Add " + tidy(CFG.pricing.freeShippingThreshold) + " to unlock free shipping.";
        fill.style.width = "0%";
      } else if (P.qualifiesForFreeShipping(subtotal)) {
        msg.textContent = "Free shipping unlocked.";
        fill.style.width = "100%";
      } else {
        msg.textContent = "Add " + tidy(P.amountToFreeShipping(subtotal)) + " more for free shipping.";
        fill.style.width = P.freeShippingProgressPercent(subtotal) + "%";
      }
    }
  }

  var drawerLastFocused = null;

  function openDrawer() {
    var drawer = document.getElementById("bag-drawer");
    if (!drawer) return;
    drawerLastFocused = document.activeElement;
    drawer.hidden = false;
    document.body.classList.add("savour-no-scroll");
    document.addEventListener("keydown", drawerKeydown);
    var closeBtn = drawer.querySelector("[data-drawer-close]");
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    var drawer = document.getElementById("bag-drawer");
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    document.body.classList.remove("savour-no-scroll");
    document.removeEventListener("keydown", drawerKeydown);
    if (drawerLastFocused && typeof drawerLastFocused.focus === "function") drawerLastFocused.focus();
  }

  function drawerKeydown(e) {
    if (e.key === "Escape") closeDrawer();
  }

  function initCart() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-drawer-open]"), function (btn) {
      btn.addEventListener("click", openDrawer);
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-drawer-close]"), function (btn) {
      btn.addEventListener("click", closeDrawer);
    });

    document.addEventListener("click", function (e) {
      var bundleTrigger = e.target.closest("[data-cart-add-bundle]");
      if (bundleTrigger) {
        e.preventDefault();
        addSingleTinToCart(currentPlan);
        return;
      }
      var variantTrigger = e.target.closest("[data-cart-add-variant]");
      if (variantTrigger) {
        e.preventDefault();
        addVariantToCart(variantTrigger.getAttribute("data-cart-add-variant"));
      }
    });

    var lines = document.querySelector("[data-bag-lines]");
    if (lines) {
      lines.addEventListener("click", function (e) {
        var line = e.target.closest("[data-cart-line]");
        if (!line) return;
        var id = line.getAttribute("data-cart-line");
        var item = null;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].id === id) { item = cart[i]; break; }
        }
        if (!item) return;
        if (e.target.closest("[data-qty-inc]")) {
          item.qty += 1;
          renderCart();
        } else if (e.target.closest("[data-qty-dec]")) {
          item.qty -= 1;
          if (item.qty <= 0) cart = cart.filter(function (l) { return l.id !== id; });
          renderCart();
        } else if (e.target.closest("[data-line-remove]")) {
          cart = cart.filter(function (l) { return l.id !== id; });
          renderCart();
        }
      });
    }

    renderCart();
  }

  function initCheckout() {
    var modal = document.querySelector("[data-checkout-modal]");
    if (!modal) return;
    var form = modal.querySelector("[data-checkout-form]");
    var success = modal.querySelector("[data-checkout-success]");
    var error = modal.querySelector("[data-checkout-error]");
    var email = modal.querySelector("[data-checkout-email]");
    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      if (form) { form.hidden = false; form.reset(); }
      if (success) success.hidden = true;
      if (error) error.hidden = true;
      modal.hidden = false;
      document.body.classList.add("savour-no-scroll");
      document.addEventListener("keydown", keydown);
      if (email) email.focus();
    }

    function close() {
      if (modal.hidden) return;
      modal.hidden = true;
      document.body.classList.remove("savour-no-scroll");
      document.removeEventListener("keydown", keydown);
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    function keydown(e) {
      if (e.key === "Escape") close();
    }

    Array.prototype.forEach.call(document.querySelectorAll("[data-checkout-open]"), function (btn) {
      btn.addEventListener("click", open);
    });
    Array.prototype.forEach.call(modal.querySelectorAll("[data-checkout-close]"), function (btn) {
      btn.addEventListener("click", close);
    });
    modal.addEventListener("click", function (e) {
      if (e.target === modal) close();
    });

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var value = email ? email.value.trim() : "";
        var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!valid) {
          if (error) error.hidden = false;
          if (email) email.focus();
          return;
        }
        if (error) error.hidden = true;

        var payload = {
          email: value,
          cart: cart.map(function (l) { return { id: l.id, name: l.name, qty: l.qty, unitPrice: l.unitPrice }; }),
          subtotal: cartSubtotal(),
          batch: CFG.launch.batchLabel,
          submittedAt: new Date().toISOString()
        };
        // TODO: wire to ESP and payment provider — no network request is made yet.
        console.log("[Savour checkout submission]", payload);

        form.hidden = true;
        if (success) {
          success.hidden = false;
          var focusTarget = success.querySelector("button, [href], [tabindex]");
          if (focusTarget) focusTarget.focus();
        }
      });
    }
  }

  /* ---------------------------------------------------------------
   * Reviews — seeded demo proof from content/demo-proof.js, gated
   * entirely by CFG.launch.showDemoProof.
   * ------------------------------------------------------------- */

  function starString(rating) {
    var full = Math.round(rating);
    var s = "";
    for (var i = 0; i < 5; i++) s += i < full ? "★" : "☆";
    return s;
  }

  function formatReviewDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(CFG.currency.locale, { month: "short", day: "numeric", year: "numeric" });
  }

  function renderReviews() {
    var proof = window.SAVOUR_DEMO_PROOF;
    var host = document.querySelector("[data-review-cards]");
    if (!proof || !host) return;
    var section = document.querySelector(".reviews");

    if (!CFG.launch.showDemoProof) {
      if (section) section.hidden = true;
      return;
    }

    var agg = proof.aggregate;
    var aggStars = document.querySelector("[data-agg-stars]");
    var aggCount = document.querySelector("[data-agg-count]");
    if (aggStars) aggStars.textContent = starString(agg.rating) + " " + agg.rating.toFixed(1);
    if (aggCount) aggCount.textContent = agg.count + " reviews";

    var list = (proof.reviews && proof.reviews["03-gruns"]) || [];
    host.innerHTML = list
      .map(function (r) {
        var variant = P.getVariant(r.variant);
        return (
          '<li class="review-card" data-demo="true">' +
          '<span class="review-card__stars">' + starString(r.rating) + "</span>" +
          '<span class="review-card__slot">“' + r.quote + "”</span>" +
          '<span class="review-card__by">' + r.name + " · " + (variant ? variant.name : "") + " · " + formatReviewDate(r.date) + "</span>" +
          "</li>"
        );
      })
      .join("");
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
    initCart();
    initCheckout();
    renderReviews();
    initAccordion();
    initFooterCapture();
    window.SavourWaitlist.init();
  });
})();
