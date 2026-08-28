import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { VARIANTS, type Variant } from "./config";
import { Reveal } from "./Reveal";
import { joinPreorderList } from "../../lib/preorder.functions";

type Status = "idle" | "saving" | "joined" | "duplicate" | "error";

export function Waitlist({ variant }: { variant: Variant | null }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;
    setStatus("saving");
    try {
      const result = await joinPreorderList({
        data: { email: trimmed, variant },
      });
      setStatus(result.duplicate ? "duplicate" : "joined");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="reserve"
      className="scroll-mt-20 bg-ritual-deep py-20 text-crema transition-colors duration-700 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center justify-between gap-4 border-b border-crema/15 pb-3 font-mono text-[0.62rem] tracking-[0.22em] text-crema/50 uppercase">
            <span>Batch Nº 001 — preorder list</span>
            <span className="hidden sm:inline">
              {variant ? `Your ritual — ${VARIANTS[variant].label}` : "No ritual chosen — yet"}
            </span>
            <span>Ships December 2026</span>
          </div>
        </Reveal>

        <div className="grid gap-12 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-4xl leading-[1.02] font-light tracking-tight sm:text-6xl">
              First pour goes to the list.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-crema/70 sm:text-base">
              Leave your email and we&apos;ll hold your place in Batch Nº 001.
              One message when preorders open — nothing before, nothing after.
            </p>

            <div className="mt-9 max-w-md">
              {status === "joined" || status === "duplicate" ? (
                <div className="flex items-center gap-3 rounded-sm border border-crema/20 bg-crema/5 px-5 py-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-crema text-charcoal">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <p className="text-sm text-crema/85">
                    {status === "duplicate"
                      ? "You're already on the list. Watch your inbox — preorders open soon."
                      : "You're on the list. Watch your inbox — preorders open soon."}
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="waitlist-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-sm border border-crema/25 bg-transparent px-5 py-3.5 font-mono text-sm text-crema placeholder:text-crema/35 focus:border-crema/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === "saving"}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-crema px-7 py-3.5 font-mono text-[0.7rem] font-medium tracking-[0.18em] text-charcoal uppercase transition-colors hover:bg-crema/90 disabled:opacity-60"
                  >
                    {status === "saving" ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin" />
                        Joining
                      </>
                    ) : (
                      "Join the list"
                    )}
                  </button>
                </form>
              )}
              {status === "error" && (
                <p className="mt-3 font-mono text-[0.68rem] tracking-[0.08em] text-crema/70">
                  Something went wrong saving that — try again in a moment.
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-5">
            <div className="rounded-sm border border-crema/15 bg-crema/5 p-7 sm:p-9">
              <p className="font-mono text-[0.62rem] tracking-[0.22em] text-crema/50 uppercase">
                What the list gets you
              </p>
              <ul className="mt-6 divide-y divide-crema/10">
                {[
                  "First access when Batch Nº 001 preorders open",
                  "Your ritual, reserved — Post-Coffee, Post-Wine, or both",
                  "Ships first — December 2026",
                  "No noise. One email when it matters.",
                ].map((item, index) => (
                  <li key={item} className="flex items-baseline gap-4 py-3.5 text-sm text-crema/85">
                    <span className="font-mono text-[0.62rem] text-crema/45">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-crema/10 pt-5 font-mono text-[0.62rem] tracking-[0.14em] text-crema/45 uppercase">
                No charge today. Nothing is billed until you choose to order.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
