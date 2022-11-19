import { ACTION_CONSTRUCTOR_ADD, ACTION_CONSTRUCTOR_CLEAR, ACTION_CONSTRUCTOR_REMOVE } from '../actions/constructor';

const constructorInitialState = {
    bun: null,
    ingredients: []
};

/**
 * Reducer for burger constructor
 * @param {bun: , ingredients: } state 
 * @param {type: add|remove|clear, playbook: } action 
 * @returns {bun: , ingredients: }
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
      default:
        return state;
    }
};