import { useState } from "react";
import { Palette } from "lucide-react";

const skinTones = ["fair", "light", "medium", "tan", "deep"];
const undertones = ["cool", "warm", "neutral", "olive"];
const hairColors = ["black", "brown", "blonde", "red", "gray"];
const eyeColors = ["brown", "hazel", "green", "blue", "gray"];
const occasions = ["casual", "professional", "evening", "wedding"];
const vibes = ["bold", "soft", "minimal"];

export default function InputForm({ onRecommend, isLoading }) {
  const [form, setForm] = useState({
    skinTone: "medium",
    undertone: "neutral",
    hairColor: "brown",
    eyeColor: "brown",
    occasion: "casual",
    vibe: "soft",
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRecommend(form);
  };

  const Select = ({ label, name, options }) => (
    <label className="grid gap-1 text-sm">
      <span className="text-black/70">{label}</span>
      <select
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="rounded-lg border border-black/10 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {options.map((o) => (
          <option key={o} value={o} className="capitalize">
            {o.charAt(0).toUpperCase() + o.slice(1)}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full grid gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur border border-black/5 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <Palette className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Tell us about you</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select label="Skin tone" name="skinTone" options={skinTones} />
        <Select label="Undertone" name="undertone" options={undertones} />
        <Select label="Hair color" name="hairColor" options={hairColors} />
        <Select label="Eye color" name="eyeColor" options={eyeColors} />
        <Select label="Occasion" name="occasion" options={occasions} />
        <Select label="Vibe" name="vibe" options={vibes} />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {isLoading ? "Finding your colors…" : "Recommend colors"}
        </button>
        <button
          type="button"
          onClick={() => setForm({
            skinTone: "medium",
            undertone: "neutral",
            hairColor: "brown",
            eyeColor: "brown",
            occasion: "casual",
            vibe: "soft",
          })}
          className="px-4 py-2 rounded-lg border border-black/10 bg-white hover:bg-black/5 transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
