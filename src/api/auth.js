import { tokenStorage } from '../services/token-storage';
import { endpoints } from './endpoints';
import { checkJsonResponse, TokenError } from './helpers';

/**
 * Register user
 * @returns object 
 */
async function registerUser (fields) {
    const resp = await fetch(endpoints.auth.register, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body:  JSON.stringify({
            ...fields
        })
    });

    const json = await checkJsonResponse(resp);
    if (json.success && json.user && json.accessToken && json.refreshToken) {
        return {
            user: json.user,
            token: {
                access: json.accessToken,
                refresh: json.refreshToken
            }
        };
    }
    throw new Error('Api error');
}

/**
 * Login user
 * @returns object 
 */
 async function loginUser (email, password) {
    const resp = await fetch(endpoints.auth.login, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body:  JSON.stringify({
            email: email,
            password: password,
        })
    });

    const json = await checkJsonResponse(resp);
    if (json.success && json.user && json.accessToken && json.refreshToken) {
        return {
            user: json.user,
            token: {
                access: json.accessToken,
                refresh: json.refreshToken
            }
        };
    }
    throw new Error('Api error');
}

/**
 * Refresh token
 * @returns object 
 */
 async function refreshToken () {
    const resp = await fetch(endpoints.auth.token, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body:  JSON.stringify({
            token: tokenStorage.getInstance().getRefreshToken(),
        })
    });

    const json = await checkJsonResponse(resp);
    if (json.success && json.accessToken && json.refreshToken) {
        return {
            access: json.accessToken,
            refresh: json.refreshToken
        };
    }
    throw new Error('Api error');
}

/**
 * Logout User
 * @returns object 
 */
 async function logoutUser () {
    const resp = await fetch(endpoints.auth.logout, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body:  JSON.stringify({
            token: tokenStorage.getInstance().getRefreshToken(),
        })
    });

    const json = await checkJsonResponse(resp);
    if (json.success) {
        return {};
    }
    throw new Error('Api error');
}

/**
 * Logout User
 * @returns object 
 */
 async function getUser () {
    const resp = await fetch(endpoints.auth.user, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": tokenStorage.getInstance().getAccessToken(),
        }
    });
    if (resp.status === 403 && tokenStorage.getInstance().getRefreshToken()) {
        // try to refresh token and get again
        try {
            const token = await refreshToken();
            tokenStorage.getInstance().setToken(token);
            return getUser();
        } catch (e) {
            tokenStorage.getInstance().clearToken();
            throw new Error('Token expired');
        }
    }

    const json = await checkJsonResponse(resp);
    if (json.success && json.user) {
        return json.user;
    }
    throw new Error('Api error');
}

export { registerUser, loginUser, refreshToken, logoutUser, getUser };