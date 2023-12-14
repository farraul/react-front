import React, { ReactNode, useContext, Context, createContext } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { AppContext } from 'src/AppContext';
import { AuthContext } from 'src/auth/AuthContext';

const Authorization = ({ user, children }: any) => {
  // const navigate = useNavigate();

  // if (Object.values(user).length) {
  //   console.log('Object.values(user).length', Object.values(user).length);
  //   navigate('/');
  // } else {
  //   navigate('/login');
  // }
  return [children];
};

export default Authorization;

// Authorization.contextType = AppContext;
// const AuthContext = createContext<any>({
//   acces: true,
// });
// const appContext = useContext(AppContext);
// const { me } = useContext(AuthContext);
// const { routes } = appContext;
// const routing = useRoutes(routes(Object.values(me).length ? true : false));
// console.log({routing})
// return routing;
