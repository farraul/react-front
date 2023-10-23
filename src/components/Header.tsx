import { useState, useEffect, ChangeEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '@/app/features/user/userSlices';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from './Select';

function Header() {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'translation.header' });
  console.log(i18n.services.resourceStore.data);
  console.log(i18n);

  const userToken = useAppSelector((state) => state.user?.userInfo?.userToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [languages, setLanguages] = useState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: { currentTarget: React.SetStateAction<HTMLElement | null> }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  const languageValues = {
    es: 'Es',
    en: 'En',
  };

  return (
    <>
      {/* {isFetching && <Spinner />} */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t('logo')}
            </Typography>
            {/* <select name="select" onChange={handleChangeLanguage}>
              <option defaultValue="es" value="es">
                Es
              </option>
              <option value="en">En</option>
              <option value="fr">Fr</option>
            </select> */}

            <div className="w-15">
              <Select
                id="language"
                name="languaje"
                values={languages}
                onChange={handleChangeLanguage}
                placeholder=""
                options={languageValues}
              />
            </div>
            {userToken ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
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
                  <MenuItem onClick={() => navigate('/')}> {t('home')}</MenuItem>
                  <MenuItem onClick={() => navigate('/profile')}>{t('profile')}</MenuItem>
                  <MenuItem onClick={() => navigate('/dashboard')}>{t('table')}</MenuItem>
                  <MenuItem onClick={() => navigate('/clients')}>{t('clients')}</MenuItem>
                  <MenuItem onClick={() => navigate('/seo')}>{t('seo')}</MenuItem>
                  <MenuItem onClick={() => navigate('/call-api')}>{t('call-api')}</MenuItem>
                  <MenuItem onClick={() => navigate('/images')}>{t('images')}</MenuItem>
                  <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
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
