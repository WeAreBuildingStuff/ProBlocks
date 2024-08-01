import { BentoGrid, BentoGridItem } from '@repo/ui/src/components/bento-grid';
import React from 'react';

export default function Page(): JSX.Element {
  return (
    <main className='w-screen flex flex-col items-center bg-neutral-100 p-24'>
      <BentoGrid className='mx-auto w-full'>
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            link={item.link}
          />
        ))}
      </BentoGrid>
    </main>
  );
}

const Skeleton = () => (
  <div className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100'></div>
);
const items = [
  {
    title: 'Magic Voice Quests',
    description:
      'Use your voice to command and control the digital world. Magic Voice Quests lets you solve puzzles, navigate mazes, and create interactive stories using voice commands. Engage in exciting challenges that enhance your programming skills through the power of speech.',
    header: <Skeleton />,
    link: '/magic-voice-quests'
  },
  {
    title: 'Robot Block Quests',
    description:
      'Program a robot using paper blocks. In Robot Block Quests, you will learn to control a drawing robot, navigate obstacle courses, and perform creative tasks. Experience hands-on programming and see your commands come to life.',
    header: <Skeleton />,
    link: '/robot-block-quests'
  },
  {
    title: 'Virtual Robot Quests',
    description:
      'Utilize paper blocks to program a virtual robot in a digital environment. Virtual Robot Quests offers a flexible and creative approach to coding with a digital bot. Draw shapes, solve mazes, and complete interactive simulations, all while enhancing your coding abilities.',
    header: <Skeleton />,
    link: '/virtual-robot-quests'
  }
];
