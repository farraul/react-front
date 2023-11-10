import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Spinner() {
  return (
    <div className="w-full h-full absolute top-0 right-0 bg-white flex justify-center items-center z-[99] ">
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </div>
  );
}

export default Spinner;
