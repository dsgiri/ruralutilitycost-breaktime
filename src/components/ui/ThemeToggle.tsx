import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center p-2 rounded-full transition-colors",
        "text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-none",
        "dark:text-stone-400 dark:hover:text-amber-400 dark:hover:bg-stone-800"
      )}
      aria-label="Toggle evening mode"
      title={theme === "day" ? "Switch to Evening Mode" : "Switch to Daytime Mode"}
    >
      {theme === "day" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
