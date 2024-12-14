// SVGEditor.tsx
import React, { useState, useRef, useCallback } from 'react';
import { DrawingTools } from './DrawingTools';
import { DrawingPhaseModal } from '../GamePhases/DrawingPhaseModal';
import { useDrawing } from './hooks';
import { useColorPicker } from './hooks';

import type { Path } from '../../types';

interface SVGEditorProps {
  onSubmit: (svgContent: string) => void;
  drawingsLeft: number;
  maxDrawings: number;
}

const SVGEditor: React.FC<SVGEditorProps> = ({ onSubmit, drawingsLeft, maxDrawings }) => {
  const [paths, setPaths] = useState<Path[]>([]);
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [strokeWidth, setStrokeWidth] = useState(12);
  const [mode, setMode] = useState<'draw' | 'select'>('draw');
  const [selectedElement, setSelectedElement] = useState<Path | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currentDrawing, setCurrentDrawing] = useState(1);
  
  const svgRef = useRef<SVGSVGElement>(null);

  const {
    currentPath,
    isDrawing,
    handleDrawStart,
    handleDrawMove,
    handleDrawEnd
  } = useDrawing(svgRef, currentColor, strokeWidth);

  const {
    isPickingColor,
    startPickingColor,
    handleColorPick
  } = useColorPicker(svgRef, setCurrentColor);

  const handleDelete = () => {
    if (selectedElement) {
      setPaths(paths.filter(path => path.id !== selectedElement.id));
      setSelectedElement(null);
    }
  };

  const handleDrawingEnd = () => {
    if (currentPath) {
      setPaths(prev => [...prev, currentPath]);
    }
    handleDrawEnd();
  };

  const handleSubmit = () => {
    if (paths.length === 0) return;
    
    const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    tempSvg.setAttribute('viewBox', '0 0 2048 2048');
    
    paths.forEach(path => {
      const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      Object.entries(path).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'type' && key !== 'isImported') {
          pathElement.setAttribute(key, value.toString());
        }
      });
      tempSvg.appendChild(pathElement);
    });
    
    onSubmit(tempSvg.outerHTML);
    setPaths([]);
    setCurrentDrawing(prev => prev + 1);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const convertToPath = (element: SVGElement): string => {
    const tagName = element.tagName.toLowerCase();
    let pathData = '';

    switch (tagName) {
      case 'path':
        return element.getAttribute('d') || '';
      case 'circle': {
        const cx = parseFloat(element.getAttribute('cx') || '0');
        const cy = parseFloat(element.getAttribute('cy') || '0');
        const r = parseFloat(element.getAttribute('r') || '0');
        return `M ${cx-r},${cy} A ${r},${r} 0 1,0 ${cx+r},${cy} A ${r},${r} 0 1,0 ${cx-r},${cy}`;
      }
      case 'rect': {
        const x = parseFloat(element.getAttribute('x') || '0');
        const y = parseFloat(element.getAttribute('y') || '0');
        const width = parseFloat(element.getAttribute('width') || '0');
        const height = parseFloat(element.getAttribute('height') || '0');
        return `M ${x},${y} h ${width} v ${height} h ${-width} Z`;
      }
      case 'polygon': {
        const points = element.getAttribute('points') || '';
        const pointsArray = points.trim().split(/\s+/);
        if (pointsArray.length < 2) return '';
        return 'M ' + pointsArray[0] + ' ' + pointsArray.slice(1).join(' L ') + ' Z';
      }
      case 'polyline': {
        const points = element.getAttribute('points') || '';
        const pointsArray = points.trim().split(/\s+/);
        if (pointsArray.length < 2) return '';
        return 'M ' + pointsArray[0] + ' ' + pointsArray.slice(1).join(' L ');
      }
      case 'line': {
        const x1 = element.getAttribute('x1') || '0';
        const y1 = element.getAttribute('y1') || '0';
        const x2 = element.getAttribute('x2') || '0';
        const y2 = element.getAttribute('y2') || '0';
        return `M ${x1},${y1} L ${x2},${y2}`;
      }
      case 'ellipse': {
        const cx = parseFloat(element.getAttribute('cx') || '0');
        const cy = parseFloat(element.getAttribute('cy') || '0');
        const rx = parseFloat(element.getAttribute('rx') || '0');
        const ry = parseFloat(element.getAttribute('ry') || '0');
        return `M ${cx-rx},${cy} A ${rx},${ry} 0 1,0 ${cx+rx},${cy} A ${rx},${ry} 0 1,0 ${cx-rx},${cy}`;
      }
      default:
        return '';
    }
  };

  const handlePromptSubmit = async (staticPath: string) => {
    try {
      console.log('Loading static SVG:', staticPath);
      
      // Fetch the static SVG file
      const svgResponse = await fetch(`/${staticPath}`);
      const svgText = await svgResponse.text();
      console.log('SVG Content:', svgText);
      
      // Parse SVG and extract paths
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      
      // Clear existing paths
      setPaths([]);
      
      // Get all SVG elements that we can convert to paths
      const elements = svgDoc.querySelectorAll('path, circle, rect, polygon, polyline, line, ellipse');
      console.log('Found elements:', elements.length);
      
      const newPaths = Array.from(elements).map((element: SVGElement) => {
        const pathData = convertToPath(element);
        
        // Get computed styles
        const computedStyle = window.getComputedStyle(element);
        
        const path: Path = {
          id: `generated-${Date.now()}-${Math.random()}`,
          d: pathData,
          stroke: element.getAttribute('stroke') || 
                 element.getAttribute('style')?.match(/stroke:\s*([^;]+)/)?.[1] || 
                 computedStyle.stroke || 
                 '#000000',
          strokeWidth: parseFloat(element.getAttribute('stroke-width') || 
                               element.getAttribute('style')?.match(/stroke-width:\s*([^;]+)/)?.[1] || 
                               computedStyle.strokeWidth || 
                               '1'),
          fill: element.getAttribute('fill') || 
                element.getAttribute('style')?.match(/fill:\s*([^;]+)/)?.[1] || 
                computedStyle.fill || 
                'none',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          type: 'imported',
          isImported: true
        };
  
        console.log('Created path:', path);
        return path;
      }).filter(path => path.d && path.d.length > 0);
  
      console.log('New paths to add:', newPaths.length);
      
      // Add the new paths
      setPaths(newPaths);
      
      // Close the modal AFTER we've successfully processed the SVG
      setIsModalOpen(false);
  
    } catch (error) {
      console.error('Error loading static SVG:', error);
    }
  };

  return (
    <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="flex flex-col gap-6 p-8 mx-auto max-w-7xl">
        <DrawingPhaseModal
          isOpen={isModalOpen}
          onSubmit={handlePromptSubmit}
          onLeave={handleModalClose}
          drawingNumber={currentDrawing}
          maxDrawings={maxDrawings}
        />

        <div className="flex gap-6">
          <DrawingTools
            mode={mode}
            setMode={setMode}
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            strokeWidth={strokeWidth}
            setStrokeWidth={setStrokeWidth}
            onDelete={handleDelete}
            canDelete={!!selectedElement}
            isPickingColor={isPickingColor}
            onStartPickingColor={startPickingColor}
          />

          <div className="flex flex-col gap-4">
            <svg
              ref={svgRef}
              className={`w-[800px] h-[800px] border border-white/20 rounded-xl bg-black/30 ${
                isPickingColor ? 'cursor-crosshair' : ''
              }`}
              viewBox="0 0 2048 2048"
              onMouseDown={isPickingColor ? handleColorPick : mode === 'draw' ? handleDrawStart : undefined}
              onMouseMove={mode === 'draw' && !isPickingColor ? handleDrawMove : undefined}
              onMouseUp={mode === 'draw' && !isPickingColor ? handleDrawingEnd : undefined}
              onMouseLeave={mode === 'draw' && !isPickingColor ? handleDrawingEnd : undefined}
            >
              {paths.map(path => (
                <path
                  key={path.id}
                  {...path}
                  className={mode === 'select' ? 'cursor-pointer' : ''}
                  onClick={() => mode === 'select' && setSelectedElement(path)}
                  style={{
                    outline: selectedElement?.id === path.id ? '2px solid #8b5cf6' : 'none'
                  }}
                />
              ))}
              {currentPath && <path {...currentPath} />}
            </svg>

            <button
              onClick={handleSubmit}
              disabled={paths.length === 0 || drawingsLeft === 0}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Drawing  
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SVGEditor;