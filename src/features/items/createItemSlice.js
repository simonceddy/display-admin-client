import { createSlice } from '@reduxjs/toolkit';

export const createItemSlice = createSlice({
  name: 'createItem',
  initialState: {
    values: {
      title: '',
      body: ''
    },
    media: [],
    unsaved: {}
  },
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
  },
});

export const { addItemMedia, setItemValues, clearMedia } = createItemSlice.actions;

export default createItemSlice.reducer;
