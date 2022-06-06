import { combineReducers } from 'redux';
import createCategoryReducer from './createCategoryReducer';

const formsReducer = combineReducers({
  createCategory: createCategoryReducer
});

export default formsReducer;
