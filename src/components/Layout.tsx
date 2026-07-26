import { NavLink, Outlet } from "react-router-dom";
import { sections } from "../data/sections";
import { KanaPreviewProvider } from "../context/KanaPreviewContext";
import KanaPreviewOverlay from "./KanaPreviewOverlay";

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-rose-600 text-white"
      : "text-slate-600 hover:bg-rose-50 hover:text-rose-700",
  ].join(" ");
}

export default function Layout() {
  return (
    <KanaPreviewProvider>
      <div className="min-h-screen bg-slate-50">
        <KanaPreviewOverlay />
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 py-3">
            <NavLink to="/" className="mr-4 text-lg font-semibold text-slate-900">
              日语学习
            </NavLink>
            <nav className="flex flex-wrap gap-1">
              {sections.map((section) => (
                <NavLink key={section.path} to={section.path} className={navLinkClass}>
                  {section.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">
          <Outlet />
        </main>
      </div>
    </KanaPreviewProvider>
  );
}
