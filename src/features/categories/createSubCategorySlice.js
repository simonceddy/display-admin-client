import { createSlice } from '@reduxjs/toolkit';

export const createSubCategorySlice = createSlice({
  name: 'createSubCategorySlice',
  initialState: {
    values: { title: '' },
    items: [],
    parent: null,
  },
  reducers: {
    setSubValues: (state, action) => {
      state.values = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i !== action.payload);
    },
    setParentKey: (state, action) => {
      state.parent = action.payload;
    }
  },
});

export const { setSubValues, addItem, removeItem } = createSubCategorySlice.actions;

export default createSubCategorySlice.reducer;
