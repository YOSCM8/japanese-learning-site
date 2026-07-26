import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface KanaPreviewData {
  character: string;
  attempts?: number;
  correct?: number;
}

interface KanaPreviewContextValue {
  preview: KanaPreviewData | null;
  showPreview: (data: KanaPreviewData) => void;
  hidePreview: () => void;
}

const KanaPreviewContext = createContext<KanaPreviewContextValue | null>(null);

export function KanaPreviewProvider({ children }: { children: ReactNode }) {
  const [preview, setPreview] = useState<KanaPreviewData | null>(null);

  const value = useMemo<KanaPreviewContextValue>(
    () => ({
      preview,
      showPreview: (data: KanaPreviewData) => setPreview(data),
      hidePreview: () => setPreview(null),
    }),
    [preview],
  );

  return <KanaPreviewContext.Provider value={value}>{children}</KanaPreviewContext.Provider>;
}

export function useKanaPreview() {
  const context = useContext(KanaPreviewContext);
  if (!context) throw new Error("useKanaPreview must be used within KanaPreviewProvider");
  return context;
}
