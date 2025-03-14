'use client'

import React from 'react';
import CountUp from 'react-countup';

const AnimatedCounter = ({amount}: {amount: number}) => {
  return (
    <div className='w-full flex justify-center'>
          <CountUp
            decimals={2}
            decimal='.'
            prefix='₦'
            end={amount}  
        />
    </div>
  );
}

export default AnimatedCounter;
