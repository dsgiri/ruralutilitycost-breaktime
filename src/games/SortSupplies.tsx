import React, { useState, useEffect } from 'react';
import { Hammer, Wheat, Syringe } from 'lucide-react';

const BINS = [
  { id: 'Tools', name: 'Tools', Icon: Hammer, color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-900/40 hover:bg-blue-800/60' },
  { id: 'Feed', name: 'Feed', Icon: Wheat, color: 'text-amber-400', border: 'border-amber-500', bg: 'bg-amber-900/40 hover:bg-amber-800/60' },
  { id: 'Medical', name: 'Medical', Icon: Syringe, color: 'text-red-400', border: 'border-red-500', bg: 'bg-red-900/40 hover:bg-red-800/60' },
];

const ITEMS = [
  { id: 1, name: 'Wrench', type: 'Tools' },
  { id: 2, name: 'Hay Bale', type: 'Feed' },
  { id: 3, name: 'Vaccine', type: 'Medical' },
  { id: 4, name: 'Hammer', type: 'Tools' },
  { id: 5, name: 'Grain Sack', type: 'Feed' },
  { id: 6, name: 'Bandages', type: 'Medical' },
  { id: 7, name: 'Shovel', type: 'Tools' },
  { id: 8, name: 'Corn', type: 'Feed' },
  { id: 9, name: 'Thermometer', type: 'Medical' },
];

function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function SortSupplies({ onComplete }: { onComplete: (score: number) => void }) {
  const [queue, setQueue] = useState(shuffle(ITEMS));
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleSort = (type: string) => {
    if (queue.length === 0) return;
    
    const currentItem = queue[0];
    const isCorrect = currentItem.type === type;

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setScore(s => s + 10);
    else setScore(s => Math.max(0, s - 5));

    setTimeout(() => {
      setFeedback(null);
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      if (newQueue.length === 0) {
        setTimeout(() => onComplete(score + (isCorrect ? 10 : 0)), 1000);
      }
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4 text-white z-10 relative">
      <div className="flex justify-between w-full mb-8">
        <div className="text-stone-300 font-bold">Items Left: {queue.length}</div>
        <div className="text-emerald-400 font-bold">Score: {score}</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center mb-12 min-h-[160px]">
        {queue.length > 0 ? (
          <div className={`p-8 bg-stone-800 border-4 rounded-2xl shadow-xl transition-all duration-300 ${
            feedback === 'correct' ? 'border-emerald-500 scale-110 bg-emerald-900/50' :
            feedback === 'incorrect' ? 'border-red-500 scale-90 bg-red-900/50' :
            'border-stone-600 scale-100'
          }`}>
            <h2 className="text-3xl font-bold text-white">{queue[0].name}</h2>
          </div>
        ) : (
          <h2 className="text-3xl font-bold text-emerald-400">All Sorted!</h2>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
        {BINS.map(bin => (
          <button
            key={bin.id}
            onClick={() => handleSort(bin.id)}
            disabled={queue.length === 0 || feedback !== null}
            className={`flex flex-col items-center p-2 sm:p-4 rounded-xl border-2 transition-transform active:scale-95 ${bin.border} ${bin.bg}`}
          >
            <bin.Icon className={`w-6 h-6 sm:w-10 sm:h-10 mb-1 sm:mb-2 ${bin.color}`} />
            <span className="font-bold text-xs sm:text-base text-stone-200">{bin.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
