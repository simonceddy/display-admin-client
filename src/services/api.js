// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const displayApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api' }),
  reducerPath: 'displayApi',
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: () => '/category'
    })
  })
});

export const { useFetchDataQuery } = displayApi;
