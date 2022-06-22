import { configureStore } from '@reduxjs/toolkit';
import createCategory from './createCategory';
import createItem from './createItem';

export const store = configureStore({
  reducer: {
    createCategory,
    createItem
  },
});
