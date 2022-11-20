import { ACTION_CATALOG_REQUEST, ACTION_CATALOG_REQUEST_FAIL, ACTION_CATALOG_REQUEST_SUCCESS, ACTION_CATALOG_DETAIL_SHOW, ACTION_CATALOG_DETAIL_HIDE } from '../actions/catalog';

const catalogInitialState = {
    catalogRequest: false,
    catalogRequestFail: false,
    ingredients: [],
    detail: null
};

/**
 * Reducer for burger catalog
 */
 export const catalogReducer = (state = catalogInitialState, action) => {
    switch(action.type) {
      case ACTION_CATALOG_REQUEST:
        return {
          ...state,
          catalogRequest: true
        }

      case ACTION_CATALOG_REQUEST_FAIL:
        return {
          ...state, 
          catalogRequest: false, 
          catalogRequestFail: true
        }

      case ACTION_CATALOG_REQUEST_SUCCESS:
        return {
          ...state, 
          ingredients: action.items, 
          catalogRequest: false, 
          catalogRequestFail: false
        }

      case ACTION_CATALOG_DETAIL_SHOW:
        return {
          ...state, 
          detail: state.ingredients.find(item => item._id === action.id)
        }

      case ACTION_CATALOG_DETAIL_HIDE:
        return {
          ...state, 
          detail: null
        }
        
      default:
        return state;
    }
};