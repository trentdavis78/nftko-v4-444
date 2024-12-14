import React from 'react';
import DrawingPhase from './components/GamePhases/DrawingPhase';
import SloganPhase from './components/GamePhases/SloganPhase';
import CombiningPhase from './components/GamePhases/CombiningPhase';
import VotingPhase from './components/GamePhases/VotingPhase';
import ResultsPhase from './components/GamePhases/ResultsPhase';
import HomePhase from './components/GamePhases/HomePhase';  
import LobbyPhase from './components/GamePhases/LobbyPhase';
import useGameState from './hooks/useGameState';

function App() {
  const {
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
  } = useGameState();

  // Mock current player for development
  const currentPlayer = {
    id: '1',
    name: 'Player 1',
    drawings: [],
    slogans: [],
    combinations: [],
    score: 0,
  };

  const renderPhase = () => {
    switch (gameState.phase) {
      case 'lobby':
        return (
          <LobbyPhase
          gameState={gameState} onStartGame={startGame} onExit={onExit}  
          />
        );
      case 'drawing':
        return (
          <DrawingPhase
            gameState={gameState}
            currentPlayer={currentPlayer}
            onSubmitDrawing={submitDrawing}
          />
        );
      case 'slogans':
        return (
          <SloganPhase
            gameState={gameState}
            currentPlayer={currentPlayer}
            onSubmitSlogan={submitSlogan}
          />
        );
      case 'combining':
        return (
          <CombiningPhase
            gameState={gameState}
            currentPlayer={currentPlayer}
            onSubmitCombo={submitCombo}
          />
        );
      case 'voting':
        return (
          <VotingPhase
            gameState={gameState}
            currentPlayer={currentPlayer}
            onVote={submitVote}
          />
        );
      case 'results':
        return (
          <ResultsPhase
            gameState={gameState}
            onPlayAgain={resetGame}
          />
        );
      default:
        return (
          <HomePhase gameState={gameState} onLobbyStart={startLobby} />
        );
    }
  };

  return (
    <div 
    id="app"
    style={{overflow: 'hidden'}}
    className='w-full  bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 h-screen'>
      <div className="max-w-7xl mx-auto ">
 
        {renderPhase()}
      </div>
  </div>
  );
}

export default App;