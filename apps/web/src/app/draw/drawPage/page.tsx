'use client';
import React, { useEffect, useRef, useState } from 'react';
import DrawingCanvas from '../../../components/drawingCanvas';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

type Command = 'forward' | 'backward' | 'turnLeft' | 'turnRight';
//TODO: (2024/20/7) Fix Mic issues Via Declaration TS
export default function DrawPage(): JSX.Element {
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingComplete, setRecordingComplete] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [textCommands, setTextCommands] = useState<Command[]>([]); // Initialize as an empty array of Command

  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];
      console.log(event.results);
      setTranscript(transcript);
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
      setIsButtonPressed(true)
    }
  };

  // Update textCommands when transcript changes
  useEffect(() => {
    // Convert transcript to Command type if applicable
    const command: Command | undefined = ['forward', 'backward', 'turnLeft', 'turnRight'].includes(transcript as Command) ? transcript as Command : undefined;
    if (command) {
      setTextCommands(prevCommands => [...prevCommands, command]);
    }
  }, [transcript]);

  console.log(textCommands);

  return (
    <main className='w-screen flex gap-5 items-center justify-center bg-neutral-100 p-24'>
      <div className='border-2 border-black flex flex-col rounded-lg w-[80%] h-[80%] py-10'>
        {/*Title Layer*/}
        <div className='w-full text-center'>
          <p>Sample text here</p>
        </div>
        {/*Content*/}
        <div className='border flex h-full border-red-500'>
          {/*Left - List of Events*/}
          <div className='border w-[30%] py-5 px-2 flex flex-col gap-5 border-blue-500'>
            <div className='border p-10 h-full text-wrap rounded-lg border-black'>
              {transcript && (
                <div className='border rounded-md p-2 h-full mt-4'>
                  <p className='mb-0'>{transcript}</p>
                </div>
              )}
            </div>
          </div>
          {/*Right - Details */}
          <div className='border w-[70%] py-5 px-2 flex flex-col gap-10 justify-between border-green-500'>
            {/*TODO [2024/19/7]: RENDER DESCRIPTION OF ACTIVITY HERE */}
            <div className='text-center'>
              <p>Canvas</p>
              <DrawingCanvas
                commands={textCommands} // Pass commands directly
                isButtonPressed={isButtonPressed}
              />
            </div>
            <div className='flex items-center w-full'>
              {isRecording ? (
                // Button for stopping recording
                <button
                  onClick={handleToggleRecording}
                  className='mt-10 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500 rounded-full w-20 h-20 focus:outline-none'
                >
                  <svg
                    className='h-12 w-12 '
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path fill='white' d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
                  </svg>
                </button>
              ) : (
                // Button for starting recording
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
                      fill='currentColor' // Change fill color to the desired color
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
