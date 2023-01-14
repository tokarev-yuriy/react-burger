import { BURGER_API_URL } from '../constants';

type TEndpointIngredients = string;
type TEndpointOrders = string;
type TEndpointAuth = {
    register: string;
    login: string;
    token: string;
    logout: string;
    user: string;
};

type TEndpointPassword = {
    forgot: string;
    reset: string;
}

type TEndpoints = {
    ingredients: TEndpointIngredients;
    orders: TEndpointOrders;
    auth: TEndpointAuth;
    password: TEndpointPassword;
};

const endpoints:TEndpoints = {
    ingredients: `${BURGER_API_URL}/ingredients`,
    orders: `${BURGER_API_URL}/orders`,
    auth: {
        register: `${BURGER_API_URL}/auth/register`,
        login: `${BURGER_API_URL}/auth/login`,
        token: `${BURGER_API_URL}/auth/token`,
        logout: `${BURGER_API_URL}/auth/logout`,
        user: `${BURGER_API_URL}/auth/user`,
    },
    password: {
        forgot: `${BURGER_API_URL}/password-reset`,
        reset: `${BURGER_API_URL}/password-reset/reset`,
    }
}

export { endpoints };