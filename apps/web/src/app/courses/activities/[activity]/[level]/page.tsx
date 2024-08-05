/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@repo/ui/src/components/button';
import DrawingCanvas from '../../../../../components/drawingCanvas';
import {
  ZoomInIcon,
  ZoomOutIcon,
  RecordIcon,
  CircleStopIcon,
  PlayIcon
} from '../../../../../components/sub-components/Icons';
import {
  getCarCommands,
  getTileCommands,
  getDrawBotCommands
} from '../../../../../utils/getGeminiResponse';
import parseCarCommands from '../../../../../utils/parseCarCommands';
import parseTileCommands from '../../../../../utils/parseTileCommands';
import parseDrawingBotCommands from '../../../../../utils/parseDrawingBotCommands';
import carGameLevels from '../../../../../constants/activties/carLevels';
import tileGameLevels from '../../../../../constants/activties/tileConnectionLevels';
import drawBotGameLevels from '../../../../../constants/activties/drawBotLevels';

type GameType = 'car' | 'tile' | 'bot';

interface ActivityProps {
  params: {
    level: string;
    activity: string;
  };
}

export default function Activity({ params }: ActivityProps) {
  // Determine initial game type based on activity parameter
  const gameType: GameType = params.activity.startsWith('car')
    ? 'car'
    : params.activity.startsWith('tile')
      ? 'tile'
      : 'bot';

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

  const todoCommands = () => {
    const level = parseInt(params.level, 10);
    switch (gameType) {
      case 'car':
        return carGameLevels[level];
      case 'tile':
        return tileGameLevels[level];
      case 'bot':
        return drawBotGameLevels[level];
      default:
        return [];
    }
  };

  return (
    <div className='flex h-screen w-full'>
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
              todoCommands={todoCommands()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
