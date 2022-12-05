import { endpoints } from './endpoints';
import { requestWithCheck } from './helpers';

/**
 * Get ingredients data
 * @returns array 
 */
async function getIngredientsService() {
    const json = await requestWithCheck(endpoints.ingredients);
    if (json.success) {
        return json.data;
    }
    throw new Error('Api error');
}

export { getIngredientsService };