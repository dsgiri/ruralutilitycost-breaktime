import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Play, Sparkles } from "lucide-react";
import { GAMES } from "../data/games";
import { Category } from "../types";
import { useFavorites } from "../hooks/useFavorites";
import { GameCard } from "../components/ui/GameCard";
import { CategoryFilter } from "../components/ui/CategoryFilter";
import { SEO } from "../components/ui/SEO";

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const categories = Array.from(new Set(GAMES.map(g => g.category))) as Category[];
  const featuredGame = GAMES.find(g => g.featured) || GAMES[0];
  
  const filteredGames = GAMES.filter(g => 
    (selectedCategory === "All" || g.category === selectedCategory) &&
    g.id !== featuredGame.id
  );

  const handleQuickPlay = () => {
    const randomGame = GAMES[Math.floor(Math.random() * GAMES.length)];
    navigate(randomGame.route);
  };

  return (
    <div className="space-y-12">
      <SEO />
      {/* Hero Section */}
      <section className="bg-emerald-900 dark:bg-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -m-16 opacity-10 pointer-events-none">
          <Sparkles size={300} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-emerald-50 dark:text-emerald-100">
            Take a quick break.
          </h1>
          <p className="text-lg sm:text-xl text-emerald-200 dark:text-emerald-300/80 mb-8 max-w-xl leading-relaxed">
            Short, farm-themed micro-games to reset your mind. Most games take under 3 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleQuickPlay}
              className="inline-flex items-center justify-center bg-emerald-400 hover:bg-emerald-300 text-emerald-950 px-6 py-3 rounded-full font-bold text-lg transition-colors shadow-sm"
            >
              <Play size={20} className="mr-2 fill-current" />
              Quick Play
            </button>
            <Link 
              to="/games"
              className="inline-flex items-center justify-center bg-emerald-800/80 hover:bg-emerald-700 backdrop-blur-sm text-white border border-emerald-600 px-6 py-3 rounded-full font-bold text-lg transition-colors"
            >
              Browse Games
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Game */}
      <section>
        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-6 flex items-center">
          <Sparkles className="mr-2 text-emerald-600 dark:text-emerald-500" size={24} />
          Daily Feature
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <GameCard 
            game={featuredGame} 
            isFavorite={isFavorite(featuredGame.id)} 
            toggleFavorite={toggleFavorite}
            featured={true}
          />
        </div>
      </section>

      {/* Game Library Preview */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">More Games</h2>
          <Link to="/games" className="text-sm font-semibold text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400">
            View all &rarr;
          </Link>
        </div>
        
        <div className="mb-6">
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelect={setSelectedCategory} 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.slice(0, 6).map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              isFavorite={isFavorite(game.id)} 
              toggleFavorite={toggleFavorite} 
            />
          ))}
        </div>
        
        {filteredGames.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
            <p className="text-stone-500 dark:text-stone-400">No games found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
