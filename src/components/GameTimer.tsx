import React from 'react';
import { Timer } from 'lucide-react';

interface GameTimerProps {
  timeRemaining: number;
  phase: string;
}

const GameTimer: React.FC<GameTimerProps> = ({ timeRemaining, phase }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="flex items-center gap-2 text-xl font-bold">
      <Timer className="w-6 h-6" />
      <span>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
      <span className="text-sm font-normal">remaining in {phase}</span>
    </div>
  );
};

export default GameTimer;