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
   * Bag drawer — honestly empty (no real cart, no real checkout);
   * shows live free-shipping progress from $0.
   * ------------------------------------------------------------- */

  function initDrawer() {
    const drawer = document.getElementById("bag-drawer");
    const panel = drawer ? drawer.querySelector("[data-drawer-panel]") : null;
    const openers = document.querySelectorAll("[data-drawer-open]");
    const closers = drawer ? drawer.querySelectorAll("[data-drawer-close]") : [];
    if (!drawer) return;

    let lastFocused = null;

    function renderShipping() {
      const msg = drawer.querySelector("[data-ship-msg]");
      const fill = drawer.querySelector("[data-ship-fill]");
      const remaining = Pricing.amountToFreeShipping(0);
      if (msg) {
        msg.textContent = remaining > 0
          ? `Add ${Pricing.formatMoney(remaining)} to unlock free shipping.`
          : "Free shipping unlocked.";
      }
      if (fill) fill.style.width = Pricing.freeShippingProgressPercent(0) + "%";
    }

    function open() {
      lastFocused = document.activeElement;
      drawer.hidden = false;
      openers.forEach((btn) => btn.setAttribute("aria-expanded", "true"));
      document.body.classList.add("savour-no-scroll");
      document.addEventListener("keydown", onKeydown);
      const closeBtn = drawer.querySelector("[data-drawer-close]");
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      drawer.hidden = true;
      openers.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
      document.body.classList.remove("savour-no-scroll");
      document.removeEventListener("keydown", onKeydown);
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    function onKeydown(e) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll('button, [href], input, select, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
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

    renderShipping();
    openers.forEach((btn) => btn.addEventListener("click", open));
    closers.forEach((el) => el.addEventListener("click", close));
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
      if (addBtn) addBtn.setAttribute("data-variant", variant);

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
        <div class="rating rating--empty" role="img" aria-label="Star rating pending launch — no rating yet">
          <span class="stars" aria-hidden="true"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span></span>
          <span class="rating__ph">[STAR RATING — pending launch]</span>
        </div>
        <p class="pcard__price">${Pricing.formatMoney(bundle.price)} <span class="pcard__unit">/ tin</span></p>
        <div class="pcard__swatches" role="group" aria-label="Choose a flavor for this card">
          <button type="button" class="swatch swatch--coffee" data-swatch-pick="coffee" aria-pressed="${variant.id === "coffee"}"><span class="sr-only">Post-Coffee</span></button>
          <button type="button" class="swatch swatch--wine" data-swatch-pick="wine" aria-pressed="${variant.id === "wine"}"><span class="sr-only">Post-Wine</span></button>
        </div>
        <button type="button" class="pcard__add" data-quick-add data-waitlist-open data-variant="${variant.id}">Add to bag</button>
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
        if (addBtn) addBtn.setAttribute("data-variant", id);
      });
    });
    // dynamically-created triggers are not seen by SavourWaitlist.init()'s
    // startup scan, so wire this one directly.
    if (addBtn) {
      addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.SavourWaitlist.open({ variant: addBtn.getAttribute("data-variant") });
      });
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
          <span class="pcard__ph">[PHOTO — studio: ${bundle.tins} tin${bundle.tins > 1 ? "s" : ""} stacked on flat pastel]</span>
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
        window.SavourWaitlist.open();
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
        window.SavourWaitlist.open({ variant: lastMatch });
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
    initDrawer();
    initHero();
    renderStartRail();
    renderFlavorTiles();
    renderBundles();
    initPlanSwitch();
    initRailArrows();
    initVideoPause();
    initQuiz();
    initFaq();
    initFooterCapture();
    window.SavourWaitlist.init();
  });
})();
