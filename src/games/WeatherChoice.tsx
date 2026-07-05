import React, { useState, useEffect } from 'react';
import { CloudLightning, Sun, CloudRain, Wind, Snowflake } from 'lucide-react';

const SCENARIOS = [
  {
    condition: "Approaching Thunderstorm",
    icon: CloudLightning,
    color: "text-purple-400",
    options: ["Bring livestock in", "Water the crops", "Harvest corn", "Paint the barn"],
    answer: 0,
  },
  {
    condition: "Severe Drought Alert",
    icon: Sun,
    color: "text-amber-500",
    options: ["Sell all machinery", "Implement drip irrigation", "Plant thirsty crops", "Flood the fields"],
    answer: 1,
  },
  {
    condition: "Heavy Rain Expected",
    icon: CloudRain,
    color: "text-blue-400",
    options: ["Leave tools outside", "Check drainage ditches", "Start plowing", "Shear sheep"],
    answer: 1,
  },
  {
    condition: "High Winds (40+ mph)",
    icon: Wind,
    color: "text-gray-400",
    options: ["Spray pesticides", "Open all barn doors", "Secure loose equipment", "Light a bonfire"],
    answer: 2,
  },
  {
    condition: "Unexpected Frost",
    icon: Snowflake,
    color: "text-cyan-300",
    options: ["Cover sensitive plants", "Water extensively", "Do nothing", "Harvest immediately"],
    answer: 0,
  }
];

export function WeatherChoice({ onComplete }: { onComplete: (score: number) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    if (feedback !== null) return;
    if (timeLeft <= 0) {
      handleAnswer(-1); // timeout
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, feedback]);

  const handleAnswer = (idx: number) => {
    if (feedback !== null) return;
    
    const isCorrect = idx === SCENARIOS[currentIdx].answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(s => s + 20 + timeLeft); // bonus for speed
    }

    setTimeout(() => {
      if (currentIdx + 1 < SCENARIOS.length) {
        setCurrentIdx(c => c + 1);
        setTimeLeft(10);
        setFeedback(null);
      } else {
        onComplete(score + (isCorrect ? 20 + timeLeft : 0));
      }
    }, 1500);
  };

  const scenario = SCENARIOS[currentIdx];

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 text-white z-10 relative">
      <div className="flex justify-between w-full mb-8">
        <div className="text-stone-300 font-bold">Scenario {currentIdx + 1}/{SCENARIOS.length}</div>
        <div className="text-emerald-400 font-bold">Score: {score}</div>
      </div>

      <div className="text-center mb-8">
        <scenario.icon size={64} className={`mx-auto mb-4 ${scenario.color}`} />
        <h2 className="text-2xl font-bold mb-2">{scenario.condition}</h2>
        <div className="text-stone-400">What is the best action?</div>
      </div>

      {/* Progress Bar for time */}
      <div className="w-full h-2 bg-stone-800 rounded-full mb-8 overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${timeLeft < 4 ? 'bg-red-500' : 'bg-emerald-500'}`} 
          style={{ width: `${(timeLeft / 10) * 100}%` }} 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {scenario.options.map((opt, idx) => {
          let btnClass = "bg-stone-800 border-stone-600 hover:bg-stone-700 hover:border-stone-400";
          if (feedback !== null) {
            if (idx === scenario.answer) btnClass = "bg-emerald-900 border-emerald-500 text-emerald-100";
            else if (idx !== scenario.answer) btnClass = "bg-stone-900 border-stone-800 opacity-50";
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
