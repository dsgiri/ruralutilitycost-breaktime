import React, { useState } from 'react';

const QUESTIONS = [
  {
    q: "When is the best time of day to harvest most leafy greens?",
    opts: ["Early morning", "High noon", "Late afternoon", "Midnight"],
    ans: 0
  },
  {
    q: "How can you tell when sweet corn is ready to harvest?",
    opts: ["The stalks turn completely yellow", "The silks are brown and dry", "The ears fall off", "The leaves drop"],
    ans: 1
  },
  {
    q: "Winter squash should be harvested when...",
    opts: ["The skin is soft and easily punctured", "They are small and green", "The rind is hard and cannot be dented with a fingernail", "After the first deep freeze"],
    ans: 2
  },
  {
    q: "Which crop is traditionally harvested after a light frost to improve its sweetness?",
    opts: ["Tomatoes", "Peppers", "Brussels Sprouts", "Cucumbers"],
    ans: 2
  },
  {
    q: "Potatoes intended for storage should be left in the ground for how long after the plant tops die back?",
    opts: ["Harvest immediately", "1-2 days", "1-2 weeks", "2 months"],
    ans: 2
  }
];

export function HarvestTrivia({ onComplete }: { onComplete: (score: number) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleAnswer = (idx: number) => {
    if (feedback !== null) return;
    
    const isCorrect = idx === QUESTIONS[currentIdx].ans;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) setScore(s => s + 20);

    setTimeout(() => {
      if (currentIdx + 1 < QUESTIONS.length) {
        setCurrentIdx(c => c + 1);
        setFeedback(null);
      } else {
        onComplete(score + (isCorrect ? 20 : 0));
      }
    }, 1500);
  };

  const q = QUESTIONS[currentIdx];

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 text-white z-10 relative">
      <div className="flex justify-between w-full mb-4">
        <div className="text-stone-300 font-bold">Question {currentIdx + 1}/{QUESTIONS.length}</div>
        <div className="text-emerald-400 font-bold">Score: {score}</div>
      </div>

      <div className="w-full h-2 bg-stone-800 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-emerald-500 transition-all duration-500" 
          style={{ width: `${((currentIdx) / QUESTIONS.length) * 100}%` }} 
        />
      </div>

      <div className="text-center mb-8 w-full px-4">
        <h2 className="text-2xl font-bold mb-2 text-stone-100">{q.q}</h2>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {q.opts.map((opt, idx) => {
          let btnClass = "bg-stone-800 border-stone-600 hover:bg-stone-700 hover:border-stone-400";
          if (feedback !== null) {
            if (idx === q.ans) btnClass = "bg-emerald-900 border-emerald-500 text-emerald-100";
            else if (idx !== q.ans) btnClass = "bg-stone-900 border-stone-800 opacity-50";
            
            if (feedback === 'incorrect' && idx === q.ans) {
                 btnClass = "bg-emerald-900/50 border-emerald-500/50 text-emerald-200";
            }
          }
          return (
            <button
              key={idx}
              disabled={feedback !== null}
              onClick={() => handleAnswer(idx)}
              className={`p-4 rounded-xl border-2 font-bold text-lg text-left transition-colors ${btnClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
