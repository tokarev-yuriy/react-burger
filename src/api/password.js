import { endpoints } from './endpoints';
import { checkJsonResponse } from './helpers';

/**
 * Send password reset mail
 * @returns object 
 */
async function forgotPassword (email) {
    const resp = await fetch(endpoints.password.forgot, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body:  JSON.stringify({
            email: email
        })
    });

    const json = await checkJsonResponse(resp);
    if (json.success) {
        return true;
    }
    throw new Error('Api error');
}

/**
 * Change password
 * @returns object 
 */
 async function resetPassword (password, token) {
    const resp = await fetch(endpoints.password.reset, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body:  JSON.stringify({
            password: password,
            token: token
        })
    });

    const json = await checkJsonResponse(resp);
    if (json.success) {
        return true;
    }
    throw new Error('Api error');
}

export { forgotPassword, resetPassword };