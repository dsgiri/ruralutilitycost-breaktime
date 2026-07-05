import { useState } from "react";
import { Sparkles } from "lucide-react";
import { GAMES } from "../data/games";
import { Category } from "../types";
import { useFavorites } from "../hooks/useFavorites";
import { GameCard } from "../components/ui/GameCard";
import { CategoryFilter } from "../components/ui/CategoryFilter";
import { SEO } from "../components/ui/SEO";

export function Games() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const { isFavorite, toggleFavorite } = useFavorites();

  const categories = Array.from(new Set(GAMES.map(g => g.category))) as Category[];

  const filteredGames = GAMES.filter(g => 
    selectedCategory === "All" || g.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      <SEO title="Game Library" description="Browse our collection of farm-themed micro-games. Pick one, play for a few minutes, and reset." />
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-stone-800 text-center shadow-sm transition-colors">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4 tracking-tight">Game Library</h1>
        <p className="text-stone-500 dark:text-stone-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Browse our collection of micro-games. Pick one, play for a few minutes, and get back to your day refreshed.
        </p>
      </div>

      <div>
        <div className="mb-8">
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelect={setSelectedCategory} 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              isFavorite={isFavorite(game.id)} 
              toggleFavorite={toggleFavorite} 
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 transition-colors">
            <Sparkles className="mx-auto text-stone-300 dark:text-stone-700 mb-3" size={48} />
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-1">No games found</h3>
            <p className="text-stone-500 dark:text-stone-400">We couldn't find any games matching this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
