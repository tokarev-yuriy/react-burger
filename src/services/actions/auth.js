import { loginUser, logoutUser, registerUser, saveUser } from "../../api/auth";


// Actions for register
export const ACTION_REGISTER_REQUEST = 'ACTION_REGISTER_REQUEST';
export const ACTION_REGISTER_REQUEST_FAIL = 'ACTION_REGISTER_REQUEST_FAIL';
export const ACTION_REGISTER_REQUEST_SUCCESS = 'ACTION_REGISTER_REQUEST_SUCCESS';

export function register(fields) {
  return function(dispatch) {
    dispatch({type: ACTION_REGISTER_REQUEST});
    registerUser(fields)
    .then(({user, token}) => {
        dispatch({type: ACTION_REGISTER_REQUEST_SUCCESS, user: user, token: token})
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

export function login(email, password) {
  return function(dispatch) {
    dispatch({type: ACTION_LOGIN_REQUEST});
    loginUser(email, password)
    .then(({user, token}) => {
        dispatch({type: ACTION_LOGIN_REQUEST_SUCCESS, user: user, token: token})
    })
    .catch(err => {
        dispatch({type: ACTION_LOGIN_REQUEST_FAIL});
    });
  }
};

// Actions for logout
export const ACTION_LOGOUT_REQUEST_SUCCESS = 'ACTION_LOGOUT_REQUEST_SUCCESS';

export function logout() {
  return function(dispatch) {
    logoutUser()
    .finally(() => {
        dispatch({type: ACTION_LOGOUT_REQUEST_SUCCESS})
    });
  }
}

// Actions for Login
export const ACTION_PROFILE_REQUEST = 'ACTION_PROFILE_REQUEST';
export const ACTION_PROFILE_REQUEST_FAIL = 'ACTION_PROFILE_REQUEST_FAIL';
export const ACTION_PROFILE_REQUEST_SUCCESS = 'ACTION_PROFILE_REQUEST_SUCCESS';

export function saveProfile(fields) {
  return function(dispatch) {
    dispatch({type: ACTION_PROFILE_REQUEST});
    saveUser(fields)
    .then((user) => {
        dispatch({type: ACTION_PROFILE_REQUEST_SUCCESS, user: user})
    })
    .catch(err => {
        dispatch({type: ACTION_PROFILE_REQUEST_FAIL, error: err.message});
    });
  }
};

