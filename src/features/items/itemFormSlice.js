import { createSlice } from '@reduxjs/toolkit';
import { pushKey, simpleSetter } from '../../support/store';

const initialState = {
  values: {
    title: '',
    body: ''
  },
  media: [],
  thumbnail: {
    src: '', alt: '', type: 'image'
  },
  unsaved: {}
};

export const itemFormSlice = createSlice({
  name: 'itemForm',
  initialState,
  reducers: {
    addItemMedia: pushKey('media'),
    setItemValues: simpleSetter('values'),
    setThumbnail: simpleSetter('thumbnail'),
    clearMedia: (state) => {
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
      state.thumbnail = (action.payload && action.payload.thumbnail)
        ? action.payload.thumbnail
        : { src: '', alt: '', type: 'image' };
    }
  },
});

export const {
  addItemMedia, setItemValues, clearMedia, initMedia, initForm, setThumbnail
} = itemFormSlice.actions;

export default itemFormSlice.reducer;
