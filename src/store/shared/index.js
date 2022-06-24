export function setCategoryValues(state, action) {
  state.values = action.payload;
}

export function pushItem(state, action) {
  state.items.push(action.payload);
}

export function removeItem(state, action) {
  state.items = state.items.filter((i) => i.key !== action.payload);
}
export function pushSubCategory(state, action) {
  state.categories.push(action.payload);
}

export function removeSubCategory(state, action) {
  state.categories = state.categories.filter((c) => c.key !== action.payload);
}

export const categoryFns = {
  setCategoryValues,
  pushItem,
  removeItem,
  pushSubCategory,
  removeSubCategory
};
