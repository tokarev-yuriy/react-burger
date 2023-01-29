import { 
  ACTION_FEED_REQUEST, ACTION_FEED_REQUEST_FAIL, 
  ACTION_FEED_REQUEST_SUCCESS, TFeedActions
} from '../actions/feed';
import { IFeedStore } from '../types/stores';

export const feedInitialState: IFeedStore = {
    orders: [],
    total: 0,
    totalToday: 0,
    feedRequest: false,
    feedRequestFail: false,
};

/**
 * Reducer for feed
 */
 export const feedReducer = (state: IFeedStore = feedInitialState, action: TFeedActions): IFeedStore => {
    switch(action.type) {
      case ACTION_FEED_REQUEST:
        return {
          ...state, 
          feedRequest: true
        }

      case ACTION_FEED_REQUEST_FAIL:
        return {
          ...state,
          feedRequest: false, 
          feedRequestFail: true
        }

      case ACTION_FEED_REQUEST_SUCCESS:
        return {
          ...state, 
          orders: action.data.orders,
          total: action.data.total, 
          totalToday: action.data.totalToday, 
          feedRequest: false, 
          feedRequestFail: false
        };

      default:
        return state;
    }
};