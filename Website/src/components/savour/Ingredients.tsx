import { VARIANTS, type Variant } from "./config";
import { Reveal } from "./Reveal";

/**
 * The ingredient ledger re-pours around the chosen ritual. The four functional
 * rows stay, followed by the full FDA-style declaration and a clean-label
 * callout: no artificial colors or flavors — the tint comes from fruit and
 * vegetable extracts, the flavor from real botanicals.
 */
export function Ingredients({ variant }: { variant: Variant | null }) {
  const active: Variant = variant ?? "coffee";
  const item = VARIANTS[active];
  const rows = item.ingredients;

  return (
    <section id="ingredients" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="max-w-xl font-display text-4xl leading-[1.02] font-light tracking-tight text-foreground sm:text-6xl">
                Everything in the tin, on the record.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                Every component earns its place — and every one is listed. A functional
                base engineered to clean, cool, protect, and refresh, in that order.
              </p>
            </div>
            <p className="pb-1 font-mono text-[0.62rem] tracking-[0.22em] text-muted-foreground uppercase">
              {variant ? `${item.label} — inside the tin` : "Inside the tin"}
            </p>
          </div>
        </Reveal>

        {/* Clean-label callout */}
        <Reveal delay={60}>
          <div className="mt-12 grid gap-6 border border-ritual/40 bg-ritual/5 p-7 transition-colors duration-500 sm:mt-14 sm:p-10 md:grid-cols-12 md:items-center">
            <p className="font-mono text-[0.62rem] tracking-[0.22em] text-ritual uppercase transition-colors duration-500 md:col-span-4">
              No artificial colors. No artificial flavors.
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/90 md:col-span-8">
              The tint comes from {item.colorSource.toLowerCase()} — the flavor from{" "}
              {item.flavorSource.toLowerCase()}. Nothing synthetic hides behind the word
              "natural," and nothing decorative hides at all.
            </p>
          </div>
        </Reveal>

        {/* Functional core — four roles */}
        <div className="mt-12 border-t border-border/70 sm:mt-16">
          {rows.map((ingredient, index) => (
            <Reveal key={ingredient.name} delay={index * 80}>
              <article className="grid gap-4 border-b border-border/70 py-9 md:grid-cols-12 md:gap-6">
                <span className="font-mono text-[0.7rem] tracking-[0.1em] text-muted-foreground md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-5">
                  <p className="font-mono text-[0.62rem] tracking-[0.22em] text-ritual uppercase transition-colors duration-500">
                    {ingredient.function}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-foreground">
                    {ingredient.name}
                  </h3>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-6 md:pt-1">
                  {ingredient.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Full declaration */}
        <Reveal delay={120}>
          <div className="mt-12 grid gap-5 border-t border-border/70 pt-10 md:grid-cols-12">
            <p className="font-mono text-[0.62rem] tracking-[0.22em] text-muted-foreground uppercase md:col-span-3">
              Full ingredient declaration
            </p>
            <div className="md:col-span-9">
              <p className="font-mono text-[0.8rem] leading-loose text-foreground/85">
                {item.fullDeclaration}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {item.fullDeclaration.split(",").length} ingredients. Zero artificial
                anything. Declared in descending order of predominance, exactly as it
                appears on the tin.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
