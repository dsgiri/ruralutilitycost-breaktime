import { Link } from "react-router-dom";

export function SharedFooter() {
  return (
    <footer className="bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
    </footer>
  );
}
