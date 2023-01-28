import { orderInitialState, orderReducer as reducer } from "./order";
import * as actions from "../actions/order";
import { TOrderNumber } from "../../utils/types";

describe('Order reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as unknown as actions.TOrderActions)).toEqual(orderInitialState)
  })

  /**
   * History Actions
   */
  it('should handle ACTION_ORDER_REQUEST', () => {
    expect(
      reducer(undefined, actions.getOrderAction())
    ).toEqual({
      ...orderInitialState,
      orderRequest: true,
      orderRequestFail: false,
    })
  })

  it('should handle ACTION_ORDER_REQUEST_FAILED', () => {
    expect(
      reducer(undefined, actions.getOrderFailedAction())
    ).toEqual({
      ...orderInitialState,
      orderRequest: false,
      orderRequestFail: true,
    })
  })

  it('should handle ACTION_ORDER_REQUEST_SUCCESS', () => {
    const order: TOrderNumber = {
      orderId: 1
    }
    expect(
      reducer(undefined, actions.getOrderSuccessAction(order))
    ).toEqual({
      ...orderInitialState,
      order: order
    });
  })

  it('should handle ACTION_ORDER_HIDE', () => {
    const order: TOrderNumber = {
      orderId: 1
    }
    const prevState = reducer(undefined, actions.getOrderSuccessAction(order))
    expect(
      reducer(prevState, actions.getOrderHideAction())
    ).toEqual({
      ...orderInitialState,
    });
  })

}) 