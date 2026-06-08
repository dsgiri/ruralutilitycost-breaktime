import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SharedFooter } from "./SharedFooter";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6]">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <SharedFooter />
    </div>
  );
}
