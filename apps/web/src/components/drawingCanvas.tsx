'use client';

import React, { useRef } from 'react';
import { useP5 } from '../hooks/useP5';
import p5 from 'p5';
import { TileConnectionGame } from '../utils/TileConnectionGame'; // Import your TileConnectionGame class
import { useMemo } from 'react';

interface DrawingCanvasProps {
  commands: (TileCommands | ControlCommands)[];
  controlCommand: ControlCommands;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ commands, controlCommand }) => {
  const divRef = useRef<HTMLDivElement>(null);

  // Memoize commands and controlCommand
  const memoizedCommands = useMemo(() => commands, [commands]);
  const memoizedControlCommand = useMemo(() => controlCommand, [controlCommand]);

  const sketch = (p: p5) => {
    const tileConnectionGame = new TileConnectionGame(p, memoizedCommands);

    p.setup = () => {
      p.createCanvas(divRef.current?.clientWidth || 910, divRef.current?.clientHeight || 380);
    };

    p.draw = () => {
      p.clear();
      tileConnectionGame.update(memoizedControlCommand.type === 'start');
      tileConnectionGame.display();
    };

    p.windowResized = () => {
      p.resizeCanvas(divRef.current?.clientWidth || 500, divRef.current?.clientHeight || 200);
    };
  };

  const canvasRef = useP5(sketch);

  return (
    <div ref={divRef} className='w-full h-full rounded-xl border-2'>
      <div ref={canvasRef}></div>
    </div>
  );
};

export default DrawingCanvas;
