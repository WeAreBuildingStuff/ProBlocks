'use client';
import React, { useState } from 'react';
import DrawingCanvas from '../../../components/drawingCanvas';
export default function drawPage(): JSX.Element {
  //TODO: finish this some other time
  const [isButtonPressed] = useState<boolean>(false);
  return (
    <main className='w-screen  flex gap-5 items-center justify-center bg-neutral-100 p-24'>
      <div className='border-2 border-black  flex flex-col rounded-lg w-[80%] h-[80%] py-10'>
        {/*Title Layer*/}
        <div className='w-full text-center'>
          <p> Sample text here</p>
        </div>
        {/*Content*/}
        <div className='border flex h-full border-red-500'>
          {/*Left - List of Events*/}
          <div className='border w-[30%]  py-5 px-2 flex flex-col gap-5  border-blue-500'>
            <div className='border p-10 h-full text-wrap rounded-lg border-black'>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit...
            </div>
          </div>
          {/*Right - Details */}
          <div className=' border w-[70%] py-5 px-2 flex flex-col justify-between border-green-500'>
            {/*TODO [2024/19/7]: RENDER DESCRIPTION OF ACTIVITY HERE */}
            <div className=' text-center'>
              <p>Canvas</p>
              <DrawingCanvas
                commands={['forward', 'turnLeft', 'forward', 'turnRight', 'backward']}
                isButtonPressed={isButtonPressed}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
