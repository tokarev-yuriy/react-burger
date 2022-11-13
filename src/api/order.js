import { endpoints } from './endpoints';
import { checkJsonResponse } from './helpers';

/**
 * Get order
 * @returns object 
 */
async function placeOrder (ingredients) {
    const resp = await fetch(endpoints.orders, {
        method: 'POST',
        body:  JSON.stringify({
            ingredients: ingredients
        })
    });

    const json = await checkJsonResponse(resp);
    if (json.success && json.order && json.order.number) {
        return {
            orderId: json.order.number
        };
    }
    throw new Error('Api error');
}

export { placeOrder };