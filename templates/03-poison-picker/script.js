/**
 * TEMPLATE 03 — THE POISON PICKER
 * Belief-chain steps are called out in index.html section comments.
 * Handles: variant theming (persisted, wrapped in try/catch), sticky
 * buy bar, interactive 30s timer, bundle ladder w/ one-time vs
 * subscribe toggle, and exit-intent waitlist offer (once per session).
 */
(function () {
  const CFG = window.SAVOUR_CONFIG;
  const Pricing = window.SavourPricing;
  const THEME_KEY = "savour:selectedVariant";

  const VOC_QUOTES = [
    "I'll go straight from my afternoon coffee into a client call and just pray nobody's close enough to smell it.",
    "I've gotten photos back from dinner where I'm just not smiling with teeth anymore because of the wine.",
    "Mints just mask it for a few minutes and then it's back.",
    "I shouldn't have to choose between my coffee and feeling confident for the rest of the day.",
    "If something actually worked in the moment, I'd keep it on me at all times — car, purse, desk, everywhere.",
    "The second I saw 'swallow it, no rinse needed' I was in — that's the whole reason mouthwash never worked for me on the go.",
  ];

  let purchaseMode = "onetime"; // "onetime" | "subscribe"
  let selectedVariant = "coffee";

  function initWaitlist() {
    window.SavourWaitlist.init();
  }

  function initScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
  }

  function initAccordion() {
    document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const expanded = trigger.getAttribute("aria-expanded") === "true";
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));
        trigger.setAttribute("aria-expanded", String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  }

  // -- Variant picker / theming --------------------------------------

  function loadStoredVariant() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored && Pricing.getVariant(stored)) return stored;
    } catch (err) {
      /* storage unavailable — fall back to default */
    }
    return "coffee";
  }

  function storeVariant(id) {
    try {
      localStorage.setItem(THEME_KEY, id);
    } catch (err) {
      /* storage unavailable — theme still applies for this page view */
    }
  }

  function applyVariant(id) {
    selectedVariant = id;
    const variant = Pricing.getVariant(id);
    document.documentElement.setAttribute("data-savour-theme", id);

    document.querySelectorAll("[data-picker]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-picker") === id));
    });

    document.querySelectorAll("[data-hero-variant-word]").forEach((el) => {
      el.textContent = variant.id === "coffee" ? "Coffee" : "Wine";
    });

    document.querySelectorAll("[data-sticky-variant]").forEach((el) => {
      el.textContent = variant.name;
    });

    document.querySelectorAll("[data-waitlist-open]").forEach((trigger) => {
      if (!trigger.hasAttribute("data-variant-locked")) {
        trigger.setAttribute("data-variant", id);
      }
    });
  }

  function initPicker() {
    document.querySelectorAll("[data-picker]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-picker");
        applyVariant(id);
        storeVariant(id);
      });
    });
    applyVariant(loadStoredVariant());
  }

  // -- Sticky buy bar ---------------------------------------------------

  function initStickyBar() {
    const bar = document.querySelector("[data-sticky-bar]");
    const hero = document.querySelector(".hero");
    if (!bar || !hero) return;

    const singleBundle = Pricing.getBundle("single") || CFG.pricing.bundles[0];
    const priceEl = bar.querySelector("[data-sticky-price]");
    if (priceEl) priceEl.textContent = Pricing.formatMoney(singleBundle.price);

    const fill = bar.querySelector("[data-shipping-progress]");
    const copy = bar.querySelector("[data-shipping-copy]");
    if (fill) fill.style.width = Pricing.freeShippingProgressPercent(singleBundle.price) + "%";
    if (copy) {
      copy.textContent = Pricing.qualifiesForFreeShipping(singleBundle.price)
        ? "Free shipping unlocked"
        : `Add ${Pricing.formatMoney(Pricing.amountToFreeShipping(singleBundle.price))} more for free shipping`;
    }

    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          bar.hidden = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    io.observe(hero);
  }

  // -- Benefit-adjacent renders (trust rail, announcement, footer) -----

  function renderStaticConfigCopy() {
    document.querySelectorAll("[data-shipping-threshold]").forEach((el) => {
      el.textContent = Pricing.formatMoney(CFG.pricing.freeShippingThreshold);
    });
    document.querySelectorAll("[data-trust-guarantee]").forEach((el) => {
      el.textContent = `${CFG.pricing.guaranteeDays}-day guarantee`;
    });
    document.querySelectorAll("[data-batch-footer]").forEach((el) => {
      el.textContent = CFG.launch.batchLabel;
    });
    document.querySelectorAll("[data-faq-batch]").forEach((el) => {
      el.textContent = CFG.launch.batchLabel;
    });
    document.querySelectorAll("[data-guarantee-copy]").forEach((el) => {
      el.textContent = `Try it for ${CFG.pricing.guaranteeDays} days. If it doesn't earn a permanent spot in your bag, we'll refund it — no questions asked. ${CFG.launch.priceLockCopy}`;
    });
    document.querySelectorAll("[data-toggle-discount]").forEach((el) => {
      el.textContent = `${CFG.pricing.subscription.discountPercent}%`;
    });
    const singleBundle = Pricing.getBundle("single") || CFG.pricing.bundles[0];
    document.querySelectorAll("[data-faq-per-chew]").forEach((el) => {
      el.textContent = Pricing.formatPerChew(singleBundle);
    });
  }

  // -- Timer widget ------------------------------------------------------

  function initTimer() {
    const startBtn = document.querySelector("[data-timer-start]");
    const ring = document.querySelector("[data-timer-ring]");
    const valueEl = document.querySelector("[data-timer-value]");
    const stageEl = document.querySelector("[data-timer-stage]");
    if (!startBtn || !ring || !valueEl || !stageEl) return;

    let intervalId = null;

    function stageForSecondsElapsed(elapsed) {
      if (elapsed < 1) return "Ready.";
      if (elapsed < 10) return "Snap — actives release.";
      if (elapsed < 25) return "Melt — cooling, pores close.";
      return "Wash — saliva clears it. Swallow.";
    }

    startBtn.addEventListener("click", () => {
      if (intervalId) return;
      let remaining = 30;
      startBtn.disabled = true;
      ring.classList.add("is-running");
      valueEl.textContent = "0:30";
      stageEl.textContent = stageForSecondsElapsed(0);

      intervalId = setInterval(() => {
        remaining -= 1;
        const elapsed = 30 - remaining;
        valueEl.textContent = "0:" + String(remaining).padStart(2, "0");
        stageEl.textContent = stageForSecondsElapsed(elapsed);

        if (remaining <= 0) {
          clearInterval(intervalId);
          intervalId = null;
          ring.classList.remove("is-running");
          startBtn.disabled = false;
          stageEl.textContent = "Done. That's the whole window.";
        }
      }, 1000);
    });
  }

  // -- Social proof ------------------------------------------------------

  function renderVoc() {
    const grid = document.querySelector("[data-voc-grid]");
    if (!grid) return;
    grid.innerHTML = VOC_QUOTES.map(
      (q) => `
      <blockquote class="voc-card">
        <p>&ldquo;${q}&rdquo;</p>
        <footer>— from Savour customer research</footer>
      </blockquote>`
    ).join("");
  }

  function renderTestimonialSlots() {
    const rail = document.querySelector("[data-testimonial-rail]");
    if (!rail) return;
    const slots = [1, 2, 3]
      .map(
        () => `
      <!-- TESTIMONIAL SLOT: real customer quote pending launch. Layout: quote, first name + last initial, star rating once available. -->
      <div class="testimonial-slot">[TESTIMONIAL SLOT — real customer quote pending launch]</div>`
      )
      .join("");
    rail.innerHTML = slots;
  }

  // -- Bundle ladder -------------------------------------------------------

  function renderBundleLadder() {
    const grid = document.querySelector("[data-bundle-ladder]");
    if (!grid) return;

    grid.innerHTML = CFG.pricing.bundles
      .map((bundle) => {
        const isSub = purchaseMode === "subscribe" && CFG.pricing.subscription.enabled;
        const price = isSub ? Pricing.subscriptionPrice(bundle) : bundle.price;
        const perTin = price / bundle.tins;
        const perChew = price / (bundle.tins * CFG.product.chewsPerTin);
        const savings = Pricing.savingsVsBase(bundle);
        const featured = bundle.badge ? "is-featured" : "";
        return `
        <div class="bundle-card ${featured}">
          ${bundle.badge ? `<span class="bundle-badge">${bundle.badge}</span>` : ""}
          <h3>${bundle.label}</h3>
          <p class="bundle-price">${Pricing.formatMoney(price)}</p>
          <p class="bundle-meta">${Pricing.formatMoney(perTin)} / tin &middot; ${Pricing.formatMoney(perChew)} / chew</p>
          ${
            savings.amount > 0
              ? `<p class="bundle-savings">Save ${savings.percent.toFixed(0)}% vs. buying separately</p>`
              : ""
          }
          <button type="button" class="btn" data-waitlist-open data-bundle="${bundle.id}">Join for This Bundle</button>
        </div>`;
      })
      .join("");

    grid.querySelectorAll("[data-waitlist-open]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.SavourWaitlist.open({ variant: selectedVariant });
      });
    });
  }

  function renderPerChewCallout() {
    const el = document.querySelector("[data-per-chew-callout]");
    if (!el) return;
    const singleBundle = Pricing.getBundle("single") || CFG.pricing.bundles[0];
    el.textContent = `That's ${Pricing.formatPerChew(singleBundle)} a chew.`;
  }

  function initPurchaseToggle() {
    document.querySelectorAll("[data-purchase-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        purchaseMode = btn.getAttribute("data-purchase-toggle");
        document.querySelectorAll("[data-purchase-toggle]").forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });
        renderBundleLadder();
      });
    });
  }

  // -- Exit intent ---------------------------------------------------------

  function initExitIntent() {
    if (!window.SavourWaitlist.shouldOfferExitIntent()) return;
    function onMouseOut(e) {
      if (e.clientY > 0 || e.relatedTarget) return;
      if (!window.SavourWaitlist.shouldOfferExitIntent()) {
        document.removeEventListener("mouseout", onMouseOut);
        return;
      }
      window.SavourWaitlist.markExitIntentOffered();
      window.SavourWaitlist.open();
      document.removeEventListener("mouseout", onMouseOut);
    }
    document.addEventListener("mouseout", onMouseOut);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initWaitlist();
    initScrollReveal();
    initAccordion();
    initPicker();
    initStickyBar();
    renderStaticConfigCopy();
    initTimer();
    renderVoc();
    renderTestimonialSlots();
    renderBundleLadder();
    renderPerChewCallout();
    initPurchaseToggle();
    initExitIntent();
  });
})();
