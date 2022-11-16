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
  tagTypes: ['Category', 'SubCategory', 'Item'],
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: () => '/category',
      providesTags: (result, error) => {
        if (error) console.error(error);
        return (result
          ? [...result.map(({ key }) => ({ type: 'Category', key })), 'Category']
          : ['Category']);
      }
    }),
    fetchCategory: builder.query({
      query: (key) => `/category/${key}`,
      providesTags: (result, error, key) => {
        console.log(result);
        if (error) console.error(error);
        return [
          {
            type: 'Category', key
          },
          ...result.categories.map((sub) => ({
            type: 'SubCategory',
            key: sub.key
          })),
          'SubCategory',
          ...result.items.map((item) => ({
            type: 'Item',
            key: item.key
          })),
          'Item'
        ];
      }
    }),
    fetchItem: builder.query({
      query: ({
        key: category,
        sub,
        item
      }) => `${getCategoryBaseUrl(category, sub)}item/${item}`,
      providesTags: (result, error, { key, sub, item }) => [
        { type: 'Item', key: item },
        { type: 'Category', key },
        { type: 'SubCategory', key: sub },
      ]
    }),
    fetchSubCategory: builder.query({
      query: ({ key, sub }) => getCategoryBaseUrl(key, sub),
      providesTags: (result, error, { sub }) => {
        console.log(result);
        return [
          { type: 'SubCategory', key: sub },
          ...result.items.map((item) => ({
            type: 'Item',
            key: item.key
          })),
          'Item'
        ];
      }
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
      invalidatesTags: (result, error, { key }) => {
        console.log(key);
        return [{ type: 'Category', key }, 'Category'];
      }
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
      invalidatesTags: (result, error, key) => [{ type: 'Category', key }]
    }),
    unarchiveCategory: builder.mutation({
      query: (key) => ({
        url: `/category/unarchive/${key}`,
        method: 'PUT'
      }),
      invalidatesTags: (result, error, key) => [{ type: 'Category', key }]
    }),
    publishCategory: builder.mutation({
      query: (key) => ({
        url: `/category/publish/${key}`,
        method: 'PUT'
      }),
      invalidatesTags: (result, error, key) => [{ type: 'Category', key }]
    }),
    unpublishCategory: builder.mutation({
      query: (key) => ({
        url: `/category/unpublish/${key}`,
        method: 'PUT'
      }),
      invalidatesTags: (result, error, key) => [{ type: 'Category', key }]
    }),
    addItemToCategory: builder.mutation({
      query: ({ key, sub, ...body }) => ({
        url: `${getCategoryBaseUrl(key, sub)}addItem`,
        body,
        method: 'PUT'
      }),
      invalidatesTags: ['Category', 'SubCategory', 'Item']
      // transformResponse: (r) => r.data
    }),
    removeItemFromCategory: builder.mutation({
      query: ({ key, sub, item }) => ({
        url: `${getCategoryBaseUrl(key, sub)}removeItem/${item}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, { key, sub, item }) => [
        { type: 'Category', key },
        { type: 'SubCategory', key: sub },
        { type: 'Item', key: item }
      ]
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
      invalidatesTags: (result, error, { key, sub, item }) => {
        if (error) {
          console.error(error);
        }
        return [
          { type: 'Category', key },
          { type: 'SubCategory', key: sub },
          { type: 'Item', key: item }
        ];
      }
    }),
    addSubCategoryToCategory: builder.mutation({
      query: ({ key, ...body }) => ({
        url: `/category/${key}/addSubCategory`,
        body,
        method: 'PUT'
      }),
      invalidatesTags: (result, error, key) => [{ type: 'Category', key }, 'Category', 'SubCategory']
      // transformResponse: (r) => r.data
    }),
    removeSubCategoryFromCategory: builder.mutation({
      query: ({ key, sub }) => ({
        url: `/category/${key}/removeSubCategory/${sub}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Category', 'SubCategory']
      // transformResponse: (r) => r.data
    }),
    updateSubCategory: builder.mutation({
      query: ({ key, sub, ...body }) => ({
        url: `/category/${key}/subCategory/update/${sub}`,
        body,
        method: 'PUT'
      }),
      invalidatesTags: (result, error, { key, sub }) => [
        { type: 'Category', key },
        { type: 'SubCategory', key: sub },
      ]
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
