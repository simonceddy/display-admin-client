export const CATEGORY_FORM_SET_VALUES = 'CATEGORY_FORM_SET_VALUES';
export const CATEGORY_FORM_RESET = 'CATEGORY_FORM_RESET';

export const setValues = (values = {}) => ({
  type: CATEGORY_FORM_SET_VALUES,
  payload: { values }
});

export const resetForm = () => ({
  type: CATEGORY_FORM_RESET
});
