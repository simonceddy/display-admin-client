import { configureStore } from '@reduxjs/toolkit';
import { displayApi } from '../services/api';
import { testApi } from '../services/testApi';
// import categoryReducer from './cagtegorySlice';
import errorsReducer from './errorsSlice';
// import itemReducer from './itemSlice';
import editCategory from '../features/categories/editCategorySlice';
import dashboard from '../features/dashboard/dashboardSlice';
import subCategoryForm from '../features/categories/subCategoryFormSlice';
import itemForm from '../features/items/itemFormSlice';
import categoryForm from '../features/categories/categoryFormSlice';

export const store = configureStore({
  reducer: {
    // category: categoryReducer,
    // item: itemReducer,
    errors: errorsReducer,
    [displayApi.reducerPath]: displayApi.reducer,
    [testApi.reducerPath]: testApi.reducer,
    editCategory,
    dashboard,
    subCategoryForm,
    itemForm,
    categoryForm,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    displayApi.middleware
  )
});
