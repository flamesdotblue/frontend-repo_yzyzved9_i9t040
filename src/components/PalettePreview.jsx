import { useState } from "react";
import { Check, Copy } from "lucide-react";

function Swatch({ name, hex }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };
  return (
    <div className="group rounded-xl overflow-hidden border border-black/10 bg-white">
      <div className="h-24" style={{ backgroundColor: hex }} />
      <div className="flex items-center justify-between px-3 py-2">
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-black/60">{hex}</p>
        </div>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-black/10 hover:bg-black/5"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function PalettePreview({ palette, title }) {
  if (!palette || palette.length === 0) return null;
  return (
    <section className="grid gap-3">
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {palette.map((p) => (
          <Swatch key={p.hex} name={p.name} hex={p.hex} />
        ))}
      </div>
    </section>
  );
}
