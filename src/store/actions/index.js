import client from '../../util/client';

export { default as formActions } from './formActions';

export const DATA_SET_FILTER = 'DATA_SET_FILTER';
export const DATA_SET_ALL = 'DATA_SET_ALL';
export const DATA_SET_FETCHED = 'DATA_SET_FETCHED';

export const setFilter = (filter) => ({
  type: DATA_SET_FILTER,
  payload: { filter }
});

export const setData = (data = []) => ({
  type: DATA_SET_ALL,
  payload: { data }
});

export const setFetched = () => ({
  type: DATA_SET_FETCHED,
});

export const fetchData = () => (dispatch) => client.get('/api/category')
  .then((r) => dispatch(setData(r.data)))
  .then(() => dispatch(setFetched()))
  .catch(console.error);
