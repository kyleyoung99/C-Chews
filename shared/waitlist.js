/**
 * SAVOUR — WAITLIST MODAL LOGIC (no markup, no styling, no copy)
 * ---------------------------------------------------------------
 * v3 change from earlier builds: this file no longer builds any DOM
 * or owns any CSS. Each template supplies its own modal markup,
 * heading text, and skin in its own index.html/style.css. This file
 * only wires behavior against a fixed data-attribute contract that
 * every template's modal markup must implement:
 *
 *   [data-savour-modal]          the overlay/dialog root (toggle `hidden`)
 *   [data-savour-modal-panel]    the focus-trap boundary (optional —
 *                                 falls back to the root element)
 *   [data-savour-modal-close]    one or more close buttons/elements
 *   [data-savour-modal-form]     the email-capture <form>
 *   [data-savour-modal-email]    the email <input>
 *   [data-savour-modal-variant]  optional variant <select> to preselect
 *   [data-savour-modal-error]    element shown on invalid email
 *   [data-savour-modal-success]  success-state container, hidden by default
 *
 *   [data-waitlist-open]         anywhere on the page: click opens the
 *                                 modal. Optional data-variant="coffee"
 *                                 preselects a variant.
 *
 * There is no real checkout — config.launch.mode is "waitlist" — so a
 * valid submit only shows the success state and logs the payload. No
 * network requests are made anywhere in this file.
 *
 * Loaded as a plain global script exposing window.SavourWaitlist.
 */
(function () {
  let modal = null;
  let panel = null;
  let lastFocusedEl = null;
  let keydownHandler = null;

  function cfg() {
    return window.SAVOUR_CONFIG;
  }

  function query(sel) {
    return modal ? modal.querySelector(sel) : null;
  }

  function trapFocus(e) {
    if (!modal || modal.hidden) return;

    if (e.key === "Escape") {
      close();
      return;
    }

    if (e.key !== "Tab") return;

    const scope = panel || modal;
    const focusable = scope.querySelectorAll(
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

  function overlayClick(e) {
    if (e.target === modal) close();
  }

  function open(options) {
    options = options || {};
    if (!modal) return;

    lastFocusedEl = document.activeElement;

    const form = query("[data-savour-modal-form]");
    const success = query("[data-savour-modal-success]");
    const error = query("[data-savour-modal-error]");
    if (form) {
      form.hidden = false;
      form.reset();
    }
    if (success) success.hidden = true;
    if (error) error.hidden = true;

    if (options.variant) {
      const select = query("[data-savour-modal-variant]");
      if (select) select.value = options.variant;
    }

    modal.hidden = false;
    document.body.classList.add("savour-no-scroll");

    keydownHandler = trapFocus;
    document.addEventListener("keydown", keydownHandler);
    modal.addEventListener("click", overlayClick);

    const emailInput = query("[data-savour-modal-email]");
    if (emailInput) emailInput.focus();
  }

  function close() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("savour-no-scroll");
    if (keydownHandler) document.removeEventListener("keydown", keydownHandler);
    modal.removeEventListener("click", overlayClick);
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
    const emailInput = form.querySelector("[data-savour-modal-email]");
    const variantSelect = form.querySelector("[data-savour-modal-variant]");
    const email = emailInput ? emailInput.value.trim() : "";
    const errorEl = query("[data-savour-modal-error]");

    if (!isValidEmail(email)) {
      if (errorEl) errorEl.hidden = false;
      if (emailInput) emailInput.focus();
      return;
    }
    if (errorEl) errorEl.hidden = true;

    const payload = {
      email: email,
      variant: variantSelect ? variantSelect.value : null,
      batch: cfg().launch.batchLabel,
      source: window.location.pathname,
      submittedAt: new Date().toISOString(),
    };

    // TODO: wire to ESP (e.g. Klaviyo / Mailchimp) — no network call is made yet.
    console.log("[Savour waitlist submission]", payload);

    form.hidden = true;
    const success = query("[data-savour-modal-success]");
    if (success) {
      success.hidden = false;
      const focusTarget = success.querySelector("button, [href], [tabindex]");
      if (focusTarget) focusTarget.focus();
    }
  }

  function init() {
    modal = document.querySelector("[data-savour-modal]");
    if (!modal) return; // template hasn't supplied modal markup — nothing to wire
    panel = modal.querySelector("[data-savour-modal-panel]");

    modal.querySelectorAll("[data-savour-modal-close]").forEach((btn) => {
      btn.addEventListener("click", close);
    });

    const form = query("[data-savour-modal-form]");
    if (form) form.addEventListener("submit", handleSubmit);

    document.querySelectorAll("[data-waitlist-open]").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const variant = trigger.getAttribute("data-variant") || null;
        open(variant ? { variant } : {});
      });
    });
  }

  const EXIT_INTENT_KEY = "savour:exitIntentShown";

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
