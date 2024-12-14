import React from 'react';
import { Loader } from 'lucide-react';
import {Textarea} from '../ui/textarea'; // Replace with the correct path to your Textarea component

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
  error: string;
  onGenerate: () => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  isLoading,
  error,
  onGenerate
}) => {
  return (
    <div className="mb-8 w-full">
      <div className="flex flex-col gap-4 items-start">
        
          <Textarea
            className="w-full bg-black/30 text-md mx-auto p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your prompt to generate an SVG..."
            rows={8}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
       
        <button
          className={`px-6 py-3 rounded-lg bg-blue-500 text-white w-full font-medium hover:bg-blue-600 disabled:opacity-50
            disabled:cursor-not-allowed flex items-center gap-2 ${
            isLoading ? 'cursor-not-allowed' : ''
          }`}
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate SVG'
          )}
        </button>
      </div>
    </div>
  );
};