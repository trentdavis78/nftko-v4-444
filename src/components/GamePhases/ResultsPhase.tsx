import React from 'react';
import { Player, GameState, ArtSloganCombo } from '../../types/game';
import { Trophy } from 'lucide-react';

interface ResultsPhaseProps {
  gameState: GameState;
  onPlayAgain: () => void;
}

const ResultsPhase: React.FC<ResultsPhaseProps> = ({
  gameState,
  onPlayAgain,
}) => {
  const sortedPlayers = [...gameState.players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  const getDrawingById = (id: string) =>
    gameState.drawings.find(d => d.id === id);

  const getSloganById = (id: string) =>
    gameState.slogans.find(s => s.id === id);

  const renderCombo = (combo: ArtSloganCombo) => {
    const drawing = getDrawingById(combo.drawingId);
    const slogan = getSloganById(combo.sloganId);

    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-lg">
        {drawing && (
          <div
            dangerouslySetInnerHTML={{ __html: drawing.svgContent }}
            className="w-full aspect-square bg-gray-50 rounded-lg p-4"
          />
        )}
        {slogan && (
          <p className="text-xl font-semibold text-center">{slogan.text}</p>
        )}
        <div className="text-sm text-gray-500">
          Votes: {combo.votes}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-3xl font-bold mb-2">
          {winner.name} Wins!
        </h2>
        <p className="text-xl text-gray-600">
          with {winner.score} points
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className="p-6 bg-white rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-2xl font-bold">#{index + 1}</div>
              <div>
                <h3 className="text-xl font-semibold">{player.name}</h3>
                <p className="text-gray-600">{player.score} points</p>
              </div>
            </div>
            {player.combinations.map((combo) => renderCombo(combo))}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onPlayAgain}
          className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultsPhase;