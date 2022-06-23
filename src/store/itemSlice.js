import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  values: {
    title: '',
    body: ''
  },
  media: []
};

const itemSlice = createSlice({
  name: 'item',
  initialState: defaultState,
  reducers: {
    setItemMedia(state, action) {
      state.media.push(action.payload);
    },
    setItemValues(state, action) {
      state.values = action.payload;
    }
  }
});

export const { setItemMedia, setItemValues } = itemSlice.actions;

export default itemSlice.reducer;
