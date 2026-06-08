import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { GAMES } from "../data/games";
import { useFavorites } from "../hooks/useFavorites";
import { GameCard } from "../components/ui/GameCard";
import { SEO } from "../components/ui/SEO";

export function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const favoriteGames = GAMES.filter(g => favorites.includes(g.id));

  return (
    <div className="space-y-8">
      <SEO title="Your Favorites" description="View and play your favorite farm-themed micro-games." />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 flex items-center transition-colors">
          <Heart className="mr-3 text-red-500 dark:text-red-400 fill-current" size={32} />
          Your Favorites
        </h1>
      </div>

      {favoriteGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              isFavorite={isFavorite(game.id)} 
              toggleFavorite={toggleFavorite} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm transition-colors">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 mb-4 transition-colors">
            <Heart size={24} className="text-stone-400 dark:text-stone-500" />
          </div>
          <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-2">No favorites yet</h3>
          <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-8 text-lg">
            Tap the heart icon on any game card to save it here for quick access later.
          </p>
          <Link 
            to="/games"
            className="inline-flex items-center justify-center font-bold text-emerald-800 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-900 hover:bg-emerald-200 dark:hover:bg-emerald-800 px-8 py-3.5 rounded-full transition-colors"
          >
            Browse Games
          </Link>
        </div>
      )}
    </div>
  );
}
