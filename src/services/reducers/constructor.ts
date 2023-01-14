import { 
  ACTION_CONSTRUCTOR_ADD, ACTION_CONSTRUCTOR_CLEAR, ACTION_CONSTRUCTOR_REMOVE,
  ACTION_CONSTRUCTOR_MOVE,
  TConstructorActions
 } from '../actions/constructor';
import { ICartStore } from '../types/stores';

const constructorInitialState: ICartStore = {
    bun: null,
    ingredients: [],
};

/**
 * Reducer for burger constructor
 */
 export const constructorReducer = (state: ICartStore = constructorInitialState, action: TConstructorActions): ICartStore => {
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
        return {
          ...constructorInitialState
        };
      
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

      default:
        return state;
    }
};