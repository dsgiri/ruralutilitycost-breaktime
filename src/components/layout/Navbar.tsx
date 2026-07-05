import { Link, useLocation } from "react-router-dom";
import { Coffee, Gamepad2, Heart, Play, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { ProgressBadge } from "../ui/ProgressBadge";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Games", path: "/games", icon: Gamepad2 },
    { name: "Favorites", path: "/favorites", icon: Heart },
    { name: "Quick Play", path: "/quick-play", icon: Play },
  ];

  return (
    <nav className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group mr-8">
              <div className="w-8 h-8 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-stone-950 rounded-lg flex items-center justify-center mr-3 group-hover:bg-emerald-700 dark:group-hover:bg-emerald-400 transition-colors">
                <Coffee size={20} />
              </div>
              <div>
                <span className="font-bold text-lg text-emerald-900 dark:text-emerald-100 tracking-tight leading-none block">BreakTime</span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wider font-medium">RuralOpsTools</span>
              </div>
            </Link>
            
            <div className="hidden sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors h-16",
                      active 
                        ? "border-emerald-600 dark:border-emerald-500 text-emerald-900 dark:text-emerald-100" 
                        : "border-transparent text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-700 hover:text-stone-700 dark:hover:text-stone-200"
                    )}
                  >
                    <item.icon size={16} className="mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ProgressBadge />
            </div>
            <ThemeToggle />
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 dark:text-stone-500 hover:text-stone-500 dark:hover:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none min-h-[48px] min-w-[48px]"
                aria-label={isOpen ? "Close main menu" : "Open main menu"}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-stone-50 dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium min-h-[48px]",
                    active
                      ? "bg-emerald-50 dark:bg-emerald-900/50 border-emerald-600 dark:border-emerald-500 text-emerald-800 dark:text-emerald-200"
                      : "border-transparent text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:text-stone-800 dark:hover:text-stone-200"
                  )}
                >
                  <item.icon size={18} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
