import { configureStore } from '@reduxjs/toolkit';
import { displayApi } from '../services/api';
import categoryReducer from './cagtegorySlice';
import errorsReducer from './errorsSlice';
import itemReducer from './itemSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    item: itemReducer,
    errors: errorsReducer,
    [displayApi.reducerPath]: displayApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    displayApi.middleware
  )
});
