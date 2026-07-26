interface SectionPlaceholderProps {
  title: string;
  description: string;
}

export default function SectionPlaceholder({ title, description }: SectionPlaceholderProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      <p className="mt-1 text-slate-500">{description}</p>

      <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-400">
        内容开发中 — 该区域将在后续阶段填充。
      </div>
    </div>
  );
}
