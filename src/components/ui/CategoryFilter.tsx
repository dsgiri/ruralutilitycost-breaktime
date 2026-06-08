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
            ? "bg-stone-800 text-white border-stone-800 shadow-sm"
            : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
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
              ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
              : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
