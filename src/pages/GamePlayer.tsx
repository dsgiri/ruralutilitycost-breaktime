import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, Maximize2 } from "lucide-react";
import * as Icons from "lucide-react";
import { useState } from "react";
import { GAMES } from "../data/games";

export function GamePlayer() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const game = GAMES.find(g => g.id === gameId);

  const handleStart = () => {
    setIsPlaying(true);
    // Track stats
    try {
      const stored = localStorage.getItem("breaktime_stats");
      const stats = stored ? JSON.parse(stored) : { played: 0, streak: 1 };
      localStorage.setItem("breaktime_stats", JSON.stringify({
        ...stats, 
        played: stats.played + 1,
        streak: stats.streak === 0 ? 1 : stats.streak
      }));
      // Dispatch storage event so ProgressBadge updates if we wanted it real-time across tabs
      window.dispatchEvent(new Event("storage"));
    } catch {}
  };

  if (!game) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-stone-800 mb-4">Game Not Found</h1>
        <p className="text-stone-500 mb-8">The game you are looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/games')} 
          className="inline-flex items-center bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full font-bold hover:bg-emerald-200 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Return to Games
        </button>
      </div>
    );
  }

  // @ts-ignore
  const IconComponent = Icons[game.iconName || "Gamepad2"] || Icons.Gamepad2;

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[75vh] min-h-[500px]">
      <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm shrink-0">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 mr-3 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-lg text-stone-800 leading-tight">{game.title}</h1>
            <span className="text-sm text-stone-500 font-medium">{game.category} • {game.playTimeEstimate}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
            title="Restart Game"
          >
            <RefreshCw size={20} />
          </button>
          <button 
            className="p-2 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
            title="Fullscreen"
          >
            <Maximize2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex-grow bg-stone-900 rounded-3xl overflow-hidden relative flex flex-col items-center justify-center border-[6px] border-stone-800 shadow-xl">
        {/* Abstract game container visualization */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-stone-900 to-stone-900"></div>
        
        {!isPlaying ? (
          <div className="text-center p-10 bg-stone-800/80 backdrop-blur-md rounded-3xl max-w-sm border border-stone-700 z-10 shadow-2xl">
            <div className="w-20 h-20 bg-stone-700 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
               <IconComponent size={40} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{game.title}</h2>
            <p className="text-stone-400 mb-8 leading-relaxed">
              {game.description}
            </p>
            <button 
              onClick={handleStart}
              className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold px-8 py-4 rounded-full w-full transition-transform active:scale-95 text-lg shadow-lg shadow-emerald-500/20"
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="z-10 text-center animate-in fade-in zoom-in duration-500 text-white">
            <div className="w-24 h-24 border-4 border-emerald-500 border-t-emerald-200 rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-2">Game is active...</h2>
            <p className="text-stone-400">Interact with the prototype by returning later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
