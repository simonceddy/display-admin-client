import { createSlice } from '@reduxjs/toolkit';
import { emptyCategoryVals } from './support';

export const editCategorySlice = createSlice({
  name: 'editCategory',
  initialState: {
    values: emptyCategoryVals,
    original: {}
  },
  reducers: {
    setFormValues: (state, action) => {
      state.articles.values = action.payload;
    },
    setOriginalData: (state, action) => {
      state.original = action.payload;
    },
  },
});

export const { setFormValues, setOriginalData } = editCategorySlice.actions;

export default editCategorySlice.reducer;
