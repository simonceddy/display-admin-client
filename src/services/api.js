import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getCategoryBaseUrl = (category, sub) => {
  // console.log(category, sub);
  const uri = (
    `/category/${category}/${sub ? `subCategory/${sub}/` : ''}`
  );
  console.log(uri);
  return uri;
};

export const displayApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api' }),
  reducerPath: 'displayApi',
  tagTypes: ['Category', 'Item'],
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: () => '/category',
      providesTags: (result, error) => {
        if (error) console.error(error);
        return (result
          ? [...result.map(({ slug }) => ({ type: 'Category', slug })), 'Category']
          : ['Category']);
      }
    }),
    fetchCategory: builder.query({
      query: (key) => `/category/${key}`,
      providesTags: ['Category']
    }),
    fetchItem: builder.query({
      query: ({
        key: category,
        sub,
        item
      }) => `${getCategoryBaseUrl(category, sub)}item/${item}`,
      providesTags: ['Item']
    }),
    fetchSubCategory: builder.query({
      query: ({ key, sub }) => getCategoryBaseUrl(key, sub),
      providesTags: ['Category']
    }),
    saveNewCategory: builder.mutation({
      query: (body) => ({
        url: '/category/create',
        body,
        method: 'POST'
      }),
      transformResponse: (r) => r.data,
      invalidatesTags: ['Category']
    }),
    updateArticle: builder.mutation({
      query: ({ key, ...body }) => ({
        url: `/category/update/${key}`,
        body,
        method: 'PUT'
      }),
      transformResponse: (r) => r.data,
      invalidatesTags: ['Category']
    }),
    deleteCategory: builder.mutation({
      query: (key) => ({
        url: `/category/destroy/${key}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Category']
    }),
    archiveCategory: builder.mutation({
      query: (key) => ({
        url: `/category/archive/${key}`,
        method: 'PUT'
      }),
      invalidatesTags: ['Category']
    }),
    unarchiveCategory: builder.mutation({
      query: (key) => ({
        url: `/category/unarchive/${key}`,
        method: 'PUT'
      }),
      invalidatesTags: ['Category']
    }),
    publishCategory: builder.mutation({
      query: (key) => ({
        url: `/category/publish/${key}`,
        method: 'PUT'
      }),
      invalidatesTags: ['Category']
    }),
    unpublishCategory: builder.mutation({
      query: (key) => ({
        url: `/category/unpublish/${key}`,
        method: 'PUT'
      }),
      invalidatesTags: ['Category']
    }),
    addItemToCategory: builder.mutation({
      query: ({ key, sub, ...body }) => ({
        url: `${getCategoryBaseUrl(key, sub)}addItem`,
        body,
        method: 'PUT'
      }),
      invalidatesTags: ['Category', 'Item']
      // transformResponse: (r) => r.data
    }),
    removeItemFromCategory: builder.mutation({
      query: ({ key, sub, item }) => ({
        url: `${getCategoryBaseUrl(key, sub)}removeItem/${item}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Category', 'Item']
      // transformResponse: (r) => r.data
    }),
    updateItem: builder.mutation({
      query: ({
        key, sub, item, ...body
      }) => ({
        url: `${getCategoryBaseUrl(key, sub)}item/update/${item}`,
        body,
        method: 'PUT'
      }),
      invalidatesTags: ['Category', 'Item']
    }),
    addSubCategoryToCategory: builder.mutation({
      query: ({ key, ...body }) => ({
        url: `/category/${key}/addSubCategory`,
        body,
        method: 'PUT'
      }),
      invalidatesTags: ['Category']
      // transformResponse: (r) => r.data
    }),
    removeSubCategoryFromCategory: builder.mutation({
      query: ({ key, sub }) => ({
        url: `/category/${key}/removeSubCategory/${sub}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Category']
      // transformResponse: (r) => r.data
    }),
    updateSubCategory: builder.mutation({
      query: ({ key, sub, ...body }) => ({
        url: `/category/${key}/subCategory/update/${sub}`,
        body,
        method: 'PUT'
      }),
      invalidatesTags: ['Category']
    }),
    fetchDisplayConfig: builder.query({
      query: () => '/display-conf'
    }),
    updateDisplayConfig: builder.mutation({
      query: (body) => ({
        url: '/display-conf/update',
        method: 'PUT',
        body
      })
    })
  })

});

export const {
  useFetchItemQuery,
  useFetchDataQuery,
  useFetchCategoryQuery,
  useFetchSubCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateArticleMutation,
  useSaveNewCategoryMutation,
  useArchiveCategoryMutation,
  useUnarchiveCategoryMutation,
  useAddItemToCategoryMutation,
  useRemoveItemFromCategoryMutation,
  useUpdateItemMutation,
  useAddSubCategoryToCategoryMutation,
  useRemoveSubCategoryFromCategoryMutation,
  useUpdateSubCategoryMutation,
  usePublishCategoryMutation,
  useUnpublishCategoryMutation,
  useFetchDisplayConfigQuery,
  useUpdateDisplayConfigMutation
} = displayApi;
