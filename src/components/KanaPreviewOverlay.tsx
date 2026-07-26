import { useKanaPreview } from "../context/KanaPreviewContext";

export default function KanaPreviewOverlay() {
  const { preview } = useKanaPreview();
  if (!preview) return null;

  const hasStats = preview.attempts !== undefined && preview.correct !== undefined;
  const accuracy = hasStats && preview.attempts! > 0 ? Math.round((preview.correct! / preview.attempts!) * 100) : null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="flex flex-col items-center rounded-3xl border border-rose-200 bg-white px-10 py-8 shadow-2xl">
        <span className="text-9xl leading-none text-slate-900">{preview.character}</span>
        {hasStats && (
          <p className="mt-4 text-sm text-slate-500">
            {preview.attempts! > 0
              ? `答对 ${preview.correct} / ${preview.attempts} 次，正确率 ${accuracy}%`
              : "还没有测试过"}
          </p>
        )}
      </div>
    </div>
  );
}
