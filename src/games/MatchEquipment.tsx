import React, { useState, useEffect } from 'react';
import { Tractor, Axe, Shovel, Wrench, Scissors, Droplets } from 'lucide-react';

const EQUIPMENT = [
  { id: 'tractor', name: 'Tractor', Icon: Tractor },
  { id: 'axe', name: 'Axe', Icon: Axe },
  { id: 'shovel', name: 'Shovel', Icon: Shovel },
  { id: 'wrench', name: 'Wrench', Icon: Wrench },
  { id: 'shears', name: 'Shears', Icon: Scissors },
  { id: 'water', name: 'Irrigation', Icon: Droplets },
];

function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function MatchEquipment({ onComplete }: { onComplete: (score: number) => void }) {
  const [icons, setIcons] = useState<{ id: string; Icon: React.ElementType }[]>([]);
  const [names, setNames] = useState<{ id: string; name: string }[]>([]);
  
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);

  useEffect(() => {
    setIcons(shuffle(EQUIPMENT.map(e => ({ id: e.id, Icon: e.Icon }))));
    setNames(shuffle(EQUIPMENT.map(e => ({ id: e.id, name: e.name }))));
  }, []);

  useEffect(() => {
    if (selectedIcon && selectedName) {
      if (selectedIcon === selectedName) {
        const newMatches = [...matches, selectedIcon];
        setMatches(newMatches);
        if (newMatches.length === EQUIPMENT.length) {
          setTimeout(() => onComplete(100), 1000);
        }
      }
      setTimeout(() => {
        setSelectedIcon(null);
        setSelectedName(null);
      }, 500);
    }
  }, [selectedIcon, selectedName, matches, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4 text-white z-10 relative">
      <h3 className="text-xl font-bold mb-6 text-stone-200">Match the Equipment</h3>
      <div className="flex w-full justify-between gap-3 sm:gap-8">
        {/* Icons Column */}
        <div className="flex flex-col gap-2 sm:gap-4 flex-1">
          {icons.map(({ id, Icon }) => {
            const isMatched = matches.includes(id);
            const isSelected = selectedIcon === id;
            return (
              <button
                key={id}
                disabled={isMatched || selectedIcon !== null}
                onClick={() => setSelectedIcon(id)}
                className={`p-3 sm:p-4 rounded-xl flex items-center justify-center transition-all ${
                  isMatched ? 'bg-emerald-600/50 text-emerald-300 border-emerald-500' :
                  isSelected ? 'bg-amber-500/50 text-amber-200 border-amber-400' :
                  'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-600'
                } border-2`}
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            );
          })}
        </div>

        {/* Names Column */}
        <div className="flex flex-col gap-2 sm:gap-4 flex-1">
          {names.map(({ id, name }) => {
            const isMatched = matches.includes(id);
            const isSelected = selectedName === id;
            return (
              <button
                key={id}
                disabled={isMatched || selectedName !== null}
                onClick={() => setSelectedName(id)}
                className={`p-3 sm:p-4 rounded-xl flex items-center justify-center transition-all font-bold text-sm sm:text-base ${
                  isMatched ? 'bg-emerald-600/50 text-emerald-300 border-emerald-500' :
                  isSelected ? 'bg-amber-500/50 text-amber-200 border-amber-400' :
                  'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-600'
                } border-2`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
