import { useState, useCallback } from 'react';
import { GameState, Drawing, Slogan, ArtSloganCombo, Player } from '../types';

const INITIAL_GAME_STATE: GameState = {
  phase: 'splash',
  players: [],
  timeRemaining: 300,
  roundDuration: 300,
  maxDrawings: 3,
  maxSlogans: 5,
  drawings: [],
  slogans: [],
  combinations: [],
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  const onExit = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'splash',
    }));
  }
  , []);

  const startLobby = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'lobby',
    }));
  }
  , []);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'drawing',
      timeRemaining: prev.roundDuration,
    }));
  }, []);

  const submitDrawing = useCallback((drawing: Drawing) => {
    setGameState(prev => ({
      ...prev,
      drawings: [...prev.drawings, drawing],
    }));
  }, []);

  const submitSlogan = useCallback((slogan: any) => {
    setGameState(prev => ({
      ...prev,
      slogans: [...prev.slogans, slogan],
    }));
  }, []);

  const submitCombo = useCallback((combo: any) => {
    setGameState(prev => ({
      ...prev,
      combinations: [...prev.combinations, combo],
    }));
  }, []);

  const submitVote = useCallback((comboId: string) => {
    setGameState(prev => ({
      ...prev,
      combinations: prev.combinations.map(combo =>
        combo.id === comboId
          ? { ...combo, votes: (combo.votes || 0) + 1 }
          : combo
      ),
    }));
  }, []);

  const nextPhase = useCallback(() => {
    setGameState(prev => {
      const phases: GameState['phase'][] = [
        'splash',
        'lobby',
        'drawing',
        'slogans',
        'combining',
        'voting',
        'results'
   
      ];
      const currentIndex = phases.indexOf(prev.phase);
      const nextIndex = (currentIndex + 1) % phases.length;
      
      return {
        ...prev,
        phase: phases[nextIndex],
        timeRemaining: prev.roundDuration,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_GAME_STATE);
  }, []);

  return {
    gameState,
    startLobby,
    startGame,
    submitDrawing,
    submitSlogan,
    submitCombo,
    submitVote,
    nextPhase,
    resetGame,
    onExit
  };
};

export default useGameState;