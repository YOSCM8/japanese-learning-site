import { useKanaPreview } from "../context/KanaPreviewContext";

interface KanaSelectToggleProps {
  character: string;
  romaji: string;
  selected: boolean;
  onToggle: () => void;
}

export default function KanaSelectToggle({ character, romaji, selected, onToggle }: KanaSelectToggleProps) {
  const { showPreview, hidePreview } = useKanaPreview();

  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseEnter={() => showPreview({ character })}
      onMouseLeave={hidePreview}
      className={[
        "flex h-16 w-16 flex-col items-center justify-center rounded-xl border p-3 shadow-sm transition",
        selected
          ? "border-rose-500 bg-rose-50 ring-2 ring-rose-300"
          : "border-slate-200 bg-white opacity-40 hover:opacity-100",
      ].join(" ")}
    >
      <span className="text-2xl">{character}</span>
      <span className="mt-1 text-xs text-slate-500">{romaji}</span>
    </button>
  );
}
