import { AppDispatch, RootState } from '..';
import { placeOrder } from '../../api/order';
import { TCartIngredient, TOrderNumber } from '../../utils/types';
import { AppThunk } from '../types/hooks';
import { getConstructorClearAction } from './constructor';

// Actions for order
export const ACTION_ORDER_REQUEST : 'ACTION_ORDER_REQUEST' = 'ACTION_ORDER_REQUEST';
export const ACTION_ORDER_REQUEST_FAIL : 'ACTION_ORDER_REQUEST_FAIL' = 'ACTION_ORDER_REQUEST_FAIL';
export const ACTION_ORDER_REQUEST_SUCCESS : 'ACTION_ORDER_REQUEST_SUCCESS' = 'ACTION_ORDER_REQUEST_SUCCESS';
export const ACTION_ORDER_HIDE : 'ACTION_ORDER_HIDE' = 'ACTION_ORDER_HIDE';

export interface IOrderAction {
  readonly type: typeof ACTION_ORDER_REQUEST;
}

export interface IOrderFailedAction {
  readonly type: typeof ACTION_ORDER_REQUEST_FAIL;
}

export interface IOrderSuccessAction {
  readonly type: typeof ACTION_ORDER_REQUEST_SUCCESS;
  readonly order: TOrderNumber;
}

export interface IOrderHideAction {
  readonly type: typeof ACTION_ORDER_HIDE;
}

export type TOrderActions =
  | IOrderAction
  | IOrderFailedAction
  | IOrderSuccessAction
  | IOrderHideAction;

export const getOrderAction = (): IOrderAction => ({
  type: ACTION_ORDER_REQUEST
});

export const getOrderFailedAction = (): IOrderFailedAction => ({
  type: ACTION_ORDER_REQUEST_FAIL
});

export const getOrderSuccessAction = (order: TOrderNumber): IOrderSuccessAction => ({
  type: ACTION_ORDER_REQUEST_SUCCESS,
  order: order
});

export const getOrderHideAction = (): IOrderHideAction => ({
  type: ACTION_ORDER_HIDE
});


export const placeOrderAction: AppThunk = () => (dispatch: AppDispatch, getState: ()=>RootState) => {
      const state = getState();
      dispatch(getOrderAction());
      if (!state.cart.bun) {
        dispatch(getOrderFailedAction());
        return;
      }
      const ingredients = [
        state.cart.bun._id, 
        ...state.cart.ingredients.map((item: TCartIngredient) => item._id), 
        state.cart.bun._id
      ];
      placeOrder(ingredients)
      .then(order => {
        dispatch(getOrderSuccessAction(order));
        dispatch(getConstructorClearAction());
      })
      .catch(err => {
        dispatch(getOrderFailedAction());
      });
};