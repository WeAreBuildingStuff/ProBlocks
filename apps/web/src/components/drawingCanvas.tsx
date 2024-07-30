'use client';

import React from 'react';
import { useP5 } from '../hooks/useP5';
import { CarAnimation } from '../utils/carAnimation';
import p5 from 'p5';

export type Command ='forward' | 'backward' | 'turnLeft' | 'turnRight';

interface DrawingCanvasProps {
  commands: Command[];
  isButtonPressed: boolean;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ commands, isButtonPressed }) => {
  const sketch = (p: p5) => {
    const carAnimation = new CarAnimation(p, commands);

    p.setup = () => {
      p.createCanvas(910, 380);
    };

    p.draw = () => {
      p.background(200);
      carAnimation.update(isButtonPressed);
      carAnimation.display();
    };

    p.windowResized = () => {
      p.resizeCanvas(500, 200);
    };
  };

  const canvasRef = useP5(sketch);

  return <div className='w-[300px] h-[200px] bg-white rounded-xl border-2' ref={canvasRef}></div>;
};

export default DrawingCanvas;
