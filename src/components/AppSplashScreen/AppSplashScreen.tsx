import { memo } from 'react';
import Box from '@mui/material/Box';
import React from 'react';

function AppSplashScreen() {
  return (
    <div id='app-splash-screen'>
      <div className='logo'>
        <img width='128' src='/public/assets/images/background.webp' alt='logo' />
      </div>
      <Box
        id='spinner'
        sx={{
          '& > div': {
            backgroundColor: 'palette.secondary.main',
          },
        }}
      >
        <div className='bounce1' />
        <div className='bounce2' />
        <div className='bounce3' />
      </Box>
    </div>
  );
}

export default memo(AppSplashScreen);
