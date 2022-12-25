import * as H from "history";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export type TIngredient = {
    _id: string;
    name: string;
    type: 'bun' | 'main' | 'sauce';
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export type TCartIngredient = TIngredient & {
    id: number;
};

export type TUser = {
    email: string;
    password?: string;
    name: string;
}

export type TToken = {
    access: string;
    refresh: string;
};

export interface IApiResponse {
    success: boolean;
};

export type TModalState = {
  background: H.Location
};

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, {}, null, Action<string>>;

export type TOrder = {
    orderId: number;
};