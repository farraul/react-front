import React from 'react';
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from 'src/hooks/useApp';
import Card from '@mui/material/Card';
import UseAnimations from 'react-useanimations';
import github from 'react-useanimations/lib/github';

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
          <div className="pb-10 flex flex-row items-center">
            <UseAnimations animation={github} size={35} />

            {/* revisar tamaños h1*/}
            <h1 className="text-2xl font-bold ml-3">Your profile</h1>
          </div>
          {firstName && (
            <>
              <Card className="p-10 max-w-md " style={{ backgroundColor: '#f0f0f0' }}>
                <Avatar {...stringAvatar(firstName)} />
                <div className="py-8">
                  <p>
                    <b>Namee: </b> {firstName}
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
