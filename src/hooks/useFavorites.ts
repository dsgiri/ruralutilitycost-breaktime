import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("breaktime_favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("breaktime_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (gameId: string) => {
    setFavorites((prev) => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId) 
        : [...prev, gameId]
    );
  };

  const isFavorite = (gameId: string) => favorites.includes(gameId);

  return { favorites, toggleFavorite, isFavorite };
}
