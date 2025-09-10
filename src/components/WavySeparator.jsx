import React from 'react';
import { cn } from '@/lib/utils';

export const WavySeparator = ({ direction = 'down', className, ...props }) => {
  return (
    <div
      className={cn(
        "w-full h-20 md:h-32 lg:h-40 leading-[0] fill-current",
        direction === 'up' ? '-mt-1' : '-mb-1',
        className
      )}
      {...props}
    >
      <svg
        className="relative block w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ transform: direction === 'up' ? 'rotate(180deg)' : '' }}
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31.74,904.67,72.43,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        ></path>
      </svg>
    </div>
  );
};