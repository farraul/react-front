import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { CssBaseline, Container } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { userRegister } from 'src/store/user/userActions';
import { useAppDispatch, useAppSelector } from 'src/hooks/useApp';
import { SignUp } from 'src/models/auth';
import { Button, Input } from 'src/components';

const initialState: SignUp = {
  firstName: '',
  email: '',
  password: '',
};

function RegisterPage() {
  const [value, setValue] = useState(initialState);
  const navigate = useNavigate();
  const { loading, userInfo, success } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  type InputChangeEvent<T> = ChangeEvent<HTMLInputElement> & {
    target: {
      name: string;
      value: T;
    };
  };

  function handleChange<T>(e: InputChangeEvent<T>) {
    const valueSignIn = e.target.value as T;
    setValue({ ...value, [e.target.name]: valueSignIn });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (value) {
      dispatch(userRegister(value));
    }
  }

  useEffect(() => {
    if (success) {
      navigate('/login');
    }
  }, [navigate, success]);

  return (
    <>
      <img
        src='/assets/background.webp'
        alt='image of products'
        className='w-full h-screen z-[-1] fixed top-0 left-0'
      />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 z-20'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h4 className='text-center text-xl font-light leading-tight tracking-tight text-gray-900 md:text-4xl '>
              Registra tu cuenta
            </h4>
            <form
              onSubmit={handleSubmit}
              className='space-y-4 md:space-y-6 flex flex-col justify-center'
            >
              <Input
                className='bg-gray-400 w-full h-8 px-2'
                required
                placeholder='Nombre'
                type='firstName'
                name='firstName'
                onChange={handleChange}
                value={value.firstName}
              />
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
                disabled={loading}
              >
                Registrarse
              </Button>
              <p className='text-sm font-light text-black dark:text-black flex gap-4'>
                ¿Ya estas registrado?
                <Link
                  to='/'
                  className='hover:scale-110 transition font-medium text-primary-600 hover:underline'
                >
                  Loguearme
                </Link>
              </p>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export default RegisterPage;
