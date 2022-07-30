import { createSlice } from '@reduxjs/toolkit';

export const editCategorySlice = createSlice({
  name: 'editCategory',
  initialState: {
    values: {
      title: '',
      subCategories: [],
      items: [],
    },
    original: {}
  },
  reducers: {
    setFormValues: (state, action) => {
      state.values = action.payload;
    },
    setOriginalData: (state, action) => {
      state.original = action.payload;
    }
  },
});

export const { setFormValues, setOriginalData } = editCategorySlice.actions;

export default editCategorySlice.reducer;
