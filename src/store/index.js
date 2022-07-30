import { configureStore } from '@reduxjs/toolkit';
import { displayApi } from '../services/api';
import { testApi } from '../services/testApi';
import categoryReducer from './cagtegorySlice';
import errorsReducer from './errorsSlice';
import itemReducer from './itemSlice';
import newCategoryReducer from './newCategorySlice';
import editCategory from '../features/categories/editCategorySlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    item: itemReducer,
    errors: errorsReducer,
    [displayApi.reducerPath]: displayApi.reducer,
    newCategory: newCategoryReducer,
    [testApi.reducerPath]: testApi.reducer,
    editCategory,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    displayApi.middleware
  )
});
