import React, { useState } from 'react';
import GameTimer from '../GameTimer';
import { Player, GameState, Drawing, Slogan } from '../../types/game';

interface CombiningPhaseProps {
  gameState: GameState;
  currentPlayer: Player;
  onSubmitCombo: (drawingId: string, sloganId: string) => void;
}

const CombiningPhase: React.FC<CombiningPhaseProps> = ({
  gameState,
  currentPlayer,
  onSubmitCombo,
}) => {
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
  const [selectedSlogan, setSelectedSlogan] = useState<Slogan | null>(null);

  const handleSubmit = () => {
    if (selectedDrawing && selectedSlogan) {
      onSubmitCombo(selectedDrawing.id, selectedSlogan.id);
      setSelectedDrawing(null);
      setSelectedSlogan(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <GameTimer
          timeRemaining={gameState.timeRemaining}
          phase="Combining Phase"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Select Art</h2>
          <div className="grid grid-cols-2 gap-4">
            {gameState.drawings.map((drawing) => (
              <button
                key={drawing.id}
                onClick={() => setSelectedDrawing(drawing)}
                className={`p-4 border rounded-lg hover:border-blue-500 transition-colors ${
                  selectedDrawing?.id === drawing.id ? 'border-blue-500 ring-2 ring-blue-200' : ''
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: drawing.svgContent }}
                  className="w-full aspect-square"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Select Slogan</h2>
          <div className="space-y-4">
            {gameState.slogans.map((slogan) => (
              <button
                key={slogan.id}
                onClick={() => setSelectedSlogan(slogan)}
                className={`w-full p-4 text-left border rounded-lg hover:border-blue-500 transition-colors ${
                  selectedSlogan?.id === slogan.id ? 'border-blue-500 ring-2 ring-blue-200' : ''
                }`}
              >
                {slogan.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!selectedDrawing || !selectedSlogan}
          className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Combination
        </button>
      </div>
    </div>
  );
};

export default CombiningPhase;