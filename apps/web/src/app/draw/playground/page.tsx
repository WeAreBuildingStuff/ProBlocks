/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/oDkH1rcy0Ti
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@repo/ui/src/components/button';
import DrawingCanvas from '../../../components/drawingCanvas';
import {
  ZoomInIcon,
  ZoomOutIcon,
  SettingsIcon,
  RecordIcon,
  CircleStopIcon,
  PlayIcon
} from '../../../components/sub-components/Icons';
import {
  getCarCommands,
  getTileCommands,
  getDrawBotCommands
} from '../../../utils/getGeminiResponse';
import parseCarCommands from '../../../utils/parseCarCommands';
import parseTileCommands from '../../../utils/parseTileCommands';
import parseDrawingBotCommands from '../../../utils/parseDrawingBotCommands';

type GameType = 'car' | 'tile' | 'bot';

export default function Component() {
  const [gameType, setGameType] = useState<GameType>('car');
  const [commands, setCommands] = useState<CarCommands[] | TileCommands[] | DrawingBotCommands[]>(
    []
  );
  const [controlCommand, setControlCommand] = useState<ControlCommands>({ type: 'stop' });
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');

  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current = new (window as any).webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      const newTranscript = event.results[event.results.length - 1][0].transcript
        .trim()
        .toLowerCase()
        .replace(/[.]/g, '');
      console.log('New transcript:', newTranscript);
      setTranscript(newTranscript);
    };

    recognitionRef.current.start();
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      generateCommands();
    }
  };

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

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handlePlay = () => {
    setControlCommand({ type: 'start' });
  };

  const handleReset = () => {
    setControlCommand({ type: 'reset' });
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
          {/* Command buttons */}
          {/* <div className='bg-gray-100 rounded-md p-4'>
            <h3 className='text-lg font-medium mb-2'>Commands</h3>
            <div className='grid grid-cols-2 gap-2'>
              {commandOptions.map((command) => (
                <CommandButton
                  key={command}
                  label={command}
                  onClick={() => {
                    const value = prompt(
                      `Enter value for ${command} (distance for forward/backward, degrees for turn)`
                    );
                    if (value) {
                      const param = parseInt(value, 10);
                      if (!isNaN(param)) {
                        switch (command) {
                          case 'forward':
                          case 'backward':
                            addCommand({ type: command, distance: param });
                            break;
                          case 'turnClockwise':
                          case 'turnCounterClockwise':
                            addCommand({ type: command, degrees: param });
                            break;
                        }
                      }
                    }
                  }}
                />
              ))}
            </div>
          </div> */}
          {/* Command list */}
          {/* <div className='bg-gray-100 rounded-md p-4 flex-1'>
            <h3 className='text-lg font-medium mb-2'>Code</h3>
            <div className='space-y-2'>
              {commands.map((command, index) => (
                <div key={index} className='bg-white border border-gray-300 rounded-md p-2'>
                  {`${command.type} ${
                    'distance' in command ? command.distance : command.degrees
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
                onClick={handleToggleRecording}
                className={isRecording ? 'text-red-500 gap-2' : 'gap-2'}
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
            <DrawingCanvas<GameType>
              gameType={gameType}
              commands={commands}
              controlCommand={controlCommand}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
