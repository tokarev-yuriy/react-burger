import { 
  ACTION_CONSTRUCTOR_ADD, ACTION_CONSTRUCTOR_CLEAR, ACTION_CONSTRUCTOR_REMOVE,
  ACTION_CONSTRUCTOR_REQUEST, ACTION_CONSTRUCTOR_REQUEST_FAIL, 
  ACTION_CONSTRUCTOR_REQUEST_SUCCESS, ACTION_CONSTRUCTOR_ORDER_HIDE
 } from '../actions/constructor';
 import { guuid } from '../../utils/guuid';

const constructorInitialState = {
    bun: null,
    ingredients: [],
    order: null,
    orderRequest: false,
    orderRequestFail: false,
};

/**
 * Reducer for burger constructor
 */
 export const constructorReducer = (state = constructorInitialState, action) => {
    switch(action.type) {
      case ACTION_CONSTRUCTOR_ADD:
        if (!action.item) {
          throw new Error('No ingredient');
        }
        if (action.item.type === 'bun') {
          return {...state, bun: action.item};
        }
        return {...state, ingredients: [...state.ingredients, {...action.item, id: guuid()}]}
      case ACTION_CONSTRUCTOR_CLEAR:
        return {bun: null, ingredients: []};
      case ACTION_CONSTRUCTOR_REMOVE:
        return {...state, ingredients: state.ingredients.filter(item => item.id !== action.id)};
      case ACTION_CONSTRUCTOR_REQUEST:
        return {...state, orderRequest: true}
      case ACTION_CONSTRUCTOR_REQUEST_FAIL:
        return {...state, orderRequest: false, orderRequestFail: true}
      case ACTION_CONSTRUCTOR_REQUEST_SUCCESS:
        return {...state, order: action.order, orderRequest: false, orderRequestFail: false};
      case ACTION_CONSTRUCTOR_ORDER_HIDE:
        return {...state, order: null};
      default:
        return state;
    }
};