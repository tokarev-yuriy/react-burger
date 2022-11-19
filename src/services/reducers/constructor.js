import { 
  ACTION_CONSTRUCTOR_ADD, ACTION_CONSTRUCTOR_CLEAR, ACTION_CONSTRUCTOR_REMOVE,
  ACTION_CONSTRUCTOR_REQUEST, ACTION_CONSTRUCTOR_REQUEST_FAIL, 
  ACTION_CONSTRUCTOR_REQUEST_SUCCESS, ACTION_CONSTRUCTOR_ORDER_HIDE
 } from '../actions/constructor';

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
        if (!action.playbook) {
          throw new Error('No ingredient');
        }
        if (action.playbook.type === 'bun') {
          return {...state, bun: action.playbook};
        }
        return {...state, ingredients: [...state.ingredients, action.playbook]}
      case ACTION_CONSTRUCTOR_CLEAR:
        return {bun: null, ingredients: []};
      case ACTION_CONSTRUCTOR_REMOVE:
        if (state.bun && state.bun._id === action.playbook) {
          return {...state, bun: null};
        }
        return {...state, ingredients: state.ingredients.filter(item => item._id !== action.playbook)};
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