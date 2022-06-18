import { DATA_SET_ALL, DATA_SET_FETCHED, DATA_SET_FILTER } from '../actions';

const defaultState = {
  all: [],
  filter: false,
  fetched: false,
  current: null
};

export default function dataReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case DATA_SET_FILTER:
      return { ...state, filter: action.payload.filter };
    case DATA_SET_ALL:
      return { ...state, all: action.payload.data };
    case DATA_SET_FETCHED:
      return { ...state, fetched: true };
    default:
      return state;
  }
}
