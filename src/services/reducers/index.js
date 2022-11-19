import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { catalogReducer } from './catalog';

export const rootReducer = combineReducers({
  cart: constructorReducer,
  catalog: catalogReducer,
});