'use client';

import React, { useRef } from 'react';
import { useP5 } from '../hooks/useP5';
import { CarAnimation } from '../utils/carAnimation';
import p5 from 'p5';

interface DrawingCanvasProps {
  commands: Command[];
  isButtonPressed: boolean;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ commands, isButtonPressed }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const sketch = (p: p5) => {
    const carAnimation = new CarAnimation(p, commands);

    p.setup = () => {
      p.createCanvas(divRef.current?.clientWidth || 910, divRef.current?.clientHeight || 380);
    };

    p.draw = () => {
      p.clear();
      carAnimation.update(isButtonPressed);
      carAnimation.display();
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
