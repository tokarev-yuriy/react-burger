import { TOrder } from '../../utils/types';

// Actions for feed
export const ACTION_FEED_OPEN : 'ACTION_FEED_OPEN' = 'ACTION_FEED_OPEN';
export const ACTION_FEED_CLOSE : 'ACTION_FEED_CLOSE' = 'ACTION_FEED_CLOSE';
export const ACTION_FEED_REQUEST : 'ACTION_FEED_REQUEST' = 'ACTION_FEED_REQUEST';
export const ACTION_FEED_REQUEST_FAIL : 'ACTION_FEED_REQUEST_FAIL' = 'ACTION_FEED_REQUEST_FAIL';
export const ACTION_FEED_REQUEST_SUCCESS : 'ACTION_FEED_REQUEST_SUCCESS' = 'ACTION_FEED_REQUEST_SUCCESS';

export interface IFeedOpenAction {
  readonly type: typeof ACTION_FEED_OPEN;
}
export interface IFeedCloseAction {
  readonly type: typeof ACTION_FEED_CLOSE;
}

export interface IFeedAction {
  readonly type: typeof ACTION_FEED_REQUEST;
}

export interface IFeedFailedAction {
  readonly type: typeof ACTION_FEED_REQUEST_FAIL;
}

export interface IWsResponse {
  readonly success: boolean;
  readonly orders: Array<TOrder>;
  readonly total: number;
  readonly totalToday: number;
}

export interface IFeedSuccessAction {
  readonly type: typeof ACTION_FEED_REQUEST_SUCCESS;
  readonly data: IWsResponse;
}

export type TFeedActions =
  | IFeedOpenAction
  | IFeedCloseAction
  | IFeedAction
  | IFeedFailedAction
  | IFeedSuccessAction;

export const getFeedOpenAction = (): IFeedOpenAction => ({
  type: ACTION_FEED_OPEN
});
export const getFeedCloseAction = (): IFeedCloseAction => ({
  type: ACTION_FEED_CLOSE
});

export const getFeedAction = (): IFeedAction => ({
  type: ACTION_FEED_REQUEST
});

export const getFeedFailedAction = (): IFeedFailedAction => ({
  type: ACTION_FEED_REQUEST_FAIL
});

export const getFeedSuccessAction = (data: IWsResponse): IFeedSuccessAction => ({
  type: ACTION_FEED_REQUEST_SUCCESS,
  data: data,
});