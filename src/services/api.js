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
    fetchItem: builder.query({
      query: ({
        key: category,
        sub,
        item
      }) => `/category/${category}/${sub ? `subCategory/${sub}/` : ''}item/${item}`
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
    deleteCategory: builder.mutation({
      query: (key) => ({
        url: `/category/destroy/${key}`,
        method: 'DELETE'
      })
    }),
    archiveCategory: builder.mutation({
      query: (key) => ({
        url: `/category/archive/${key}`,
        method: 'PUT'
      })
    }),
    unarchiveCategory: builder.mutation({
      query: (key) => ({
        url: `/category/unarchive/${key}`,
        method: 'PUT'
      })
    }),
    addItemToCategory: builder.mutation({
      query: ({ key, ...body }) => ({
        url: `/category/${key}/addItem`,
        body,
        method: 'PUT'
      }),
      // transformResponse: (r) => r.data
    }),
    removeItemFromCategory: builder.mutation({
      query: ({ key, item }) => ({
        url: `/category/${key}/removeItem/${item}`,
        method: 'DELETE'
      }),
      // transformResponse: (r) => r.data
    }),
    updateItem: builder.mutation({
      query: ({ key, item, ...body }) => ({
        url: `/category/${key}/item/update/${item}`,
        body,
        method: 'PUT'
      })
    }),
  })
});

export const {
  useFetchItemQuery,
  useFetchDataQuery,
  useFetchCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateArticleMutation,
  useSaveNewCategoryMutation,
  useArchiveCategoryMutation,
  useUnarchiveCategoryMutation,
  useAddItemToCategoryMutation,
  useRemoveItemFromCategoryMutation,
  useUpdateItemMutation
} = displayApi;
