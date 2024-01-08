import React from 'react';
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from 'src/hooks/useApp';
import Card from '@mui/material/Card';
import UseAnimations from 'react-useanimations';
import github from 'react-useanimations/lib/github';
import { Link, Outlet } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';

const ProfilePage = () => {
  const { firstName, email } = useAppSelector((state) => state.user.userInfo);

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: 'grey',
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <section className='p-16'>
      <div>
        <div className='w-1/2'>
          <div className='pb-10 flex flex-row items-center'>
            <UseAnimations animation={github} size={35} />

            {/* revisar tamaños h1*/}
            <h1 className='text-2xl font-bold ml-3 text-red-700 md:text-red-200'>Your profile</h1>
          </div>
          {firstName && (
            <Card className='p-10 max-w-md ' style={{ backgroundColor: '#f0f0f0' }}>
              <Avatar {...stringAvatar(firstName)} />
              <div className='py-8'>
                <p>
                  <b>Name: </b> {firstName}
                </p>
                <p>
                  {' '}
                  <b>Email: </b> {email}
                </p>
              </div>
            </Card>
          )}

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Link
                to='/profile/newurltwo'
                className='hover:scale-110 transition font-medium text-primary-600 hover:underline'
              >
                <Tab label='Item One' />
              </Link>
              <Link
                to='/profile/newurl'
                className='hover:scale-110 transition font-medium text-primary-600 hover:underline'
              >
                <Tab label='Item Two' />
              </Link>
            </Tabs>
          </Box>

          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
