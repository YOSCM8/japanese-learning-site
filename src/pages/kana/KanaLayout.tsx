import { NavLink, Outlet } from "react-router-dom";

const tabs = [
  { to: "/kana", label: "总览", end: true },
  { to: "/kana/test/hiragana", label: "平假名测试", end: false },
  { to: "/kana/test/katakana", label: "片假名测试", end: false },
];

function tabClass({ isActive }: { isActive: boolean }) {
  return [
    "rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors",
    isActive
      ? "bg-rose-600 text-white"
      : "text-slate-600 hover:bg-rose-50 hover:text-rose-700",
  ].join(" ");
}

export default function KanaLayout() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">五十音图</h1>
      <p className="mt-1 text-slate-500">点击卡片可以听发音，学完可以在侧边栏选择测试。</p>

      <div className="mt-6 flex flex-col gap-6 md:flex-row">
        <nav className="flex shrink-0 flex-row gap-2 md:w-40 md:flex-col">
          {tabs.map((tab) => (
            <NavLink key={tab.to} to={tab.to} end={tab.end} className={tabClass}>
              {tab.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
