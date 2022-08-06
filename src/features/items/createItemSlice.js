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

export const createItemSlice = createSlice({
  name: 'createItem',
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
    initForm: (state) => {
      state.values = initialState.values;
      state.media = [];
    }
  },
});

export const {
  addItemMedia, setItemValues, clearMedia, initMedia, initForm
} = createItemSlice.actions;

export default createItemSlice.reducer;
