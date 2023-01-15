import { TCartIngredient, TIngredient, TOrder, TOrderNumber, TUser } from "../../utils/types";

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
    order: TOrderNumber | null;
    orderRequest: boolean;
    orderRequestFail: boolean;
}

export interface ICartStore {
    bun: TCartIngredient | null;
    ingredients: Array<TCartIngredient>;
}

export interface IFeedStore {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
    feedRequest: boolean;
    feedRequestFail: boolean;
}