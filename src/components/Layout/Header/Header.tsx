import { useState, ChangeEvent, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { logout } from 'src/store/user/userSlice';
import { useAppDispatch } from 'src/hooks/useApp';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { TitleMenu } from './TitleMenu';
import { useGetUserIsLogged } from 'src/store/user/userSelectors';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AuthContext } from 'src/auth/AuthContext';
import jwtService from 'src/auth/services/jwtService/jwtService';

const fontSizeMenu = { fontSize: 17 };

function Header() {
  const { setMe, setToken } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const isLogged = useGetUserIsLogged();
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'translation.header' });
  const [openCallApi, setOpenCallApi] = React.useState(false);
  const [openTable, setOpenTable] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTables = () => {
    setOpenTable(!openTable);
  };

  const handleCallApi = () => {
    setOpenCallApi(!openCallApi);
  };

  const handleMenu = (event: { currentTarget: React.SetStateAction<HTMLElement | null> }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    setMe({});
    setToken('');
    navigate('/');
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' sx={{ px: 5 }}>
          <Toolbar>
            <Typography variant='h6' component='a' sx={{ flexGrow: 1 }} href='/'>
              {t('logo')}
            </Typography>

            <div className='w-15'>
              <LanguageSwitcher />
            </div>
            {isLogged ? (
              <div>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <MenuIcon className='ml-5' />
                </IconButton>
                {/*Menú lateral*/}
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/')}>
                    {t('home')}
                  </MenuItem>
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/profile')}>
                    {t('profile')}
                  </MenuItem>
                  <TitleMenu text='Herramientas creadas' />
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/seo')}>
                    {t('seo')}
                  </MenuItem>
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/images')}>
                    {t('images')}
                  </MenuItem>
                  <TitleMenu text='Ejemplos' />

                  <ListItemButton onClick={handleCallApi}>
                    <ListItemText primary='Calls Api' sx={fontSizeMenu} disableTypography={true} />
                    {openCallApi ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openCallApi} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      <ListItemButton
                        sx={{ pl: 4, flexDirection: 'column', alignItems: 'flex-start' }}
                      >
                        <ListItemText
                          sx={fontSizeMenu}
                          disableTypography={true}
                          primary='TanStack'
                          onClick={() => navigate('/call-api-tanstack')}
                        />
                        <ListItemText
                          sx={fontSizeMenu}
                          disableTypography={true}
                          primary='useFecth'
                          onClick={() => navigate('/call-api-usefetch')}
                        />

                        <ListItemText
                          sx={fontSizeMenu}
                          disableTypography={true}
                          primary='FecthPro'
                          onClick={() => navigate('/call-api-fetch-pro')}
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/hoc-pattern')}>
                    {t('hoc-pattern')}
                  </MenuItem>
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/proxy')}>
                    Proxy
                  </MenuItem>

                  <TitleMenu text='Hooks React' />
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/hook-imperative-handle')}>
                    useImperativeHandle
                  </MenuItem>
                  <TitleMenu text='Librerías externas' />
                  <ListItemButton sx={fontSizeMenu} onClick={handleTables}>
                    <ListItemText sx={fontSizeMenu} primary='Tables' disableTypography={true} />
                    {openTable ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openTable} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      <ListItemButton
                        sx={{
                          pl: 4,
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          fontSize: 9,
                        }}
                      >
                        <ListItemText
                          sx={fontSizeMenu}
                          disableTypography={true}
                          primary='AgGridReact'
                          onClick={() => navigate('/products')}
                        />
                        <ListItemText
                          sx={fontSizeMenu}
                          disableTypography={true}
                          primary='Mui'
                          onClick={() => navigate('/clients')}
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/times')}>
                    Date-fns & react-datepicker
                  </MenuItem>
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/hook-form')}>
                    {t('hook-form')}
                  </MenuItem>
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/react-windows')}>
                    React Windows
                  </MenuItem>
                  <MenuItem
                    className='bg-slate-300'
                    sx={{ fontSizeMenu, bgcolor: '#ff9292' }}
                    onClick={() => jwtService.logout()}
                  >
                    {t('logout')}
                  </MenuItem>
                </Menu>
              </div>
            ) : null}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
