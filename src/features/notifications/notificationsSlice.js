import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    current: []
  },
  reducers: {
    pushNotification: (state, action) => {
      state.current.push(action.payload);
    },
    shiftNotification: (state) => {
      state.current.shift();
    }
  },
});

export const {
  pushNotification,
  shiftNotification
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
