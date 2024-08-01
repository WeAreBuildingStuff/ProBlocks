import React from 'react';

export default function Page(): JSX.Element {
  return (
    <main className='w-screen flex bg-neutral-100 px-24 pt-12'>
      <div className='h-full w-2/5 flex flex-col items-center'>
        <div className='w-96 h-80 border-2 border-gray-400 rounded-xl bg-white'></div>
      </div>
    </main>
  );
}
