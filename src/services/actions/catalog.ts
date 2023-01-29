import { AppDispatch } from '..';
import { getIngredientsService } from '../../api/ingredients';
import { TIngredient } from '../../utils/types';
import { AppThunk } from '../types/hooks';

// Actions of catalog
export const ACTION_CATALOG_REQUEST : 'ACTION_CATALOG_REQUEST' = 'ACTION_CATALOG_REQUEST';
export const ACTION_CATALOG_REQUEST_FAIL : 'ACTION_CATALOG_REQUEST_FAIL'  = 'ACTION_CATALOG_REQUEST_FAIL';
export const ACTION_CATALOG_REQUEST_SUCCESS : 'ACTION_CATALOG_REQUEST_SUCCESS'  = 'ACTION_CATALOG_REQUEST_SUCCESS';

export interface ICatalogAction {
    readonly type: typeof ACTION_CATALOG_REQUEST;
}

export interface ICatalogFailedAction {
    readonly type: typeof ACTION_CATALOG_REQUEST_FAIL;
}

export interface ICatalogSuccessAction {
    readonly type: typeof ACTION_CATALOG_REQUEST_SUCCESS;
    readonly items: Array<TIngredient>;
}

export type TCatalogActions =
    | ICatalogAction
    | ICatalogFailedAction
    | ICatalogSuccessAction;

export const getCatalogAction = (): ICatalogAction => ({
    type: ACTION_CATALOG_REQUEST
});

export const getCatalogFailedAction = (): ICatalogFailedAction => ({
    type: ACTION_CATALOG_REQUEST_FAIL
});

export const getCatalogSuccessAction = (items: Array<TIngredient>): ICatalogSuccessAction => ({
    type: ACTION_CATALOG_REQUEST_SUCCESS,
    items: items
});


export const getCatalog: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getCatalogAction());
    return getIngredientsService()
    .then(items => {
        dispatch(getCatalogSuccessAction(items))
    })
    .catch(err => {
        dispatch(getCatalogFailedAction());
    });
};