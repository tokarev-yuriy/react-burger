import { endpoints } from './endpoints';

/**
 * Get ingredients data
 * @returns array 
 */
async function getIngredientsService() {
    let resp = await fetch(endpoints.ingredients);
    resp = await resp.json();
    if (resp.success) {
        return resp.data;
    }
    throw new Error('Api error');
}

export { getIngredientsService };