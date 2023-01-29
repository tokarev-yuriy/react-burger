import { constructorInitialState, constructorReducer as reducer } from "./constructor";
import * as actions from "../actions/constructor";
import { TIngredient } from "../../utils/types";

describe('Constructor reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as unknown as actions.TConstructorActions)).toEqual(constructorInitialState)
  })

  const bun: TIngredient = {
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
    "__v":0
  };
  const ingredient: TIngredient = {
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
    "__v":0
  };

  it('should handle bun add', () => {
    expect(
      reducer(undefined, actions.getConstructorAddAction({...bun, id: 1}))
    ).toEqual({
      ...constructorInitialState,
      bun: {...bun, id: 1},
    })
  })

  it('should handle ingredient add', () => {
    expect(
      reducer(undefined, actions.getConstructorAddAction({...ingredient, id: 1}))
    ).toEqual({
      ...constructorInitialState,
      ingredients: [{...ingredient, id: 1}],
    })
  })

  it('should handle clear', () => {
    let prevState = reducer(undefined, actions.getConstructorAddAction({...bun, id: 1}));
    prevState = reducer(prevState, actions.getConstructorAddAction({...ingredient, id: 2}));
    expect(
      reducer(prevState, actions.getConstructorClearAction())
    ).toEqual({
      ...constructorInitialState,
    })
  })

  it('should handle remove', () => {
    let prevState = reducer(undefined, actions.getConstructorAddAction({...ingredient, id: 1}));
    prevState = reducer(prevState, actions.getConstructorAddAction({...ingredient, id: 2}));
    prevState = reducer(prevState, actions.getConstructorAddAction({...ingredient, id: 3}));
    expect(
      reducer(prevState, actions.getConstructorRemoveAction(2))
    ).toEqual({
      ...constructorInitialState,
      ingredients: [{...ingredient, id: 1}, {...ingredient, id: 3}],
    })
  })

  it('should handle remove', () => {
    let prevState = reducer(undefined, actions.getConstructorAddAction({...ingredient, id: 1}));
    prevState = reducer(prevState, actions.getConstructorAddAction({...ingredient, id: 2}));
    prevState = reducer(prevState, actions.getConstructorAddAction({...ingredient, id: 3}));
    expect(
      reducer(prevState, actions.getConstructorMoveAction(1,3))
    ).toEqual({
      ...constructorInitialState,
      ingredients: [{...ingredient, id: 3}, {...ingredient, id: 1}, {...ingredient, id: 2}],
    })
  })

}) 