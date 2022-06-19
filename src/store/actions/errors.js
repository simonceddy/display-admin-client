export const PUSH_ERROR = 'PUSH_ERROR';
export const CLEAR_FIRST_ERROR = 'CLEAR_FIRST_ERROR';
export const pushError = (error) => ({
  type: PUSH_ERROR,
  payload: { error }
});

export const clearFirstError = () => ({
  type: CLEAR_FIRST_ERROR,
});
