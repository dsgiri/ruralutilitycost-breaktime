import { Award, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export function ProgressBadge() {
  const [stats, setStats] = useState({ played: 0, streak: 0 });

  useEffect(() => {
    const loadStats = () => {
      try {
        const stored = localStorage.getItem("breaktime_stats");
        if (stored) {
          setStats(JSON.parse(stored));
        } else {
          setStats({ played: 0, streak: 0 });
        }
      } catch (e) {
        // Ignore
      }
    };
    
    loadStats();
    
    window.addEventListener("storage", loadStats);
    return () => window.removeEventListener("storage", loadStats);
  }, []);

  if (stats.played === 0 && stats.streak === 0) return null;

  return (
    <div className="flex items-center space-x-3 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 shadow-sm shrink-0">
      <div className="flex items-center text-sm font-bold text-emerald-800">
        <Zap size={16} className="text-amber-500 mr-1.5 fill-current" />
        {stats.streak} <span className="hidden sm:inline ml-1 text-emerald-600 font-medium tracking-tight">Day Streak</span>
      </div>
      <div className="h-4 w-px bg-emerald-200"></div>
      <div className="flex items-center text-sm font-bold text-emerald-800">
        <Award size={16} className="text-emerald-500 mr-1.5 fill-current" />
        {stats.played} <span className="hidden sm:inline ml-1 text-emerald-600 font-medium tracking-tight">Played</span>
      </div>
    </div>
  );
}
