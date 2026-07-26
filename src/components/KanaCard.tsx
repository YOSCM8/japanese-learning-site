import { useKanaPreview } from "../context/KanaPreviewContext";
import type { KanaScript } from "../data/kana";
import { getKanaStat } from "../lib/kanaStats";
import { speakJapanese } from "../lib/speech";

interface KanaCardProps {
  character: string;
  romaji: string;
  status?: "correct" | "incorrect" | "neutral";
  size?: "sm" | "lg";
  script?: KanaScript;
  kanaId?: string;
}

const statusClasses: Record<NonNullable<KanaCardProps["status"]>, string> = {
  neutral: "border-slate-200 bg-white hover:border-rose-300 hover:shadow-md",
  correct: "border-emerald-300 bg-emerald-50",
  incorrect: "border-red-300 bg-red-50",
};

export default function KanaCard({
  character,
  romaji,
  status = "neutral",
  size = "sm",
  script,
  kanaId,
}: KanaCardProps) {
  const { showPreview, hidePreview } = useKanaPreview();

  function handleMouseEnter() {
    if (script && kanaId) {
      const stat = getKanaStat(script, kanaId);
      showPreview({ character, attempts: stat.attempts, correct: stat.correct });
    } else {
      showPreview({ character });
    }
  }

  return (
    <button
      type="button"
      onClick={() => speakJapanese(character)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={hidePreview}
      className={[
        "flex flex-col items-center justify-center rounded-xl border p-3 shadow-sm transition",
        statusClasses[status],
        size === "lg" ? "h-24 w-24" : "h-16 w-16",
      ].join(" ")}
      title={`点击发音：${character}`}
    >
      <span className={size === "lg" ? "text-3xl" : "text-2xl"}>{character}</span>
      <span className="mt-1 text-xs text-slate-500">{romaji}</span>
    </button>
  );
}
