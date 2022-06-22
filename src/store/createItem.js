import { createReducer } from '@reduxjs/toolkit';
import { ITEM_SET_MEDIA, ITEM_SET_VALUES } from './actions';

const defaultState = {
  values: {
    title: '',
    body: ''
  },
  media: []
};

const createItemReducer = createReducer(defaultState, (builder) => {
  builder
    .addCase(ITEM_SET_MEDIA, (state, action) => {
      state.media.push(action.payload);
    })
    .addCase(ITEM_SET_VALUES, (state, action) => {
      state.values = action.payload;
    });
});

export default createItemReducer;
