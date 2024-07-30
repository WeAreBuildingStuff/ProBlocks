import { useRef, useEffect } from 'react';
import p5 from 'p5';

export const useP5 = (sketch: (p: p5) => void) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const p5Instance = new p5(sketch, canvasRef.current);

    return () => {
      p5Instance.remove();
    };
  }, [sketch]);

  return canvasRef;
};
