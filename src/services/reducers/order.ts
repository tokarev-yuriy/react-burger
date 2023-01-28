import { 
  ACTION_ORDER_REQUEST, ACTION_ORDER_REQUEST_FAIL, 
  ACTION_ORDER_REQUEST_SUCCESS, ACTION_ORDER_HIDE, TOrderActions
} from '../actions/order';
import { IOrderStore } from '../types/stores';

const orderInitialState: IOrderStore = {
    order: null,
    orderRequest: false,
    orderRequestFail: false,
};

/**
 * Reducer for burger order
 */
 export const orderReducer = (state: IOrderStore = orderInitialState, action: TOrderActions): IOrderStore => {
    switch(action.type) {
      
      case ACTION_ORDER_REQUEST:
        return {
          ...state, 
          orderRequest: true
        }

      case ACTION_ORDER_REQUEST_FAIL:
        return {
          ...state, 
          orderRequest: false, 
          orderRequestFail: true
        }

      case ACTION_ORDER_REQUEST_SUCCESS:
        return {
          ...state, 
          order: action.order, 
          orderRequest: false, 
          orderRequestFail: false
        };

      case ACTION_ORDER_HIDE:
        return {...orderInitialState};

      default:
        return state;
    }
};