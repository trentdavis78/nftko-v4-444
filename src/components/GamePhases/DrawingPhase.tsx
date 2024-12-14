import React, { useState, useCallback } from 'react';
import SVGEditor from '../SVGEditor';
import GameTimer from '../GameTimer';
import { DrawingPhaseModal } from './DrawingPhaseModal';
import { Player, GameState, Drawing } from '../../types/game';

interface DrawingPhaseProps {
  gameState: GameState;
  currentPlayer: Player;
  onSubmitDrawing: (drawing: Drawing) => void;
}

export default function DrawingPhase({
  gameState,
  currentPlayer,
  onSubmitDrawing,
}: DrawingPhaseProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currentDrawingNumber, setCurrentDrawingNumber] = useState(1);
  const drawingsLeft = gameState.maxDrawings - currentPlayer.drawings.length;

  const handlePromptSubmit = useCallback(async (prompt: string) => {
    try {
      // Here you would make the actual API call to generate the SVG
      // For now, we'll just create a placeholder SVG
      const drawing: Drawing = {
        id: `drawing-${Date.now()}-${Math.random()}`,
        svgContent: `<svg viewBox="0 0 2048 2048"></svg>`,
        authorId: currentPlayer.id,
        timestamp: Date.now(),
      };

      onSubmitDrawing(drawing);
      setIsModalOpen(false);
      
      if (currentDrawingNumber < gameState.maxDrawings) {
        setCurrentDrawingNumber(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error generating drawing:', error);
      throw new Error('Failed to generate drawing');
    }
  }, [currentDrawingNumber, currentPlayer.id, gameState.maxDrawings, onSubmitDrawing]);

  const handleDrawingSubmit = useCallback((svgContent: string) => {
    const drawing: Drawing = {
      id: `drawing-${Date.now()}-${Math.random()}`,
      svgContent,
      authorId: currentPlayer.id,
      timestamp: Date.now(),
    };
    onSubmitDrawing(drawing);
    setIsModalOpen(true);
  }, [currentPlayer.id, onSubmitDrawing]);

  const handleLeaveGame = useCallback(() => {
    // Handle leaving the game - you'll need to implement this
    console.log('Player left the game');
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <DrawingPhaseModal
        isOpen={isModalOpen}
        onSubmit={handlePromptSubmit}
        onLeave={handleLeaveGame}
        drawingNumber={currentDrawingNumber}
        maxDrawings={gameState.maxDrawings}
      />

      <div className="flex justify-between items-center">
        <GameTimer
          timeRemaining={gameState.timeRemaining}
          phase="Drawing Phase"
        />
        <div className="text-lg">
          Drawings remaining: <span className="font-bold">{drawingsLeft}</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Create Your NFT Art</h2>
        <p className="text-gray-600 mb-6">
          Use the drawing tools to create up to {gameState.maxDrawings} unique pieces.
          Time remaining: {Math.floor(gameState.timeRemaining / 60)} minutes
        </p>
        
        <SVGEditor
          onSubmit={handleDrawingSubmit}
          drawingsLeft={drawingsLeft}
        />
      </div>

      {currentPlayer.drawings.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Your Submitted Drawings:</h3>
          <div className="grid grid-cols-3 gap-4">
            {currentPlayer.drawings.map((drawing) => (
              <div
                key={drawing.id}
                className="aspect-square bg-gray-50 rounded-lg p-4"
                dangerouslySetInnerHTML={{ __html: drawing.svgContent }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}