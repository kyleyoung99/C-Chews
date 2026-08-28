import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/savour/Header";
import { Hero } from "../components/savour/Hero";
import { Tins } from "../components/savour/Tins";
import { Ritual } from "../components/savour/Ritual";
import { Flavors } from "../components/savour/Flavors";
import { Mechanism } from "../components/savour/Mechanism";
import { Ingredients } from "../components/savour/Ingredients";
import { Waitlist } from "../components/savour/Waitlist";
import { Footer } from "../components/savour/Footer";
import type { Variant } from "../components/savour/config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Savour — What's Your Poison? | Post-Coffee & Post-Wine Chew" },
      {
        name: "description",
        content:
          "Savour is the 30-second mouthwash chew designed to clean, protect, freshen, then swallow. Micro-encapsulated mastic, zinc gluconate, and a malic-driven zero-foam salivary wash. Join the preorder list for Batch Nº 001.",
      },
      { property: "og:title", content: "Savour — What's Your Poison?" },
      {
        property: "og:description",
        content:
          "The 30-second mouthwash chew designed to clean, protect, freshen, then swallow. Join the preorder list for Batch Nº 001.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Savour — What's Your Poison?" },
      {
        name: "twitter:description",
        content:
          "The 30-second mouthwash chew designed to clean, protect, freshen, then swallow. Join the preorder list for Batch Nº 001.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  // No ritual chosen on arrival — the page starts neutral (charcoal accents,
  // 50/50 split) until the visitor drags the seam, taps a side, or switches.
  const [variant, setVariant] = useState<Variant | null>(null);

  return (
    <div
      data-variant={variant ?? "neutral"}
      className="min-h-screen bg-background font-sans text-foreground"
    >
      <Header />
      <main>
        <Hero variant={variant} onSelect={setVariant} />
        <Tins variant={variant} onSelect={setVariant} />
        <Ritual variant={variant} onSelect={setVariant} />
        <Flavors variant={variant} onSelect={setVariant} />
        <Mechanism />
        <Ingredients variant={variant} />
        <Waitlist variant={variant} />
      </main>
      <Footer />
    </div>
  );
}
