import React from 'react';

interface CourseCardProps {
  title: string;
  level: number;
  icon: string;
  isActive: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, level, isActive }) => {
  return (
    <div>
      <div className='text-xs font-bold text-gray-500 mb-2'>LEVEL {level}</div>
      <div
        className={`relative bg-white mb-4 flex items-center p-4 rounded-xl w-full aspect-square shadow border-2 ${isActive ? 'border-green-500' : 'border-gray-300'}`}
      >
        {/* <div className="text-4xl mb-4 m-auto">{icon}</div> */}
        {isActive && (
          <div className='absolute bottom-4 w-3/4 mx-auto mt-2 h-1 bg-green-500 rounded-full'></div>
        )}
      </div>

      <h3 className='font-semibold text-sm text-center'>{title}</h3>
    </div>
  );
};

export default CourseCard;
