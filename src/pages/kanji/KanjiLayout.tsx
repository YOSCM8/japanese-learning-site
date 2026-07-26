import { NavLink, Outlet } from "react-router-dom";
import KanjiDetailOverlay from "../../components/KanjiDetailOverlay";
import { KanjiPreviewProvider } from "../../context/KanjiPreviewContext";

const tabs = [
  { to: "/kanji", label: "总览", end: true },
  { to: "/kanji/test/reading", label: "看字选音测试", end: false },
  { to: "/kanji/test/character", label: "听音选字测试", end: false },
  { to: "/kanji/test/compound", label: "组词测试", end: false },
];

function tabClass({ isActive }: { isActive: boolean }) {
  return [
    "rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors",
    isActive
      ? "bg-rose-600 text-white"
      : "text-slate-600 hover:bg-rose-50 hover:text-rose-700",
  ].join(" ");
}

export default function KanjiLayout() {
  return (
    <KanjiPreviewProvider>
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">汉字</h1>
        <p className="mt-1 text-slate-500">点击卡片查看读音和常用组词，学完可以在侧边栏选择测试。</p>

        <div className="mt-6 flex flex-col gap-6 md:flex-row">
          <nav className="flex shrink-0 flex-row flex-wrap gap-2 md:w-44 md:flex-col">
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

        <KanjiDetailOverlay />
      </div>
    </KanjiPreviewProvider>
  );
}
