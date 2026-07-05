import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SharedFooter } from "./SharedFooter";
import { CookieBanner } from "../ui/CookieBanner";
import { useAnalytics } from "../../hooks/useAnalytics";

export function Layout() {
  useAnalytics();

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] dark:bg-stone-950 transition-colors">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white p-2 z-50 rounded font-bold">Skip to content</a>
      <Navbar />
      <main id="main-content" className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <SharedFooter />
      <CookieBanner />
    </div>
  );
}
