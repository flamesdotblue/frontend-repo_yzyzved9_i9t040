import { Lightbulb } from "lucide-react";

export default function StyleTips({ tips = [] }) {
  if (!tips.length) return null;
  return (
    <section className="grid gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-amber-600" />
        <h3 className="text-base font-semibold text-amber-900">How to wear these colors</h3>
      </div>
      <ul className="list-disc pl-5 text-sm text-amber-900 space-y-1">
        {tips.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </section>
  );
}
