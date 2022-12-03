import { 
  ACTION_LOGIN_REQUEST, ACTION_LOGIN_REQUEST_FAIL, ACTION_LOGIN_REQUEST_SUCCESS, 
  ACTION_REGISTER_REQUEST, ACTION_REGISTER_REQUEST_FAIL, ACTION_REGISTER_REQUEST_SUCCESS 
} from "../actions/auth";


const authInitialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,

    registerRequest: false,
    registerRequestFail: false,

    loginRequest: false,
    loginRequestFail: false,
};

/**
 * Reducer for auth operations
 */
 export const authReducer = (state = authInitialState, action) => {
    switch(action.type) {
      
      case ACTION_REGISTER_REQUEST:
        return {
          ...state, 
          registerRequest: true
        }

      case ACTION_REGISTER_REQUEST_FAIL:
        return {
          ...state, 
          registerRequest: false, 
          registerRequestFail: true
        }

      case ACTION_REGISTER_REQUEST_SUCCESS:

        localStorage.setItem('user', JSON.stringify(action.user));
        localStorage.setItem('token', JSON.stringify(action.token));
        if (action['cb']) {
          action.cb();
        }

        return {
          ...state, 
          user: action.user,
          token: action.token,
          registerRequest: false, 
          registerRequestFail: false
        };


      case ACTION_LOGIN_REQUEST:
        return {
          ...state, 
          loginRequest: true
        }

      case ACTION_LOGIN_REQUEST_FAIL:
        return {
          ...state, 
          loginRequest: false, 
          loginRequestFail: true
        }

      case ACTION_LOGIN_REQUEST_SUCCESS:

        localStorage.setItem('user', JSON.stringify(action.user));
        localStorage.setItem('token', JSON.stringify(action.token));
        if (action['cb']) {
          action.cb();
        }

        return {
          ...state, 
          user: action.user,
          token: action.token,
          loginRequest: false, 
          loginRequestFail: false
        };

      default:
        return state;
    }
};