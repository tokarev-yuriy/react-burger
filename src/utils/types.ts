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

export type TOrderNumber = {
    orderId: number;
};

export type TDragIngredient = {
    id: string;
};

export type TDragCartIngredient = {
    id: number;
};

export type TOrder = {
    ingredients: Array<string>,
    _id: string,
    status: string,
    number: number,
    name: string,
    createdAt: string,
    updatedAt: string,
}