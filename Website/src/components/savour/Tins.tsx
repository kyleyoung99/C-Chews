import { ArrowRight } from "lucide-react";
import { SIDES, VARIANTS, type Variant } from "./config";
import { Reveal } from "./Reveal";
import duoTins from "../../assets/savour-tins-duo-v2.jpg.asset.json";

interface TinsProps {
  variant: Variant | null;
  onSelect: (variant: Variant) => void;
}

/**
 * The product tins, in their own area below the hero. Before a choice both
 * tins stand side by side; once a ritual is chosen the shelf clears down to
 * that tin alone, with a one-click switch to the other.
 */
export function Tins({ variant, onSelect }: TinsProps) {
  const ids: Variant[] = variant ? [variant] : [...SIDES];

  return (
    <section id="the-tins" className="scroll-mt-20 border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="max-w-xl font-display text-4xl leading-[1.02] font-light tracking-tight text-foreground sm:text-6xl">
                The tins live in your pocket.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                {variant
                  ? "Your ritual's tin — brushed aluminum, 30 chews. Batch Nº 001 ships with both tins; this is the one you reached for."
                  : "Brushed-aluminum slider tins, 30 chews each. Batch Nº 001 ships with both — choose a ritual above and this shelf clears down to yours."}
              </p>
            </div>
            <p className="pb-1 font-mono text-[0.62rem] tracking-[0.22em] text-muted-foreground uppercase">
              {variant ? `Your ritual — ${VARIANTS[variant].label}` : "Batch Nº 001 — 02 tins"}
            </p>
          </div>
        </Reveal>

        {!variant && (
          <Reveal className="mt-12" delay={80}>
            <img
              src={duoTins.url}
              alt="Overhead view of both Savour slider tins with the tan interlocking monogram pattern — Post-Coffee in espresso brown with tan tablets on pale stone, Post-Wine in burgundy with maroon tablets on dark marble, beside coffee beans, cardamom pods, dark cherries, and fresh sage"
              width={1920}
              height={1312}
              loading="lazy"
              className="aspect-[3/2] w-full rounded-sm object-cover"
            />
          </Reveal>
        )}

        <div
          className={
            variant
              ? "mt-12 flex justify-center"
              : "mt-12 grid items-stretch gap-6 md:grid-cols-2"
          }
        >
          {ids.map((id) => {
            const item = VARIANTS[id];
            const active = variant === id;
            const other: Variant = id === "coffee" ? "wine" : "coffee";
            const index = SIDES.indexOf(id);
            return (
              <Reveal
                key={id}
                delay={variant ? 0 : index * 100}
                className={variant ? "w-full max-w-2xl" : "h-full"}
              >
                <article
                  className={`relative flex h-full flex-col rounded-sm border p-7 transition-all duration-500 sm:p-9 ${
                    active
                      ? "border-ritual bg-card shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--ritual)_45%,transparent)]"
                      : "border-border/70 bg-card/60"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.22em] uppercase">
                    <span className="text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {active ? (
                      <span className="rounded-sm bg-ritual px-3 py-1.5 text-crema transition-colors duration-500">
                        Your ritual
                      </span>
                    ) : (
                      <span className="text-muted-foreground/70">30 chews</span>
                    )}
                  </div>

                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    width={1216}
                    height={832}
                    loading="lazy"
                    className={`mx-auto mt-8 w-52 drop-shadow-[0_30px_40px_color-mix(in_oklab,var(--charcoal)_40%,transparent)] transition-all duration-700 sm:w-60 ${
                      active ? "scale-[1.03]" : "opacity-85 saturate-[0.85]"
                    }`}
                  />

                  <h3 className="mt-8 font-display text-3xl font-medium tracking-tight text-foreground">
                    {item.label}
                    <span className="italic">.</span>
                  </h3>
                  <p className="mt-2 font-mono text-[0.62rem] tracking-[0.2em] text-ritual uppercase transition-colors duration-500">
                    {item.flavor}
                  </p>

                  <ul className="mt-6 divide-y divide-border/70 border-t border-border/70">
                    {item.notes.map((note) => (
                      <li key={note} className="py-3 text-sm text-muted-foreground">
                        {note}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    {variant ? (
                      <>
                        <a
                          href="#reserve"
                          className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ritual px-6 py-3.5 font-mono text-[0.66rem] font-medium tracking-[0.18em] text-crema uppercase transition-colors duration-500 hover:bg-ritual-deep"
                        >
                          Reserve {item.label}
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </a>
                        <button
                          type="button"
                          onClick={() => onSelect(other)}
                          className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-border px-6 py-3.5 font-mono text-[0.66rem] font-medium tracking-[0.18em] text-foreground uppercase transition-colors duration-500 hover:border-ritual hover:text-ritual"
                        >
                          Switch to {VARIANTS[other].label}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelect(id)}
                        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-border px-6 py-3.5 font-mono text-[0.66rem] font-medium tracking-[0.18em] text-foreground uppercase transition-colors duration-500 hover:border-ritual hover:text-ritual"
                      >
                        Switch to {item.label}
                      </button>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
