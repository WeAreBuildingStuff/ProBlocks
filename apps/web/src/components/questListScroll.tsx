import { IconScript } from '@tabler/icons-react';
import React from 'react';

export function QuestListScroll(): JSX.Element {
  return (
    <div className='h-full w-2/5 flex flex-col items-center overflow-y-auto'>
      <div className='w-full max-w-96 space-y-8 p-4'>
        <div className='flex flex-col border-2 border-gray-400 rounded-xl bg-white p-8 space-y-4'>
          <h2 className='text-2xl font-bold'> Speak and Draw </h2>
          <p className='text-base text-gray-700'>Use voice commands to draw basic shapes.</p>
          <div className='flex items-center space-x-1'>
            {' '}
            <IconScript className='h-4 w-4 text-black' /> <p className='text-sm'> Quests: 5</p>{' '}
          </div>
        </div>
        <div className='flex flex-col border-2 border-gray-400 rounded-xl bg-white p-8 space-y-4'>
          <h2 className='text-2xl font-bold'> Speak and Draw </h2>
          <p className='text-base text-gray-700'>Use voice commands to draw basic shapes.</p>
          <div className='flex items-center space-x-1'>
            {' '}
            <IconScript className='h-4 w-4 text-black' /> <p className='text-sm'> Quests: 5</p>{' '}
          </div>
        </div>
        <div className='flex flex-col border-2 border-gray-400 rounded-xl bg-white p-8 space-y-4'>
          <h2 className='text-2xl font-bold'> Speak and Draw </h2>
          <p className='text-base text-gray-700'>Use voice commands to draw basic shapes.</p>
          <div className='flex items-center space-x-1'>
            {' '}
            <IconScript className='h-4 w-4 text-black' /> <p className='text-sm'> Quests: 5</p>{' '}
          </div>
        </div>
        <div className='flex flex-col border-2 border-gray-400 rounded-xl bg-white p-8 space-y-4'>
          <h2 className='text-2xl font-bold'> Speak and Draw </h2>
          <p className='text-base text-gray-700'>Use voice commands to draw basic shapes.</p>
          <div className='flex items-center space-x-1'>
            {' '}
            <IconScript className='h-4 w-4 text-black' /> <p className='text-sm'> Quests: 5</p>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}
