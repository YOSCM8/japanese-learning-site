import { useKanjiPreview } from "../context/KanjiPreviewContext";

export default function KanjiDetailOverlay() {
  const { selected, close } = useKanjiPreview();
  if (!selected) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      onClick={close}
    >
      <div
        className="max-h-[80vh] w-full max-w-sm overflow-y-auto rounded-3xl border border-rose-200 bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <span className="text-7xl leading-none text-slate-900">{selected.character}</span>
          <button
            type="button"
            onClick={close}
            className="rounded-full px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-500">{selected.meaning}</p>

        <div className="mt-4 space-y-1 text-sm">
          {selected.onyomi.length > 0 && (
            <p>
              <span className="font-medium text-slate-700">音读：</span>
              <span className="text-slate-600">{selected.onyomi.join("、")}</span>
            </p>
          )}
          {selected.kunyomi.length > 0 && (
            <p>
              <span className="font-medium text-slate-700">训读：</span>
              <span className="text-slate-600">{selected.kunyomi.join("、")}</span>
            </p>
          )}
        </div>

        {selected.compounds.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-700">常用组词</p>
            <ul className="mt-2 space-y-2">
              {selected.compounds.map((compound) => (
                <li key={compound.word} className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
                  <span className="font-medium text-slate-900">{compound.word}</span>
                  <span className="ml-2 text-slate-500">{compound.reading}</span>
                  <span className="ml-2 text-slate-400">{compound.meaning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
