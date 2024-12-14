import React, { useState } from 'react';
import GameTimer from '../GameTimer';
import { Player, GameState, ArtSloganCombo } from '../../types/game';

interface VotingPhaseProps {
  gameState: GameState;
  currentPlayer: Player;
  onVote: (comboId: string) => void;
}

const VotingPhase: React.FC<VotingPhaseProps> = ({
  gameState,
  currentPlayer,
  onVote,
}) => {
  const [currentPair, setCurrentPair] = useState<{
    left: ArtSloganCombo;
    right: ArtSloganCombo;
  } | null>(null);

  const getDrawingById = (id: string) => 
    gameState.drawings.find(d => d.id === id);

  const getSloganById = (id: string) =>
    gameState.slogans.find(s => s.id === id);

  const renderCombo = (combo: ArtSloganCombo) => {
    const drawing = getDrawingById(combo.drawingId);
    const slogan = getSloganById(combo.sloganId);

    return (
      <div className="flex flex-col items-center gap-4">
        {drawing && (
          <div
            dangerouslySetInnerHTML={{ __html: drawing.svgContent }}
            className="w-full aspect-square bg-gray-50 rounded-lg p-4"
          />
        )}
        {slogan && (
          <p className="text-xl font-semibold text-center">{slogan.text}</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <GameTimer
          timeRemaining={gameState.timeRemaining}
          phase="Voting Phase"
        />
      </div>

      {currentPair ? (
        <div className="grid grid-cols-2 gap-8">
          <button
            onClick={() => onVote(currentPair.left.id)}
            className="p-6 bg-white rounded-xl shadow-lg hover:ring-2 hover:ring-blue-500 transition-all"
          >
            {renderCombo(currentPair.left)}
          </button>
          <button
            onClick={() => onVote(currentPair.right.id)}
            className="p-6 bg-white rounded-xl shadow-lg hover:ring-2 hover:ring-blue-500 transition-all"
          >
            {renderCombo(currentPair.right)}
          </button>
        </div>
      ) : (
        <div className="text-center text-xl">
          Waiting for next pair...
        </div>
      )}
    </div>
  );
};

export default VotingPhase;