import { registerUser } from "../../api/auth";


// Actions of auth
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