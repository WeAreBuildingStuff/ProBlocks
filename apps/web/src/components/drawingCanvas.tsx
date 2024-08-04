'use client';

import React, { useRef, useMemo } from 'react';
import { useP5 } from '../hooks/useP5';
import p5 from 'p5';
import { CarAnimation } from '../utils/CarGame';
import { TileConnectionGame } from '../utils/TileConnectionGame';
import { DrawingBotGame } from '../utils/DrawingBotGame';

type GameType = 'car' | 'tile' | 'bot';

interface DrawingCanvasProps<T extends GameType> {
  gameType: T;
  commands: GameCommands[T];
  controlCommand: ControlCommands;
}

function createGame(p: p5, gameType: GameType, commands: GameCommands[GameType]) {
  switch (gameType) {
    case 'car':
      return new CarAnimation(p, commands as CarCommands[]);
    case 'tile':
      return new TileConnectionGame(p, commands as TileCommands[]);
    case 'bot':
      return new DrawingBotGame(p, commands as DrawingBotCommands[]);
  }
}

const DrawingCanvas = <T extends GameType>({
  gameType,
  commands,
  controlCommand
}: DrawingCanvasProps<T>) => {
  const divRef = useRef<HTMLDivElement>(null);

  const memoizedCommands = useMemo(() => commands, [commands]);
  const memoizedControlCommand = useMemo(() => controlCommand, [controlCommand]);

  const sketch = (p: p5) => {
    let game: ReturnType<typeof createGame>;

    p.setup = () => {
      p.createCanvas(divRef.current?.clientWidth || 910, divRef.current?.clientHeight || 380);
      p.background(255);
      game = createGame(p, gameType, memoizedCommands);
    };

    p.draw = () => {
      p.clear();
      if (memoizedControlCommand.type === 'start') {
        game.update();
      } else if (memoizedControlCommand.type === 'reset') {
        game.resetAnimation();
      }

      game.display();
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
