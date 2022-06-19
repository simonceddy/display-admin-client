import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import formsReducer from './forms';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  forms: formsReducer,
  data: dataReducer,
  error: errorReducer
});

export default rootReducer;
