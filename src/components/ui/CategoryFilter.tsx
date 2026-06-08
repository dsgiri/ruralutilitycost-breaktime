import { Category } from "../../types";
import { cn } from "../../lib/utils";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | "All";
  onSelect: (category: Category | "All") => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <button
        onClick={() => onSelect("All")}
        className={cn(
          "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border",
          selectedCategory === "All"
            ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 border-stone-800 dark:border-stone-200 shadow-sm"
            : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800"
        )}
      >
        All Games
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border",
            selectedCategory === category
              ? "bg-emerald-700 dark:bg-emerald-600 text-white border-emerald-700 dark:border-emerald-600 shadow-sm"
              : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
