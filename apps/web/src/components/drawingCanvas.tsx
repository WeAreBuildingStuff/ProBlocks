'use client';

import React, { useRef } from 'react';
import { useP5 } from '../hooks/useP5';
import p5 from 'p5';
import { BotDrawingGame } from '../utils/DrawingBotGame';
import { useMemo } from 'react';

interface DrawingCanvasProps {
  commands: DrawingBotCommands[];
  controlCommand: ControlCommands;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ commands, controlCommand }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const memoizedCommands = useMemo(() => commands, [commands]);
  const memoizedControlCommand = useMemo(() => controlCommand, [controlCommand]);

  const sketch = (p: p5) => {
    const botDrawingGame = new BotDrawingGame(p, memoizedCommands);

    p.setup = () => {
      p.createCanvas(divRef.current?.clientWidth || 910, divRef.current?.clientHeight || 380);
      p.background(255);
    };

    p.draw = () => {
      if (memoizedControlCommand.type === 'start') {
        botDrawingGame.update();
      } else if (memoizedControlCommand.type === 'reset') {
        botDrawingGame.resetAnimation();
      }

      botDrawingGame.display();
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
