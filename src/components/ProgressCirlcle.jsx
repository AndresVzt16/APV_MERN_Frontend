import React, { useEffect, useState } from 'react';

const CircularProgress = ({ progress }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const circumference = 2 * Math.PI * 45;
 

  const offset = circumference - (clampedProgress / 100) * circumference;
  
  return (
    <div className="relative flex items-center justify-center min-h-52 min-w-52 size-52">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-cyan-50"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className={`${progress == 100?"text-green-500" :"text-cyan-800"}`}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{ transition: 'stroke-dashoffset 0.35s' }}
        />
      </svg>
      <div className="absolute flex items-center flex-col justify-center w-24 h-24 rounded-full">
        <span className={` text-3xl font-bold text-cyan-800 ${progress == 100?"text-green-500" :"text-cyan-800"}`}>{`${clampedProgress}%`}</span>
        <span className='inline-block text-cyan-800 font-semibold'>Completado</span>
      </div>
    </div>
  );
};

export default CircularProgress;
