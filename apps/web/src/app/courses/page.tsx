import React from 'react';
import PathHeader from '../../components/PatherHeader';
import CourseCard from '../../components/CourseCard';
import { Separator } from '@repo/ui/src/components/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@repo/ui/src/components/carousel';

const courses = [
  { id: 1, title: 'Exploring Data Visually', level: 1, icon: '👁️' },
  { id: 2, title: 'Case Study: Unlocking Rental Value on Airbnb', level: 1, icon: '🏠' },
  { id: 3, title: 'Introduction to Probability', level: 2, icon: '✅' },
  { id: 4, title: 'Case Study: Going Viral on X', level: 2, icon: '🕸️' },
  { id: 5, title: 'Predicting with Probability', level: 3, icon: '✈️' },
  { id: 6, title: 'Case Study: Topping the Charts with Spotify', level: 3, icon: '🎵' }
];

const Page: React.FC = () => {
  return (
    <div className='bg-white'>
      <main className='mx-auto px-24 py-8'>
        <h1 className='text-3xl font-bold mb-2'>Learning Paths</h1>
        <p className='text-gray-600 mb-8'>Step-by-step paths to mastery</p>

        <div className='flex flex-col gap-16 mt-12'>
          <div>
            <PathHeader
              title='Data Analysis'
              description='Master key skills in probability and data analysis'
              status='IN PROGRESS'
            />
            <div className='bg-gray-100 py-6 rounded-lg mt-6 px-16'>
              <Carousel className='w-full p-2'>
                <CarouselContent className='-ml-1 gap-4'>
                  {courses.map((course, index) => (
                    <CarouselItem
                      key={index}
                      className='pl-1 basis-1 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
                    >
                      <div className='p-1'>
                        <CourseCard
                          title={course.title}
                          level={course.level}
                          icon={course.icon}
                          isActive={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <Separator />

          <div>
            <PathHeader
              title='Data Analysis'
              description='Master key skills in probability and data analysis'
              status='IN PROGRESS'
            />
            <div className='bg-gray-100 py-6 rounded-lg mt-6 px-16'>
              <Carousel className='w-full p-2'>
                <CarouselContent className='-ml-1 gap-4'>
                  {courses.map((course, index) => (
                    <CarouselItem
                      key={index}
                      className='pl-1 basis-1 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
                    >
                      <div className='p-1'>
                        <CourseCard
                          title={course.title}
                          level={course.level}
                          icon={course.icon}
                          isActive={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <Separator />

          <div>
            <PathHeader
              title='Data Analysis'
              description='Master key skills in probability and data analysis'
              status='IN PROGRESS'
            />
            <div className='bg-gray-100 py-6 rounded-lg mt-6 px-16'>
              <Carousel className='w-full p-2'>
                <CarouselContent className='-ml-1 gap-4'>
                  {courses.map((course, index) => (
                    <CarouselItem
                      key={index}
                      className='pl-1 basis-1 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
                    >
                      <div className='p-1'>
                        <CourseCard
                          title={course.title}
                          level={course.level}
                          icon={course.icon}
                          isActive={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
