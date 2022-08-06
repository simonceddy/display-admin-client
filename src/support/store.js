export const simpleSetter = (key) => (state, action) => {
  state[key] = action.payload;
};

export const pushKey = (key) => (state, action) => {
  state[key].push(action.payload);
};

export const removeKey = (key) => (state, action) => {
  state[key] = state[key].filter((i) => i !== action.payload);
};

export const pushAll = (key) => (state, action) => {
  state[key] = [...state[key], ...action.payload];
};

export const categorySharedReducers = {
  setFormValues: simpleSetter('values'),
  addItem: pushKey('items'),
  removeItem: removeKey('items'),
  addAllItems: pushAll('items'),
  initItems: simpleSetter('items'),
};
