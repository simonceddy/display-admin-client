import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const testApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api' }),
  reducerPath: 'testApi',
  endpoints: (builder) => ({
    fetchTestData: builder.query({
      query: () => '/testing'
    }),
    fetchTestArticle: builder.query({
      query: (key) => `/testing/${key}`,
      transformResponse: (r) => r.data
    }),
    createArticle: builder.mutation({
      query: (body) => ({
        url: '/testing/create',
        body,
        method: 'POST'
      }),
      transformResponse: (r) => r.data
    }),
    updateArticle: builder.mutation({
      query: ({ key, ...body }) => ({
        url: `/testing/update/${key}`,
        body,
        method: 'PUT'
      }),
      transformResponse: (r) => r.data
    }),
    deleteArticle: builder.mutation({
      query: (key) => ({
        url: `/testing/destroy/${key}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useFetchTestDataQuery,
  useFetchTestArticleQuery,
  useUpdateArticleMutation,
  useCreateArticleMutation,
  useDeleteArticleMutation
} = testApi;
