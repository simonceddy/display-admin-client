import { CLEAR_FIRST_ERROR, PUSH_ERROR } from '../actions';

const defaultState = {
  all: []
};

let eList;

export default function errorReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case PUSH_ERROR:
      return { ...state, all: [...state.all, action.payload.error] };
    case CLEAR_FIRST_ERROR:
      eList = state.all;
      eList.shift();
      return { ...state, all: [...eList] };
    default:
      return state;
  }
}
