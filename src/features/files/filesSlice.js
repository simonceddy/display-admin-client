import { createSlice } from '@reduxjs/toolkit';

export const filesSlice = createSlice({
  name: 'files',
  initialState: {
    current: []
  },
  reducers: {
    addFiles: (state, action) => {
      state.current = [...state.current, ...action.payload];
    },
    removeFile: (state, action) => {
      state.current = state.current.filter((f) => f !== action.payload);
    }
  },
});

export const { addFiles, removeFile } = filesSlice.actions;

export default filesSlice.reducer;
