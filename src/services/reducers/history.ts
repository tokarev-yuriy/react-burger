import { 
  ACTION_HISTORY_REQUEST, ACTION_HISTORY_REQUEST_FAIL, 
  ACTION_HISTORY_REQUEST_SUCCESS, THistoryActions
} from '../actions/history';
import { IHistoryStore } from '../types/stores';

export const historyInitialState: IHistoryStore = {
    orders: [],
    historyRequest: false,
    historyRequestFail: false,
};

/**
 * Reducer for history
 */
 export const historyReducer = (state: IHistoryStore = historyInitialState, action: THistoryActions): IHistoryStore => {
    switch(action.type) {
      case ACTION_HISTORY_REQUEST:
        return {
          ...state, 
          historyRequest: true
        }

      case ACTION_HISTORY_REQUEST_FAIL:
        return {
          ...state,
          historyRequest: false, 
          historyRequestFail: true
        }

      case ACTION_HISTORY_REQUEST_SUCCESS:
        return {
          ...state, 
          orders: action.data.orders,
          historyRequest: false, 
          historyRequestFail: false
        };

      default:
        return state;
    }
};