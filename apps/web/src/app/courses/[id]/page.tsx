import ActivityCard from '../../../components/ActivityCard';
import { Separator } from '@repo/ui/src/components/separator';
import React from 'react';

export default function Page(): JSX.Element {
  return (
    <main className='w-screen flex bg-neutral-50 px-24 pt-12'>
      <div className='container mx-auto px-24 py-8'>
        <div className='mb-6'>
          <h2 className='text-3xl font-bold'>Game Levels</h2>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/2'>
            <div className='w-full p-2 sticky top-8 overflow-hidden rounded-lg shadow-md border-2 border-gray-300 group hover:shadow-lg transition-transform duration-200 ease-in-out'>
              <div className='p-4 bg-background'>
                <h3 className='text-xl font-bold'>Level 1</h3>
                <p className='text-sm text-muted-foreground'>
                  Explore the enchanted forest and defeat the evil sorcerer.
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col w-1/2 items-center overflow-x-auto scrollbar-hide'>
            <ActivityCard />
            <Separator orientation='vertical' className='h-8' />
            <ActivityCard />
            <Separator orientation='vertical' className='h-8' />
            <ActivityCard />
            <Separator orientation='vertical' className='h-8' />
            <ActivityCard />
          </div>
        </div>
      </div>
    </main>
  );
}
