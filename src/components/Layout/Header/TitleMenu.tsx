import { Divider } from '@mui/material';
import React from 'react';

export const TitleMenu = ({ text }: { text: string }) => {
  return (
    <>
      <div className='bg-grey-300'>
        <p className='ml-5'>{text}</p>
      </div>
      <Divider className='bg-grey-300' sx={{ my: 0 }} />
    </>
  );
};
