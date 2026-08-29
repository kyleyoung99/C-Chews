/**
 * TEMPLATE 01 — THE MECHANISM
 * Belief-chain steps are called out in index.html section comments.
 * This file: scroll reveals, accordion, SMW scroll-linked animation,
 * and rendering every price/product figure from shared config+pricing.
 */
(function () {
  const CFG = window.SAVOUR_CONFIG;
  const Pricing = window.SavourPricing;

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

  function initSmwAnimation() {
    const cards = document.querySelectorAll(".smw-card");
    if (!("IntersectionObserver" in window)) {
      cards.forEach((el) => el.classList.add("is-active"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
          }
        });
      },
      { threshold: 0.4 }
    );
    cards.forEach((el) => io.observe(el));
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

  function renderVariants() {
    const grid = document.querySelector("[data-variant-grid]");
    if (!grid) return;
    grid.innerHTML = CFG.product.variants
      .map(
        (v) => `
        <div class="variant-card">
          <div class="variant-swatch" style="background:${v.accent}"></div>
          <h3>${v.name}</h3>
          <p>${v.flavor}</p>
        </div>`
      )
      .join("");
  }

  function renderBundles() {
    const grid = document.querySelector("[data-bundle-grid]");
    if (!grid) return;
    grid.innerHTML = CFG.pricing.bundles
      .map((bundle) => {
        const savings = Pricing.savingsVsBase(bundle);
        const featured = bundle.badge ? "is-featured" : "";
        return `
        <div class="bundle-card ${featured}">
          ${bundle.badge ? `<span class="bundle-badge">${bundle.badge}</span>` : ""}
          <h3>${bundle.label}</h3>
          <p class="bundle-price">${Pricing.formatMoney(bundle.price)}</p>
          <p class="bundle-meta">${Pricing.formatMoney(Pricing.perTin(bundle))} / tin &middot; ${Pricing.formatPerChew(bundle)} / chew</p>
          ${
            savings.amount > 0
              ? `<p class="bundle-savings">Save ${Pricing.formatMoney(savings.amount)} (${savings.percent.toFixed(0)}%)</p>`
              : ""
          }
        </div>`;
      })
      .join("");
  }

  function renderOfferCopy() {
    const subEl = document.querySelector("[data-subscribe-note]");
    if (subEl && CFG.pricing.subscription.enabled) {
      subEl.textContent = `Subscribe & save ${CFG.pricing.subscription.discountPercent}%, delivered ${CFG.pricing.subscription.intervalLabel}.`;
    }
    const guaranteeEl = document.querySelector("[data-guarantee-copy]");
    if (guaranteeEl) {
      guaranteeEl.textContent = `Try it for ${CFG.pricing.guaranteeDays} days. If it doesn't earn a permanent spot in your bag, we'll refund it — no questions asked.`;
    }
    const foundersEl = document.querySelector("[data-founders-copy]");
    if (foundersEl) {
      foundersEl.textContent = `${CFG.launch.batchLabel} is limited to ${CFG.launch.foundersBatchUnits} tins. ${CFG.launch.priceLockCopy}`;
    }
    document.querySelectorAll("[data-batch-footer]").forEach((el) => {
      el.textContent = CFG.launch.batchLabel;
    });
    document.querySelectorAll("[data-faq-batch]").forEach((el) => {
      el.textContent = CFG.launch.batchLabel;
    });
  }

  function renderFaqPerChew() {
    const el = document.querySelector("[data-faq-per-chew]");
    if (!el) return;
    const singleBundle = Pricing.getBundle("single") || CFG.pricing.bundles[0];
    el.textContent = Pricing.formatPerChew(singleBundle);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initWaitlist();
    initScrollReveal();
    initSmwAnimation();
    initAccordion();
    renderVariants();
    renderBundles();
    renderOfferCopy();
    renderFaqPerChew();
  });
})();
