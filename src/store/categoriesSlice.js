import { createSlice } from '@reduxjs/toolkit';

// TODO playing with handling mix of existing and new data
export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    data: {}
  },
  reducers: {
    initCategory(state, action) {
      if (action.payload.key) {
        state.data[action.payload.key] = {
          title: action.payload.title || '',
          body: action.payload.body || '',
          categories: action.payload.categories || [],
          items: action.payload.items || [],
          archived: action.payload.archived || false,
          published: action.payload.published || false
        };
      }
    },

  },
});

// export const { } = categoriesSlice.actions;

export default categoriesSlice.reducer;
