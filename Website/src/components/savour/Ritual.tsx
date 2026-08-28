import { SIDES, VARIANTS, type Variant } from "./config";
import { Reveal } from "./Reveal";

interface RitualProps {
  variant: Variant | null;
  onSelect: (variant: Variant) => void;
}

/**
 * Environment & situation theming. Before a choice, it invites one; after,
 * the scene re-pours around the ritual — editorial layout, floating field
 * note, and a quiet switch back to the other side.
 */
export function Ritual({ variant, onSelect }: RitualProps) {
  if (variant === null) {
    return (
      <section className="border-t border-border/60 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="max-w-2xl font-display text-4xl leading-[1.02] font-light tracking-tight text-foreground sm:text-6xl">
              This page pours around your ritual.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Choose a side — drag the seam at the top of the page, or pick
              below — and the whole site re-pours: color, flavor, the room
              around you.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {SIDES.map((id, index) => {
              const item = VARIANTS[id];
              return (
                <Reveal key={id} delay={index * 100}>
                  <button
                    type="button"
                    onClick={() => onSelect(id)}
                    className="group relative block w-full cursor-pointer overflow-hidden rounded-sm text-left focus-visible:outline-2 focus-visible:outline-ritual"
                  >
                    <img
                      src={item.sceneImage}
                      alt={item.sceneImageAlt}
                      width={1920}
                      height={1312}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-4 p-6">
                      <span className="font-display text-2xl font-medium tracking-tight text-crema">
                        {item.label}
                        <span className="italic">.</span>
                      </span>
                      <span className="border-b border-crema/40 pb-0.5 font-mono text-[0.62rem] tracking-[0.2em] text-crema/80 uppercase transition-colors group-hover:border-crema group-hover:text-crema">
                        Choose this ritual
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  const item = VARIANTS[variant];
  const other: Variant = variant === "coffee" ? "wine" : "coffee";

  return (
    <section className="overflow-hidden border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-y-14 md:grid-cols-12 md:gap-x-12">
          {/* Scene column with floating field note */}
          <Reveal className={`relative md:col-span-7 ${variant === "wine" ? "md:order-2" : ""}`}>
            <div className="overflow-hidden rounded-sm">
              <img
                key={variant}
                src={item.sceneImage}
                alt={item.sceneImageAlt}
                width={1920}
                height={1312}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <aside className="absolute right-4 -bottom-8 hidden w-52 bg-ritual-deep p-6 text-crema shadow-xl transition-colors duration-700 md:block lg:-right-6">
              <span className="mb-2 block font-mono text-[0.62rem] tracking-[0.22em] uppercase opacity-70">
                {item.noteLabel}
              </span>
              <p className="text-xs leading-relaxed opacity-90">{item.note}</p>
            </aside>
          </Reveal>

          {/* Narrative column */}
          <Reveal
            delay={120}
            className={`flex flex-col md:col-span-5 md:pt-12 ${variant === "wine" ? "md:order-1" : ""}`}
          >
            <header className="mb-10 md:mb-14">
              <p className="mb-6 block font-mono text-[0.68rem] tracking-[0.2em] text-ritual uppercase transition-colors duration-500">
                {item.ritualEyebrow}
              </p>
              <h2 className="font-display text-5xl leading-[1.05] font-light tracking-tight text-foreground sm:text-6xl">
                {item.sceneLines.map((line, index) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-muted-foreground">
                {item.scene}
              </p>
            </header>

            <div className="mb-14 space-y-9">
              {item.situations.map((situation, index) => (
                <div key={situation.title} className="flex items-start gap-6">
                  <span className="pt-1 font-mono text-sm text-muted-foreground/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="mb-1 text-sm font-medium tracking-tight text-foreground uppercase">
                      {situation.title}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {situation.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <footer className="mt-auto border-t border-border/70 pt-8">
              <button
                type="button"
                onClick={() => onSelect(other)}
                className="group flex cursor-pointer items-center gap-4"
              >
                <span className="font-mono text-[0.62rem] tracking-[0.22em] text-muted-foreground uppercase">
                  {item.switchPrompt}
                </span>
                <span className="text-sm font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors group-hover:decoration-ritual group-hover:text-ritual">
                  Switch to {VARIANTS[other].label}
                </span>
              </button>
            </footer>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
