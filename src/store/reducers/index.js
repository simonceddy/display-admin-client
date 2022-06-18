import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import formsReducer from './forms';

const rootReducer = combineReducers({
  forms: formsReducer,
  data: dataReducer
});

export default rootReducer;
