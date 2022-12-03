import { endpoints } from './endpoints';
import { checkJsonResponse } from './helpers';

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
 async function refreshToken (refreshToken) {
    const resp = await fetch(endpoints.auth.token, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body:  JSON.stringify({
            token: refreshToken,
        })
    });

    const json = await checkJsonResponse(resp);
    if (json.success && json.accessToken && json.refreshToken) {
        return {
            token: {
                access: json.accessToken,
                refresh: json.refreshToken
            }
        };
    }
    throw new Error('Api error');
}

export { registerUser, loginUser, refreshToken };