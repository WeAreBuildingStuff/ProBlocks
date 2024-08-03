import React from 'react';

interface PathHeaderProps {
  title: string;
  description: string;
  status: string;
}

const PathHeader: React.FC<PathHeaderProps> = ({ title, description, status }) => {
  return (
    <div className='flex items-center justify-between px-8'>
      <div className='flex flex-grow w-full'>
        <div className='w-full flex flex-col gap-2'>
          <div className='text-green-500 text-sm font-semibold'>{status}</div>
          <div className='flex flex-col lg:flex-row lg:items-center'>
            <h2 className='text-base font-bold w-full lg:w-1/3'>{title}</h2>
            <p className='text-gray-600 text-sm w-full lg:w-2/3'>{description}</p>
          </div>
        </div>
      </div>
      <button className='bg-black text-white font-medium px-4 py-1 rounded-full'>Continue</button>
    </div>
  );
};

export default PathHeader;
