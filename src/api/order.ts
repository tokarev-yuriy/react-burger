import { tokenStorage } from '../services/token-storage';
import { IApiResponse, TOrder } from '../utils/types';
import { refreshToken } from './auth';
import { endpoints } from './endpoints';
import { requestWithCheck, TokenError } from './helpers';

interface IApiOrderResponse extends IApiResponse {
    order: {
        number: number;
    };
};


/**
 * Get order
 * @returns object 
 */
async function placeOrder(ingredients: Array<string>): Promise<TOrder> {
    try {
        const json = await requestWithCheck<IApiOrderResponse>(endpoints.orders, {
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
    } catch (err: TokenError | Error | unknown) {
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
        throw new Error((err as Error).message);
    }

    throw new Error('Api error');
}

export { placeOrder };