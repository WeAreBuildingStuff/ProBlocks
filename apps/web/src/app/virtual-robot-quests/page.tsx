import { QuestListScroll } from '../../components/questListScroll';
import React from 'react';

export default function Page(): JSX.Element {
  return (
    <main className='w-screen flex bg-neutral-100 px-24 pt-12'>
      <div className='h-full w-2/5 flex flex-col items-center'>
        <QuestListScroll />
      </div>
    </main>
  );
}
