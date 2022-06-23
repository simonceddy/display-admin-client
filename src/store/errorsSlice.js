import { createSlice } from '@reduxjs/toolkit';

export const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    errors: []
  },
  reducers: {
    pushError(state, action) {
      state.errors.push(action.payload);
    },
    shiftError(state) {
      state.errors.shift();
    }
  },
});

// export const { } = errorsSlice.actions;

export default errorsSlice.reducer;
