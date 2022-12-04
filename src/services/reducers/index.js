import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { catalogReducer } from './catalog';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  cart: constructorReducer,
  order: orderReducer,
  catalog: catalogReducer,
  auth: authReducer,
});