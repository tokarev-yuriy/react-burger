import { ACTION_CATALOG_DETAIL_SHOW, ACTION_CATALOG_DETAIL_HIDE } from '../actions/catalog-detail';

const catalogDetailInitialState = {
    detail: null
};

/**
 * Reducer for burger catalog details
 */
 export const catalogDetailReducer = (state = catalogDetailInitialState, action) => {
    switch(action.type) {
      case ACTION_CATALOG_DETAIL_SHOW:
        return {
          ...state, 
          detail: {...action.item}
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