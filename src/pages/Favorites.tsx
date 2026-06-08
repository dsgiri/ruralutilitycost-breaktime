import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { GAMES } from "../data/games";
import { useFavorites } from "../hooks/useFavorites";
import { GameCard } from "../components/ui/GameCard";

export function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const favoriteGames = GAMES.filter(g => favorites.includes(g.id));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-stone-800 flex items-center">
          <Heart className="mr-3 text-red-500 fill-current" size={32} />
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
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 mb-4">
            <Heart size={24} className="text-stone-400" />
          </div>
          <h3 className="text-xl font-bold text-stone-800 mb-2">No favorites yet</h3>
          <p className="text-stone-500 max-w-md mx-auto mb-8 text-lg">
            Tap the heart icon on any game card to save it here for quick access later.
          </p>
          <Link 
            to="/games"
            className="inline-flex items-center justify-center font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-8 py-3.5 rounded-full transition-colors"
          >
            Browse Games
          </Link>
        </div>
      )}
    </div>
  );
}
