import { SIDES, VARIANTS, type Variant } from "./config";
import { Reveal } from "./Reveal";

interface FlavorsProps {
  variant: Variant | null;
  onSelect: (variant: Variant) => void;
}

/**
 * The flavor argument: each ritual's botanicals are composed to sit on the
 * drink it follows — complement first, erase second. Before a choice, both
 * flavor stories run side by side; after, the section re-pours around the
 * chosen ritual.
 */
export function Flavors({ variant, onSelect }: FlavorsProps) {
  if (variant === null) {
    return (
      <section id="flavors" className="scroll-mt-20 border-t border-border/60 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-2xl font-display text-4xl leading-[1.02] font-light tracking-tight text-foreground sm:text-6xl">
                The flavor is the bridge.
              </h2>
              <p className="max-w-md pb-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Each ritual's botanicals are composed to sit on the drink it
                follows — complement first, erase second. Choose a side to read
                yours.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border/70 bg-border/70 sm:mt-16 md:grid-cols-2">
            {SIDES.map((id, index) => {
              const item = VARIANTS[id];
              return (
                <Reveal key={id} delay={index * 100} className="h-full">
                  <article className="flex h-full flex-col bg-background p-7 sm:p-10">
                    <p className="font-mono text-[0.62rem] tracking-[0.22em] text-muted-foreground uppercase">
                      {item.label}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground">
                      {item.flavor}
                      <span className="italic">.</span>
                    </h3>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                      {item.flavorStory}
                    </p>
                    <p className="mt-6 font-mono text-[0.62rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
                      {item.flavorPairing}
                    </p>
                    <button
                      type="button"
                      onClick={() => onSelect(id)}
                      className="group mt-auto inline-flex cursor-pointer items-center gap-2 self-start pt-8 font-mono text-[0.66rem] tracking-[0.18em] text-foreground uppercase"
                    >
                      <span className="border-b border-foreground/30 pb-0.5 transition-colors group-hover:border-ritual group-hover:text-ritual">
                        Choose {item.label}
                      </span>
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </button>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  const item = VARIANTS[variant];

  return (
    <section id="flavors" className="scroll-mt-20 border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-y-12 md:grid-cols-12 md:gap-x-12">
          {/* Flavor story */}
          <Reveal className="md:col-span-5">
            <p className="font-mono text-[0.68rem] tracking-[0.2em] text-ritual uppercase transition-colors duration-500">
              The flavor — {item.label}
            </p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-light tracking-tight text-foreground sm:text-5xl">
              {item.flavorHeadline}
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              {item.flavorStory}
            </p>
            <p className="mt-8 font-mono text-[0.62rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
              {item.flavorPairing}
            </p>
          </Reveal>

          {/* Tasting-note ledger */}
          <Reveal delay={120} className="md:col-span-7 md:pt-14">
            <p className="mb-2 font-mono text-[0.62rem] tracking-[0.22em] text-muted-foreground uppercase">
              Tasting notes — {item.flavor}
            </p>
            <ol className="border-t border-border/70">
              {item.flavorNotes.map((flavorNote, index) => (
                <li
                  key={flavorNote.note}
                  className="grid gap-1 border-b border-border/70 py-6 sm:grid-cols-12 sm:gap-6"
                >
                  <span className="font-mono text-[0.7rem] text-muted-foreground/50 sm:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl font-medium tracking-tight text-foreground sm:col-span-5">
                    {flavorNote.note}
                  </span>
                  <span className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:col-span-6">
                    {flavorNote.role}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Complement first, erase second — the botanicals meet the drink on
              its own terms, then the functional base clears the stage.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
