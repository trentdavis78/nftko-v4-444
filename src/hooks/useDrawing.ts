import { useState, useRef, RefObject } from 'react';
import type { Path, Point } from '../types';
import { getSmoothPath } from '../utils/pathUtils';

export const useDrawing = (
  svgRef: RefObject<SVGSVGElement>,
  currentColor: string,
  strokeWidth: number
) => {
  const [currentPath, setCurrentPath] = useState<Path | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const pathsRef = useRef<Path[]>([]);

  const getMousePosition = (event: React.MouseEvent): Point => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    
    const CTM = svg.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };

    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const transformedPoint = point.matrixTransform(CTM.inverse());

    return {
      x: transformedPoint.x,
      y: transformedPoint.y
    };
  };

  const handleDrawStart = (event: React.MouseEvent) => {
    const point = getMousePosition(event);
    setPoints([point]);
    const newPath: Path = {
      id: Date.now().toString(),
      d: `M ${point.x} ${point.y}`,
      stroke: currentColor,
      strokeWidth,
      fill: 'none',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    };
    setCurrentPath(newPath);
    setIsDrawing(true);
  };

  const handleDrawMove = (event: React.MouseEvent) => {
    if (!isDrawing || !currentPath) return;

    const point = getMousePosition(event);
    const newPoints = [...points, point];
    setPoints(newPoints);

    if (newPoints.length > 2) {
      const smoothPath = getSmoothPath(newPoints);
      setCurrentPath(prev => prev ? {
        ...prev,
        d: smoothPath
      } : null);
    } else {
      setCurrentPath(prev => prev ? {
        ...prev,
        d: `${prev.d} L ${point.x} ${point.y}`
      } : null);
    }
  };

  const handleDrawEnd = () => {
    if (currentPath) {
      pathsRef.current = [...pathsRef.current, currentPath];
    }
    setCurrentPath(null);
    setIsDrawing(false);
    setPoints([]);
  };

  return {
    currentPath,
    isDrawing,
    paths: pathsRef.current,
    handleDrawStart,
    handleDrawMove,
    handleDrawEnd
  };
};