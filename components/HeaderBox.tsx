import React from 'react';
import { HeaderBoxProps } from '@/types';

const HeaderBox = ({type = "title", title, subText, user}: HeaderBoxProps) => {
  return (
    <div className='header-box'>
        <h1 className='header-h1'>
            {title} 
              {type === 'greeting' && (
                  <span className='bankGradient'>, {user}</span>
            )}  
        </h1>
      <p className='bankText'>{subText}</p>  
    </div>
  );
}

export default HeaderBox;
