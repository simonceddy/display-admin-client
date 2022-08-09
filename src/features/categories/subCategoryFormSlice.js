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
    parent: null,
  },
  reducers: {
    setSubValues: simpleSetter('values'),
    addItem: pushKey('items'),
    removeItem: removeKey('items'),
    setParentKey: (state, action) => {
      state.parent = action.payload;
    },
    addAllItems: pushAll('items'),
    initForm: (state, action) => {
      state.items = (action.payload && action.payload.items)
        ? action.payload.items
        : [];
      state.values = action.payload && action.payload.values
        ? action.payload.values
        : emptyCategoryVals.values;
    }
  },
});

export const {
  setSubValues, addItem, removeItem, addAllItems, initForm
} = createSubCategorySlice.actions;

export default createSubCategorySlice.reducer;
