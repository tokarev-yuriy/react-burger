import { TLoginActions } from "../actions/auth";
import { authInitialState, authReducer as reducer } from "./auth";
import * as actions from "../actions/auth";
import { TToken, TUser } from "../../utils/types";
import { tokenStorage } from "../token-storage";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { IAuthStore } from "../types/stores";
import createMockStore from "redux-mock-store";
import { AnyAction } from "redux";
import { AppThunk } from "../types/hooks";

describe('Auth reducer', () => {

  beforeEach(() => {
    tokenStorage.getInstance().clearToken();
  });

  afterEach(() => {
    tokenStorage.getInstance().clearToken();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as unknown as TLoginActions)).toEqual(authInitialState)
  })

  /**
   * Login Actions
   */
  it('should handle ACTION_LOGIN_REQUEST', () => {
    expect(
      reducer(undefined, actions.getLoginAction())
    ).toEqual({
      ...authInitialState,
      loginRequest: true,
      loginRequestFail: false,
    })
  })

  it('should handle ACTION_LOGIN_REQUEST', () => {
    expect(
      reducer(undefined, actions.getLoginFailedAction())
    ).toEqual({
      ...authInitialState,
      loginRequest: false,
      loginRequestFail: true,
    })
  })

  it('should handle ACTION_LOGIN_REQUEST_SUCCESS', () => {
    const user: TUser = {
      email: 'test',
      name: 'test'
    };
    const token: TToken = {
      access: 'test',
      refresh: 'test'
    };
    expect(
      reducer(undefined, actions.getLoginSuccessAction(user, token))
    ).toEqual({
      ...authInitialState,
      user: user,
      loginRequest: false,
      loginRequestFail: false,
    });
    expect(
      tokenStorage.getInstance().getToken()
    ).toEqual(token);
  })

  /**
   * Register Actions
   */
   it('should handle ACTION_REGISTER_REQUEST', () => {
    expect(
      reducer(undefined, actions.getRegisterAction())
    ).toEqual({
      ...authInitialState,
      registerRequest: true,
      registerRequestFail: false,
    })
  })

  it('should handle ACTION_REGISTER_REQUEST', () => {
    expect(
      reducer(undefined, actions.getRegisterFailedAction())
    ).toEqual({
      ...authInitialState,
      registerRequest: false,
      registerRequestFail: true,
    })
  })

  it('should handle ACTION_REGISTER_REQUEST_SUCCESS', () => {
    const user: TUser = {
      email: 'test',
      name: 'test'
    };
    const token: TToken = {
      access: 'test',
      refresh: 'test'
    };
    expect(
      reducer(undefined, actions.getRegisterSuccessAction(user, token))
    ).toEqual({
      ...authInitialState,
      user: user,
      registerRequest: false,
      registerRequestFail: false,
    });
    expect(
      tokenStorage.getInstance().getToken()
    ).toEqual(token);
  })

  /**
   * Profile Actions
   */
   it('should handle ACTION_PROFILE_REQUEST', () => {
    expect(
      reducer(undefined, actions.getProfileAction())
    ).toEqual({
      ...authInitialState,
      profileRequest: true,
      profileRequestFail: false,
    })
  })

  it('should handle ACTION_PROFILE_REQUEST', () => {
    expect(
      reducer(undefined, actions.getProfileFailedAction('error'))
    ).toEqual({
      ...authInitialState,
      profileRequest: false,
      profileRequestFail: true,
      profileError: 'error'
    })
  })

  it('should handle ACTION_PROFILE_REQUEST_SUCCESS', () => {
    const user: TUser = {
      email: 'test',
      name: 'test'
    };
    expect(
      reducer(undefined, actions.getProfileSuccessAction(user))
    ).toEqual({
      ...authInitialState,
      user: user,
      profileRequest: false,
      profileRequestFail: false,
    });
  })

  /**
   * Logout action
   */
   it('should handle ACTION_LOGOUT_REQUEST', () => {
    expect(
      reducer(undefined, actions.getLogoutAction())
    ).toEqual({
      ...authInitialState,
    })
  })


  /**
   * Thunk actions
   */
  const mockStore = createMockStore([thunk]);

  const user: TUser = {
     email: 'test',
     name: 'test'
  };
  const token: TToken = {
     access: 'test',
     refresh: 'test'
  };
  test("should fire 2 actions if register was successfull", () => {
    jest.spyOn(global, "fetch").mockImplementation( 
      jest.fn(
        () => Promise.resolve({ 
          ok: true,
          json: () => Promise.resolve({ 
            success: true,
            user: user,
            accessToken: token.access,
            refreshToken: token.refresh 
          }), 
      }), 
    ) as jest.Mock );

    const expectedActions = [
      { type: actions.ACTION_REGISTER_REQUEST },
      { type: actions.ACTION_REGISTER_REQUEST_SUCCESS, user: user, token: token },
    ];
    const store = mockStore({});

    store.dispatch<any>(actions.register({ email: "email", password: "password" }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("should fire 2 actions if register was failed", () => {
    jest.spyOn(global, "fetch").mockImplementation( 
      jest.fn(
        () => Promise.resolve({ 
          ok: true,
          json: () => Promise.resolve({ 
            success: false,
          }), 
      }), 
    ) as jest.Mock );

    const expectedActions = [
      { type: actions.ACTION_REGISTER_REQUEST },
      { type: actions.ACTION_REGISTER_REQUEST_FAIL },
    ];
    const store = mockStore({});

    store.dispatch<any>(actions.register({ email: "email", password: "password" }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("should fire 2 actions if login was successfull", () => {
    jest.spyOn(global, "fetch").mockImplementation( 
      jest.fn(
        () => Promise.resolve({ 
          ok: true,
          json: () => Promise.resolve({ 
            success: true,
            user: user,
            accessToken: token.access,
            refreshToken: token.refresh 
          }), 
      }), 
    ) as jest.Mock );

    const expectedActions = [
      { type: actions.ACTION_LOGIN_REQUEST },
      { type: actions.ACTION_LOGIN_REQUEST_SUCCESS, user: user, token: token },
    ];
    const store = mockStore({});

    store.dispatch<any>(actions.login({ email: "email", password: "password" }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("should fire 2 actions if login was failed", () => {
    jest.spyOn(global, "fetch").mockImplementation( 
      jest.fn(
        () => Promise.resolve({ 
          ok: true,
          json: () => Promise.resolve({ 
            success: false,
          }), 
      }), 
    ) as jest.Mock );

    const expectedActions = [
      { type: actions.ACTION_LOGIN_REQUEST },
      { type: actions.ACTION_LOGIN_REQUEST_FAIL },
    ];
    const store = mockStore({});

    store.dispatch<any>(actions.login({ email: "email", password: "password" }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("should fire 2 actions if profile was successfull", () => {
    jest.spyOn(global, "fetch").mockImplementation( 
      jest.fn(
        () => Promise.resolve({ 
          ok: true,
          json: () => Promise.resolve({ 
            success: true,
            user: user,
            accessToken: token.access,
            refreshToken: token.refresh 
          }), 
      }), 
    ) as jest.Mock );

    const expectedActions = [
      { type: actions.ACTION_PROFILE_REQUEST },
      { type: actions.ACTION_PROFILE_REQUEST_SUCCESS, user: user },
    ];
    const store = mockStore({});

    store.dispatch<any>(actions.saveProfile({ email: "email", password: "password" }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("should fire 2 actions if profile was failed", () => {
    jest.spyOn(global, "fetch").mockImplementation( 
      jest.fn(
        () => Promise.resolve({ 
          ok: true,
          json: () => Promise.resolve({ 
            success: false,
          }), 
      }), 
    ) as jest.Mock );

    const expectedActions = [
      { type: actions.ACTION_PROFILE_REQUEST },
      { type: actions.ACTION_PROFILE_REQUEST_FAIL, error: "Api error" },
    ];
    const store = mockStore({});

    store.dispatch<any>(actions.saveProfile({ email: "email", password: "password" }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("should fire 1 action if logout was successfull", () => {
    jest.spyOn(global, "fetch").mockImplementation( 
      jest.fn(
        () => Promise.resolve({ 
          ok: true,
          json: () => Promise.resolve({ 
            success: true,
          }), 
      }), 
    ) as jest.Mock );

    const expectedActions = [
      { type: actions.ACTION_LOGOUT_REQUEST_SUCCESS },
    ];
    const store = mockStore({});

    store.dispatch<any>(actions.logout())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

})

