import { createSlice } from '@reduxjs/toolkit';

export const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    errors: [],
    hasErrors: false
  },
  reducers: {
    pushError(state, action) {
      state.errors.push(action.payload);
      if (!state.hasErrors) state.hasErrors = true;
    },
    shiftError(state) {
      state.errors.shift();
      if (state.errors.length === 0 && state.hasErrors) state.hasErrors = false;
    },
    clearErrors(state) {
      state.errors = [];
      state.hasErrors = false;
    }
  },
});

// export const { } = errorsSlice.actions;

export default errorsSlice.reducer;
