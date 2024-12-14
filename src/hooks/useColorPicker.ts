import { useState, useRef, RefObject } from 'react';
import { createSVGCanvas } from '../utils/svgUtils';

export const useColorPicker = (
  svgRef: RefObject<SVGSVGElement>,
  setCurrentColor: (color: string) => void
) => {
  const [isPickingColor, setIsPickingColor] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startPickingColor = () => {
    if (!svgRef.current) return;
    
    // Create canvas when starting to pick color
    canvasRef.current = createSVGCanvas(svgRef.current);
    setIsPickingColor(true);
  };

  const handleColorPick = async (event: React.MouseEvent) => {
    if (!isPickingColor || !svgRef.current || !canvasRef.current) return;

    const svg = svgRef.current;
    const canvas = canvasRef.current;
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Wait a brief moment to ensure the canvas is ready
    await new Promise(resolve => setTimeout(resolve, 50));

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const color = `#${[pixel[0], pixel[1], pixel[2]]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('')}`;

    setCurrentColor(color);
    setIsPickingColor(false);
    canvasRef.current = null; // Clear canvas reference
  };

  return {
    isPickingColor,
    startPickingColor,
    handleColorPick
  };
};