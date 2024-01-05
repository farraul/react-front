import { Layout } from 'src/components';
import React, { lazy } from 'react';

const ErrorPage = lazy(() => import('src/pages/Authenticated/ErrorPage'));

import { createBrowserRouter } from 'react-router-dom';

export const routesConfigUnAuth = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        async lazy() {
                            const { LoginPage } = await import('src/pages/Authenticated');
                            return { Component: LoginPage };
                        },
                    },
                    {
                        async lazy() {
                            const { RegisterPage } = await import('src/pages/Authenticated');
                            return { Component: RegisterPage };
                        },
                    },
                    {
                        path: '*',
                        element: <ErrorPage />,
                    },
                ],
            },
        ],
    },
]);
