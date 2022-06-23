import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  values: {
    title: '',
    body: '',
  },
  categories: [],
  items: []
};

const categorySlice = createSlice({
  name: 'category',
  initialState: defaultState,
  reducers: {
    setCategoryValues(state, action) {
      state.values = action.payload;
    },
  }
});

export const { setCategoryValues } = categorySlice.actions;
export default categorySlice.reducer;
