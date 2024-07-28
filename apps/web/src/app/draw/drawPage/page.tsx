'use client';
import React, { useEffect, useRef, useState } from 'react';
import DrawingCanvas from '../../../components/drawingCanvas';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

type Command = 'forward' | 'backward' | 'turnLeft' | 'turnRight';

export default function DrawPage(): JSX.Element {
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingComplete, setRecordingComplete] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [textCommands, setTextCommands] = useState<Command[]>([]);
  const processedTranscripts = useRef<Set<string>>(new Set());

  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      const newTranscript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase().replace(/[.]/g, '');
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
      setRecordingComplete(true);
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
      setIsButtonPressed(true);
    }
  };

  useEffect(() => {
    if (transcript && !processedTranscripts.current.has(transcript)) {
      processedTranscripts.current.add(transcript);
      const words = transcript.split(' ');
      const validCommands: Command[] = ['forward', 'backward', 'turnLeft', 'turnRight'];
      const commands: Command[] = words.filter(word => validCommands.includes(word as Command)) as Command[];
      if (commands.length > 0) {
        setTextCommands(prevCommands => [...prevCommands, ...commands]);
        console.log('Commands added:', commands);
      }
    }
  }, [transcript]);

  console.log('Transcript:', transcript);
  console.log('Text Commands:', textCommands);

  return (
    <main className='w-screen flex gap-5 items-center justify-center bg-neutral-100 p-24'>
      <div className='border-2 border-black flex flex-col rounded-lg w-[80%] h-[80%] py-10'>
        <div className='w-full text-center'>
          <p>Sample text here</p>
        </div>
        <div className='flex h-full'>
          <div className='w-[30%] py-5 px-2 flex flex-col gap-5'>
            <div className='border p-10 h-full text-wrap rounded-lg border-black'>
              {transcript && (
                <div className='border rounded-md p-2 h-full mt-4'>
                  <p className='mb-0'>{transcript}</p>
                </div>
              )}
            </div>
          </div>
          <div className='w-[70%] py-5 px-2 flex flex-col gap-10 justify-between'>
            <div className='text-center'>
              <p>Canvas</p>
              <DrawingCanvas
                commands={textCommands}
                isButtonPressed={isButtonPressed}
              />
            </div>
            <div className='flex items-center w-full'>
              {isRecording ? (
                <button
                  onClick={handleToggleRecording}
                  className='mt-10 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500 rounded-full w-20 h-20 focus:outline-none'
                >
                  <svg
                    className='h-12 w-12'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path fill='white' d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleToggleRecording}
                  className='mt-10 m-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500 rounded-full w-20 h-20 focus:outline-none'
                >
                  <svg
                    viewBox='0 0 256 256'
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-12 h-12 text-white'
                  >
                    <path
                      fill='currentColor'
                      d='M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z'
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
