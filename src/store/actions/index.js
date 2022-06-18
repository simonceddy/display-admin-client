import client from '../../util/client';

export * from './formActions';

export const DATA_SET_FILTER = 'DATA_SET_FILTER';
export const DATA_SET_ALL = 'DATA_SET_ALL';
export const DATA_SET_FETCHED = 'DATA_SET_FETCHED';
export const DATA_SET_CURRENT = 'DATA_SET_CURRENT';
export const PUSH_ERROR = 'PUSH_ERROR';
export const CLEAR_FIRST_ERROR = 'CLEAR_FIRST_ERROR';

export const setFilter = (filter) => ({
  type: DATA_SET_FILTER,
  payload: { filter }
});

export const setData = (data = []) => ({
  type: DATA_SET_ALL,
  payload: { data }
});

export const setCurrentData = (current) => ({
  type: DATA_SET_CURRENT,
  payload: { current }
});

export const pushError = (error) => ({
  type: PUSH_ERROR,
  payload: { error }
});

export const clearFirstError = () => ({
  type: CLEAR_FIRST_ERROR,
});

export const setFetched = () => ({
  type: DATA_SET_FETCHED,
});

export const fetchData = () => (dispatch) => client.get('/api/category')
  .then((r) => dispatch(setData(r.data)))
  .then(() => dispatch(setFetched()))
  .catch(console.error);

export const fetchCategory = (key) => async (dispatch, state) => {
  if (!state.data.fetched) await dispatch(fetchData());
  const category = state.data.all.find((c) => c.key && c.key === key);
  if (category) return dispatch(setCurrentData(category));
  return dispatch(pushError({
    message: 'Category not found.'
  }));
};
