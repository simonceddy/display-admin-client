import client from '../../util/client';

import { pushError } from './errors';

export const DATA_SET_FILTER = 'DATA_SET_FILTER';
export const DATA_SET_ALL = 'DATA_SET_ALL';
export const DATA_SET_FETCHED = 'DATA_SET_FETCHED';
export const DATA_SET_CURRENT = 'DATA_SET_CURRENT';

export const ITEM_SET_VALUES = 'ITEM_SET_VALUES';
export const ITEM_SET_MEDIA = 'ITEM_SET_MEDIA';

export const setItemValues = (values = {}) => ({
  type: ITEM_SET_VALUES,
  payload: { values }
});

export const setItemMedia = (media = []) => ({
  type: ITEM_SET_MEDIA,
  payload: { media }
});

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

export const setFetched = () => ({
  type: DATA_SET_FETCHED,
});

export const fetchData = () => (dispatch) => client.get('/api/category')
  .then((r) => dispatch(setData(r.data)))
  .then(() => dispatch(setFetched()))
  .catch((e) => {
    console.error(e);
    dispatch(pushError(e));
  });

export const CATEGORY_FORM_SET_VALUES = 'CATEGORY_FORM_SET_VALUES';
export const CATEGORY_FORM_RESET = 'CATEGORY_FORM_RESET';

export const setValues = (values = {}) => ({
  type: CATEGORY_FORM_SET_VALUES,
  payload: { values }
});

export const resetForm = () => ({
  type: CATEGORY_FORM_RESET
});

export const fetchCategory = (key) => async (dispatch, getState) => {
  const { data } = getState();
  if (!data.fetched) await dispatch(fetchData());
  const category = data.all.find((c) => c.key && c.key === key);
  if (category) return dispatch(setValues(category));
  return dispatch(pushError({
    message: 'Category not found.'
  }));
};
