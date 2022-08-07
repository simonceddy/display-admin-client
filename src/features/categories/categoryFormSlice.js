import { createSlice } from '@reduxjs/toolkit';
import { emptyCategoryVals } from './support';
import {
  pushAll, pushKey, removeKey, simpleSetter
} from '../../support/store';

export const categoryFormSlice = createSlice({
  name: 'categoryForm',
  initialState: {
    ...emptyCategoryVals,
    original: {}
  },
  reducers: {
    setFormValues: simpleSetter('values'),
    setOriginalData: (state, action) => {
      state.original = action.payload;
    },
    addItem: pushKey('items'),
    removeItem: removeKey('items'),
    addSubCat: pushKey('subCategories'),
    removeSubCat: removeKey('subCategories'),
    addAllItems: pushAll('items'),
    addAllSubs: pushAll('subCategories'),
    initItems: simpleSetter('items'),
    initSubs: simpleSetter('subCategories'),
    initForm: (state, action) => {
      state.items = (action.payload && action.payload.items)
        ? action.payload.items
        : [];
      state.subCategories = (action.payload && action.payload.categories)
        ? action.payload.categories
        : [];
      state.values = action.payload && action.payload.values
        ? action.payload.values
        : emptyCategoryVals.values;
    }
  },
});

export const {
  setFormValues,
  setOriginalData,
  addItem,
  addSubCat,
  removeItem,
  removeSubCat,
  addAllItems,
  addAllSubs,
  initItems,
  initSubs,
  initForm,
} = categoryFormSlice.actions;

export default categoryFormSlice.reducer;
