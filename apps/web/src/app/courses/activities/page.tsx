'use client';
import React from 'react';
// import DrawingCanvas from "../../components/drawingCanvas";
// import { Button } from "@repo/ui/src/components/button";
// import { useState } from "react";

export default function Page(): JSX.Element {
  // const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);

  return (
    <main className='w-screen flex-1 flex flex-col  bg-neutral-100 p-24'>
      {/* <Button onClick={() => setIsButtonPressed(true)}>Send</Button> */}
      {/* <DrawingCanvas commands={['forward', 'turnLeft', 'forward', 'turnRight', 'backward']} isButtonPressed={isButtonPressed} /> */}

      <div className='flex flex-col w-full p-4 space-y-4 bg-white border rounded-lg shadow-md md:w-2/3 lg:w-1/2'>
        <div className='flex flex-col'>
          <p className='font-bold'>Challenges</p>
          <div className=' flex h-[600px] gap-3 '>
            <div className='flex flex-col space-y-4 px-5 py-3 w-[40%]'>
              {[1, 2, 3].map((value, index) => (
                <div
                  key={index}
                  className='w-full h-full bg-gray-200  px-5 py-2  flex flex-col rounded-md'
                >
                  <h1 className='font-bold'>Header</h1> <p>paragraph</p>
                </div>
              ))}
            </div>
            <div className='flex flex-col  w-[60%]  '>
              <div className='flex-1 bg-gray-200  w-full rounded-md py-5  '>
                <p className='text-sm text-center font-bold'>Details</p>
              </div>
            </div>
            <button className='self-end px-4 py-2 text-sm bg-blue-500 rounded-md text-white'>
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
