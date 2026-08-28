import tinCoffee from "../../assets/savour-tin-coffee.png";
import tinWine from "../../assets/savour-tin-wine.png";
import panelCoffee from "../../assets/hero-coffee-beans.jpg";
import panelWine from "../../assets/hero-red-wine.jpg";
import sceneCoffee from "../../assets/ritual-coffee-v3.jpg";
import sceneWine from "../../assets/ritual-wine-v3.jpg";

export type Variant = "coffee" | "wine";
export const SIDES: Variant[] = ["coffee", "wine"];

export interface Situation {
  title: string;
  text: string;
}

export interface FlavorNote {
  note: string;
  role: string;
}

export interface Ingredient {
  name: string;
  /** Functional role — the eyebrow above the ingredient name */
  function: string;
  description: string;
}

export interface VariantContent {
  id: Variant;
  label: string;
  eyebrow: string;
  tagline: string;
  flavor: string;
  notes: string[];
  image: string;
  imageAlt: string;
  /** Full-bleed backdrop for the variant's half of the split hero */
  panel: string;
  panelAlt: string;
  /** Environment & ritual section — editorial scene per variant */
  ritualEyebrow: string;
  sceneLines: string[];
  scene: string;
  situations: Situation[];
  noteLabel: string;
  note: string;
  switchPrompt: string;
  sceneImage: string;
  sceneImageAlt: string;
  /** Flavor section — how the botanicals complement the drink */
  flavorHeadline: string;
  flavorStory: string;
  flavorNotes: FlavorNote[];
  flavorPairing: string;
  /** Ingredient grid — four functional rows, variant-specific */
  ingredients: Ingredient[];
  /** Full FDA-style ingredient declaration */
  fullDeclaration: string;
  /** What provides the tablet color */
  colorSource: string;
  /** What provides the flavor */
  flavorSource: string;
}

export const VARIANTS: Record<Variant, VariantContent> = {
  coffee: {
    id: "coffee",
    label: "Post-Coffee",
    eyebrow: "After espresso. Before everything else.",
    tagline:
      "Built for however you take it. Strips coffee oils, lifts tannin stains before they set, and leaves nothing behind.",
    flavor: "Cardamom & sweet cream",
    notes: [
      "Neutralizes stubborn coffee oils",
      "Erases espresso breath at the source",
      "Shields enamel from tannin stains",
    ],
    image: tinCoffee,
    imageAlt: "Savour Post-Coffee matte espresso-brown slider tin, lid open with tan tablets",
    panel: panelCoffee,
    panelAlt: "Glossy dark-roasted espresso coffee beans",
    ritualEyebrow: "01. The morning ritual",
    sceneLines: ["9:40 AM.", "One more", "cup."],
    scene:
      "The morning stacked itself without asking — one cup before the stand-up, another after. The sun hits the steam just right, and for one minute nothing is required of you. Post-Coffee lives in your jacket pocket: crack one on the walk back and the oils, the breath, the film are gone before you sit down.",
    situations: [
      {
        title: "The espresso run",
        text: "Back from the café with fifteen minutes of film on your teeth. Crack one on the walk.",
      },
      {
        title: "The 2 PM meeting",
        text: "Slides up, camera on. One chew between calls and the coffee breath never appears.",
      },
      {
        title: "The drive to dinner",
        text: "Day coffee, evening plans. Reset in the car so the first glass tastes like the first.",
      },
    ],
    noteLabel: "Field note — AM",
    note: "Best cracked on the walk back, while the crema is still settling.",
    switchPrompt: "Prefer the evening?",
    sceneImage: sceneCoffee,
    sceneImageAlt:
      "Savour Post-Coffee slider tin, lid open with tan tablets, beside a steaming cup of coffee on a sunlit stone counter",
    flavorHeadline: "Built to sit on dark roast.",
    flavorStory:
      "Coffee is bitter, oily, and loud — mint would be a bulldozer. Cardamom answers instead: citrus-peel brightness over a warm, peppery base that cuts through roast without fighting it. Vanilla-pod cream rounds the edges, echoing the milk in your cup. The flavor doesn't cover the coffee. It closes it.",
    flavorNotes: [
      {
        note: "Green cardamom",
        role: "Cold-pressed; lifts coffee oils with citrus-peel brightness.",
      },
      {
        note: "Vanilla-pod cream",
        role: "Rounds the roast's bitter edge — the milky echo.",
      },
      {
        note: "Warm spice base",
        role: "A slow peppery warmth that outlasts the chew itself.",
      },
    ],
    flavorPairing: "Follows: espresso · drip · cold brew",
    ingredients: [
      {
        name: "Cardamom & Sweet Cream",
        function: "Botanical base",
        description:
          "A warm, aromatic pairing that neutralizes roasted coffee oils and rounds off bitterness — no mint required.",
      },
      {
        name: "Malic Acid + Xylitol & Erythritol",
        function: "The Salivary Wash",
        description:
          "A heavy sialogogue blend that floods the palate with your own saliva — a smooth, zero-foam liquid wash with a cooling endothermic melt. No surfactants, no fizz.",
      },
      {
        name: "Mastic Resin & Zinc Gluconate",
        function: "Active Defense",
        description:
          "Micro-encapsulated mastic works as a natural antimicrobial and palate cleanser while zinc gluconate binds and neutralizes the volatile sulfur compounds behind coffee breath.",
      },
      {
        name: "Sea Salt",
        function: "Sensory Balance",
        description:
          "A pinch of sea salt balances the malic tartness and supports oral tissue health, so the wash feels natural enough to swallow.",
      },
    ],
    fullDeclaration:
      "Xylitol, Erythritol, Malic Acid, Citric Acid, Natural Flavors (Cardamom Extract, Sweet Cream), Sea Salt, Micro-Encapsulated Mastic Resin, Zinc Gluconate, Apple Extract (for color), MCT Oil Powder.",
    colorSource: "Apple Extract",
    flavorSource: "Cardamom Extract & Sweet Cream",
  },
  wine: {
    id: "wine",
    label: "Post-Wine",
    eyebrow: "After the last glass. Before the photo.",
    tagline:
      "Built for whatever's in the glass. Lifts anthocyanin pigments off enamel and resets your palate for what's next.",
    flavor: "Dark cherry & sage",
    notes: [
      "Lifts red-wine pigments off enamel",
      "Neutralizes acidity in 30 seconds",
      "Prevents the tell-tale purple smile",
    ],
    image: tinWine,
    imageAlt: "Savour Post-Wine matte burgundy slider tin, lid open with maroon tablets",
    panel: panelWine,
    panelAlt: "Deep burgundy red wine swirling in motion",
    ritualEyebrow: "02. The evening ritual",
    sceneLines: ["9:40 PM.", "The second", "pour."],
    scene:
      "Dinner ran long in the best way. The bottle is earning its reputation, the candle is doing the lighting design, and someone is reaching for a camera. Post-Wine lives next to your keys: crack one between courses and the pigment, the acid, the purple smile never make it to the photo.",
    situations: [
      {
        title: "The second glass",
        text: "Tannins settling in for the night. One chew lifts the pigment before it sets.",
      },
      {
        title: "The group photo",
        text: "A camera appears between courses. Thirty seconds and the purple smile is a rumor.",
      },
      {
        title: "Tableside, between courses",
        text: "A palate reset without leaving the conversation. The next pour tastes like the first.",
      },
    ],
    noteLabel: "Field note — PM",
    note: "Best cracked between courses, before anyone reaches for a camera.",
    switchPrompt: "Prefer the morning?",
    sceneImage: sceneWine,
    sceneImageAlt:
      "Savour Post-Wine slider tin, lid open with maroon tablets, beside a glass of red wine on a dark marble bar table",
    flavorHeadline: "Built to sit on a bold red.",
    flavorStory:
      "Red wine is acid, tannin, and pigment. Sage answers with an earthy, herbaceous dryness that meets the wine's terroir head-on rather than fighting it, while dark cherry mirrors the fruit in the glass you just finished. The flavor completes the wine's arc, then quietly erases it.",
    flavorNotes: [
      {
        note: "Sage",
        role: "An earthy, herbaceous dryness that meets the wine's terroir head-on.",
      },
      {
        note: "Dark cherry",
        role: "Mirrors the fruit in the glass, then fades completely clean.",
      },
      {
        note: "Cooling finish",
        role: "Erythritol's cold melt closes the palate — never minty.",
      },
    ],
    flavorPairing: "Follows: bold reds · chilled orange · anything purple",
    ingredients: [
      {
        name: "Dark Cherry & Sage",
        function: "Botanical base",
        description:
          "An earthy, dark-fruit botanical bridge that masks sour alcohol oxidation and perfectly complements red wine terroir.",
      },
      {
        name: "Malic Acid + Xylitol & Erythritol",
        function: "The Salivary Wash",
        description:
          "A heavy sialogogue blend that triggers an intense salivary response — a smooth, zero-foam wash that lifts heavy tannins and wine pigments off enamel. No surfactants, no fizz.",
      },
      {
        name: "Mastic Resin & Zinc Gluconate",
        function: "Active Defense",
        description:
          "Micro-encapsulated mastic strips the syrupy biofilm wine leaves behind while zinc gluconate neutralizes volatile sulfur compounds for a clean, dry finish.",
      },
      {
        name: "Sea Salt",
        function: "Sensory Balance",
        description:
          "A pinch of sea salt balances the malic tartness and supports oral tissue health, so the wash feels natural enough to swallow.",
      },
    ],
    fullDeclaration:
      "Xylitol, Erythritol, Malic Acid, Citric Acid, Natural Flavors (Dark Cherry Extract, Sage Extract), Micro-Encapsulated Mastic Resin, Zinc Gluconate, Purple Carrot Extract (for color), MCT Oil Powder.",
    colorSource: "Purple Carrot Extract",
    flavorSource: "Dark Cherry Extract & Sage Extract",
  },
};
