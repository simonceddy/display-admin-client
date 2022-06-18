import { CATEGORY_FORM_RESET, CATEGORY_FORM_SET_VALUES } from '../../actions/formActions';

const defaultState = {
  values: {
    title: '',
    body: '',
  },
  categories: [],
  items: []
};

export default function createCategoryReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case CATEGORY_FORM_SET_VALUES:
      return { ...state, values: { ...state.values, ...action.payload.values } };
    case CATEGORY_FORM_RESET:
      return { ...defaultState };
    default:
      return state;
  }
}
