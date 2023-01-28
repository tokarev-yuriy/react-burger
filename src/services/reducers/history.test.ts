import { historyInitialState, historyReducer as reducer } from "./history";
import * as actions from "../actions/history";
import { testHistory } from "../../utils/data";

describe('History reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as unknown as actions.THistoryActions)).toEqual(historyInitialState)
  })

  /**
   * History Actions
   */
  it('should handle ACTION_HISTORY_REQUEST', () => {
    expect(
      reducer(undefined, actions.getHistoryAction())
    ).toEqual({
      ...historyInitialState,
      historyRequest: true,
      historyRequestFail: false,
    })
  })

  it('should handle ACTION_HISTORY_REQUEST_FAILED', () => {
    expect(
      reducer(undefined, actions.getHistoryFailedAction())
    ).toEqual({
      ...historyInitialState,
      historyRequest: false,
      historyRequestFail: true,
    })
  })

  it('should handle ACTION_HISTORY_REQUEST_SUCCESS', () => {
    expect(
      reducer(undefined, actions.getHistorySuccessAction(testHistory))
    ).toEqual({
      ...historyInitialState,
      orders: testHistory.orders
    });
  })

}) 