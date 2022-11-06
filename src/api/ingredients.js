import { endpoints } from './endpoints';
import { checkJsonResponse } from './helpers';

/**
 * Get ingredients data
 * @returns array 
 */
async function getIngredientsService() {
    const resp = await fetch(endpoints.ingredients);
    const json = await checkJsonResponse(resp);
    if (json.success) {
        return json.data;
    }
    throw new Error('Api error');
}

export { getIngredientsService };