import React from 'react';

export function QuestListScroll(): JSX.Element {
  return (
    <div className='h-full w-2/5 flex flex-col items-center overflow-y-auto'>
      <div className='w-full max-w-96 space-y-8 p-4'>
        <div className='h-80 border-2 border-gray-400 rounded-xl bg-white'></div>
        <div className='h-80 border-2 border-gray-400 rounded-xl bg-white'></div>
        <div className='h-80 border-2 border-gray-400 rounded-xl bg-white'></div>
        <div className='h-80 border-2 border-gray-400 rounded-xl bg-white'></div>
      </div>
    </div>
  );
}
