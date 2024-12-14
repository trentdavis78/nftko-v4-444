import React from 'react';
import { ModeTools } from './ModeTools';
import { ColorTools } from './ColorTools';
import { StrokeWidthButton } from './StrokeWidthButton';
import { Trash2 } from 'lucide-react';
import type { DrawingToolsProps } from '../../types';

export const DrawingTools: React.FC<DrawingToolsProps> = ({
  mode,
  setMode,
  currentColor,
  setCurrentColor,
  strokeWidth,
  setStrokeWidth,
  onDelete,
  canDelete,
  isPickingColor,
  onStartPickingColor
}) => {
  return (
    <div className="flex flex-col gap-4 bg-black/30 p-4 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm">
      <ModeTools mode={mode} setMode={setMode} />

      <StrokeWidthButton
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        currentColor={currentColor}
      />

      <ColorTools
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        isPickingColor={isPickingColor}
        onStartPickingColor={onStartPickingColor}
      />

      <button
        className="p-2 border border-white/20 rounded-lg hover:bg-red-500/20 disabled:opacity-50 transition-colors duration-300"
        onClick={onDelete}
        disabled={!canDelete}
      >
        <Trash2 className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

