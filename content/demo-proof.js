/**
 * SAMPLE DATA — NOT REAL CUSTOMER REVIEWS.
 * Written to populate the UI for design review and stakeholder demos.
 * Savour has not shipped; no one in this file is a real customer.
 * Replace with verified reviews before any public launch, or set
 * config.launch.showDemoProof = false to remove them from the page.
 */

/**
 * SAVOUR — SEEDED DEMO PROOF
 * ---------------------------------------------------------------
 * Every review, rating and aggregate figure anywhere on any template
 * is sourced from this file, never hand-typed into markup. Each
 * template's script.js reads window.SAVOUR_DEMO_PROOF, checks
 * SAVOUR_CONFIG.launch.showDemoProof, and — only when that flag is
 * true — renders these entries with data-demo="true" on every
 * element they produce. Flip the flag and reload: every seeded
 * review, star rating and review count disappears from all three
 * pages with zero HTML edits.
 *
 * `verified` is false on every entry here on purpose. The review
 * card component reads that field to decide whether to show a
 * "Verified Buyer" badge — it must not show one while this file is
 * the source, because none of these purchases happened.
 *
 * Loaded as a plain global script exposing window.SAVOUR_DEMO_PROOF.
 * Depends on nothing; shared/config.js reads it, not the reverse.
 */
window.SAVOUR_DEMO_PROOF = {
  // A believable founding-batch figure — not an inflated one. This is
  // the number most likely to survive unedited into production, so it
  // stays plausible rather than impressive.
  aggregate: {
    rating: 4.8,
    count: 214,
  },

  // Assigned per §6.3 of the build prompt: reviews 1-4 are Post-Coffee
  // (template 01), 5-8 are Post-Wine (template 02), 9-12 are mixed
  // (template 03). Do not reuse one review across two pages.
  reviews: {
    "01-ag1": [
      {
        rating: 5,
        quote: "I do three back-to-back client calls after lunch and I used to just angle away from the camera. Genuinely have not thought about it in two weeks.",
        name: "Dana R.",
        variant: "coffee",
        date: "2026-08-14",
        verified: false,
      },
      {
        rating: 5,
        quote: "The cardamom thing sounds weird and then it makes total sense. It finishes the coffee instead of arguing with it.",
        name: "Marcus T.",
        variant: "coffee",
        date: "2026-07-29",
        verified: false,
      },
      {
        rating: 4,
        quote: "Works. My only note is I wish the tin were slightly slimmer for a jacket pocket.",
        name: "Priya N.",
        variant: "coffee",
        date: "2026-08-22",
        verified: false,
      },
      {
        rating: 5,
        quote: "I keep one in my car console. Thirty seconds at a red light and I walk into the showing fine.",
        name: "Alexis W.",
        variant: "coffee",
        date: "2026-07-11",
        verified: false,
      },
    ],
    "02-bloom": [
      {
        rating: 5,
        quote: "Wedding season was the test. Four events, zero purple-smile photos. That's the whole review.",
        name: "Jordan M.",
        variant: "wine",
        date: "2026-08-18",
        verified: false,
      },
      {
        rating: 5,
        quote: "I've stopped doing the thing where I check my teeth in my phone camera between courses.",
        name: "Bea C.",
        variant: "wine",
        date: "2026-08-02",
        verified: false,
      },
      {
        rating: 5,
        quote: "Dark cherry and sage sounds fussy. It tastes like the end of the glass, which is exactly right.",
        name: "Nina H.",
        variant: "wine",
        date: "2026-07-21",
        verified: false,
      },
      {
        rating: 4,
        quote: "Took me a couple of tries to stop rinsing out of habit. You really do just swallow it.",
        name: "Tom A.",
        variant: "wine",
        date: "2026-08-27",
        verified: false,
      },
    ],
    "03-gruns": [
      {
        rating: 5,
        quote: "Bought it as a gimmick. It is not a gimmick.",
        name: "Ryan K.",
        variant: "coffee",
        date: "2026-08-09",
        verified: false,
      },
      {
        rating: 5,
        quote: "I have gum in every bag I own and it never actually fixed anything. This does something different and you can feel it.",
        name: "Carmen D.",
        variant: "wine",
        date: "2026-07-15",
        verified: false,
      },
      {
        rating: 5,
        quote: "The cooling part is the tell. You can feel it working, which no mint has ever done for me.",
        name: "Sam O.",
        variant: "coffee",
        date: "2026-08-25",
        verified: false,
      },
      {
        rating: 4,
        quote: "Wish the pair came in a bundle with a refill. Otherwise no notes.",
        name: "Elise F.",
        variant: "wine",
        date: "2026-07-03",
        verified: false,
      },
    ],
  },
};
