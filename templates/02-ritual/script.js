/**
 * TEMPLATE 02 — THE RITUAL
 * Belief-chain steps are called out in index.html section comments.
 * Renders product study, ingredient credibility, and editions pricing
 * from shared config + pricing; wires the quiet accordion-free Q&A.
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

  function renderProductStudy() {
    const grid = document.querySelector("[data-product-grid]");
    if (!grid) return;
    grid.innerHTML = CFG.product.variants
      .map(
        (v) => `
        <div class="product-card">
          <!-- MACRO IMAGE: ${v.name} tin, studio product shot, soft top light, ${v.accent} accent visible on label -->
          <div class="product-art" role="img" aria-label="Placeholder for ${v.name} tin photography">
            <span>${v.name}</span>
          </div>
          <h3>${v.name}</h3>
          <p>${v.flavor}</p>
          <p class="tasting-note">${v.pairing}</p>
        </div>`
      )
      .join("");
  }

  function renderEditions() {
    const grid = document.querySelector("[data-edition-grid]");
    if (!grid) return;
    grid.innerHTML = CFG.pricing.bundles
      .map((bundle) => {
        const savings = Pricing.savingsVsBase(bundle);
        return `
        <div class="edition-card">
          ${bundle.badge ? `<span class="edition-badge">${bundle.badge}</span>` : ""}
          <h3>${bundle.label}</h3>
          <p class="edition-price">${Pricing.formatMoney(bundle.price)}</p>
          <p class="edition-meta">${Pricing.formatMoney(Pricing.perTin(bundle))} / tin &middot; ${Pricing.formatPerChew(bundle)} / chew</p>
          ${savings.amount > 0 ? `<p class="edition-meta">Save ${savings.percent.toFixed(0)}%</p>` : ""}
        </div>`;
      })
      .join("");
  }

  function renderOfferCopy() {
    const noteEl = document.querySelector("[data-standing-order-note]");
    if (noteEl && CFG.pricing.subscription.enabled) {
      noteEl.textContent = `Standing order: save ${CFG.pricing.subscription.discountPercent}%, delivered ${CFG.pricing.subscription.intervalLabel}.`;
    }
    const guaranteeEl = document.querySelector("[data-guarantee-copy]");
    if (guaranteeEl) {
      guaranteeEl.textContent = `${CFG.pricing.guaranteeDays}-day guarantee. ${CFG.launch.priceLockCopy}`;
    }
    document.querySelectorAll("[data-batch-footer]").forEach((el) => {
      el.textContent = CFG.launch.batchLabel;
    });
    document.querySelectorAll("[data-qa-batch]").forEach((el) => {
      el.textContent = CFG.launch.batchLabel;
    });
  }

  function renderQaPricing() {
    const singleBundle = Pricing.getBundle("single") || CFG.pricing.bundles[0];
    document.querySelectorAll("[data-price-question]").forEach((el) => {
      el.textContent = Pricing.formatMoney(singleBundle.price);
    });
    document.querySelectorAll("[data-qa-per-chew]").forEach((el) => {
      el.textContent = Pricing.formatPerChew(singleBundle);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initWaitlist();
    initScrollReveal();
    renderProductStudy();
    renderEditions();
    renderOfferCopy();
    renderQaPricing();
  });
})();
