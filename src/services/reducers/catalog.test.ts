import { catalogInitialState, catalogReducer as reducer } from "./catalog";
import * as actions from "../actions/catalog";
import { testData } from "../../utils/data";

describe('Catalog reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as unknown as actions.TCatalogActions)).toEqual(catalogInitialState)
  })

  /**
   * Catalog Actions
   */
  it('should handle ACTION_CATALOG_REQUEST', () => {
    expect(
      reducer(undefined, actions.getCatalogAction())
    ).toEqual({
      ...catalogInitialState,
      catalogRequest: true,
      catalogRequestFail: false,
    })
  })

  it('should handle ACTION_CATALOG_REQUEST_FAILED', () => {
    expect(
      reducer(undefined, actions.getCatalogFailedAction())
    ).toEqual({
      ...catalogInitialState,
      catalogRequest: false,
      catalogRequestFail: true,
    })
  })

  it('should handle ACTION_CATALOG_REQUEST_SUCCESS', () => {
    expect(
      reducer(undefined, actions.getCatalogSuccessAction(testData))
    ).toEqual({
      ...catalogInitialState,
      ingredients: testData
    });
  })

}) 