import { combineReducers } from 'redux';
import formsReducer from './forms';

const rootReducer = combineReducers({
  forms: formsReducer
});

export default rootReducer;
