import { ACTION_CATALOG_REQUEST, ACTION_CATALOG_REQUEST_FAIL, ACTION_CATALOG_REQUEST_SUCCESS, TCatalogActions } from '../actions/catalog';
import { ICatalogStore } from '../types/stores';

export const catalogInitialState: ICatalogStore = {
    catalogRequest: false,
    catalogRequestFail: false,
    ingredients: [],
};

/**
 * Reducer for burger catalog
 */
 export const catalogReducer = (state: ICatalogStore = catalogInitialState, action: TCatalogActions): ICatalogStore => {
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

      default:
        return state;
    }
};