import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function SharedFooter() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <footer className="bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 mt-auto transition-colors">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center py-3 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors"
      >
        <span className="text-xs font-medium mr-1 tracking-widest uppercase">{isExpanded ? 'Hide Info' : 'Show Info & Links'}</span>
        {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>

      {isExpanded && (
        <div className="max-w-7xl mx-auto pb-8 pt-2 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="font-bold text-lg text-emerald-900 dark:text-emerald-100 tracking-tight block">BreakTime</span>
              <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                A lightweight hub for short, farm-related micro-games and quick interactive breaks.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 tracking-wider uppercase mb-4">
                Master Ecosystem
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-stone-500 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                    RuralOpsTools Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-stone-500 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-stone-500 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                    Calculators
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 tracking-wider uppercase mb-4">
                Legal & Information
              </h3>
              <ul className="space-y-2 grid grid-cols-2 gap-x-4">
                {['About', 'Contact', 'Legal', 'Privacy', 'Terms', 'Disclaimer', 'License'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase()}`} className="text-sm text-stone-500 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-stone-200 dark:border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-stone-400 dark:text-stone-500">
              &copy; {new Date().getFullYear()} RuralOpsTools. All rights reserved.
            </p>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-2 md:mt-0">
              Part of the ruralopstools.com ecosystem.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}
