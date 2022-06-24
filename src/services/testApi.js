import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const testApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api' }),
  reducerPath: 'testApi',
  endpoints: (builder) => ({
    fetchTestData: builder.query({
      query: () => '/testing'
    })
  })
});

export const { useFetchTestDataQuery } = testApi;
