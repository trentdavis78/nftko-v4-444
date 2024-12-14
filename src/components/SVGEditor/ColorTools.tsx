import React from 'react';
import type { ColorToolsProps } from '../../types';

export const ColorTools: React.FC<ColorToolsProps> = ({
  currentColor,
  setCurrentColor,
  isPickingColor,
  onStartPickingColor
}) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="color"
        value={currentColor}
        onChange={(e) => setCurrentColor(e.target.value)}
        className="w-12 h-10 p-1 border rounded"
      />
      
      <button
        className={`p-2 border rounded hover:bg-gray-100 ${isPickingColor ? 'bg-blue-100' : ''}`}
        onClick={onStartPickingColor}
        title="Pick color from canvas"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M21.03 2.97a3.58 3.58 0 00-5.06 0L14 4.94l-.013-.013a1.75 1.75 0 00-2.475 0l-.585.586a1.75 1.75 0 000 2.475l.012.012-6.78 6.78a2.25 2.25 0 00-.659 1.592v.687l-1.28 2.347c-.836 1.533.841 3.21 2.374 2.375l2.347-1.28h.688a2.25 2.25 0 001.59-.66L16 13.061l.012.012a1.75 1.75 0 002.475 0l.586-.585a1.75 1.75 0 000-2.475L19.061 10l1.97-1.97a3.58 3.58 0 000-5.06M12 9.061l2.94 2.94-6.78 6.78a.75.75 0 01-.531.22H6.75a.75.75 0 00-.359.09l-2.515 1.373a.23.23 0 01-.159.032.26.26 0 01-.138-.075.26.26 0 01-.075-.138.23.23 0 01.033-.158l1.372-2.515A.75.75 0 005 17.25v-.878a.75.75 0 01.22-.53z"
          />
        </svg>
      </button>
    </div>
  );
};