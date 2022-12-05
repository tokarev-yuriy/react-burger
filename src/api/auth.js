import { tokenStorage } from '../services/token-storage';
import { endpoints } from './endpoints';
import { requestWithCheck, TokenError } from './helpers';

/**
 * Register user
 * @returns object 
 */
async function registerUser(fields) {
    const json = await requestWithCheck(endpoints.auth.register, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            ...fields
        })
    });
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
async function loginUser(email, password) {
    const json = await requestWithCheck(endpoints.auth.login, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    });
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
async function refreshToken() {
    const json = await requestWithCheck(endpoints.auth.token, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: tokenStorage.getInstance().getRefreshToken(),
        })
    });
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
async function logoutUser() {
    const json = await requestWithCheck(endpoints.auth.logout, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: tokenStorage.getInstance().getRefreshToken(),
        })
    });
    if (json.success) {
        return true;
    }
    throw new Error('Api error');
}

/**
 * Get User
 * @returns object 
 */
async function getUser() {
    try {
        const json = await requestWithCheck(endpoints.auth.user, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": tokenStorage.getInstance().getAccessToken(),
            },
        });
        if (json.success && json.user) {
            return json.user;
        }
    } catch (err) {
        if (err instanceof TokenError && tokenStorage.getInstance().getRefreshToken()) {
            try {
                const token = await refreshToken();
                tokenStorage.getInstance().setToken(token);
                return getUser();
            } catch (e) {
                tokenStorage.getInstance().clearToken();
                throw new Error('Token expired');
            }
        }
    }

    throw new Error('Api error');
}

/**
 * Save User
 * @returns object 
 */
async function saveUser(fields) {
    try {
        const json = await requestWithCheck(endpoints.auth.user, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": tokenStorage.getInstance().getAccessToken(),
            },
            body: JSON.stringify(fields)
        });
        if (json.success && json.user) {
            return json.user;
        }
    } catch (err) {
        if (err instanceof TokenError && tokenStorage.getInstance().getRefreshToken()) {
            try {
                const token = await refreshToken();
                tokenStorage.getInstance().setToken(token);
                return saveUser(fields);
            } catch (e) {
                tokenStorage.getInstance().clearToken();
                throw new Error('Token expired');
            }
        }
        throw new Error(err.message);
    }

    throw new Error('Api error');
}

export { registerUser, loginUser, refreshToken, logoutUser, getUser, saveUser };