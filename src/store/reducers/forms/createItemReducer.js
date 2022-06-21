import { ITEM_SET_MEDIA, ITEM_SET_VALUES } from '../../actions';

const defaultState = {
  values: {
    title: '',
    body: ''
  },
  media: []
};

export default function createItemReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case ITEM_SET_VALUES:
      return { ...state, values: { ...action.payload.values } };
    case ITEM_SET_MEDIA:
      return { ...state, media: [...action.payload.media] };
    default:
      return state;
  }
}
