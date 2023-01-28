import { feedInitialState, feedReducer as reducer } from "./feed";
import * as actions from "../actions/feed";
import { testFeed } from "../../utils/data";

describe('Feed reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as unknown as actions.TFeedActions)).toEqual(feedInitialState)
  })

  /**
   * Feed Actions
   */
  it('should handle ACTION_FEED_REQUEST', () => {
    expect(
      reducer(undefined, actions.getFeedAction())
    ).toEqual({
      ...feedInitialState,
      feedRequest: true,
      feedRequestFail: false,
    })
  })

  it('should handle ACTION_FEED_REQUEST_FAILED', () => {
    expect(
      reducer(undefined, actions.getFeedFailedAction())
    ).toEqual({
      ...feedInitialState,
      feedRequest: false,
      feedRequestFail: true,
    })
  })

  it('should handle ACTION_FEED_REQUEST_SUCCESS', () => {
    expect(
      reducer(undefined, actions.getFeedSuccessAction(testFeed))
    ).toEqual({
      ...feedInitialState,
      orders: testFeed.orders,
      total: testFeed.total,
      totalToday: testFeed.totalToday,
    });
  })

  /**
   * Socket Actions
   */
   it('should handle ACTION_FEED_OPEN', () => {
    expect(
      reducer(undefined, actions.getFeedOpenAction())
    ).toEqual({
      ...feedInitialState,
    })
  })

  it('should handle ACTION_FEED_CLOSE', () => {
    expect(
      reducer(undefined, actions.getFeedCloseAction())
    ).toEqual({
      ...feedInitialState,
    })
  })

}) 