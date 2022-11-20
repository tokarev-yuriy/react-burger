import { placeOrder } from '../../api/order';
import { ACTION_CONSTRUCTOR_CLEAR } from './constructor';

// Actions for order
export const ACTION_ORDER_REQUEST = 'ACTION_ORDER_REQUEST';
export const ACTION_ORDER_REQUEST_FAIL = 'ACTION_ORDER_REQUEST_FAIL';
export const ACTION_ORDER_REQUEST_SUCCESS = 'ACTION_ORDER_REQUEST_SUCCESS';
export const ACTION_ORDER_HIDE = 'ACTION_ORDER_HIDE';

export function placeOrderAction() {
    return function(dispatch, getState) {
      const state = getState();
      dispatch({type: ACTION_ORDER_REQUEST});
      if (!state.cart.bun) {
        dispatch({type: ACTION_ORDER_REQUEST_FAIL});
        return;
      }
      const ingredients = [
        state.cart.bun._id, 
        ...state.cart.ingredients.map(item => item._id), 
        state.cart.bun._id
      ];
      placeOrder(ingredients)
      .then(order => {
        dispatch({type: ACTION_ORDER_REQUEST_SUCCESS, order: order})
        dispatch({type: ACTION_CONSTRUCTOR_CLEAR})
      })
      .catch(err => {
        dispatch({type: ACTION_ORDER_REQUEST_FAIL});
      });
    }
  };