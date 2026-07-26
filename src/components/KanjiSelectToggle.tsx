import type { KanjiItem } from "../data/kanji";

interface KanjiSelectToggleProps {
  item: KanjiItem;
  selected: boolean;
  onToggle: () => void;
}

export default function KanjiSelectToggle({ item, selected, onToggle }: KanjiSelectToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        "flex h-16 w-16 flex-col items-center justify-center rounded-xl border p-2 shadow-sm transition",
        selected
          ? "border-rose-500 bg-rose-50 ring-2 ring-rose-300"
          : "border-slate-200 bg-white opacity-40 hover:opacity-100",
      ].join(" ")}
    >
      <span className="text-2xl">{item.character}</span>
      <span className="mt-1 truncate text-[10px] text-slate-500">{item.meaning}</span>
    </button>
  );
}
