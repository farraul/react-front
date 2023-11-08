import { useState, useEffect, ChangeEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '@/app/features/user/userSlices';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from './Select';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuList,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const languageValues = {
  es: 'Es',
  en: 'En',
};

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'translation.header' });
  const userToken = useAppSelector((state) => state.user?.userInfo?.userToken);
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
    navigate('/');
  };

  const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    i18n.changeLanguage(e.target.value);
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

            <div className="w-15">
              <Select
                id="language"
                name="languaje"
                values=""
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
                  {/*revisar como añadir a todo dont size*/}
                  <MenuItem style={{ fontSize: 14 }} onClick={() => navigate('/')}>
                    {t('home')}
                  </MenuItem>
                  <MenuItem
                    className="flex-none rounded-lg bg-slate-100 text-red-200"
                    onClick={() => navigate('/times')}
                  >
                    {t('times')}
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/hook-form')}>{t('hook-form')}</MenuItem>
                  <MenuItem onClick={() => navigate('/profile')}>{t('profile')}</MenuItem>
                  <MenuItem onClick={() => navigate('/seo')}>{t('seo')}</MenuItem>

                  <ListItemButton onClick={handleTables}>
                    <ListItemText primary="Tables" />
                    {openTable ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openTable} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        sx={{ pl: 4, flexDirection: 'column', alignItems: 'flex-start' }}
                      >
                        <ListItemText primary="AgGridReact" onClick={() => navigate('/products')} />
                        <ListItemText primary="Mui" onClick={() => navigate('/clients')} />
                      </ListItemButton>
                    </List>
                  </Collapse>

                  <ListItemButton onClick={handleCallApi}>
                    <ListItemText primary="Calls Api" />
                    {openCallApi ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openCallApi} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        sx={{ pl: 4, flexDirection: 'column', alignItems: 'flex-start' }}
                      >
                        <ListItemText
                          primary="TanStack"
                          onClick={() => navigate('/call-api-tanstack')}
                        />
                        <ListItemText
                          primary="useFecth"
                          onClick={() => navigate('/call-api-usefetch')}
                        />

                        <ListItemText
                          primary="FecthPro"
                          onClick={() => navigate('/call-api-fetch-pro')}
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>

                  <MenuItem onClick={() => navigate('/images')}>{t('images')}</MenuItem>
                  <MenuItem onClick={() => navigate('/hoc-pattern')}>{t('hoc-pattern')}</MenuItem>
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
