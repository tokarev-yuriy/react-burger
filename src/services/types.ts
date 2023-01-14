import { TCartIngredient, TIngredient, TOrder, TUser } from "../utils/types";

export interface IAuthStore {
    user: TUser | null;

    registerRequest: boolean;
    registerRequestFail: boolean;

    loginRequest: boolean;
    loginRequestFail: boolean;

    profileRequest: boolean;
    profileRequestFail: boolean;
    profileError: string;
}

export interface ICatalogStore {
    catalogRequest: boolean;
    catalogRequestFail: boolean;
    ingredients: Array<TIngredient>;
}

export interface IOrderStore {
    order: TOrder | null;
    orderRequest: boolean;
    orderRequestFail: boolean;
}

export interface ICartStore {
    bun: TCartIngredient | null;
    ingredients: Array<TCartIngredient>;
}