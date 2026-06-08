import { useEffect, useState } from "react";

type Theme = "day" | "evening";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem("breaktime_theme");
      if (stored === "day" || stored === "evening") return stored;
      
      // Default to system preference if no stored value
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "evening";
      }
      return "day";
    } catch {
      return "day";
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === "evening") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("breaktime_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "day" ? "evening" : "day");
  };

  return { theme, toggleTheme };
}
