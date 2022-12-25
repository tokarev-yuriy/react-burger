import { isTemplateLiteralToken } from 'typescript';
import { tokenStorage } from '../services/token-storage';
import { IApiResponse, TToken, TUser } from '../utils/types';
import { endpoints } from './endpoints';
import { requestWithCheck, TokenError } from './helpers';

interface IApiUserResponse extends IApiResponse {
    user: TUser;
};

interface IApiTokenResponse extends IApiResponse {
    accessToken: string;
    refreshToken: string;
};

interface IApiUserWithTokenResponse extends IApiUserResponse, IApiTokenResponse {};

interface IUserResult {
    user: TUser;
};

interface ITokenResult extends TToken {};

interface IUserWithTokenResult extends IUserResult {
    token: ITokenResult;
};

/**
 * Register user
 * @returns object 
 */
async function registerUser(fields: TUser): Promise<IUserWithTokenResult> {
    const json = await requestWithCheck<IApiUserWithTokenResponse>(endpoints.auth.register, {
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
async function loginUser(email: string, password: string): Promise<IUserWithTokenResult> {
    const json = await requestWithCheck<IApiUserWithTokenResponse>(endpoints.auth.login, {
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
async function refreshToken(): Promise<ITokenResult> {
    const json = await requestWithCheck<IApiTokenResponse>(endpoints.auth.token, {
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
async function logoutUser(): Promise<boolean> {
    const json = await requestWithCheck<IApiResponse>(endpoints.auth.logout, {
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
async function getUser(): Promise<TUser> {
    try {
        const json = await requestWithCheck<IApiUserResponse>(endpoints.auth.user, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": tokenStorage.getInstance().getAccessToken(),
            },
        });
        if (json.success && json.user) {
            return json.user;
        }
    } catch (err: TokenError | Error | unknown) {
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
async function saveUser(fields: TUser): Promise<TUser> {
    try {
        const json = await requestWithCheck<IApiUserResponse>(endpoints.auth.user, {
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
    } catch (err: TokenError | Error | unknown) {
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
        throw new Error((err as Error).message);
    }

    throw new Error('Api error');
}

export { registerUser, loginUser, refreshToken, logoutUser, getUser, saveUser };