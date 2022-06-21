import { combineReducers } from 'redux';
import createCategoryReducer from './createCategoryReducer';
import createItemReducer from './createItemReducer';

const formsReducer = combineReducers({
  createCategory: createCategoryReducer,
  createItem: createItemReducer,
});

export default formsReducer;
