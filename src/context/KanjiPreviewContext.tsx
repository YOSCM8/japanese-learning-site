import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { KanjiItem } from "../data/kanji";

interface KanjiPreviewContextValue {
  selected: KanjiItem | null;
  select: (item: KanjiItem) => void;
  close: () => void;
}

const KanjiPreviewContext = createContext<KanjiPreviewContextValue | null>(null);

export function KanjiPreviewProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<KanjiItem | null>(null);

  const value = useMemo<KanjiPreviewContextValue>(
    () => ({
      selected,
      select: (item: KanjiItem) => setSelected(item),
      close: () => setSelected(null),
    }),
    [selected],
  );

  return <KanjiPreviewContext.Provider value={value}>{children}</KanjiPreviewContext.Provider>;
}

export function useKanjiPreview() {
  const context = useContext(KanjiPreviewContext);
  if (!context) throw new Error("useKanjiPreview must be used within KanjiPreviewProvider");
  return context;
}
