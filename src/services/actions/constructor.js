import { placeOrder } from '../../api/order';

// Actions for constructor
export const ACTION_CONSTRUCTOR_ADD = 'ACTION_CONSTRUCTOR_ADD';
export const ACTION_CONSTRUCTOR_CLEAR = 'ACTION_CONSTRUCTOR_CLEAR';
export const ACTION_CONSTRUCTOR_REMOVE = 'ACTION_CONSTRUCTOR_REMOVE';
export const ACTION_CONSTRUCTOR_MOVE = 'ACTION_CONSTRUCTOR_MOVE';

export const ACTION_CONSTRUCTOR_REQUEST = 'ACTION_CONSTRUCTOR_REQUEST';
export const ACTION_CONSTRUCTOR_REQUEST_FAIL = 'ACTION_CONSTRUCTOR_REQUEST_FAIL';
export const ACTION_CONSTRUCTOR_REQUEST_SUCCESS = 'ACTION_CONSTRUCTOR_REQUEST_SUCCESS';
export const ACTION_CONSTRUCTOR_ORDER_HIDE = 'ACTION_CONSTRUCTOR_ORDER_HIDE';

export function placeOrderAction() {
    return function(dispatch, getState) {
      const state = getState();
      dispatch({type: ACTION_CONSTRUCTOR_REQUEST});
      if (!state.cart.bun) {
        dispatch({type: ACTION_CONSTRUCTOR_REQUEST_FAIL});
        return;
      }
      let ingredients = [state.cart.bun._id, ...state.cart.ingredients.map(item => item._id), state.cart.bun._id];
      placeOrder(ingredients)
      .then(order => {
        dispatch({type: ACTION_CONSTRUCTOR_REQUEST_SUCCESS, order: order})
        dispatch({type: ACTION_CONSTRUCTOR_CLEAR})
      })
      .catch(err => {
        dispatch({type: ACTION_CONSTRUCTOR_REQUEST_FAIL});
      });
    }
  };