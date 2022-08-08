import { createSlice } from '@reduxjs/toolkit';
import { pushKey, removeKey } from '../../support/store';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    current: []
  },
  reducers: {
    addNotification: pushKey('current'),
    removeNotification: removeKey('current')
  },
});

export const {
  addNotification,
  removeNotification
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
