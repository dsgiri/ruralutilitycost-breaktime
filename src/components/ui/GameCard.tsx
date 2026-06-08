import React from "react";
import { Link } from "react-router-dom";
import { Heart, Clock, Play } from "lucide-react";
import * as Icons from "lucide-react";
import { Game } from "../../types";
import { cn } from "../../lib/utils";

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
  featured?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, toggleFavorite, featured = false }) => {
  // @ts-ignore
  const IconComponent = Icons[game.iconName || "Gamepad2"] || Icons.Gamepad2;

  return (
    <div 
      className={cn(
        "group relative bg-white dark:bg-stone-900 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col overflow-hidden",
        featured ? "border-emerald-200 dark:border-emerald-800 shadow-emerald-100/50 dark:shadow-emerald-900/20 shadow-lg sm:flex-row sm:col-span-2 lg:col-span-3" : "border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700"
      )}
    >
      <div 
        className={cn(
          "bg-stone-50 dark:bg-stone-800/50 flex items-center justify-center text-stone-400 dark:text-stone-600 relative overflow-hidden",
          featured ? "h-48 sm:h-auto sm:w-1/3 sm:min-w-[250px]" : "h-40"
        )}
      >
        <IconComponent size={featured ? 64 : 48} className="opacity-20 group-hover:scale-110 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-all duration-500" strokeWidth={1} />
        
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full text-stone-600 dark:text-stone-300 shadow-sm border border-stone-100 dark:border-stone-800">
          {game.category}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(game.id);
          }}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm shadow-sm border transition-colors",
            isFavorite ? "bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-900/50 text-red-500 dark:text-red-400" : "bg-white/90 dark:bg-stone-800/90 border-stone-100 dark:border-stone-700 text-stone-400 dark:text-stone-500 hover:text-red-400 dark:hover:text-red-400 hover:bg-white dark:hover:bg-stone-800"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={16} className={cn(isFavorite && "fill-current")} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between">
        <div className="flex-grow">
          <h3 className="font-bold text-lg text-stone-800 dark:text-stone-100 mb-1 leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {game.title}
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mt-2">
            {game.description}
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center text-xs text-stone-600 dark:text-stone-400 font-medium bg-stone-100 dark:bg-stone-800 px-2.5 py-1.5 rounded-full">
            <Clock size={14} className="mr-1.5 text-stone-400 dark:text-stone-500" />
            {game.playTimeEstimate}
          </div>
          
          <Link 
            to={game.route}
            className="inline-flex items-center justify-center text-sm font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/50 hover:bg-emerald-200 dark:hover:bg-emerald-800/60 px-4 py-2 rounded-lg transition-colors"
          >
            Play <Play size={14} className="ml-1.5 fill-current" />
          </Link>
        </div>
      </div>
    </div>
  );
}
