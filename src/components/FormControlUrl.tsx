import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

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
