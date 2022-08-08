import { configureStore } from '@reduxjs/toolkit';
import { displayApi } from '../services/api';
import { testApi } from '../services/testApi';
import dashboard from '../features/dashboard/dashboardSlice';
import subCategoryForm from '../features/categories/subCategoryFormSlice';
import itemForm from '../features/items/itemFormSlice';
import categoryForm from '../features/categories/categoryFormSlice';
import notifications from '../features/notifications/notificationsSlice';

export const store = configureStore({
  reducer: {
    [displayApi.reducerPath]: displayApi.reducer,
    [testApi.reducerPath]: testApi.reducer,
    dashboard,
    subCategoryForm,
    itemForm,
    categoryForm,
    notifications,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    displayApi.middleware
  )
});
