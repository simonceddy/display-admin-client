import { createSlice } from '@reduxjs/toolkit';
import {
  pushAll,
  pushKey,
  removeKey,
  simpleSetter
} from '../../support/store';
import { emptyCategoryVals } from './support';

export const createSubCategorySlice = createSlice({
  name: 'createSubCategorySlice',
  initialState: {
    values: { title: '' },
    items: [],
    thumbnail: null,
    parent: null,
  },
  reducers: {
    setSubValues: simpleSetter('values'),
    addItem: pushKey('items'),
    removeItem: removeKey('items'),
    setParentKey: (state, action) => {
      state.parent = action.payload;
    },
    setThumbnail: simpleSetter('thumbnail'),
    addAllItems: pushAll('items'),
    setItems: simpleSetter('items'),
    initForm: (state, action) => {
      state.items = (action.payload && action.payload.items)
        ? action.payload.items
        : [];
      state.values = action.payload && action.payload.values
        ? action.payload.values
        : emptyCategoryVals.values;
      state.thumbnail = action.payload && action.payload.thumbnail
        ? action.payload.thumbnail
        : null;
    }
  },
});

export const {
  setSubValues, addItem, removeItem, addAllItems, initForm, setThumbnail, setItems
} = createSubCategorySlice.actions;

export default createSubCategorySlice.reducer;
