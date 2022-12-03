import { loginUser, registerUser } from "../../api/auth";


// Actions for register
export const ACTION_REGISTER_REQUEST = 'ACTION_REGISTER_REQUEST';
export const ACTION_REGISTER_REQUEST_FAIL = 'ACTION_REGISTER_REQUEST_FAIL';
export const ACTION_REGISTER_REQUEST_SUCCESS = 'ACTION_REGISTER_REQUEST_SUCCESS';

export function register(fields, cb = null) {
  return function(dispatch) {
    dispatch({type: ACTION_REGISTER_REQUEST});
    registerUser(fields)
    .then(({user, token}) => {
        dispatch({type: ACTION_REGISTER_REQUEST_SUCCESS, user: user, token: token, cb: cb})
    })
    .catch(err => {
        dispatch({type: ACTION_REGISTER_REQUEST_FAIL});
    });
  }
};


// Actions for Login
export const ACTION_LOGIN_REQUEST = 'ACTION_LOGIN_REQUEST';
export const ACTION_LOGIN_REQUEST_FAIL = 'ACTION_LOGIN_REQUEST_FAIL';
export const ACTION_LOGIN_REQUEST_SUCCESS = 'ACTION_LOGIN_REQUEST_SUCCESS';

export function login(email, password, cb = null) {
  return function(dispatch) {
    dispatch({type: ACTION_LOGIN_REQUEST});
    loginUser(email, password)
    .then(({user, token}) => {
        dispatch({type: ACTION_LOGIN_REQUEST_SUCCESS, user: user, token: token, cb: cb})
    })
    .catch(err => {
        dispatch({type: ACTION_LOGIN_REQUEST_FAIL});
    });
  }
};