import { ShieldCheck, Snowflake, Waves, Zap } from "lucide-react";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    number: "01",
    title: "The Snap",
    icon: Zap,
    description:
      "A satisfying bite cracks the micro-crystalline shell, releasing the active base exactly where coffee and wine residue sits.",
  },
  {
    number: "02",
    title: "The Melt",
    icon: Snowflake,
    description:
      "An endothermic erythritol melt cools the palate on contact, closing the pores of enamel and calming acid-softened surfaces.",
  },
  {
    number: "03",
    title: "The Wash",
    icon: Waves,
    description:
      "Malic acid and polyols trigger an intense salivary response — a smooth, zero-foam swish that lifts pigments and oils away. Swallow it — no sink, no rinse, no interruption. Thirty seconds, done.",
  },
];

export function Mechanism() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl font-display text-4xl leading-[1.02] font-light tracking-tight text-foreground sm:text-6xl">
              Texture is the technology.
            </h2>
            <p className="pb-1 font-mono text-[0.62rem] tracking-[0.22em] text-muted-foreground uppercase">
              The mechanism — 03 steps
            </p>
          </div>
        </Reveal>

        <ol className="mt-14 border-t border-border/70">
          {STEPS.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              delay={index * 100}
              className="grid gap-5 border-b border-border/70 py-10 md:grid-cols-12 md:gap-6"
            >
              <span className="font-display text-5xl leading-none font-light text-ritual transition-colors duration-500 md:col-span-2">
                {step.number}
              </span>
              <div className="md:col-span-4">
                <step.icon className="size-4 text-muted-foreground" strokeWidth={1.5} />
                <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-foreground">
                  {step.title}
                </h3>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-6 md:pt-1">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>

        {/* Stain Shield callout */}
        <Reveal delay={120}>
          <div className="mt-14 flex flex-col items-start gap-6 rounded-sm border border-border bg-card p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-9">
            <div className="grid size-12 shrink-0 place-items-center rounded-sm bg-ritual text-crema transition-colors duration-500">
              <ShieldCheck className="size-6" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-mono text-[0.62rem] tracking-[0.22em] text-muted-foreground uppercase">
                Built in, not added on
              </p>
              <h3 className="mt-2 font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                Stain Shield.
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                The malic-driven salivary flood lifts tannins and wine anthocyanins
                off enamel before they can bond — a zero-foam rinse your own mouth
                makes. Chew after your drink — not before bed — and stains never
                get the chance to set.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
