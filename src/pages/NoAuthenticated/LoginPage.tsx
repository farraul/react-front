import { CssBaseline, Container } from '@mui/material';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useApp';
import { SignIn } from 'src/models/auth';
import jwtService from 'src/auth/jwtService';
import { Button, Input } from 'src/components/PrimitiveElements';

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

export default function LoginPage() {
  const [value, setValue] = useState(initialState);
  const user = useAppSelector((state) => state.user);

  function handleChange<T>(e: InputChangeEvent<T>) {
    const valueSignIn = e.target.value as T;
    setValue({ ...value, [e.target.name]: valueSignIn });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (value) {
      jwtService
        .signInWithEmailAndPassword(value.email, value.password, value.remember)
        .then((user) => {
          // No need to do anything, user data will be set at app/auth/AuthContext
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
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
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8 bg-thirdary'>
            <h4 className='text-center text-xl font-light leading-tight tracking-tight text-color-secondary md:text-4xl '>
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
                className='h-12 text-center hover:scale-110 active:scale-90 transition flex items-center bg-color-secondary text-color-primary justify-center'
                type='submit'
                disabled={user.loading}
              >
                Loguearse
              </Button>
              <p className='text-sm font-light text-color-secondary dark:text-black flex gap-4'>
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

function rejectWithValue(error: unknown) {
  throw new Error('Function not implemented.');
}
