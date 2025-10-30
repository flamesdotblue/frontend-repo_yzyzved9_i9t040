import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-black/5">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-tr from-fuchsia-500 to-indigo-500 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Dress Color Recommender</h1>
        </div>
        <p className="text-sm text-black/60 hidden sm:block">Find shades that flatter your unique look</p>
      </div>
    </header>
  );
}
