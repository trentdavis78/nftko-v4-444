import React from 'react';
import type { StrokeWidthButtonProps } from '../../types';
export const StrokeWidthButton: React.FC<StrokeWidthButtonProps> = ({
  strokeWidth,
  setStrokeWidth,
  currentColor
}) => {
  const handleStrokeWidthClick = () => {
    const nextWidth = strokeWidth === 12 ? 30 : strokeWidth === 30 ? 60 : 12;
    setStrokeWidth(nextWidth);
  };

  return (
    <button
      className="relative p-2 border rounded min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-gray-100"
      onClick={handleStrokeWidthClick}
    >
      <div
        className="absolute rounded-full transition-all duration-200"
        style={{
          width: `${strokeWidth/2}px`,
          height: `${strokeWidth/2}px`,
          maxWidth: '40px',
          maxHeight: '40px',
          backgroundColor: currentColor
        }}
      />
    </button>
  );
};