import React, { useState } from 'react';
import GameTimer from '../GameTimer';
import { Player, GameState, Slogan } from '../../types/game';

interface SloganPhaseProps {
  gameState: GameState;
  currentPlayer: Player;
  onSubmitSlogan: (slogan: string) => void;
}

const SloganPhase: React.FC<SloganPhaseProps> = ({
  gameState,
  currentPlayer,
  onSubmitSlogan,
}) => {
  const [currentSlogan, setCurrentSlogan] = useState('');
  const slogansLeft = gameState.maxSlogans - currentPlayer.slogans.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSlogan.trim()) {
      onSubmitSlogan(currentSlogan.trim());
      setCurrentSlogan('');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <GameTimer
          timeRemaining={gameState.timeRemaining}
          phase="Slogan Phase"
        />
        <div className="text-lg">
          Slogans remaining: <span className="font-bold">{slogansLeft}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Create Your Slogans</h2>
        <p className="text-gray-600 mb-6">
          Create up to {gameState.maxSlogans} catchy slogans for your NFTs.
          Be creative and funny!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={currentSlogan}
              onChange={(e) => setCurrentSlogan(e.target.value)}
              placeholder="Enter your slogan..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={100}
            />
            <p className="text-sm text-gray-500 mt-2">
              {currentSlogan.length}/100 characters
            </p>
          </div>
          <button
            type="submit"
            disabled={!currentSlogan.trim() || currentPlayer.slogans.length >= gameState.maxSlogans}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Slogan
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Slogans:</h3>
          <ul className="space-y-2">
            {currentPlayer.slogans.map((slogan, index) => (
              <li
                key={index}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                {slogan}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SloganPhase;