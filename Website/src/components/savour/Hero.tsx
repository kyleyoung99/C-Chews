import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { MoveHorizontal, MoveVertical } from "lucide-react";
import { SIDES, VARIANTS, type Variant } from "./config";

interface HeroProps {
  variant: Variant | null;
  onSelect: (variant: Variant) => void;
}

/**
 * The seam's position = how much of the frame belongs to coffee (left on
 * desktop, top on mobile), in percent. Both photographs are full-bleed and
 * never resize — the seam uncovers one while covering the other. At 50/50
 * neither ritual is chosen; once a side is picked, the seam glides to the
 * far edge and the losing side vanishes completely.
 */
const NEUTRAL = 50;
const REST: Record<Variant, number> = { coffee: 100, wine: 0 };
const CHOOSE_COFFEE_AT = 62;
const CHOOSE_WINE_AT = 38;
const DRAG_MIN = 4;
const DRAG_MAX = 96;
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function resolveChoice(position: number, current: Variant | null): Variant | null {
  if (position >= CHOOSE_COFFEE_AT) return "coffee";
  if (position <= CHOOSE_WINE_AT) return "wine";
  return current;
}

/**
 * Split-screen hero: a full-bleed frame of coffee beans over a full-bleed
 * frame of red wine. Dragging the seam wipes the cover away like a cloth
 * being pulled off the photograph. Cross the threshold and the other ritual
 * vanishes; the whole page re-pours around the choice.
 */
export function Hero({ variant, onSelect }: HeroProps) {
  const [split, setSplit] = useState(NEUTRAL);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef(true);

  // When the ritual changes anywhere on the page, glide the seam to its edge.
  useEffect(() => {
    if (!dragging) setSplit(variant ? REST[variant] : NEUTRAL);
  }, [variant, dragging]);

  // While dragging past a threshold, preview which side would be chosen.
  const preview = dragging ? resolveChoice(split, null) : null;

  const updateFromPointer = (clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = horizontalRef.current
      ? ((clientX - rect.left) / rect.width) * 100
      : ((clientY - rect.top) / rect.height) * 100;
    setSplit(Math.min(DRAG_MAX, Math.max(DRAG_MIN, raw)));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    horizontalRef.current = window.matchMedia("(min-width: 768px)").matches;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    updateFromPointer(event.clientX, event.clientY);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging) updateFromPointer(event.clientX, event.clientY);
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    const next = resolveChoice(split, variant);
    if (next && next !== variant) onSelect(next);
    setSplit(next ? REST[next] : NEUTRAL);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const nudge =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 8
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -8
          : 0;
    if (!nudge) return;
    event.preventDefault();
    const position = Math.min(DRAG_MAX, Math.max(DRAG_MIN, split + nudge));
    const next = resolveChoice(position, variant);
    if (next) onSelect(next);
    setSplit(next ? REST[next] : NEUTRAL);
  };

  const other: Variant = variant === "coffee" ? "wine" : "coffee";

  return (
    <section id="top" aria-label="Choose your ritual" className="relative">
      <div
        ref={containerRef}
        style={{ "--split": `${split}%` } as CSSProperties}
        className="relative min-h-svh overflow-hidden select-none"
      >
        {SIDES.map((id) => {
          const item = VARIANTS[id];
          const active = variant === id;
          const isCoffee = id === "coffee";
          // The losing side dims and its words fade as the seam crosses it.
          const vanishing = dragging
            ? preview !== null && preview !== id
            : variant !== null && !active;
          const status =
            variant === null
              ? "Tap — or drag the seam"
              : active
                ? "Your ritual"
                : "Drag back to switch";
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              aria-label={`Choose ${item.label}`}
              onClick={() => onSelect(id)}
              className={`group absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-crema ${
                isCoffee
                  ? `seam-clip z-10 ${
                      dragging ? "" : `transition-[clip-path] duration-700 ${EASE}`
                    }`
                  : ""
              }`}
            >
              {/* Full-bleed backdrop — fixed to the frame, uncovered by the seam */}
              <img
                src={item.panel}
                alt={item.panelAlt}
                width={896}
                height={1344}
                fetchPriority="high"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] ${
                  vanishing ? "brightness-[0.45] saturate-[0.75]" : ""
                }`}
              />
              {/* Tonal gradient for legibility */}
              <div
                aria-hidden
                className={`absolute inset-0 bg-gradient-to-t to-charcoal/10 via-charcoal/20 ${
                  isCoffee ? "from-espresso-deep/85" : "from-wine-deep/85"
                }`}
              />

              {/* Half label — coffee anchors high on mobile (its half is on
                  top), low on desktop; wine always anchors low */}
              <div
                className={`absolute inset-x-0 p-6 transition-opacity duration-500 sm:p-8 md:p-10 ${
                  vanishing ? "opacity-0" : "opacity-100"
                } ${isCoffee ? "top-24 md:top-auto md:bottom-0" : "bottom-0 text-right"}`}
              >
                <p className="font-mono text-[0.62rem] tracking-[0.24em] text-crema/75 uppercase">
                  {isCoffee ? "01" : "02"} — {status}
                </p>
                <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-crema sm:text-5xl">
                  {item.label}
                  <span className="italic">.</span>
                </h2>
                <p
                  className={`mt-3 hidden max-w-xs text-sm leading-relaxed text-crema/85 sm:block ${
                    isCoffee ? "" : "ml-auto"
                  }`}
                >
                  {item.tagline}
                </p>
                <p className="mt-3 font-mono text-[0.62rem] tracking-[0.2em] text-crema/60 uppercase">
                  {item.flavor} · 30 chews
                </p>
              </div>
            </button>
          );
        })}

        {/* The draggable seam */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Ritual selector — drag toward coffee or toward wine"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(split)}
          aria-valuetext={variant ? VARIANTS[variant].label : "No ritual chosen"}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
          className={`seam-position absolute inset-x-0 z-20 flex h-16 -translate-y-1/2 cursor-ns-resize touch-none items-center justify-center focus-visible:outline-none md:right-auto md:h-auto md:w-16 md:-translate-x-1/2 md:translate-y-0 md:cursor-ew-resize md:items-end md:pb-[22vh] ${
            dragging ? "" : `transition-[top,left] duration-700 ${EASE}`
          }`}
        >
          {/* Seam line */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-crema/70 md:inset-x-auto md:inset-y-0 md:left-1/2 md:h-auto md:w-px"
          />
          {/* Grip pill — below the hook on desktop, centered on mobile */}
          <span className="pointer-events-none relative flex items-center gap-2.5 rounded-full border border-crema/45 bg-charcoal/75 py-2.5 pr-5 pl-4 font-mono text-[0.6rem] tracking-[0.22em] text-crema uppercase shadow-[0_12px_32px_color-mix(in_oklab,var(--charcoal)_55%,transparent)] backdrop-blur-md">
            <MoveHorizontal aria-hidden className="hidden size-3.5 md:block" strokeWidth={1.5} />
            <MoveVertical aria-hidden className="size-3.5 md:hidden" strokeWidth={1.5} />
            {variant ? "Drag to switch" : "Drag to choose"}
          </span>
        </div>
      </div>

      {/* Hook — a band below the halves on mobile, floating over the divide on desktop */}
      <div className="relative flex items-center justify-center bg-charcoal px-6 py-14 md:pointer-events-none md:absolute md:inset-0 md:z-10 md:bg-transparent md:p-0">
        {/* Readability veil (desktop only) */}
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-[radial-gradient(ellipse_46%_48%_at_50%_50%,color-mix(in_oklab,var(--charcoal)_62%,transparent),transparent_74%)] md:block"
        />
        <div className="relative text-center md:px-6 md:pt-10">
          <p className="font-mono text-[0.62rem] tracking-[0.3em] text-crema/80 uppercase">
            Functional oral care · Batch Nº 001
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-[2.75rem] leading-[0.95] font-light tracking-tight text-crema drop-shadow-[0_2px_18px_color-mix(in_oklab,var(--charcoal)_45%,transparent)] sm:text-6xl lg:text-7xl">
            What&rsquo;s your poison?
          </h1>
          {variant ? (
            <p className="mt-4 font-display text-lg text-crema/90 sm:text-xl">
              {VARIANTS[variant].eyebrow}
            </p>
          ) : (
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-crema/85 sm:text-base">
              The 30-second mouthwash chew designed to clean, protect,
              freshen, then swallow. Drag the seam to choose your side.
            </p>
          )}
          <div className="pointer-events-auto mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#reserve"
              className={`rounded-sm px-8 py-4 font-mono text-[0.68rem] font-medium tracking-[0.18em] uppercase transition-colors duration-500 ${
                variant
                  ? "bg-ritual text-crema hover:bg-ritual-deep"
                  : "bg-crema text-charcoal hover:bg-crema/90"
              }`}
            >
              Reserve your tin
            </a>
            <a
              href="#the-tins"
              className="group inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.18em] text-crema uppercase"
            >
              <span className="border-b border-crema/40 pb-0.5 transition-colors group-hover:border-crema">
                See the tins
              </span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
          </div>
          {variant && (
            <button
              type="button"
              onClick={() => onSelect(other)}
              className="pointer-events-auto mt-6 font-mono text-[0.62rem] tracking-[0.18em] text-crema/70 uppercase"
            >
              <span className="border-b border-crema/40 pb-0.5 transition-colors hover:border-crema hover:text-crema">
                Not your ritual? Switch to {VARIANTS[other].label}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
