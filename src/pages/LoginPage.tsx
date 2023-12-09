import { CssBaseline, Container } from '@mui/material';
import React, { useState, FormEvent, ChangeEvent, useContext } from 'react';
import { Link, useSearchParams, Navigate } from 'react-router-dom';
import { signIn } from 'src/store/user/userActions';
import { useAppDispatch, useAppSelector } from 'src/hooks/useApp';
import { SignIn } from 'src/models/auth';
import { Button, Input } from 'src/components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from 'src/auth/AuthContext';
import { setCredentials } from 'src/store/user/userSlice';
import jwtService from 'src/auth/services/jwtService/jwtService';

type InputChangeEvent<T> = ChangeEvent<HTMLInputElement> & {
  target: {
    name: string;
    value: T;
  };
};
const initialState: SignIn = {
  email: '',
  password: '',
};

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

function LoginPage() {
  const [searchParams] = useSearchParams();
  const { setMe, setLoading } = useContext(AuthContext);
  const [value, setValue] = useState(initialState);
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  function handleChange<T>(e: InputChangeEvent<T>) {
    const valueSignIn = e.target.value as T;
    setValue({ ...value, [e.target.name]: valueSignIn });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (value) {
      jwtService
        .signInWithEmailAndPassword(value.email, value.password, value.remember)
        .then((user) => {
          // No need to do anything, user data will be set at app/auth/AuthContext
        })
        .catch((error) => {
          console.log({ error });
        })
        .finally(() => {
          setLoading(false);
        });

      // try {
      //   const info = await axios.post(
      //     '/user/login',
      //     { email: value.email, password: value.password },
      //     config,
      //   );
      //   setMe(info.data.data);
      //   Cookies.set('jwt_access_token', info.data.data.token, {
      //     expires: 360000,
      //   });
      //   Cookies.set('userId', info.data.data._id, { expires: 360000 });
      //   const redirect = searchParams.get('redirect');
      //   dispatch(setCredentials(info.data.data));

      //   if (redirect) {
      //     window.location.href = redirect;
      //   } else {
      //     return <Navigate to='/' />;
      //   }
      //   // return Object.assign(info.data.data, {
      //   //   token: info.data.data.userToken,
      //   // });
      // } catch (error: unknown) {
      //   console.log({ error });
      // } finally {
      //   setLoading(false);
      // }
    }
  }

  return (
    <>
      <img
        src='/assets/images/background.webp'
        alt='image of products'
        className='w-full h-screen z-[-1] fixed top-0 left-0'
      />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 z-20'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h4 className='text-center text-xl font-light leading-tight tracking-tight text-gray-900 md:text-4xl '>
              Loguea tu cuenta
            </h4>
            <form
              onSubmit={handleSubmit}
              className='space-y-4 md:space-y-6 flex flex-col justify-center'
            >
              <Input
                className='bg-gray-400 w-full h-8 px-2'
                required
                placeholder='Email'
                type='email'
                name='email'
                onChange={handleChange}
                value={value.email}
              />
              <Input
                className='bg-gray-400 w-full h-8 px-2'
                required
                placeholder='••••••••'
                type='password'
                name='password'
                onChange={handleChange}
                value={value.password}
              />
              <Button
                className='h-12 text-center hover:scale-110 active:scale-90 transition flex items-center justify-center'
                type='submit'
                disabled={user.loading}
              >
                Loguearse
              </Button>
              <p className='text-sm font-light text-black dark:text-black flex gap-4'>
                ¿Aun no estas logueado?
                <Link
                  to='/register'
                  className='hover:scale-110 transition font-medium text-primary-600 hover:underline'
                >
                  Registrate
                </Link>
              </p>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export default LoginPage;
function rejectWithValue(error: unknown) {
  throw new Error('Function not implemented.');
}
