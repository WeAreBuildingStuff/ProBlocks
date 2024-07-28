'use client';
import { Button } from '@repo/ui/src/components/button';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { DRAWCAROUSELDATA } from '../../../../constants';
import useEmblaCarousel from 'embla-carousel-react';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from '../../../components/sub-components/CarouselArrowButton';
import { EmblaOptionsType } from 'embla-carousel';
type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};
const OPTIONS: EmblaOptionsType = { axis: 'y' };

export default function onboardingDraw(): JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <main className='w-screen  flex gap-5 items-center justify-center bg-neutral-100 p-24'>
      <div className='border-2 border-black  flex  flex-col rounded-lg w-[80%] py-10'>
        {/*Title Layer*/}
        <div className='w-full text-center'>
          <p> Sample text here</p>
        </div>
        {/*Content*/}
        <div className='grid grid-cols-1 px-10 lg:grid-cols-[30%_70%]'>
          {/*Left - List of Events*/}
          <div className='embla flex border border-green-500  w-full h-full py-5 px-2 flex-col gap-5'>
            <div className='embla__viewport   h-full w-full ' ref={emblaRef}>
              <div className='embla__container  '>
                {DRAWCAROUSELDATA.map((value, index) => (
                  <div className='embla__slide border border-black rounded-lg' key={index}>
                    <div className='embla__slide__number'>{value.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className='embla__controls'>
              <div className='embla__buttons'>
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
              </div>
            </div>
          </div>

          {/*Right - Details */}
          <div className=' border w-full   border-blue-500 py-5 px-2 flex flex-col justify-between rounded-xl '>
            {/*TODO [2024/19/7]: RENDER DESCRIPTION OF ACTIVITY HERE */}
            <div className=' text-center'>
              <p>Details</p>
            </div>
            <div className=' flex justify-end pr-5'>
              {/*Dynamic?*/}
              <Link href={'/draw/drawPage'}>
                <Button>Activity Page</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
