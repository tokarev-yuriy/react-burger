import { 
  ACTION_CONSTRUCTOR_ADD, ACTION_CONSTRUCTOR_CLEAR, ACTION_CONSTRUCTOR_REMOVE,
  ACTION_CONSTRUCTOR_REQUEST, ACTION_CONSTRUCTOR_REQUEST_FAIL, 
  ACTION_CONSTRUCTOR_REQUEST_SUCCESS, ACTION_CONSTRUCTOR_ORDER_HIDE,
  ACTION_CONSTRUCTOR_MOVE
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
        if (!action.item) {
          throw new Error('No ingredient');
        }
        if (action.item.type === 'bun') {
          return {
            ...state, 
            bun: action.item
          };
        }
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            action.item
          ]
        }
      
      case ACTION_CONSTRUCTOR_CLEAR:
        return constructorInitialState;
      
      case ACTION_CONSTRUCTOR_MOVE:
        const hoverIndex = state.ingredients.findIndex((item) => item.id === action.src);
        const dragIndex = state.ingredients.findIndex((item) => item.id === action.dest);

        const updateData = [...state.ingredients];
        updateData.splice(hoverIndex, 0, updateData.splice(dragIndex, 1)[0]);

        return {
          ...state,
          ingredients: updateData,
        };
      case ACTION_CONSTRUCTOR_REMOVE:
        return {
          ...state,
          ingredients: state.ingredients.filter(item => item.id !== action.id)
        };
      
      case ACTION_CONSTRUCTOR_REQUEST:
        return {
          ...state, 
          orderRequest: true
        }

      case ACTION_CONSTRUCTOR_REQUEST_FAIL:
        return {
          ...state, 
          orderRequest: false, 
          orderRequestFail: true
        }

      case ACTION_CONSTRUCTOR_REQUEST_SUCCESS:
        return {
          ...state, 
          order: action.order, 
          orderRequest: false, 
          orderRequestFail: false
        };

      case ACTION_CONSTRUCTOR_ORDER_HIDE:
        return {
          ...state, 
          order: null
        };

      default:
        return state;
    }
};