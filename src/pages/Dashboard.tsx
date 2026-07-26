import { Link } from "react-router-dom";
import { sections } from "../data/sections";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">今日学习概览</h1>
      <p className="mt-1 text-slate-500">
        连续打卡、待复习卡片数等统计将在复习系统接入后显示在这里。
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-rose-300 hover:shadow-md"
          >
            <span className="text-3xl">{section.emoji}</span>
            <h2 className="mt-3 text-lg font-medium text-slate-900">{section.label}</h2>
            <p className="mt-1 text-sm text-slate-500">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
