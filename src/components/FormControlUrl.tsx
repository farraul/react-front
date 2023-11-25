import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

// const propsAreEqual = (prevProps, nextProps) => {
//   // Check if the URLs have changed
//   if (prevProps.urlsRecent.length !== nextProps.urlsRecent.length) {
//     return false;
//   }

//   for (let i = 0; i < prevProps.urlsRecent.length; i++) {
//     if (prevProps.urlsRecent[i] !== nextProps.urlsRecent[i]) {
//       return false;
//     }
//   }

//   // Check if the setUrl prop has changed
//   if (prevProps.setUrl !== nextProps.setUrl) {
//     return false;
//   }

//   return true;
// };

export const FormControlUrl = memo(({ setUrl, urlsRecent }: any) => {
  const { t } = useTranslation();
  console.log('renderrr');

  return (
    <FormControl fullWidth>
      <InputLabel id='demo-simple-select-label'>{t('Welcome')}Selecciona URL recientes</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value=''
        label='Url recientes'
        onChange={(event) => setUrl(event.target.value)}
      >
        {urlsRecent.map((url: any, index: any) => (
          <MenuItem key={index} value={url}>
            {url}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
