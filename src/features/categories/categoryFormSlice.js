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
    setThumbnail: simpleSetter('thumbnail'),
    addItem: pushKey('items'),
    removeItem: removeKey('items'),
    setItems: simpleSetter('items'),
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
      state.thumbnail = (action.payload && action.payload.thumbnail)
        ? action.payload.thumbnail
        : null;
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
  setThumbnail,
  setItems,
} = categoryFormSlice.actions;

export default categoryFormSlice.reducer;
