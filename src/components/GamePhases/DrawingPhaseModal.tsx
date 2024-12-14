// DrawingPhaseModal.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from '../ui/modal';
import { Badge } from '../ui/badge';
import { PromptInput } from '../SVGEditor/PromptInput';

interface DrawingPhaseModalProps {
  isOpen: boolean;
  onSubmit: (staticPath: string) => Promise<void>;
  onLeave: () => void;
  drawingNumber: number;
  maxDrawings: number;
}

export const DrawingPhaseModal: React.FC<DrawingPhaseModalProps> = ({
  isOpen,
  onSubmit,
  onLeave,
  drawingNumber,
  maxDrawings
}) => {
  const [timeLeft, setTimeLeft] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');

  const loadRandomStaticSVG = useCallback(async () => {
    if (!timerActive || isLoading) return;
    
    setIsLoading(true);
    setTimerActive(false);
    
    try {
      // Generate random number between 2 and 21
      const randomNum = Math.floor(Math.random() * 20) + 2;
      const staticPath = `generated/${randomNum}.svg`;
      console.log('Loading static SVG:', staticPath);
      
      await onSubmit(staticPath);
    } catch (err) {
      console.error('Error loading static SVG:', err);
      setError('Failed to load SVG');
      setTimerActive(true);
    } finally {
      setIsLoading(false);
    }
  }, [timerActive, onSubmit]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setTimerActive(false);
    setError('');

    try {
      // Just load a random static SVG instead of making API call
      const randomNum = Math.floor(Math.random() * 20) + 2;
      const staticPath = `generated/${randomNum}.svg`;
      console.log('Loading static SVG on generate:', staticPath);
      
      await onSubmit(staticPath);
    } catch (err) {
      console.error('Error generating:', err);
      setError('Failed to generate SVG');
      setTimerActive(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen || isLoading || !timerActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          loadRandomStaticSVG();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isLoading, timerActive, loadRandomStaticSVG]);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(4);
      setTimerActive(true);
      setIsLoading(false);
      setPrompt('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onLeave} 
      title={
        <div className="flex justify-between items-center w-full">
          <span>Drawing {drawingNumber} of {maxDrawings}</span>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            {timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
          </span>
        </div>
      }
    >
      <div className="mb-6">
        <p className="text-lg mb-2">
          Enter a prompt for your AI-generated drawing.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 w-full">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            isLoading={isLoading}
            error={error}
            onGenerate={handleGenerate}
          />

          <Badge 
            variant="destructive"
            onClick={onLeave}
            className="max-w-24 w-12 text-[10px] uppercase cursor-pointer"
          >
            Quit
          </Badge>
        </div>
      </div>
    </Modal>
  );
};