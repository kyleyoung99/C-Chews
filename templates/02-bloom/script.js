/**
 * TEMPLATE 02 — BLOOM
 * Wires the announcement rotator, sticky nav search/drawer, the hero
 * slideshow, the recurring product-card rail (start/flavor/bundles),
 * the "coffee or wine" quiz, the plan switch, the FAQ accordion, and
 * the footer capture — all against shared/config.js + pricing.js.
 * Belief-chain / objection coverage is called out in index.html.
 */
(function () {
  const CFG = window.SAVOUR_CONFIG;
  const Pricing = window.SavourPricing;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------
   * Live copy — every number here comes from config/pricing, never
   * a literal in markup.
   * ------------------------------------------------------------- */

  function injectValues() {
    const shipMoney = Pricing.formatMoney(CFG.pricing.freeShippingThreshold);

    document.querySelectorAll("[data-faq-ship]").forEach((el) => {
      el.textContent = `${CFG.launch.batchLabel} caps at ${CFG.launch.foundersBatchUnits} tins so we can taste every run ourselves. Join the list and you're first when it opens — nothing ships before then.`;
    });
    document.querySelectorAll("[data-faq-guarantee]").forEach((el) => {
      el.textContent = `${CFG.pricing.guaranteeDays}-day money-back guarantee once Batch 001 ships — no questions asked.`;
    });
    document.querySelectorAll("[data-capture-sub]").forEach((el) => {
      el.textContent = `${CFG.launch.priceLockCopy} Free shipping kicks in at ${shipMoney}.`;
    });
    document.querySelectorAll("[data-modal-sub]").forEach((el) => {
      el.textContent = `${CFG.launch.priceLockCopy} No charge today — there's no checkout yet.`;
    });
    document.querySelectorAll("[data-modal-ok-sub]").forEach((el) => {
      el.textContent = `We'll email you the second ${CFG.launch.batchLabel} opens.`;
    });
    document.querySelectorAll("[data-story-honest]").forEach((el) => {
      el.textContent = "We're not putting a founder's name on this yet — nothing has shipped, and we'd rather earn that than print it early.";
    });
  }

  /* ---------------------------------------------------------------
   * Modal variant <select> — built from config, not hardcoded.
   * ------------------------------------------------------------- */

  function populateModalVariants() {
    const select = document.querySelector("[data-savour-modal-variant]");
    if (!select) return;
    const options = CFG.product.variants
      .map((v) => `<option value="${v.id}">${v.name}</option>`)
      .join("");
    select.innerHTML = `<option value="undecided">Not sure yet</option>${options}<option value="both">Both</option>`;
  }

  /* ---------------------------------------------------------------
   * Announcement bar — rotating, pause control, live-computed copy.
   * ------------------------------------------------------------- */

  function initAnnouncement() {
    const msgEl = document.querySelector("[data-anno-msg]");
    if (!msgEl) return;
    const prevBtn = document.querySelector("[data-anno-prev]");
    const nextBtn = document.querySelector("[data-anno-next]");
    const pauseBtn = document.querySelector("[data-anno-pause]");
    const pauseLabel = document.querySelector("[data-anno-pause-label]");

    const messages = [
      `Free shipping on orders over ${Pricing.formatMoney(CFG.pricing.freeShippingThreshold)}.`,
      `${CFG.launch.batchLabel}: ${CFG.launch.foundersBatchUnits} tins, ${CFG.launch.priceLockCopy.toLowerCase()}`,
      `${CFG.pricing.guaranteeDays}-day guarantee once Batch 001 ships.`,
    ];
    let index = 0;
    let timer = null;
    let paused = reduceMotion;

    function render() {
      msgEl.classList.add("is-swapping");
      window.setTimeout(() => {
        msgEl.textContent = messages[index];
        msgEl.classList.remove("is-swapping");
      }, reduceMotion ? 0 : 160);
    }

    function step(delta) {
      index = (index + delta + messages.length) % messages.length;
      render();
    }

    function start() {
      if (reduceMotion) return;
      stop();
      timer = window.setInterval(() => step(1), 4500);
    }
    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    render();
    if (!paused) start();

    if (prevBtn) prevBtn.addEventListener("click", () => step(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => step(1));
    if (pauseBtn) {
      pauseBtn.setAttribute("aria-pressed", String(paused));
      if (pauseLabel) pauseLabel.textContent = paused ? "Play announcements" : "Pause announcements";
      pauseBtn.addEventListener("click", () => {
        paused = !paused;
        pauseBtn.setAttribute("aria-pressed", String(paused));
        if (pauseLabel) pauseLabel.textContent = paused ? "Play announcements" : "Pause announcements";
        if (paused) stop();
        else start();
      });
    }
  }

  /* ---------------------------------------------------------------
   * Search toggle
   * ------------------------------------------------------------- */

  function initSearch() {
    const toggle = document.querySelector("[data-search-toggle]");
    const panel = document.getElementById("site-search");
    if (!toggle || !panel) return;
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
      if (!open) {
        const input = panel.querySelector("input");
        if (input) input.focus();
      }
    });
  }

  /* ---------------------------------------------------------------
   * Bag drawer — a real cart (line items, quantities, live free-
   * shipping progress). Checkout itself is a stub: see initCheckout.
   * ------------------------------------------------------------- */

  let cart = [];

  function cartSubtotal() {
    return cart.reduce((sum, l) => sum + l.unitPrice * l.qty, 0);
  }

  function addToCart(item) {
    const existing = cart.find((l) => l.id === item.id);
    if (existing) existing.qty += 1;
    else cart.push({ id: item.id, name: item.name, meta: item.meta, thumb: item.thumb, unitPrice: item.unitPrice, qty: 1 });
    renderCart();
    openDrawer();
  }

  function addVariantToCart(variantId) {
    const variant = Pricing.getVariant(variantId);
    if (!variant) return;
    const single = Pricing.getBundle("single") || CFG.pricing.bundles[0];
    addToCart({
      id: "variant-" + variantId,
      name: variant.name,
      meta: variant.flavor + " · " + CFG.product.chewsPerTin + " chews",
      thumb: variantId,
      unitPrice: single.price,
    });
  }

  function addBundleToCart(bundle, plan) {
    const subscribing = plan === "sub";
    const price = subscribing ? Pricing.subscriptionPrice(bundle) : bundle.price;
    addToCart({
      id: bundle.id + "-" + plan,
      name: bundle.label + (subscribing ? " (Subscription)" : " (One-time)"),
      meta: bundle.tins + (bundle.tins === 1 ? " tin" : " tins") + " · " + bundle.tins * CFG.product.chewsPerTin + " chews",
      thumb: bundle.id,
      unitPrice: price,
    });
  }

  function renderCart() {
    const lines = document.querySelector("[data-bag-lines]");
    const empty = document.querySelector("[data-bag-empty]");
    const subtotalEl = document.querySelector("[data-bag-subtotal]");
    const countEl = document.querySelector("[data-bag-count]");
    const drawer = document.getElementById("bag-drawer");
    if (!lines || !drawer) return;

    const count = cart.reduce((sum, l) => sum + l.qty, 0);
    if (countEl) {
      countEl.textContent = String(count);
      countEl.hidden = count === 0;
    }
    if (empty) empty.hidden = cart.length > 0;

    lines.innerHTML = cart
      .map(
        (l) => `
        <li class="line" data-cart-line="${l.id}">
          <span class="line__thumb line__thumb--${l.thumb}" aria-hidden="true"></span>
          <div style="flex:1;min-width:0;">
            <p class="line__name">${l.name}</p>
            <p class="line__meta">${l.meta}</p>
            <div class="line__qty">
              <button type="button" data-qty-dec aria-label="Decrease quantity">−</button>
              <span data-qty-value>${l.qty}</span>
              <button type="button" data-qty-inc aria-label="Increase quantity">+</button>
            </div>
          </div>
          <p class="line__price">${Pricing.formatMoney(l.unitPrice * l.qty)}</p>
          <button type="button" class="line__rm" data-line-remove>Remove</button>
        </li>`
      )
      .join("");

    const subtotal = cartSubtotal();
    if (subtotalEl) subtotalEl.textContent = Pricing.formatMoney(subtotal);

    const msg = drawer.querySelector("[data-ship-msg]");
    const fill = drawer.querySelector("[data-ship-fill]");
    if (msg && fill) {
      if (cart.length === 0) {
        msg.textContent = `Add ${Pricing.formatMoney(CFG.pricing.freeShippingThreshold)} to unlock free shipping.`;
        fill.style.width = "0%";
      } else if (Pricing.qualifiesForFreeShipping(subtotal)) {
        msg.textContent = "Free shipping unlocked.";
        fill.style.width = "100%";
      } else {
        msg.textContent = `Add ${Pricing.formatMoney(Pricing.amountToFreeShipping(subtotal))} more for free shipping.`;
        fill.style.width = Pricing.freeShippingProgressPercent(subtotal) + "%";
      }
    }
  }

  let drawerLastFocused = null;

  function openDrawer() {
    const drawer = document.getElementById("bag-drawer");
    if (!drawer) return;
    drawerLastFocused = document.activeElement;
    drawer.hidden = false;
    document.querySelectorAll("[data-drawer-open]").forEach((btn) => btn.setAttribute("aria-expanded", "true"));
    document.body.classList.add("savour-no-scroll");
    document.addEventListener("keydown", drawerKeydown);
    const closeBtn = drawer.querySelector("[data-drawer-close]");
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    const drawer = document.getElementById("bag-drawer");
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    document.querySelectorAll("[data-drawer-open]").forEach((btn) => btn.setAttribute("aria-expanded", "false"));
    document.body.classList.remove("savour-no-scroll");
    document.removeEventListener("keydown", drawerKeydown);
    if (drawerLastFocused && typeof drawerLastFocused.focus === "function") drawerLastFocused.focus();
  }

  function drawerKeydown(e) {
    if (e.key !== "Escape") return;
    const drawer = document.getElementById("bag-drawer");
    if (!drawer) return;
    const panel = drawer.querySelector("[data-drawer-panel]");
    if (!panel) { closeDrawer(); return; }
    const focusable = panel.querySelectorAll('button, [href], input, select, [tabindex]:not([tabindex="-1"])');
    if (e.key === "Tab" && focusable.length) {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    closeDrawer();
  }

  function initCart() {
    document.querySelectorAll("[data-drawer-open]").forEach((btn) => btn.addEventListener("click", openDrawer));
    document.querySelectorAll("[data-drawer-close]").forEach((btn) => btn.addEventListener("click", closeDrawer));

    document.addEventListener("click", (e) => {
      const variantTrigger = e.target.closest("[data-cart-add-variant]");
      if (variantTrigger && !variantTrigger.hasAttribute("data-quick-add")) {
        e.preventDefault();
        addVariantToCart(variantTrigger.getAttribute("data-cart-add-variant"));
      }
    });

    const lines = document.querySelector("[data-bag-lines]");
    if (lines) {
      lines.addEventListener("click", (e) => {
        const line = e.target.closest("[data-cart-line]");
        if (!line) return;
        const id = line.getAttribute("data-cart-line");
        const item = cart.find((l) => l.id === id);
        if (!item) return;
        if (e.target.closest("[data-qty-inc]")) {
          item.qty += 1;
          renderCart();
        } else if (e.target.closest("[data-qty-dec]")) {
          item.qty -= 1;
          if (item.qty <= 0) cart = cart.filter((l) => l.id !== id);
          renderCart();
        } else if (e.target.closest("[data-line-remove]")) {
          cart = cart.filter((l) => l.id !== id);
          renderCart();
        }
      });
    }

    renderCart();
  }

  function initCheckout() {
    const modal = document.querySelector("[data-checkout-modal]");
    if (!modal) return;
    const form = modal.querySelector("[data-checkout-form]");
    const success = modal.querySelector("[data-checkout-success]");
    const error = modal.querySelector("[data-checkout-error]");
    const email = modal.querySelector("[data-checkout-email]");
    let lastFocused = null;

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

    document.querySelectorAll("[data-checkout-open]").forEach((btn) => btn.addEventListener("click", open));
    modal.querySelectorAll("[data-checkout-close]").forEach((btn) => btn.addEventListener("click", close));
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = email ? email.value.trim() : "";
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!valid) {
          if (error) error.hidden = false;
          if (email) email.focus();
          return;
        }
        if (error) error.hidden = true;

        const payload = {
          email: value,
          cart: cart.map((l) => ({ id: l.id, name: l.name, qty: l.qty, unitPrice: l.unitPrice })),
          subtotal: cartSubtotal(),
          batch: CFG.launch.batchLabel,
          submittedAt: new Date().toISOString(),
        };
        // TODO: wire to ESP and payment provider — no network request is made yet.
        console.log("[Savour checkout submission]", payload);

        form.hidden = true;
        if (success) {
          success.hidden = false;
          const focusTarget = success.querySelector("button, [href], [tabindex]");
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
    const full = Math.round(rating);
    let s = "";
    for (let i = 0; i < 5; i++) s += i < full ? "★" : "☆";
    return s;
  }

  function formatReviewDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(CFG.currency.locale, { month: "short", day: "numeric", year: "numeric" });
  }

  function renderReviews() {
    const proof = window.SAVOUR_DEMO_PROOF;
    const host = document.querySelector("[data-review-cards]");
    if (!proof || !host) return;
    const head = document.querySelector(".proof__head");

    if (!CFG.launch.showDemoProof) {
      if (head) head.hidden = true;
      host.hidden = true;
      return;
    }

    const agg = proof.aggregate;
    const aggStars = document.querySelector("[data-agg-stars]");
    const aggCount = document.querySelector("[data-agg-count]");
    if (aggStars) aggStars.textContent = starString(agg.rating);
    if (aggCount) aggCount.textContent = `${agg.rating.toFixed(1)} · ${agg.count} reviews`;

    const list = (proof.reviews && proof.reviews["02-bloom"]) || [];
    host.innerHTML = list
      .map((r) => {
        const variant = Pricing.getVariant(r.variant);
        return `
        <li class="rcard" data-demo="true">
          <div class="rating rating--sm" role="img" aria-label="${r.rating} out of 5 stars">
            <span class="stars" aria-hidden="true">${starString(r.rating)}</span>
          </div>
          <p class="rcard__slot">“${r.quote}”</p>
          <div class="rcard__by">
            <span class="rcard__avatar" aria-hidden="true"></span>
            <span class="rcard__name">${r.name} · ${variant ? variant.name : ""} · ${formatReviewDate(r.date)}</span>
          </div>
        </li>`;
      })
      .join("");
  }

  /* ---------------------------------------------------------------
   * Hero slideshow — two slides tied to the two variants.
   * ------------------------------------------------------------- */

  function initHero() {
    const slides = Array.from(document.querySelectorAll("[data-hero-slide]"));
    const dots = Array.from(document.querySelectorAll("[data-hero-dot]"));
    const addBtn = document.querySelector("[data-hero-add]");
    const eyebrow = document.querySelector("[data-hero-eyebrow]");
    const line = document.querySelector("[data-hero-line]");
    const pauseBtn = document.querySelector("[data-hero-pause]");
    const pauseLabel = document.querySelector("[data-hero-pause-label]");
    if (!slides.length) return;

    const copy = {
      coffee: { eyebrow: "POST-COFFEE · CARDAMOM & SWEET CREAM", line: "For the walk back to your desk." },
      wine: { eyebrow: "POST-WINE · DARK CHERRY & SAGE", line: "For the second glass, minus the tell." },
    };
    const order = ["coffee", "wine"];
    let current = 0;
    let timer = null;
    let paused = reduceMotion;

    function applySlide(i, animate) {
      current = i;
      const variant = order[i];

      slides.forEach((slide, idx) => {
        const active = idx === i;
        slide.hidden = !active;
        slide.classList.toggle("is-active", active);
      });
      dots.forEach((dot, idx) => {
        dot.setAttribute("aria-selected", String(idx === i));
      });
      if (addBtn) addBtn.setAttribute("data-cart-add-variant", variant);

      const swap = () => {
        if (eyebrow) eyebrow.textContent = copy[variant].eyebrow;
        if (line) line.textContent = copy[variant].line;
      };
      if (animate && !reduceMotion) {
        if (eyebrow) eyebrow.classList.add("is-swapping");
        if (line) line.classList.add("is-swapping");
        window.setTimeout(() => {
          swap();
          if (eyebrow) eyebrow.classList.remove("is-swapping");
          if (line) line.classList.remove("is-swapping");
        }, 160);
      } else {
        swap();
      }
    }

    function step(delta) {
      applySlide((current + delta + order.length) % order.length, true);
    }

    function start() {
      if (reduceMotion) return;
      stop();
      timer = window.setInterval(() => step(1), 6000);
    }
    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    applySlide(0, false);
    if (!paused) start();

    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        applySlide(idx, true);
        stop();
        paused = true;
        if (pauseBtn) pauseBtn.setAttribute("aria-pressed", "true");
        if (pauseLabel) pauseLabel.textContent = "Play slideshow";
      });
    });

    if (pauseBtn) {
      pauseBtn.setAttribute("aria-pressed", String(paused));
      if (pauseLabel) pauseLabel.textContent = paused ? "Play slideshow" : "Pause slideshow";
      pauseBtn.addEventListener("click", () => {
        paused = !paused;
        pauseBtn.setAttribute("aria-pressed", String(paused));
        if (pauseLabel) pauseLabel.textContent = paused ? "Play slideshow" : "Pause slideshow";
        if (paused) stop();
        else start();
      });
    }
  }

  /* ---------------------------------------------------------------
   * The recurring product card — used in the "start here" rail and
   * the "find your flavor" tiles.
   * ------------------------------------------------------------- */

  const variantPhoto = {
    coffee: { src: "../../assets/photography/coffee-tin-studio.jpg", alt: "Savour Post-Coffee tin, open, on a studio background." },
    wine: { src: "../../assets/photography/wine-tin-studio.jpg", alt: "Savour Post-Wine tin, open, on a studio background." },
  };

  function productCardHTML(variant, bundle, opts) {
    opts = opts || {};
    const note = opts.note || variant.flavor;
    const noteClass = opts.large ? "pcard__note" : "pcard__flavor";
    const photo = variantPhoto[variant.id];
    return `
      <li class="pcard pcard--${variant.id}" data-swatch-card>
        <div class="pcard__plate">
          <img data-swatch-photo src="${photo.src}" alt="${photo.alt}">
        </div>
        <p class="pcard__name" data-swatch-name>${variant.name}</p>
        <p class="${noteClass}" data-swatch-note>${note}</p>
        <div class="rating" role="img" aria-label="Aggregate star rating" data-demo="true">
          <span class="stars" aria-hidden="true" data-agg-stars-mini></span>
          <span class="rating__ph" data-agg-count-mini>&nbsp;</span>
        </div>
        <p class="pcard__price">${Pricing.formatMoney(bundle.price)} <span class="pcard__unit">/ tin</span></p>
        <div class="pcard__swatches" role="group" aria-label="Choose a flavor for this card">
          <button type="button" class="swatch swatch--coffee" data-swatch-pick="coffee" aria-pressed="${variant.id === "coffee"}"><span class="sr-only">Post-Coffee</span></button>
          <button type="button" class="swatch swatch--wine" data-swatch-pick="wine" aria-pressed="${variant.id === "wine"}"><span class="sr-only">Post-Wine</span></button>
        </div>
        <button type="button" class="pcard__add" data-quick-add data-cart-add-variant="${variant.id}">Add to bag</button>
      </li>`;
  }

  function wireSwatchCard(li) {
    const nameEl = li.querySelector("[data-swatch-name]");
    const noteEl = li.querySelector("[data-swatch-note]");
    const photoEl = li.querySelector("[data-swatch-photo]");
    const addBtn = li.querySelector("[data-quick-add]");
    li.querySelectorAll("[data-swatch-pick]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-swatch-pick");
        const variant = Pricing.getVariant(id);
        if (!variant) return;
        li.classList.remove("pcard--coffee", "pcard--wine");
        li.classList.add(`pcard--${id}`);
        li.querySelectorAll("[data-swatch-pick]").forEach((b) => {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        if (nameEl) nameEl.textContent = variant.name;
        if (noteEl) noteEl.textContent = variant.flavor;
        if (photoEl) {
          const photo = variantPhoto[id];
          photoEl.src = photo.src;
          photoEl.alt = photo.alt;
        }
        if (addBtn) addBtn.setAttribute("data-cart-add-variant", id);
      });
    });
    // dynamically-created triggers are not covered by the page-load
    // delegated cart wiring, so wire this one directly.
    if (addBtn) {
      addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        addVariantToCart(addBtn.getAttribute("data-cart-add-variant"));
      });
    }
    const miniStars = li.querySelector("[data-agg-stars-mini]");
    const miniCount = li.querySelector("[data-agg-count-mini]");
    const proof = window.SAVOUR_DEMO_PROOF;
    if (proof && CFG.launch.showDemoProof) {
      if (miniStars) miniStars.textContent = starString(proof.aggregate.rating);
      if (miniCount) miniCount.textContent = proof.aggregate.rating.toFixed(1) + " (" + proof.aggregate.count + ")";
    } else {
      const ratingEl = li.querySelector(".rating");
      if (ratingEl) ratingEl.hidden = true;
    }
  }

  function renderStartRail() {
    const track = document.querySelector('[data-cards="start"]');
    if (!track) return;
    const singleBundle = Pricing.getBundle("single") || CFG.pricing.bundles[0];
    track.innerHTML = CFG.product.variants.map((v) => productCardHTML(v, singleBundle)).join("");
    track.querySelectorAll("li[data-swatch-card]").forEach(wireSwatchCard);
  }

  const flavorNotes = {
    coffee: "Cardamom and sweet cream, built to sit on top of a flat white — not fight it.",
    wine: "Dark cherry and sage, made for the second glass — minus the tell.",
  };

  function renderFlavorTiles() {
    const grid = document.querySelector('[data-cards="flavor"]');
    if (!grid) return;
    const singleBundle = Pricing.getBundle("single") || CFG.pricing.bundles[0];
    grid.innerHTML = CFG.product.variants
      .map((v) => productCardHTML(v, singleBundle, { note: flavorNotes[v.id], large: true }))
      .join("");
    grid.querySelectorAll("li[data-swatch-card]").forEach(wireSwatchCard);
  }

  /* ---------------------------------------------------------------
   * Bundle cards + plan switch (subscribe vs one-time), all live.
   * ------------------------------------------------------------- */

  let purchaseMode = "sub";

  const bundleTint = { single: "", duo: "pcard--pair", trio: "pcard--next" };
  const bundleTins = { single: 1, duo: 2, trio: 3 };

  function bundleTinMarkup(bundle) {
    const count = bundleTins[bundle.id] || bundle.tins;
    let html = '<span class="pcard__tin" aria-hidden="true"><span>savour</span></span>';
    if (count >= 2) html += '<span class="pcard__tin pcard__tin--b" aria-hidden="true"></span>';
    if (count >= 3) html += '<span class="pcard__tin pcard__tin--c" aria-hidden="true"></span>';
    return html;
  }

  function bundleCardHTML(bundle) {
    const isSub = purchaseMode === "sub" && CFG.pricing.subscription.enabled;
    const price = isSub ? Pricing.subscriptionPrice(bundle) : bundle.price;
    const savings = Pricing.savingsVsBase(bundle);
    const tint = bundleTint[bundle.id] || "";
    const featured = bundle.badge ? "is-featured" : "";
    const qualifies = Pricing.qualifiesForFreeShipping(price);

    return `
      <li class="pcard ${tint} ${featured}">
        ${bundle.badge ? `<span class="badge">${bundle.badge}</span>` : ""}
        <div class="pcard__plate">
          ${bundleTinMarkup(bundle)}
        </div>
        <p class="pcard__name">${bundle.label}</p>
        <p class="pcard__perchew">${Pricing.formatPerChew(bundle)} / chew</p>
        <p class="pcard__price">
          ${Pricing.formatMoney(price)}
          ${savings.amount > 0 ? `<span class="pcard__was">${Pricing.formatMoney(savings.baseTotal)}</span>` : ""}
          <span class="pcard__unit">${isSub ? CFG.pricing.subscription.intervalLabel : "one time"}</span>
        </p>
        ${savings.amount > 0 ? `<span class="save-pill">Save ${Pricing.formatMoney(savings.amount)} (${savings.percent.toFixed(0)}%)</span>` : ""}
        <p class="pcard__ship">${qualifies ? "Qualifies for free shipping." : `Add ${Pricing.formatMoney(Pricing.amountToFreeShipping(price))} more for free shipping.`}</p>
        <button type="button" class="pcard__add" data-bundle-add="${bundle.id}">Add to bag</button>
      </li>`;
  }

  function renderBundles() {
    const grid = document.querySelector('[data-cards="bundles"]');
    if (!grid) return;
    grid.innerHTML = CFG.pricing.bundles.map(bundleCardHTML).join("");
    grid.querySelectorAll("[data-bundle-add]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const bundle = Pricing.getBundle(btn.getAttribute("data-bundle-add"));
        if (!bundle) return;
        addBundleToCart(bundle, purchaseMode);
      });
    });

    const subLabel = document.querySelector("[data-plan-sub-label]");
    if (subLabel) subLabel.textContent = `Subscribe & save ${CFG.pricing.subscription.discountPercent}%`;

    const note = document.querySelector("[data-plan-note]");
    if (note) {
      note.textContent = purchaseMode === "sub"
        ? `Ships ${CFG.pricing.subscription.intervalLabel}. Cancel anytime.`
        : "One-time purchase — ships once, no subscription.";
    }

    const shipNote = document.querySelector("[data-ship-note]");
    if (shipNote) {
      shipNote.textContent = `Free shipping on orders over ${Pricing.formatMoney(CFG.pricing.freeShippingThreshold)}.`;
    }
  }

  function initPlanSwitch() {
    document.querySelectorAll("[data-plan]").forEach((input) => {
      input.addEventListener("change", () => {
        if (input.checked) {
          purchaseMode = input.value === "sub" ? "sub" : "once";
          renderBundles();
        }
      });
    });
  }

  /* ---------------------------------------------------------------
   * Rails — arrow navigation (start rail) + video-rail pause control
   * ------------------------------------------------------------- */

  function initRailArrows() {
    document.querySelectorAll("[data-rail-prev], [data-rail-next]").forEach((btn) => {
      const key = btn.getAttribute("data-rail-prev") || btn.getAttribute("data-rail-next");
      const dir = btn.hasAttribute("data-rail-prev") ? -1 : 1;
      const track = document.querySelector(`[data-rail="${key}"]`);
      if (!track) return;
      btn.addEventListener("click", () => {
        track.scrollBy({ left: dir * 300, behavior: reduceMotion ? "auto" : "smooth" });
      });
    });
  }

  function initVideoPause() {
    const section = document.querySelector(".vids");
    const btn = document.querySelector("[data-vid-pause]");
    const label = document.querySelector("[data-vid-pause-label]");
    if (!section || !btn) return;
    let paused = reduceMotion;
    section.classList.toggle("is-paused", paused);
    btn.setAttribute("aria-pressed", String(paused));
    if (label) label.textContent = paused ? "Play previews" : "Pause previews";
    btn.addEventListener("click", () => {
      paused = !paused;
      section.classList.toggle("is-paused", paused);
      btn.setAttribute("aria-pressed", String(paused));
      if (label) label.textContent = paused ? "Play previews" : "Pause previews";
    });
  }

  /* ---------------------------------------------------------------
   * Quiz — three real questions, majority-vote result.
   * ------------------------------------------------------------- */

  const quizResults = {
    coffee: {
      kicker: "YOUR MATCH: POST-COFFEE",
      title: "Savour Post-Coffee.",
      body: "Cardamom and sweet cream, for right after the cup. Keep one at your desk.",
    },
    wine: {
      kicker: "YOUR MATCH: POST-WINE",
      title: "Savour Post-Wine.",
      body: "Dark cherry and sage, for right after the glass. Keep one in your bag.",
    },
    both: {
      kicker: "YOUR MATCH: THE PAIR",
      title: "Savour, both ways.",
      body: "Sounds like you need one of each — The Pair covers both moments.",
    },
  };

  function initQuiz() {
    const form = document.querySelector("[data-quiz-form]");
    const err = document.querySelector("[data-quiz-err]");
    const result = document.querySelector("[data-quiz-result]");
    const kicker = document.querySelector("[data-quiz-kicker]");
    const title = document.querySelector("[data-quiz-title]");
    const body = document.querySelector("[data-quiz-body]");
    const addBtn = document.querySelector("[data-quiz-add]");
    const restartBtn = document.querySelector("[data-quiz-restart]");
    if (!form) return;

    let lastMatch = "both";

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const answers = [data.get("q1"), data.get("q2"), data.get("q3")];
      if (answers.some((a) => !a)) {
        if (err) err.hidden = false;
        return;
      }
      if (err) err.hidden = true;

      const tally = { coffee: 0, wine: 0, both: 0 };
      answers.forEach((a) => { tally[a] = (tally[a] || 0) + 1; });
      let match = "both";
      if (tally.coffee > tally.wine && tally.coffee >= tally.both) match = "coffee";
      else if (tally.wine > tally.coffee && tally.wine >= tally.both) match = "wine";
      lastMatch = match;

      const r = quizResults[match];
      if (kicker) kicker.textContent = r.kicker;
      if (title) title.textContent = r.title;
      if (body) body.textContent = r.body;

      form.hidden = true;
      if (result) result.hidden = false;
    });

    if (addBtn) {
      addBtn.addEventListener("click", () => {
        if (lastMatch === "both") {
          const duo = Pricing.getBundle("duo");
          if (duo) addBundleToCart(duo, "onetime");
        } else {
          addVariantToCart(lastMatch);
        }
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        form.reset();
        form.hidden = false;
        if (result) result.hidden = true;
        if (err) err.hidden = true;
      });
    }
  }

  /* ---------------------------------------------------------------
   * FAQ accordion
   * ------------------------------------------------------------- */

  function initFaq() {
    document.querySelectorAll(".faq__q").forEach((btn) => {
      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        const panel = document.getElementById(btn.getAttribute("aria-controls"));
        btn.setAttribute("aria-expanded", String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  }

  /* ---------------------------------------------------------------
   * Footer email capture — feeds the same waitlist modal, not a
   * second capture mechanism.
   * ------------------------------------------------------------- */

  function initFooterCapture() {
    const form = document.querySelector("[data-capture-form]");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("#capture-email");
      const value = input ? input.value.trim() : "";
      window.SavourWaitlist.open();
      const modalEmail = document.querySelector("[data-savour-modal-email]");
      if (modalEmail && value) modalEmail.value = value;
      form.reset();
    });
  }

  /* ---------------------------------------------------------------
   * Boot
   * ------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    injectValues();
    populateModalVariants();
    initAnnouncement();
    initSearch();
    initCart();
    initCheckout();
    initHero();
    renderStartRail();
    renderFlavorTiles();
    renderBundles();
    renderReviews();
    initPlanSwitch();
    initRailArrows();
    initVideoPause();
    initQuiz();
    initFaq();
    initFooterCapture();
    window.SavourWaitlist.init();
  });
})();
