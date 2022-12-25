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