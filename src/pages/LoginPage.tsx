import { CssBaseline, Container } from '@mui/material';
import React, {
  useEffect,
  useState,
  FormEvent,
  ChangeEvent,
} from 'react';
import { useNavigate, Link, redirect } from 'react-router-dom';
import { userLogin } from '@/app/features/user/userActions';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { SignIn } from '@/models/auth';
import { Button, Input } from '@/components';
import { userInfo } from 'os';

const initialState: SignIn = {
  email: '',
  password: '',
};

function LoginPage() {
  const [value, setValue] = useState(initialState);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  // userInfo, loading 
  const dispatch = useAppDispatch();
  console.log('render');

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (value) {
      await dispatch(userLogin(value));
    }
  }


  return (
    <>
      <img
        src="/assets/background.webp"
        alt="image of products"
        loading="lazy"
        className="w-full h-screen z-[-1] fixed top-0 left-0"
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 z-20">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h4 className="text-center text-xl font-light leading-tight tracking-tight text-gray-900 md:text-4xl ">
              Loguea tu cuenta
            </h4>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6 flex flex-col justify-center"
            >
              <Input
                className="bg-gray-400 w-full h-8 px-2"
                required
                isFocused
                placeholder="jesus@gmail.com"
                type="email"
                name="email"
                onChange={handleChange}
                value={value.email}
              />
              <Input
                className="bg-gray-400 w-full h-8 px-2"
                required
                placeholder="••••••••"
                type="password"
                name="password"
                onChange={handleChange}
                value={value.password}
              />
              <Button
                className="h-12 text-center hover:scale-110 active:scale-90 transition flex items-center justify-center"
                type="submit"
                disabled={user.loading}
              >
                Loguearse
              </Button>
              <p className="text-sm font-light text-black dark:text-black flex gap-4">
                ¿Aun no estas logueado?
                <Link
                  to="/register"
                  className="hover:scale-110 transition font-medium text-primary-600 hover:underline"
                >
                  Registrate acá
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
