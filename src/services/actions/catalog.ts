import { Action, Dispatch } from 'redux';
import { getIngredientsService } from '../../api/ingredients';
import { AppThunk } from '../../utils/types';

// Actions of catalog
export const ACTION_CATALOG_REQUEST = 'ACTION_CATALOG_REQUEST';
export const ACTION_CATALOG_REQUEST_FAIL = 'ACTION_CATALOG_REQUEST_FAIL';
export const ACTION_CATALOG_REQUEST_SUCCESS = 'ACTION_CATALOG_REQUEST_SUCCESS';

export function getCatalog(): AppThunk {
  return function(dispatch: Dispatch<Action<string>>) {
    dispatch({type: ACTION_CATALOG_REQUEST});
    getIngredientsService()
    .then(items => {
        dispatch({type: ACTION_CATALOG_REQUEST_SUCCESS, items: items})
    })
    .catch(err => {
        dispatch({type: ACTION_CATALOG_REQUEST_FAIL});
    });
  }
};