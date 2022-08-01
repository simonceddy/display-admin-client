import { createSlice } from '@reduxjs/toolkit';

export const FILTER_NONE = 'FILTER_NONE';
export const FILTER_CURRENT = 'FILTER_CURRENT';
export const FILTER_ARCHIVED = 'FILTER_ARCHIVED';
export const FILTER_UNPUBLISHED = 'FILTER_UNPUBLISHED';

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    filterBy: FILTER_NONE
  },
  reducers: {
    setFilter: (state, action) => {
      state.filterBy = action.payload;
    }
  },
});

export const { setFilter } = dashboardSlice.actions;

export default dashboardSlice.reducer;
