import { DATA_SET_FILTER } from '../actions';

const defaultState = {
  all: [],
  filter: false,
};

export default function dataReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case DATA_SET_FILTER:
      return { ...state, filter: action.payload.filter };
    default:
      return state;
  }
}
