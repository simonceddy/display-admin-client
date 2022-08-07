import { createSlice } from '@reduxjs/toolkit';
import { pushKey, simpleSetter } from '../../support/store';

const initialState = {
  values: {
    title: '',
    body: ''
  },
  media: [],
  unsaved: {}
};

export const itemFormSlice = createSlice({
  name: 'itemForm',
  initialState,
  reducers: {
    addItemMedia: pushKey('media'),
    setItemValues: simpleSetter('values'),
    clearMedia(state) {
      state.media = [];
    },
    initMedia: (state, action) => {
      state.media = action.payload;
    },
    initForm: (state, action) => {
      state.values = (action.payload && action.payload.values)
        ? action.payload.values
        : initialState.values;
      state.media = (action.payload && action.payload.media)
        ? action.payload.media
        : [];
    }
  },
});

export const {
  addItemMedia, setItemValues, clearMedia, initMedia, initForm
} = itemFormSlice.actions;

export default itemFormSlice.reducer;
