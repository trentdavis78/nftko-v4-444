import { useState, useCallback } from 'react';
import type { Path } from '../types';
const HOST = "http://localhost:5000";
export const useSVGGeneration = (
  onGenerated: (svgData: any) => Promise<void>,
  onSuccess?: (paths: Path[]) => void
) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // First generate the SVG
      const response = await fetch(`${HOST}/api/generate-svg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: prompt.trim() })
      });

      const data = await response.json();
      console.log('API Response:', data);
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate SVG');
      }

      // Call the provided callback with the generated data
      await onGenerated(data);

    } catch (err) {
      console.error('Error generating SVG:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate SVG';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, onGenerated]);

  return {
    prompt,
    setPrompt,
    isLoading,
    error,
    handleGenerate
  };
};