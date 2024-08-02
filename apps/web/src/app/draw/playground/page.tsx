/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/oDkH1rcy0Ti
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';
import { Button } from '@repo/ui/src/components/button';
import React, { useEffect, useRef, useState } from 'react';
import DrawingCanvas from '../../../components/drawingCanvas';
import {
  ZoomInIcon,
  ZoomOutIcon,
  SettingsIcon,
  RecordIcon,
  CircleStopIcon,
  PlayIcon
} from '../../../components/sub-components/Icons';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

// Individual Command Button Component
interface CommandButtonProps {
  label: Command['type'];
  onClick: () => void;
}

const CommandButton: React.FC<CommandButtonProps> = ({ label, onClick }) => (
  <button className='border border-gray-300 rounded-md p-2' onClick={onClick}>
    {label}
  </button>
);

export default function Component() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [controlCommand, setControlCommand] = useState<ControlCommands>({ type: 'stop' });
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [textCommands, setTextCommands] = useState<Command[]>([]);
  const processedTranscripts = useRef<Set<string>>(new Set());
  // Command options available
  const commandOptions: Command['type'][] = ['forward', 'backward', 'turnLeft', 'turnRight'];

  const addCommand = (command: Command) => {
    setCommands([...commands, command]);
  };

  // Handle removing command from the list
  // const removeCommand = (index: number) => {
  //   setCommands(commands.filter((_, i) => i !== index));
  // };

  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
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
      // setRecordingComplete(true);
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  useEffect(() => {
    if (transcript && !processedTranscripts.current.has(transcript)) {
      processedTranscripts.current.add(transcript);
      const words = transcript.split(' ');
      const validCommands: Command['type'][] = ['forward', 'backward', 'turnLeft', 'turnRight'];
      const commands: Command[] = words
        .map((word) => {
          const [command, value] = word.split('-');
          if (validCommands.includes(command as Command['type'])) {
            const param = parseInt(value, 10);
            if (!isNaN(param)) {
              switch (command) {
                case 'forward':
                case 'backward':
                  return { type: command, distance: param };
                case 'turnLeft':
                case 'turnRight':
                  return { type: command, degrees: param };
              }
            }
          }
          return null;
        })
        .filter(Boolean) as Command[];

      if (commands.length > 0) {
        setTextCommands((prevCommands) => [...prevCommands, ...commands]);
        console.log('Commands added:', commands);
      }
    }
  }, [transcript]);

  console.log('Transcript:', transcript);
  console.log('Text Commands:', textCommands);

  const handlePlay = () => {
    setControlCommand({ type: 'start' });
  };

  const handleReset = () => {
    setControlCommand({ type: 'reset' });
  };

  return (
    <div className='flex h-screen w-full'>
      <div className='flex flex-col bg-background text-foreground border-r border-muted p-4 gap-4 max-w-[300px] w-full'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Coding Playground</h2>
          <Button variant='ghost' size='icon'>
            <SettingsIcon className='w-5 h-5' />
            <span className='sr-only'>Settings</span>
          </Button>
        </div>
        <div className='flex flex-col space-y-4 overflow-auto hide-scrollbar'>
          <div className='flex-1 space-y-4'>
            <div className='bg-gray-100 rounded-md p-4'>
              <h3 className='text-lg font-medium mb-2'>Hints</h3>
              <p className='text-sm text-gray-500'>
                Use the blocks below to build your program. Drag and drop the blocks to the canvas
                on the right.
              </p>
            </div>
            <div className='bg-gray-100 rounded-md p-4'>
              <h3 className='text-lg font-medium mb-2'>Commands</h3>
              <div className='grid grid-cols-2 gap-2'>
                {commandOptions.map((command) => (
                  <CommandButton
                    key={command}
                    label={command}
                    onClick={() => {
                      const value = prompt(
                        `Enter value for ${command} (distance for forward/backward, degrees for turnLeft/turnRight)`
                      );
                      if (value) {
                        const param = parseInt(value, 10);
                        if (!isNaN(param)) {
                          switch (command) {
                            case 'forward':
                            case 'backward':
                              addCommand({ type: command, distance: param });
                              break;
                            case 'turnLeft':
                            case 'turnRight':
                              addCommand({ type: command, degrees: param });
                              break;
                          }
                        }
                      }
                    }}
                  />
                ))}
              </div>
            </div>
            <div className='bg-gray-100 rounded-md p-4 flex-1'>
              <h3 className='text-lg font-medium mb-2'>Code</h3>
              <div className='space-y-2'>
                {/* {commands.map((command, index) => (
                  <div
                    key={index}
                    className='bg-white border border-gray-300 rounded-md p-2 cursor-pointer'
                    onClick={() => removeCommand(index)}
                  >
                    {`${command.type} ${'distance' in command ? command.distance : command.degrees}`}
                  </div>
                ))} */}
              </div>
            </div>
          </div>
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
            <DrawingCanvas
              commands={[
                { type: 'forward', distance: 50 },
                { type: 'turnLeft', degrees: 45 },
                { type: 'turnRight', degrees: 40 },
                { type: 'backward', distance: 50 },
                { type: 'turnLeft', degrees: 85 }
              ]}
              controlCommand={controlCommand}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
