import { createSlice } from '@reduxjs/toolkit';
import { categoryFns as fns } from './shared';

export const newCategorySlice = createSlice({
  name: 'newCategory',
  initialState: {
    values: {
      title: '',
      body: ''
    },
    items: [],
    categories: [],
    published: false, // Use to publish on save if selected
    archived: false, // Probably not useful here
    saved: false
  },
  reducers: {
    ...fns
  },
});

export const {
  setCategoryValues, pushItem, pushSubCategory, removeItem, removeSubCategory
} = newCategorySlice.actions;

export default newCategorySlice.reducer;
