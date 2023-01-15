import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { catalogReducer } from './catalog';
import { authReducer } from './auth';
import { feedReducer } from './feed';
import { historyReducer } from './history';

export const rootReducer = combineReducers({
  cart: constructorReducer,
  order: orderReducer,
  catalog: catalogReducer,
  auth: authReducer,
  feed: feedReducer,
  history: historyReducer,
});