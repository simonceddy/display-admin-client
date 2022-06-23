import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  values: {
    title: '',
    body: ''
  },
  media: [],
  unsaved: {}
};

// TODO assign unsaved items to categories
// TODO clear new item form state on save/remove from unsaved
// TODO empty default values for different categories
const itemSlice = createSlice({
  name: 'item',
  initialState: defaultState,
  reducers: {
    addItemMedia(state, action) {
      state.media.push(action.payload);
    },
    setItemValues(state, action) {
      state.values = action.payload;
    },
    clearMedia(state) {
      state.media = [];
    }
  }
});

export const { addItemMedia, setItemValues } = itemSlice.actions;

export default itemSlice.reducer;
