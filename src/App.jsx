import { useMemo, useState } from "react";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import PalettePreview from "./components/PalettePreview";
import StyleTips from "./components/StyleTips";

function adjustForVibe(colorList, vibe) {
  // For simplicity, we slightly alter shades for the vibe via fallback choices
  if (vibe === "minimal") {
    // Prefer quieter, neutral-leaning options
    return colorList.filter((c) => ["charcoal", "cream", "taupe", "stone", "warm navy", "dusty blue", "mauve", "olive", "sage"].includes(c.name.toLowerCase()))
      .concat(colorList.filter((c) => c.name.toLowerCase().includes("gray") || c.name.toLowerCase().includes("beige")));
  }
  if (vibe === "soft") {
    return colorList.map((c) => {
      // lighten a bit (just pick soft alternates when available)
      const softMap = {
        Emerald: { name: "Soft Emerald", hex: "#34d399" },
        Sapphire: { name: "Soft Sapphire", hex: "#60a5fa" },
        Amethyst: { name: "Lavender", hex: "#a78bfa" },
        Ruby: { name: "Rose", hex: "#f472b6" },
        Fuchsia: { name: "Soft Fuchsia", hex: "#fb7185" },
        Terracotta: { name: "Peach", hex: "#fdba74" },
        Mustard: { name: "Butter", hex: "#fde68a" },
        Olive: { name: "Sage", hex: "#a3b18a" },
        Teal: { name: "Seafoam", hex: "#5eead4" },
        "Warm Navy": { name: "Dusty Navy", hex: "#475569" },
      };
      return softMap[c.name] ? softMap[c.name] : c;
    });
  }
  // bold
  return colorList;
}

function basePaletteByUndertone(undertone) {
  const palettes = {
    cool: [
      { name: "Emerald", hex: "#10b981" },
      { name: "Sapphire", hex: "#1e40af" },
      { name: "Amethyst", hex: "#7c3aed" },
      { name: "Ruby", hex: "#be123c" },
      { name: "Fuchsia", hex: "#db2777" },
      { name: "Icy Gray", hex: "#94a3b8" },
    ],
    warm: [
      { name: "Terracotta", hex: "#d97706" },
      { name: "Mustard", hex: "#ca8a04" },
      { name: "Olive", hex: "#4d7c0f" },
      { name: "Teal", hex: "#0d9488" },
      { name: "Warm Navy", hex: "#1e3a8a" },
      { name: "Cream", hex: "#f5f5f4" },
    ],
    neutral: [
      { name: "Blush", hex: "#f9a8d4" },
      { name: "Dusty Blue", hex: "#60a5fa" },
      { name: "Mauve", hex: "#a78bfa" },
      { name: "Taupe", hex: "#a8a29e" },
      { name: "Charcoal", hex: "#374151" },
      { name: "Olive", hex: "#4d7c0f" },
    ],
    olive: [
      { name: "Burnt Orange", hex: "#ea580c" },
      { name: "Cobalt", hex: "#2563eb" },
      { name: "Magenta", hex: "#be185d" },
      { name: "Forest", hex: "#166534" },
      { name: "Cream", hex: "#f5f5f4" },
      { name: "Charcoal", hex: "#374151" },
    ],
  };
  return palettes[undertone] || palettes.neutral;
}

function adjustForOccasion(colors, occasion) {
  if (occasion === "professional") {
    return colors.filter((c) => ["Charcoal", "Dusty Blue", "Olive", "Taupe", "Warm Navy", "Cream"].includes(c.name));
  }
  if (occasion === "evening") {
    return colors.concat([
      { name: "Gold", hex: "#d4af37" },
      { name: "Silver", hex: "#9ca3af" },
    ]);
  }
  if (occasion === "wedding") {
    return colors.filter((c) => ["Blush", "Cream", "Sage", "Lavender", "Dusty Blue", "Rose"].includes(c.name)).concat([
      { name: "Ivory", hex: "#fafaf9" },
    ]);
  }
  return colors; // casual
}

function accentNeutralsPalette(base) {
  const neutrals = [
    { name: "Ivory", hex: "#fafaf9" },
    { name: "Stone", hex: "#e7e5e4" },
    { name: "Taupe", hex: "#a8a29e" },
    { name: "Charcoal", hex: "#374151" },
    { name: "Chocolate", hex: "#78350f" },
  ];
  // Pick 3 that aren't duplicates of base
  const existing = new Set(base.map((b) => b.name));
  return neutrals.filter((n) => !existing.has(n.name)).slice(0, 3);
}

function getTips({ skinTone, undertone, hairColor, eyeColor, occasion, vibe }) {
  const tips = [];
  tips.push(`For ${occasion} looks, build outfits around 1-2 main colors and keep the rest neutral.`);
  if (vibe === "bold") tips.push("Use one vibrant statement piece (dress or blazer) and keep accessories subtle.");
  if (vibe === "soft") tips.push("Choose airy fabrics (chiffon, linen, silk) to match the gentle palette.");
  if (vibe === "minimal") tips.push("Monochrome or tonal dressing creates a polished, effortless look.");
  if (undertone === "cool") tips.push("Silver or white gold jewelry will harmonize with cool undertones.");
  if (undertone === "warm" || undertone === "olive") tips.push("Gold jewelry and warm leathers complement your warmth.");
  if (["green", "blue"].includes(eyeColor)) tips.push("Echo your eye color with an accent scarf or earrings.");
  if (["red", "blonde"].includes(hairColor)) tips.push("Balance hair brightness with medium-depth colors.");
  if (skinTone === "fair") tips.push("Prefer mid-tone shades over very pale pastels to avoid washing out.");
  if (skinTone === "deep") tips.push("Lean into saturated jewel tones for striking contrast.");
  return tips;
}

function getRecommendations(form) {
  const { undertone, vibe, occasion, skinTone } = form;
  // Start from undertone palette
  let base = basePaletteByUndertone(undertone);
  // Vibe adjustments
  base = adjustForVibe(base, vibe);
  // Occasion adjustments
  base = adjustForOccasion(base, occasion);

  // Skin tone fine-tuning: ensure enough mid-tone options
  if (skinTone === "fair") {
    base = base.filter((c) => c.name !== "Cream");
  }
  if (skinTone === "deep") {
    // favor higher contrast
    const add = base.filter((c) => ["Sapphire", "Emerald", "Cobalt", "Gold", "Magenta"].includes(c.name));
    base = [...new Set([...base, ...add])];
  }

  // Build accent and neutrals
  const accents = base.filter((c) => !["Charcoal", "Taupe", "Cream", "Ivory", "Stone"].includes(c.name)).slice(0, 6);
  const neutrals = accentNeutralsPalette(base);

  const tips = getTips(form);

  return {
    base: base.slice(0, 8),
    accents,
    neutrals,
    tips,
  };
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState(null);

  const result = useMemo(() => (formState ? getRecommendations(formState) : null), [formState]);

  const handleRecommend = (form) => {
    setIsLoading(true);
    setTimeout(() => {
      setFormState(form);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-rose-50">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8 grid gap-6">
        <section className="grid gap-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Find your most flattering dress colors</h2>
            <p className="text-black/60 mt-2">Answer a few quick questions and get a curated palette tailored to you.</p>
          </div>
          <InputForm onRecommend={handleRecommend} isLoading={isLoading} />
        </section>

        {result && (
          <section className="grid gap-6">
            <PalettePreview title="Core palette" palette={result.base} />
            <PalettePreview title="Accent colors" palette={result.accents} />
            <PalettePreview title="Neutrals" palette={result.neutrals} />
            <StyleTips tips={result.tips} />
          </section>
        )}

        {!result && (
          <section className="grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 bg-white/50">
            <p className="text-black/60">Your personalized palette will appear here.</p>
          </section>
        )}

        <footer className="text-center text-sm text-black/60 py-6">
          Built with love for color. Be you, brilliantly.
        </footer>
      </main>
    </div>
  );
}
