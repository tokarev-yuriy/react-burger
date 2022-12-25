import { IApiResponse, TIngredient } from '../utils/types';
import { endpoints } from './endpoints';
import { requestWithCheck } from './helpers';

interface IApiIngredientsResponse extends IApiResponse {
    data: Array<TIngredient>;
};

/**
 * Get ingredients data
 * @returns array 
 */
async function getIngredientsService(): Promise<Array<TIngredient>> {
    const json = await requestWithCheck<IApiIngredientsResponse>(endpoints.ingredients);
    if (json.success) {
        return json.data;
    }
    throw new Error('Api error');
}

export { getIngredientsService };