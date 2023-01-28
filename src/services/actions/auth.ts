import { AppDispatch } from "..";
import { loginUser, logoutUser, registerUser, saveUser } from "../../api/auth";
import { TToken, TUser } from "../../utils/types";
import { AppThunk } from "../types/hooks";


// Actions for register
export const ACTION_REGISTER_REQUEST : 'ACTION_REGISTER_REQUEST' = 'ACTION_REGISTER_REQUEST';
export const ACTION_REGISTER_REQUEST_FAIL : 'ACTION_REGISTER_REQUEST_FAIL' = 'ACTION_REGISTER_REQUEST_FAIL';
export const ACTION_REGISTER_REQUEST_SUCCESS : 'ACTION_REGISTER_REQUEST_SUCCESS' = 'ACTION_REGISTER_REQUEST_SUCCESS';

export interface IRegisterAction {
  readonly type: typeof ACTION_REGISTER_REQUEST;
}

export interface IRegisterFailedAction {
  readonly type: typeof ACTION_REGISTER_REQUEST_FAIL;
}

export interface IRegisterSuccessAction {
  readonly type: typeof ACTION_REGISTER_REQUEST_SUCCESS;
  readonly user: TUser;
  readonly token: TToken;
}

export type TRegisterActions =
  | IRegisterAction
  | IRegisterFailedAction
  | IRegisterSuccessAction;

export const getRegisterAction = (): IRegisterAction => ({
  type: ACTION_REGISTER_REQUEST
});

export const getRegisterFailedAction = (): IRegisterFailedAction => ({
  type: ACTION_REGISTER_REQUEST_FAIL
});

export const getRegisterSuccessAction = (
  user: TUser, token: TToken
): IRegisterSuccessAction => ({
  type: ACTION_REGISTER_REQUEST_SUCCESS,
  user,
  token
});

export const register: AppThunk = (fields: TUser) => (dispatch: AppDispatch) => {
  dispatch(getRegisterAction());
  registerUser(fields)
  .then(({user, token}) => {
      dispatch(getRegisterSuccessAction(user, token));
  })
  .catch(err => {
      dispatch(getRegisterFailedAction());
  });
};


// Actions for Login
export const ACTION_LOGIN_REQUEST : 'ACTION_LOGIN_REQUEST' = 'ACTION_LOGIN_REQUEST';
export const ACTION_LOGIN_REQUEST_FAIL : 'ACTION_LOGIN_REQUEST_FAIL' = 'ACTION_LOGIN_REQUEST_FAIL';
export const ACTION_LOGIN_REQUEST_SUCCESS : 'ACTION_LOGIN_REQUEST_SUCCESS' = 'ACTION_LOGIN_REQUEST_SUCCESS';

export interface ILoginAction {
  readonly type: typeof ACTION_LOGIN_REQUEST;
}

export interface ILoginFailedAction {
  readonly type: typeof ACTION_LOGIN_REQUEST_FAIL;
}

export interface ILoginSuccessAction {
  readonly type: typeof ACTION_LOGIN_REQUEST_SUCCESS;
  readonly user: TUser;
  readonly token: TToken;
}

export type TLoginActions =
  | ILoginAction
  | ILoginFailedAction
  | ILoginSuccessAction;

export const getLoginAction = (): ILoginAction => ({
  type: ACTION_LOGIN_REQUEST
});

export const getLoginFailedAction = (): ILoginFailedAction => ({
  type: ACTION_LOGIN_REQUEST_FAIL
});

export const getLoginSuccessAction = (
  user: TUser, token: TToken
): ILoginSuccessAction => ({
  type: ACTION_LOGIN_REQUEST_SUCCESS,
  user,
  token
});

export const login: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(getLoginAction());
    loginUser(email, password)
    .then(({user, token}) => {
        dispatch(getLoginSuccessAction(user, token));
    })
    .catch(err => {
        dispatch(getLoginFailedAction());
    });
};

// Actions for logout
export const ACTION_LOGOUT_REQUEST_SUCCESS : 'ACTION_LOGOUT_REQUEST_SUCCESS' = 'ACTION_LOGOUT_REQUEST_SUCCESS';

export interface ILogoutAction {
  readonly type: typeof ACTION_LOGOUT_REQUEST_SUCCESS;
}

export const getLogoutAction = (): ILogoutAction => ({
  type: ACTION_LOGOUT_REQUEST_SUCCESS
});

export const logout: AppThunk = () => (dispatch: AppDispatch) => {
    logoutUser()
    .finally(() => {
        dispatch(getLogoutAction())
    });
};

// Actions for Profile
export const ACTION_PROFILE_REQUEST : 'ACTION_PROFILE_REQUEST' = 'ACTION_PROFILE_REQUEST';
export const ACTION_PROFILE_REQUEST_FAIL : 'ACTION_PROFILE_REQUEST_FAIL' = 'ACTION_PROFILE_REQUEST_FAIL';
export const ACTION_PROFILE_REQUEST_SUCCESS : 'ACTION_PROFILE_REQUEST_SUCCESS' = 'ACTION_PROFILE_REQUEST_SUCCESS';


export interface IProfileAction {
  readonly type: typeof ACTION_PROFILE_REQUEST;
}

export interface IProfileFailedAction {
  readonly type: typeof ACTION_PROFILE_REQUEST_FAIL;
  readonly error: string;
}

export interface IProfileSuccessAction {
  readonly type: typeof ACTION_PROFILE_REQUEST_SUCCESS;
  readonly user: TUser;
}

export type TProfileActions =
  | IProfileAction
  | IProfileFailedAction
  | IProfileSuccessAction;

export const getProfileAction = (): IProfileAction => ({
  type: ACTION_PROFILE_REQUEST
});

export const getProfileFailedAction = (error: string): IProfileFailedAction => ({
  type: ACTION_PROFILE_REQUEST_FAIL,
  error: error
});

export const getProfileSuccessAction = (
  user: TUser
): IProfileSuccessAction => ({
  type: ACTION_PROFILE_REQUEST_SUCCESS,
  user
});

export const saveProfile: AppThunk = (fields: TUser) => (dispatch: AppDispatch) => {
    dispatch(getProfileAction());
    saveUser(fields)
    .then((user) => {
        dispatch(getProfileSuccessAction(user));
    })
    .catch(err => {
        dispatch(getProfileFailedAction(err.message));
    });
};

