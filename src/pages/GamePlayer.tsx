import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, Maximize2 } from "lucide-react";
import * as Icons from "lucide-react";
import { useState, useCallback } from "react";
import { GAMES } from "../data/games";
import { SEO } from "../components/ui/SEO";

import { MatchEquipment, SortSupplies, CropMemory, WeatherChoice, AnimalID, HarvestTrivia } from "../games";

export function GamePlayer() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  
  const game = GAMES.find(g => g.id === gameId);

  const handleStart = () => {
    setIsPlaying(true);
    setIsFinished(false);
    setFinalScore(0);
  };

  const handleComplete = useCallback((score: number) => {
    setIsPlaying(false);
    setIsFinished(true);
    setFinalScore(score);

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
  }, []);

  if (!game) {
    return (
      <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 max-w-2xl mx-auto transition-colors">
        <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-4">Game Not Found</h1>
        <p className="text-stone-500 dark:text-stone-400 mb-8">The game you are looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/games')} 
          className="inline-flex items-center bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 px-6 py-3 rounded-full font-bold hover:bg-emerald-200 dark:hover:bg-emerald-800/60 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Return to Games
        </button>
      </div>
    );
  }

  // @ts-ignore
  const IconComponent = Icons[game.iconName || "Gamepad2"] || Icons.Gamepad2;

  const renderGame = () => {
    switch (game.id) {
      case 'match-equipment': return <MatchEquipment onComplete={handleComplete} />;
      case 'sort-supplies': return <SortSupplies onComplete={handleComplete} />;
      case 'crop-memory': return <CropMemory onComplete={handleComplete} />;
      case 'weather-choice': return <WeatherChoice onComplete={handleComplete} />;
      case 'animal-id': return <AnimalID onComplete={handleComplete} />;
      case 'harvest-trivia': return <HarvestTrivia onComplete={handleComplete} />;
      default: return <div className="text-white z-10">Game component not found</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-[75vh]">
      <SEO title={game.title} description={game.description} />
      <div className="flex items-center justify-between mb-4 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm shrink-0 transition-colors">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 mr-3 text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-lg text-stone-800 dark:text-stone-100 leading-tight">{game.title}</h1>
            <span className="text-sm text-stone-500 dark:text-stone-400 font-medium">{game.category} • {game.playTimeEstimate}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => { setIsPlaying(false); setIsFinished(false); }}
            className="p-2 text-stone-400 dark:text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-full transition-colors"
            title="Restart Game"
          >
            <RefreshCw size={20} />
          </button>
          <button 
            className="p-2 text-stone-400 dark:text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-full transition-colors"
            title="Fullscreen"
          >
            <Maximize2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex-grow bg-stone-900 rounded-3xl overflow-y-auto overflow-x-hidden relative flex flex-col items-center justify-center border-[6px] border-stone-800 shadow-xl min-h-[400px]">
        {/* Abstract game container visualization */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-stone-900 to-stone-900 pointer-events-none"></div>
        
        {!isPlaying && !isFinished && (
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
        )}

        {isPlaying && renderGame()}

        {isFinished && (
          <div className="text-center p-10 bg-stone-800/80 backdrop-blur-md rounded-3xl max-w-sm border border-stone-700 z-10 shadow-2xl animate-in fade-in zoom-in">
            <div className="w-24 h-24 bg-emerald-900/50 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-emerald-500">
               <span className="text-3xl font-bold">{finalScore}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Complete!</h2>
            <p className="text-stone-400 mb-8">
              Great job! You earned {finalScore} points.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={handleStart}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold px-6 py-3 rounded-full transition-transform active:scale-95 shadow-lg shadow-emerald-500/20"
              >
                Play Again
              </button>
              <button 
                onClick={() => navigate('/games')}
                className="flex-1 bg-stone-700 hover:bg-stone-600 text-white font-bold px-6 py-3 rounded-full transition-transform active:scale-95"
              >
                More Games
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
