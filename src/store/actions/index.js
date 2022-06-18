export const DATA_SET_FILTER = 'DATA_SET_FILTER';

export const action = (filter) => ({
  type: DATA_SET_FILTER,
  payload: { filter }
});
