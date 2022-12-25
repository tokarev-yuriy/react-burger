import { tokenStorage } from '../services/token-storage';
import { refreshToken } from './auth';
import { endpoints } from './endpoints';
import { requestWithCheck, TokenError } from './helpers';

/**
 * Get order
 * @returns object 
 */
async function placeOrder(ingredients) {
    try {
        const json = await requestWithCheck(endpoints.orders, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": tokenStorage.getInstance().getAccessToken(),
            },
            body: JSON.stringify({
                ingredients: ingredients
            })
        });

        if (json.success && json.order && json.order.number) {
            return {
                orderId: json.order.number
            };
        }
    } catch (err) {
        if (err instanceof TokenError && tokenStorage.getInstance().getRefreshToken()) {
            try {
                const token = await refreshToken();
                tokenStorage.getInstance().setToken(token);
                return placeOrder(ingredients);
            } catch (e) {
                tokenStorage.getInstance().clearToken();
                throw new Error('Token expired');
            }
        }
        throw new Error(err.message);
    }

    throw new Error('Api error');
}

export { placeOrder };