import React from 'react';
import type { ModeToolsProps } from '../../types';

export const ModeTools: React.FC<ModeToolsProps> = ({ mode, setMode }) => {
  return (
    <div className="flex flex-col gap-2">
      <button
        className={`p-2 border rounded ${mode === 'draw' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
        onClick={() => setMode('draw')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M18.5 1.15c-.53 0-1.04.19-1.43.58l-5.81 5.82 5.65 5.65 5.82-5.81c.77-.78.77-2.04 0-2.83l-2.84-2.83c-.39-.39-.89-.58-1.39-.58M10.3 8.5l-5.96 5.96c-.78.78-.78 2.04.02 2.85C3.14 18.54 1.9 19.77.67 21h5.66l.86-.86c.78.76 2.03.75 2.81-.02l5.95-5.96"
          />
        </svg>
      </button>
      <button
        className={`p-2 border rounded ${mode === 'select' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
        onClick={() => setMode('select')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 512 512" >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M62.226 62.127l364.44 103.206-88.062 86.711 92.648 92.642-86.547 86.549-92.618-92.642-86.754 88.074z"
          />
        </svg>
      </button>
    </div>
  );
};