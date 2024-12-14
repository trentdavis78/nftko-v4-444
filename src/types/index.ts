// All types in one consolidated file
export interface Path {
  id: string;
  d: string;
  stroke: string;
  strokeWidth: number;
  fill: string;
  strokeLinecap: 'round';
  strokeLinejoin: 'round';
  type?: 'imported';
  isImported?: boolean;
}

export interface Point {
  x: number;
  y: number;
}

export interface DrawingToolsProps {
  mode: 'draw' | 'select';
  setMode: (mode: 'draw' | 'select') => void;
  currentColor: string;
  setCurrentColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  onDelete: () => void;
  canDelete: boolean;
  isPickingColor: boolean;
  onStartPickingColor: () => void;
}

export interface ModeToolsProps {
  mode: 'draw' | 'select';
  setMode: (mode: 'draw' | 'select') => void;
}

export interface ColorToolsProps {
  currentColor: string;
  setCurrentColor: (color: string) => void;
  isPickingColor: boolean;
  onStartPickingColor: () => void;
}

export interface StrokeWidthButtonProps {
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  currentColor: string;
}

export type GamePhase = 'splash' | 'lobby' | 'drawing' | 'slogans' | 'combining' | 'voting' | 'results' ;

export interface Player {
  id: string;
  name: string;
  drawings: Drawing[];
  slogans: string[];
  combinations: ArtSloganCombo[];
  score: number;
}

export interface Drawing {
  id: string;
  svgContent: string;
  authorId: string;
  timestamp: number;
}

export interface Slogan {
  id: string;
  text: string;
  authorId: string;
  timestamp: number;
}

export interface ArtSloganCombo {
  id: string;
  drawingId: string;
  sloganId: string;
  playerId: string;
  votes: number;
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  timeRemaining: number;
  roundDuration: number;
  maxDrawings: number;
  maxSlogans: number;
  drawings: Drawing[];
  slogans: Slogan[];
  combinations: ArtSloganCombo[];
}