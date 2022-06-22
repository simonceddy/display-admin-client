import { createReducer } from '@reduxjs/toolkit';
import { CATEGORY_FORM_RESET, CATEGORY_FORM_SET_VALUES } from './actions';

const defaultState = {
  values: {
    title: '',
    body: '',
  },
  categories: [],
  items: []
};

const createCategoryReducer = createReducer(defaultState, (builder) => {
  builder
    .addCase(CATEGORY_FORM_SET_VALUES, (state, action) => {
      state.values = action.payload;
    })
    .addCase(CATEGORY_FORM_RESET, (state) => {
      state.values = defaultState.values;
    });
});

export default createCategoryReducer;
