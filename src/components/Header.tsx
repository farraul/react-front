import { useState, ChangeEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/app/features/user/userSlices';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from './Select';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { TitleMenu } from './TitleMenu';

const languageValues = {
  es: 'Es',
  en: 'En',
};

let fontSizeMenu = { fontSize: 17 };

function Header() {
  const dispatch = useAppDispatch();
  const userToken = useAppSelector((state) => state.user?.userInfo?.userToken);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'translation.header' });
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
        <AppBar position="static" sx={{ px: 5 }}>
          <Toolbar>
            <Typography variant="h6" component="a" sx={{ flexGrow: 1 }} href="/">
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
                  <MenuIcon className="ml-5" />
                </IconButton>
                {/*Menú lateral*/}
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
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/')}>
                    {t('home')}
                  </MenuItem>
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/profile')}>
                    {t('profile')}
                  </MenuItem>
                  <TitleMenu text="Herramientas creadas" />
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/seo')}>
                    {t('seo')}
                  </MenuItem>
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/images')}>
                    {t('images')}
                  </MenuItem>
                  <TitleMenu text="Ejemplos" />

                  <ListItemButton onClick={handleCallApi}>
                    <ListItemText primary="Calls Api" sx={fontSizeMenu} disableTypography={true} />
                    {openCallApi ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openCallApi} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        sx={{ pl: 4, flexDirection: 'column', alignItems: 'flex-start' }}
                      >
                        <ListItemText
                          sx={fontSizeMenu}
                          disableTypography={true}
                          primary="TanStack"
                          onClick={() => navigate('/call-api-tanstack')}
                        />
                        <ListItemText
                          sx={fontSizeMenu}
                          disableTypography={true}
                          primary="useFecth"
                          onClick={() => navigate('/call-api-usefetch')}
                        />

                        <ListItemText
                          sx={fontSizeMenu}
                          disableTypography={true}
                          primary="FecthPro"
                          onClick={() => navigate('/call-api-fetch-pro')}
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/hoc-pattern')}>
                    {t('hoc-pattern')}
                  </MenuItem>

                  <TitleMenu text="Hooks React" />
                  <MenuItem sx={fontSizeMenu} onClick={() => navigate('/hook-imperative-handle')}>
                    useImperativeHandle
                  </MenuItem>
                  <TitleMenu text="Librerías externas" />
                  <ListItemButton sx={fontSizeMenu} onClick={handleTables}>
                    <ListItemText sx={fontSizeMenu} primary="Tables" disableTypography={true} />
                    {openTable ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openTable} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
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
                          primary="AgGridReact"
                          onClick={() => navigate('/products')}
                        />
                        <ListItemText
                          sx={fontSizeMenu}
                          disableTypography={true}
                          primary="Mui"
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
                  <MenuItem
                    className="bg-slate-300"
                    sx={{ fontSizeMenu, bgcolor: '#ff9292' }}
                    onClick={handleLogout}
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
