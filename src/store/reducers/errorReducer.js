import { CLEAR_FIRST_ERROR, PUSH_ERROR } from '../actions/errors';

const defaultState = {
  all: [],
  hasErrors: false
};

let eList;

export default function errorReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case PUSH_ERROR:
      return { ...state, all: [...state.all, action.payload.error], hasErrors: true };
    case CLEAR_FIRST_ERROR:
      eList = state.all;
      eList.shift();
      return { ...state, all: [...eList], hasErrors: eList.length > 0 };
    default:
      return state;
  }
}
