/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@repo/ui/src/components/button';
import {
  ZoomInIcon,
  ZoomOutIcon,
  SettingsIcon,
  RecordIcon,
  CircleStopIcon,
  PlayIcon
} from '../../../../components/sub-components/Icons';
import {
  getCarCommands,
  getTileCommands,
  getDrawBotCommands
} from '../../../../utils/getGeminiResponse';
import parseCarCommands from '../../../../utils/parseCarCommands';
import parseTileCommands from '../../../../utils/parseTileCommands';
import parseDrawingBotCommands from '../../../../utils/parseDrawingBotCommands';

type GameType = 'car' | 'tile' | 'bot';

const DynamicDrawingCanvas = dynamic(() => import('../../../../components/drawingCanvas'), {
  ssr: false
});

// Mock commands for TODO
const mockCarCommands: CarCommands[] = [
  { type: 'forward', distance: 100 },
  { type: 'turnClockwise', degrees: 90 },
  { type: 'forward', distance: 50 },
  { type: 'turnCounterClockwise', degrees: 45 },
  { type: 'backward', distance: 20 }
];

const mockTileCommands: TileCommands[] = [
  { type: 'connect', start: 'A1', end: 'B1' },
  { type: 'connect', start: 'B1', end: 'C1' },
  { type: 'connect', start: 'C1', end: 'C2' },
  { type: 'connect', start: 'C2', end: 'D2' }
];

const mockDrawingBotCommands: DrawingBotCommands[] = [
  { type: 'forward', distance: 100 },
  { type: 'penDown' },
  { type: 'turnClockwise', degrees: 90 },
  { type: 'forward', distance: 50 },
  { type: 'turnCounterClockwise', degrees: 45 },
  { type: 'backward', distance: 20 },
  { type: 'forward', distance: 100 },
  { type: 'penUp' },
  { type: 'turnClockwise', degrees: 90 },
  { type: 'forward', distance: 50 },
  { type: 'turnCounterClockwise', degrees: 45 },
  { type: 'backward', distance: 20 }
];

export default function Component() {
  const [gameType, setGameType] = useState<GameType>('car');
  const [commands, setCommands] = useState<CarCommands[] | TileCommands[] | DrawingBotCommands[]>(
    []
  );
  const [controlCommand, setControlCommand] = useState<ControlCommands>({ type: 'stop' });
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const speechRecognition = new (window as any).webkitSpeechRecognition() as SpeechRecognition;
      speechRecognition.continuous = true;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'en-US';

      speechRecognition.onstart = () => {
        setIsListening(true);
      };

      speechRecognition.onend = () => {
        setIsListening(false);
      };

      speechRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event);
        setIsListening(false);
      };

      speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
        const result = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        console.log('You said: ', result);
        setTranscript(result);
      };

      recognitionRef.current = speechRecognition;
    } else {
      console.warn('Web Speech API is not supported in this browser.');
    }
  }, []);

  const toggleListening = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        generateCommands();
      } else {
        recognitionRef.current.start();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  async function generateCommands() {
    let rawCommands: string;
    let parsedCommands: CarCommands[] | TileCommands[] | DrawingBotCommands[];

    switch (gameType) {
      case 'car':
        rawCommands = await getCarCommands(transcript);
        parsedCommands = parseCarCommands(rawCommands);
        setCommands(parsedCommands);
        console.log(parsedCommands);
        break;
      case 'tile':
        rawCommands = await getTileCommands(transcript);
        parsedCommands = parseTileCommands(rawCommands);
        setCommands(parsedCommands);
        console.log(parsedCommands);
        break;
      case 'bot':
        rawCommands = await getDrawBotCommands(transcript);
        parsedCommands = parseDrawingBotCommands(rawCommands);
        setCommands(parsedCommands);
        console.log(parsedCommands);
        break;
      default:
        throw new Error(`Unsupported game type: ${gameType}`);
    }
  }

  const handlePlay = () => {
    setControlCommand({ type: 'start' });
  };

  const handleReset = () => {
    setControlCommand({ type: 'reset' });
  };

  // Determine TODO commands based on game type
  const todoCommands = () => {
    switch (gameType) {
      case 'car':
        return mockCarCommands;
      case 'tile':
        return mockTileCommands;
      case 'bot':
        return mockDrawingBotCommands;
      default:
        return [];
    }
  };

  return (
    <div className='flex h-screen w-full'>
      <div className='flex flex-col bg-background text-foreground border-r border-muted p-4 gap-4 max-w-[300px] w-full'>
        {/* Sidebar content */}
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Coding Playground</h2>
          <Button variant='ghost' size='icon'>
            <SettingsIcon className='w-5 h-5' />
            <span className='sr-only'>Settings</span>
          </Button>
        </div>
        <div className='flex flex-col space-y-4 overflow-auto hide-scrollbar'>
          {/* Game type selection */}
          <div className='bg-gray-100 rounded-md p-4'>
            <h3 className='text-lg font-medium mb-2'>Game Type</h3>
            <select
              value={gameType}
              onChange={(e) => setGameType(e.target.value as GameType)}
              className='w-full p-2 border rounded'
            >
              <option value='car'>Car Game</option>
              <option value='tile'>Tile Connection Game</option>
              <option value='bot'>Drawing Bot Game</option>
            </select>
          </div>
          {/* Command list */}
          {/* <div className='bg-gray-100 rounded-md p-4 flex-1'>
            <h3 className='text-lg font-medium mb-2'>Commands</h3>
            <div className='space-y-2'>
              {commands.map((command, index) => (
                <div key={index} className='bg-white border border-gray-300 rounded-md p-2'>
                  {`${command.type} ${
                    'distance' in command ? command.distance : 
                    'degrees' in command ? command.degrees :
                    'startX' in command ? `from (${command.startX},${command.startY}) to (${command.endX},${command.endY})` :
                    'centerX' in command ? `center (${command.centerX}, ${command.centerY}), radius ${command.radius}` :
                    ''
                  }`}
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
      <div className='flex-1 bg-muted/40 flex flex-col'>
        <div className='bg-background border-b border-muted p-4'>
          <div className='flex items-center justify-between'>
            <div className='space-x-2'>
              <Button variant='ghost' onClick={handlePlay}>
                <PlayIcon className='w-5 h-5' />
                <span className='sr-only'>Run</span>
              </Button>
              <Button variant='ghost' onClick={handleReset}>
                <CircleStopIcon className='w-5 h-5' />
                <span className='sr-only'>Stop</span>
              </Button>
              <Button
                variant='ghost'
                onClick={toggleListening}
                className={isListening ? 'text-red-500 gap-2' : 'gap-2'}
              >
                <RecordIcon className='w-5 h-5' />
                <span className=''>Record</span>
              </Button>
            </div>
            <div className='space-x-2'>
              <Button variant='ghost'>
                <ZoomInIcon className='w-5 h-5' />
                <span className='sr-only'>Zoom In</span>
              </Button>
              <Button variant='ghost'>
                <ZoomOutIcon className='w-5 h-5' />
                <span className='sr-only'>Zoom Out</span>
              </Button>
            </div>
          </div>
        </div>
        <div className='flex-1 p-4'>
          <div className='h-full w-full bg-background rounded-xl shadow-xl'>
            <DynamicDrawingCanvas
              gameType={gameType}
              commands={commands}
              controlCommand={controlCommand}
              todoCommands={todoCommands()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
