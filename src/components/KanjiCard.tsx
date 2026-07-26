import { useKanjiPreview } from "../context/KanjiPreviewContext";
import type { KanjiItem } from "../data/kanji";

interface KanjiCardProps {
  item: KanjiItem;
  status?: "correct" | "incorrect" | "neutral";
}

const statusClasses: Record<NonNullable<KanjiCardProps["status"]>, string> = {
  neutral: "border-slate-200 bg-white hover:border-rose-300 hover:shadow-md",
  correct: "border-emerald-300 bg-emerald-50",
  incorrect: "border-red-300 bg-red-50",
};

export default function KanjiCard({ item, status = "neutral" }: KanjiCardProps) {
  const { select } = useKanjiPreview();

  return (
    <button
      type="button"
      onClick={() => select(item)}
      className={[
        "flex h-16 w-16 flex-col items-center justify-center rounded-xl border p-2 shadow-sm transition",
        statusClasses[status],
      ].join(" ")}
      title={`查看详情：${item.character}`}
    >
      <span className="text-2xl">{item.character}</span>
      <span className="mt-1 truncate text-[10px] text-slate-500">{item.meaning}</span>
    </button>
  );
}
