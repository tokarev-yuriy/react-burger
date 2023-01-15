import { TOrder } from '../../utils/types';

// Actions for history
export const ACTION_HISTORY_OPEN : 'ACTION_HISTORY_OPEN' = 'ACTION_HISTORY_OPEN';
export const ACTION_HISTORY_CLOSE : 'ACTION_HISTORY_CLOSE' = 'ACTION_HISTORY_CLOSE';
export const ACTION_HISTORY_REQUEST : 'ACTION_HISTORY_REQUEST' = 'ACTION_HISTORY_REQUEST';
export const ACTION_HISTORY_REQUEST_FAIL : 'ACTION_HISTORY_REQUEST_FAIL' = 'ACTION_HISTORY_REQUEST_FAIL';
export const ACTION_HISTORY_REQUEST_SUCCESS : 'ACTION_HISTORY_REQUEST_SUCCESS' = 'ACTION_HISTORY_REQUEST_SUCCESS';

export interface IHistoryOpenAction {
  readonly type: typeof ACTION_HISTORY_OPEN;
}
export interface IHistoryCloseAction {
  readonly type: typeof ACTION_HISTORY_CLOSE;
}

export interface IHistoryAction {
  readonly type: typeof ACTION_HISTORY_REQUEST;
}

export interface IHistoryFailedAction {
  readonly type: typeof ACTION_HISTORY_REQUEST_FAIL;
}

export interface IWsResponse {
  readonly success: boolean;
  readonly orders: Array<TOrder>;
  readonly total: number;
  readonly totalToday: number;
}

export interface IHistorySuccessAction {
  readonly type: typeof ACTION_HISTORY_REQUEST_SUCCESS;
  readonly data: IWsResponse;
}

export type THistoryActions =
  | IHistoryOpenAction
  | IHistoryCloseAction
  | IHistoryAction
  | IHistoryFailedAction
  | IHistorySuccessAction;

export const getHistoryOpenAction = (): IHistoryOpenAction => ({
  type: ACTION_HISTORY_OPEN
});
export const getHistoryCloseAction = (): IHistoryCloseAction => ({
  type: ACTION_HISTORY_CLOSE
});

export const getHistoryAction = (): IHistoryAction => ({
  type: ACTION_HISTORY_REQUEST
});

export const getHistoryFailedAction = (): IHistoryFailedAction => ({
  type: ACTION_HISTORY_REQUEST_FAIL
});

export const getHistorySuccessAction = (data: IWsResponse): IHistorySuccessAction => ({
  type: ACTION_HISTORY_REQUEST_SUCCESS,
  data: data,
});