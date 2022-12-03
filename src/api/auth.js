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

export { registerUser };