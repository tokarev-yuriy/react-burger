import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppDispatch, RootState } from "..";
import { ILogoutAction, TLoginActions, TProfileActions, TRegisterActions } from '../actions/auth';
import { TCatalogActions } from '../actions/catalog';
import { TFeedActions } from '../actions/feed';
import { THistoryActions } from '../actions/history';
import { TOrderActions } from '../actions/order';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type TApplicationActions = 
  TCatalogActions | 
  TOrderActions | 
  TLoginActions | 
  ILogoutAction | 
  TRegisterActions | 
  TProfileActions |
  THistoryActions |
  TFeedActions;
type DispatchFunc = () => AppDispatch | AppThunk
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, RootState, TApplicationActions>
>;