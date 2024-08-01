import { QuestListScroll } from '../../components/questListScroll';
import React from 'react';

export default function Page(): JSX.Element {
  return (
    <main className='w-screen flex bg-neutral-50 px-24 pt-12'>
      <QuestListScroll />
    </main>
  );
}
