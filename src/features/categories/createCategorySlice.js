import { createSlice } from '@reduxjs/toolkit';
import { emptyCategoryVals } from './support';

export const createCategorySlice = createSlice({
  name: 'createCategory',
  initialState: {
    values: emptyCategoryVals
  },
  reducers: {
    setValues: (state, action) => {
      state.values = action.payload;
    },
    clearValues: (state) => {
      state.values = emptyCategoryVals;
    }
  },
});

export const {
  setValues,
  clearValues
} = createCategorySlice.actions;

export default createCategorySlice.reducer;
