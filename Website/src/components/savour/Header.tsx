import { useEffect, useState } from "react";

/**
 * Slim fixed header. Brand wordmark and the simple menu live together in the
 * top-left corner; the Reserve CTA stays top-right. Over the dark split hero
 * the type is crema — after scrolling it flips to charcoal on crema glass.
 * The CTA takes the active ritual's color via the --ritual token.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/70 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex h-16 items-center justify-between gap-4 px-5 sm:px-8">
        {/* Brand + simple menu, top-left */}
        <div className="flex items-baseline gap-6 sm:gap-9">
          <a
            href="#top"
            className={`font-display text-[1.4rem] font-medium tracking-tight transition-colors duration-500 ${
              scrolled ? "text-foreground" : "text-crema"
            }`}
          >
            Savour
            <span
              className={`transition-colors duration-500 ${
                scrolled ? "text-ritual" : "text-crema"
              }`}
            >
              .
            </span>
          </a>
          <nav
            className={`hidden items-center gap-6 font-mono text-[0.62rem] tracking-[0.22em] uppercase transition-colors duration-500 sm:flex ${
              scrolled ? "text-muted-foreground" : "text-crema/70"
            }`}
            aria-label="Primary"
          >
            <a
              href="#the-tins"
              className={`transition-colors ${
                scrolled ? "hover:text-foreground" : "hover:text-crema"
              }`}
            >
              The tins
            </a>
            <a
              href="#flavors"
              className={`transition-colors ${
                scrolled ? "hover:text-foreground" : "hover:text-crema"
              }`}
            >
              Flavors
            </a>
            <a
              href="#how-it-works"
              className={`transition-colors ${
                scrolled ? "hover:text-foreground" : "hover:text-crema"
              }`}
            >
              How it works
            </a>
            <a
              href="#ingredients"
              className={`transition-colors ${
                scrolled ? "hover:text-foreground" : "hover:text-crema"
              }`}
            >
              Ingredients
            </a>
          </nav>
        </div>

        <a
          href="#reserve"
          className="rounded-sm bg-ritual px-4 py-2.5 font-mono text-[0.62rem] font-medium tracking-[0.16em] text-crema uppercase transition-colors duration-500 hover:bg-ritual-deep sm:px-5 sm:text-[0.65rem]"
        >
          Reserve your tin
        </a>
      </div>
    </header>
  );
}
