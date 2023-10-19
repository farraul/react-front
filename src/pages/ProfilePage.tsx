import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '@/hooks/useApp';
import Card from '@mui/material/Card';
import { blueGrey } from '@mui/material/colors';

const ProfilePage = () => {
  const { firstName, email } = useAppSelector((state) => state.user.userInfo);
  console.log(firstName);
  
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: 'grey',
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  return (
    <section className="p-16">
      <div>
        <div className="w-1/2">
          {firstName && (
            <>
              <Card className="p-10 max-w-md " style={{backgroundColor: '#f0f0f0'}}>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
