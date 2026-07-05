import React, { useState, useEffect } from 'react';
import { Wheat, Sprout, Apple, Leaf, Carrot, Trees, Clover, Grape } from 'lucide-react';

const ICONS = [Wheat, Sprout, Apple, Leaf, Carrot, Trees, Clover, Grape];

function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function CropMemory({ onComplete }: { onComplete: (score: number) => void }) {
  const [cards, setCards] = useState<{ id: number; iconId: number; Icon: React.ElementType; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const pairs = ICONS.map((Icon, idx) => [
      { id: idx * 2, iconId: idx, Icon, isFlipped: false, isMatched: false },
      { id: idx * 2 + 1, iconId: idx, Icon, isFlipped: false, isMatched: false }
    ]).flat();
    setCards(shuffle(pairs));
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedIds.length === 2) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c);
    setCards(newCards);
    setFlippedIds([...flippedIds, id]);
  };

  useEffect(() => {
    if (flippedIds.length === 2) {
      setMoves(m => m + 1);
      const [id1, id2] = flippedIds;
      const card1 = cards.find(c => c.id === id1);
      const card2 = cards.find(c => c.id === id2);

      if (card1 && card2 && card1.iconId === card2.iconId) {
        setCards(cards.map(c => (c.id === id1 || c.id === id2) ? { ...c, isMatched: true } : c));
        setFlippedIds([]);
      } else {
        setTimeout(() => {
          setCards(cards.map(c => (c.id === id1 || c.id === id2) ? { ...c, isFlipped: false } : c));
          setFlippedIds([]);
        }, 1000);
      }
    }
  }, [flippedIds, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.isMatched)) {
      setTimeout(() => onComplete(Math.max(10, 100 - moves * 2)), 1000);
    }
  }, [cards, moves, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto p-4 text-white z-10 relative">
      <div className="flex justify-between w-full mb-6">
        <h3 className="text-xl font-bold text-stone-200">Crop Memory Grid</h3>
        <div className="text-emerald-400 font-bold">Moves: {moves}</div>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square flex items-center justify-center rounded-xl border-2 transition-all duration-300 transform perspective-1000 ${
              card.isFlipped || card.isMatched 
                ? 'bg-stone-700 border-emerald-500 rotate-y-180' 
                : 'bg-stone-800 border-stone-600 hover:border-stone-400'
            }`}
          >
            <div className={`transition-opacity duration-300 ${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'}`}>
              <card.Icon size={32} className={card.isMatched ? 'text-emerald-400' : 'text-stone-200'} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
