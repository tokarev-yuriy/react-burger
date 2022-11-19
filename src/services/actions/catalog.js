import { getIngredientsService } from '../../api/ingredients';

// Actions of catalog
export const ACTION_CATALOG_DETAIL_SHOW = 'ACTION_CATALOG_DETAIL_SHOW';
export const ACTION_CATALOG_DETAIL_HIDE = 'ACTION_CATALOG_DETAIL_HIDE';
export const ACTION_CATALOG_REQUEST = 'ACTION_CATALOG_REQUEST';
export const ACTION_CATALOG_REQUEST_FAIL = 'ACTION_CATALOG_REQUEST_FAIL';
export const ACTION_CATALOG_REQUEST_SUCCESS = 'ACTION_CATALOG_REQUEST_SUCCESS';

export function getCatalog() {
  return function(dispatch) {
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