import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { catalogReducer } from './catalog';
import { catalogDetailReducer } from './catalog-detail';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  cart: constructorReducer,
  order: orderReducer,
  catalog: catalogReducer,
  catalogDetail: catalogDetailReducer,
  auth: authReducer,
});