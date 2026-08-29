/**
 * SAVOUR — WAITLIST MODAL
 * ---------------------------------------------------------------
 * Shared email-capture modal used by every "buy" / "join" CTA on
 * all three templates. There is no real checkout — config.launch.mode
 * is "waitlist" — so every purchase intent funnels here.
 *
 * Usage from a template's own script.js:
 *   SavourWaitlist.init();                    // wires [data-waitlist-open] triggers
 *   SavourWaitlist.open({ variant: "coffee" }); // open programmatically
 *
 * Exit-intent helpers (used by Template 03):
 *   SavourWaitlist.shouldOfferExitIntent()
 *   SavourWaitlist.markExitIntentOffered()
 *
 * Loaded as a plain global script exposing window.SavourWaitlist.
 * No network requests are made anywhere in this file.
 */
(function () {
  const EXIT_INTENT_KEY = "savour:exitIntentShown";

  let modalEl = null;
  let lastFocusedEl = null;
  let keydownHandler = null;

  function cfg() {
    return window.SAVOUR_CONFIG;
  }

  function pricingLib() {
    return window.SavourPricing;
  }

  function buildModal() {
    const wrap = document.createElement("div");
    wrap.className = "savour-waitlist-overlay";
    wrap.setAttribute("data-savour-waitlist-overlay", "");
    wrap.hidden = true;

    const config = cfg();
    const variantOptions = config.product.variants
      .map((v) => `<option value="${v.id}">${v.name}</option>`)
      .join("");

    wrap.innerHTML = `
      <div
        class="savour-waitlist-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="savour-waitlist-title"
        aria-describedby="savour-waitlist-desc"
      >
        <button
          type="button"
          class="savour-waitlist-close"
          data-savour-waitlist-close
          aria-label="Close waitlist form"
        >&times;</button>

        <div class="savour-waitlist-body" data-savour-waitlist-body>
          <h2 id="savour-waitlist-title">Join the ${config.launch.batchLabel} Waitlist</h2>
          <p id="savour-waitlist-desc" class="savour-waitlist-desc">
            ${config.launch.priceLockCopy} We'll email you the moment your batch ships —
            no spam, no third parties.
          </p>

          <form data-savour-waitlist-form novalidate>
            <label class="savour-waitlist-label" for="savour-waitlist-email">
              Email address
            </label>
            <input
              type="email"
              id="savour-waitlist-email"
              name="email"
              class="savour-waitlist-input"
              placeholder="you@email.com"
              required
              autocomplete="email"
            />
            <p class="savour-waitlist-error" data-savour-waitlist-error hidden>
              Enter a valid email address.
            </p>

            <label class="savour-waitlist-label" for="savour-waitlist-variant">
              Which one? (optional)
            </label>
            <select id="savour-waitlist-variant" name="variant" class="savour-waitlist-input">
              <option value="undecided">Not sure yet</option>
              ${variantOptions}
              <option value="both">Both</option>
            </select>

            <button type="submit" class="savour-waitlist-submit">
              Join the Waitlist
            </button>

            <p class="savour-waitlist-fineprint">
              ${config.launch.batchLabel} is limited to ${config.launch.foundersBatchUnits} tins.
            </p>
          </form>

          <div class="savour-waitlist-success" data-savour-waitlist-success hidden>
            <p class="savour-waitlist-success-title">You're on the list.</p>
            <p>
              We'll email you first when ${config.launch.batchLabel} opens — at your
              locked-in founders price.
            </p>
            <button type="button" class="savour-waitlist-submit" data-savour-waitlist-close>
              Done
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(wrap);
    return wrap;
  }

  function trapFocus(e) {
    if (!modalEl || modalEl.hidden) return;

    if (e.key === "Escape") {
      close();
      return;
    }

    if (e.key !== "Tab") return;

    const focusable = modalEl.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

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

  function open(options) {
    options = options || {};
    if (!modalEl) modalEl = buildModal();

    lastFocusedEl = document.activeElement;

    const form = modalEl.querySelector("[data-savour-waitlist-form]");
    const success = modalEl.querySelector("[data-savour-waitlist-success]");
    form.hidden = false;
    success.hidden = true;
    form.reset();
    modalEl.querySelector("[data-savour-waitlist-error]").hidden = true;

    if (options.variant) {
      const select = modalEl.querySelector("#savour-waitlist-variant");
      if (select) select.value = options.variant;
    }

    modalEl.hidden = false;
    document.body.classList.add("savour-no-scroll");

    keydownHandler = trapFocus;
    document.addEventListener("keydown", keydownHandler);

    const emailInput = modalEl.querySelector("#savour-waitlist-email");
    if (emailInput) emailInput.focus();

    modalEl.addEventListener("click", overlayClick);
  }

  function overlayClick(e) {
    if (e.target === modalEl) close();
  }

  function close() {
    if (!modalEl || modalEl.hidden) return;
    modalEl.hidden = true;
    document.body.classList.remove("savour-no-scroll");
    if (keydownHandler) document.removeEventListener("keydown", keydownHandler);
    modalEl.removeEventListener("click", overlayClick);
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector("#savour-waitlist-email").value.trim();
    const variant = form.querySelector("#savour-waitlist-variant").value;
    const errorEl = modalEl.querySelector("[data-savour-waitlist-error]");

    if (!isValidEmail(email)) {
      errorEl.hidden = false;
      form.querySelector("#savour-waitlist-email").focus();
      return;
    }
    errorEl.hidden = true;

    const payload = {
      email: email,
      variant: variant,
      batch: cfg().launch.batchLabel,
      source: window.location.pathname,
      submittedAt: new Date().toISOString(),
    };

    // TODO: wire to ESP (e.g. Klaviyo / Mailchimp) — no network call is made yet.
    console.log("[Savour waitlist submission]", payload);

    form.hidden = true;
    const success = modalEl.querySelector("[data-savour-waitlist-success]");
    success.hidden = false;
    const doneBtn = success.querySelector("button");
    if (doneBtn) doneBtn.focus();
  }

  function wireCloseButtons() {
    modalEl.querySelectorAll("[data-savour-waitlist-close]").forEach((btn) => {
      btn.addEventListener("click", close);
    });
    modalEl
      .querySelector("[data-savour-waitlist-form]")
      .addEventListener("submit", handleSubmit);
  }

  function init() {
    if (!modalEl) {
      modalEl = buildModal();
      wireCloseButtons();
    }

    document.querySelectorAll("[data-waitlist-open]").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const variant = trigger.getAttribute("data-variant") || null;
        open(variant ? { variant } : {});
      });
    });
  }

  function shouldOfferExitIntent() {
    try {
      return sessionStorage.getItem(EXIT_INTENT_KEY) !== "1";
    } catch (err) {
      return false;
    }
  }

  function markExitIntentOffered() {
    try {
      sessionStorage.setItem(EXIT_INTENT_KEY, "1");
    } catch (err) {
      /* storage unavailable — silently skip persistence */
    }
  }

  window.SavourWaitlist = {
    init,
    open,
    close,
    shouldOfferExitIntent,
    markExitIntentOffered,
  };
})();
