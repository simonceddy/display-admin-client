import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const displayApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api' }),
  reducerPath: 'displayApi',
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: () => '/category'
    }),
    fetchCategory: builder.query({
      query: (key) => `/category/${key}`
    }),
    saveNewCategory: builder.mutation({
      query: (body) => ({
        url: '/category/create',
        body,
        method: 'POST'
      }),
      transformResponse: (r) => r.data
    }),
    updateArticle: builder.mutation({
      query: ({ key, ...body }) => ({
        url: `/category/update/${key}`,
        body,
        method: 'PUT'
      }),
      transformResponse: (r) => r.data
    }),
    deleteArticle: builder.mutation({
      query: (key) => ({
        url: `/category/destroy/${key}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useFetchDataQuery,
  useFetchCategoryQuery,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
  useSaveNewCategoryMutation
} = displayApi;
