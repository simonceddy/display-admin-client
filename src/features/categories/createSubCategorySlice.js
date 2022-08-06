import { createSlice } from '@reduxjs/toolkit';
import {
  pushAll,
  pushKey,
  removeKey,
  simpleSetter
} from '../../support/store';

export const createSubCategorySlice = createSlice({
  name: 'createSubCategorySlice',
  initialState: {
    values: { title: '' },
    items: [],
    parent: null,
  },
  reducers: {
    setSubValues: simpleSetter('values'),
    addItem: pushKey('items'),
    removeItem: removeKey('items'),
    setParentKey: (state, action) => {
      state.parent = action.payload;
    },
    addAllItems: pushAll('items')
  },
});

export const {
  setSubValues, addItem, removeItem, addAllItems
} = createSubCategorySlice.actions;

export default createSubCategorySlice.reducer;
