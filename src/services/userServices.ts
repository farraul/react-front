import { Token, UserInfo } from '@/models/user/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { user: Token }).user.userToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (build) => ({
    getDetails: build.query<UserInfo, string>({
      query: () => ({
        url: 'api/user/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetDetailsQuery } = userApi;
