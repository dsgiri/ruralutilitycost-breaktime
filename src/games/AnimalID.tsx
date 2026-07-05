import React, { useState } from 'react';

const FLASHCARDS = [
  {
    image: "🐄",
    question: "Which breed of cattle is known for its distinct black and white markings and high milk production?",
    options: ["Angus", "Hereford", "Holstein", "Jersey"],
    answer: 2
  },
  {
    image: "🐖",
    question: "What is a female pig called that has not yet had a litter of piglets?",
    options: ["Sow", "Gilt", "Boar", "Barrow"],
    answer: 1
  },
  {
    image: "🐔",
    question: "Which of these is a popular dual-purpose (eggs and meat) chicken breed?",
    options: ["Leghorn", "Rhode Island Red", "Silkie", "Bantam"],
    answer: 1
  },
  {
    image: "🐐",
    question: "Which goat breed is famous for producing mohair?",
    options: ["Boer", "Nubian", "Angora", "Alpine"],
    answer: 2
  },
  {
    image: "🐑",
    question: "What do you call a mature male sheep?",
    options: ["Ram", "Wether", "Ewe", "Lamb"],
    answer: 0
  }
];

export function AnimalID({ onComplete }: { onComplete: (score: number) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleAnswer = (idx: number) => {
    if (feedback !== null) return;
    
    const isCorrect = idx === FLASHCARDS[currentIdx].answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) setScore(s => s + 20);

    setTimeout(() => {
      if (currentIdx + 1 < FLASHCARDS.length) {
        setCurrentIdx(c => c + 1);
        setFeedback(null);
      } else {
        onComplete(score + (isCorrect ? 20 : 0));
      }
    }, 1500);
  };

  const card = FLASHCARDS[currentIdx];

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 text-white z-10 relative">
      <div className="flex justify-between w-full mb-4">
        <div className="text-stone-300 font-bold">Card {currentIdx + 1}/{FLASHCARDS.length}</div>
        <div className="text-emerald-400 font-bold">Score: {score}</div>
      </div>

      <div className="bg-stone-800 p-8 rounded-2xl border-2 border-stone-600 w-full mb-8 shadow-xl text-center">
        <div className="text-6xl mb-6">{card.image}</div>
        <h2 className="text-xl font-medium text-stone-200">{card.question}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {card.options.map((opt, idx) => {
          let btnClass = "bg-stone-800 border-stone-600 hover:bg-stone-700 hover:border-stone-400";
          if (feedback !== null) {
            if (idx === card.answer) btnClass = "bg-emerald-900 border-emerald-500 text-emerald-100";
            else if (idx !== card.answer) btnClass = "bg-stone-900 border-stone-800 opacity-50";
            
            if (feedback === 'incorrect' && idx === card.answer) {
                // Highlight the correct answer even if they got it wrong
                 btnClass = "bg-emerald-900/50 border-emerald-500/50 text-emerald-200";
            }
          }
          return (
            <button
              key={idx}
              disabled={feedback !== null}
              onClick={() => handleAnswer(idx)}
              className={`p-4 rounded-xl border-2 font-bold text-lg transition-colors ${btnClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
