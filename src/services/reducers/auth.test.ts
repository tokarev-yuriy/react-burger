import { TLoginActions } from "../actions/auth";
import { authInitialState, authReducer as reducer } from "./auth";
import * as actions from "../actions/auth";
import { TToken, TUser } from "../../utils/types";
import { tokenStorage } from "../token-storage";

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

}) 