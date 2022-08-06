import { createSlice } from '@reduxjs/toolkit';
import {
  categorySharedReducers,
  pushAll, pushKey, removeKey
} from '../../support/store';
import { emptyCategoryVals } from './support';

export const createCategorySlice = createSlice({
  name: 'createCategory',
  initialState: {
    ...emptyCategoryVals
  },
  reducers: {
    clearValues: (state) => {
      state.values = emptyCategoryVals;
    },
    addSubCat: pushKey('subCategories'),
    removeSubCat: removeKey('subCategories'),
    addAllSubs: pushAll('subCategories'),
    ...categorySharedReducers
  },
});

export const {
  setValues,
  clearValues,
  addAllItems,
  addAllSubs,
  addItem,
  addSubCat,
  removeItem,
  removeSubCat
} = createCategorySlice.actions;

export default createCategorySlice.reducer;
