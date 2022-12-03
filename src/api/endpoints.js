import { BURGER_API_URL } from '../constants';

const endpoints = {
    ingredients: `${BURGER_API_URL}/ingredients`,
    orders: `${BURGER_API_URL}/orders`,
    auth: {
        register: `${BURGER_API_URL}/auth/register`,
    }
}

export { endpoints };