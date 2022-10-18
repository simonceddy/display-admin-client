import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    current: []
  },
  reducers: {
    addNotification: (state, action) => {
      state.current.unshift(action.payload);
    },
    shiftNotification: (state) => {
      state.current.shift();
    }
  },
});

export const {
  addNotification,
  shiftNotification
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
