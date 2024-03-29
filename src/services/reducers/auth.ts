import { TUser } from "../../utils/types";
import { 
  ACTION_LOGIN_REQUEST, ACTION_LOGIN_REQUEST_FAIL, ACTION_LOGIN_REQUEST_SUCCESS, 
  ACTION_REGISTER_REQUEST, ACTION_REGISTER_REQUEST_FAIL, ACTION_REGISTER_REQUEST_SUCCESS,
  ACTION_LOGOUT_REQUEST_SUCCESS,
  ACTION_PROFILE_REQUEST, ACTION_PROFILE_REQUEST_FAIL, ACTION_PROFILE_REQUEST_SUCCESS, TLoginActions, TRegisterActions, TProfileActions, ILogoutAction

} from "../actions/auth";
import { tokenStorage } from "../token-storage";
import { IAuthStore } from "../types/stores";

export const authInitialState: IAuthStore = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) as TUser : null,
    
    registerRequest: false,
    registerRequestFail: false,

    loginRequest: false,
    loginRequestFail: false,

    profileRequest: false,
    profileRequestFail: false,
    profileError: ''
};

/**
 * Reducer for auth operations
 */
 export const authReducer = (state: IAuthStore = authInitialState, action: TLoginActions | TRegisterActions | TProfileActions | ILogoutAction): IAuthStore => {
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
        tokenStorage.getInstance().setToken(action.token);

        return {
          ...state, 
          user: action.user,
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
        tokenStorage.getInstance().setToken(action.token);

        return {
          ...state, 
          user: action.user,
          loginRequest: false, 
          loginRequestFail: false
        };
      
      case ACTION_LOGOUT_REQUEST_SUCCESS:
        localStorage.removeItem('user');
        tokenStorage.getInstance().setToken(null);

        return {
          ...state, 
          user: null
        }

      case ACTION_PROFILE_REQUEST:
        return {
          ...state,
          profileError: '',
          profileRequest: true
        }

      case ACTION_PROFILE_REQUEST_FAIL:
        return {
          ...state, 
          profileRequest: false,
          profileError: action.error,
          profileRequestFail: true
        }

      case ACTION_PROFILE_REQUEST_SUCCESS:

        localStorage.setItem('user', JSON.stringify(action.user));

        return {
          ...state, 
          user: action.user,
          profileRequest: false, 
          profileError: '',
          profileRequestFail: false
        };

      default:
        return state;
    }
};