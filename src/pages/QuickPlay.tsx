import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GAMES } from "../data/games";

/**
 * QuickPlay acts as a redirector.
 * When visited, it randomly selects a game and redirects to it immediately.
 */
export function QuickPlay() {
  const navigate = useNavigate();

  useEffect(() => {
    // Select random game
    const randomGame = GAMES[Math.floor(Math.random() * GAMES.length)];
    // Add replace to avoid creating weird back button history
    navigate(randomGame.route, { replace: true });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
        <p className="text-stone-500 font-medium">Finding a short break for you...</p>
      </div>
    </div>
  );
}
