import { catalogInitialState, catalogReducer as reducer } from "./catalog";
import * as actions from "../actions/catalog";
import { testData } from "../../utils/data";
import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";

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

  /**
   * Thunk actions
   */
  const mockStore = createMockStore([thunk]);
  test("should fire 2 actions if getCatalog was successfull", () => {
    jest.spyOn(global, "fetch").mockImplementation( 
      jest.fn(
        () => Promise.resolve({ 
          ok: true,
          json: () => Promise.resolve({ 
            success: true,
            data: testData
          }), 
      }), 
    ) as jest.Mock );

    const expectedActions = [
      { type: actions.ACTION_CATALOG_REQUEST },
      { type: actions.ACTION_CATALOG_REQUEST_SUCCESS, items: testData },
    ];
    const store = mockStore({});

    store.dispatch<any>(actions.getCatalog())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
 
  test("should fire 2 actions if getCatalog was failed", () => {
    jest.spyOn(global, "fetch").mockImplementation( 
      jest.fn(
        () => Promise.resolve({ 
          ok: false,
          json: () => Promise.resolve({ 
            success: false,
          }), 
      }), 
    ) as jest.Mock );

    const expectedActions = [
      { type: actions.ACTION_CATALOG_REQUEST },
      { type: actions.ACTION_CATALOG_REQUEST_FAIL },
    ];
    const store = mockStore({});

    store.dispatch<any>(actions.getCatalog())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

}) 