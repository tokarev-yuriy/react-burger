import { IApiResponse } from '../utils/types';
import { endpoints } from './endpoints';
import { requestWithCheck } from './helpers';

/**
 * Send password reset mail
 * @returns object 
 */
async function forgotPassword (email: string): Promise<boolean> {
    const json = await requestWithCheck<IApiResponse>(endpoints.password.forgot, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body:  JSON.stringify({
            email: email
        })
    });

    if (json.success) {
        return true;
    }
    throw new Error('Api error');
}

/**
 * Change password
 * @returns object 
 */
 async function resetPassword (password: string, token: string): Promise<boolean> {
    const json = await requestWithCheck<IApiResponse>(endpoints.password.reset, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body:  JSON.stringify({
            password: password,
            token: token
        })
    });
    
    if (json.success) {
        return true;
    }
    throw new Error('Api error');
}

export { forgotPassword, resetPassword };