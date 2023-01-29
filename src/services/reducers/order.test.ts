import { orderInitialState, orderReducer as reducer } from "./order";
import * as actions from "../actions/order";
import { TCartIngredient, TOrderNumber } from "../../utils/types";
import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ACTION_CONSTRUCTOR_CLEAR } from "../actions/constructor";

describe('Order reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as unknown as actions.TOrderActions)).toEqual(orderInitialState)
  })

  /**
   * Order Actions
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

  /**
   * Thunk actions
   */
  const mockStore = createMockStore([thunk]);
  const order = {number: 123};
  const bun: TCartIngredient = {
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v":0,
    "id": 1,
  };
  const ingredient: TCartIngredient = {
    "_id":"60666c42cc7b410027a1a9b5",
    "name":"Говяжий метеорит (отбивная)",
    "type":"main",
    "proteins":800,
    "fat":800,
    "carbohydrates":300,
    "calories":2674,
    "price":3000,
    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
    "__v":0,
    "id": 2,
  };
  test("should fire 3 actions if placeOrder was successfull", () => {
    jest.spyOn(global, "fetch").mockImplementation( 
      jest.fn(
        () => Promise.resolve({ 
          ok: true,
          json: () => Promise.resolve({ 
            success: true,
            order: order
          }), 
      }), 
    ) as jest.Mock );

    const expectedActions = [
      { type: actions.ACTION_ORDER_REQUEST },
      { type: actions.ACTION_ORDER_REQUEST_SUCCESS, order: {orderId: order.number} },
      { type: ACTION_CONSTRUCTOR_CLEAR },
    ];
    const store = mockStore({
      cart: {
        bun: bun,
        ingredients: [ingredient]
      }
    });

    store.dispatch<any>(actions.placeOrderAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("should fire 2 actions if placeOrder was failed", () => {
    jest.spyOn(global, "fetch").mockImplementation( 
      jest.fn(
        () => Promise.resolve({ 
          ok: false,
          json: () => Promise.resolve({ 
            success: false,
          }), 
      }), 
    ) as jest.Mock );

    const expectedActions = [
      { type: actions.ACTION_ORDER_REQUEST },
      { type: actions.ACTION_ORDER_REQUEST_FAIL },
    ];
    const store = mockStore({cart: {
      bun: bun,
      ingredients: [ingredient]
    }});

    store.dispatch<any>(actions.placeOrderAction()).
    then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

}) 