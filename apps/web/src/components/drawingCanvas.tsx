'use client';

import React from 'react';
import { useP5 } from '../hooks/useP5';
import { CarAnimation } from '../utils/carAnimation';
import p5 from 'p5';

type Command = 'forward' | 'backward' | 'turnLeft' | 'turnRight';

interface DrawingCanvasProps {
  commands: Command[];
  isButtonPressed: boolean;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ commands, isButtonPressed }) => {
  const sketch = (p: p5) => {
    const carAnimation = new CarAnimation(p, commands);

    p.setup = () => {
      p.createCanvas(p.windowWidth * 0.66, p.windowHeight);
    };

    p.draw = () => {
      p.background(200);
      carAnimation.update(isButtonPressed);
      carAnimation.display();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth * 0.66, p.windowHeight);
    };
  };

  const canvasRef = useP5(sketch);

  return (
    <div className="w-2/3 h-full gap-4 bg-white rounded-xl border-2" ref={canvasRef}></div>
  );
}

export default DrawingCanvas;