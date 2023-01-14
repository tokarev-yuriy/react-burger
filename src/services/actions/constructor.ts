import { TCartIngredient } from "../../utils/types";

// Actions for constructor
export const ACTION_CONSTRUCTOR_ADD : 'ACTION_CONSTRUCTOR_ADD' = 'ACTION_CONSTRUCTOR_ADD';
export const ACTION_CONSTRUCTOR_CLEAR : 'ACTION_CONSTRUCTOR_CLEAR' = 'ACTION_CONSTRUCTOR_CLEAR';
export const ACTION_CONSTRUCTOR_REMOVE : 'ACTION_CONSTRUCTOR_REMOVE' = 'ACTION_CONSTRUCTOR_REMOVE';
export const ACTION_CONSTRUCTOR_MOVE : 'ACTION_CONSTRUCTOR_MOVE' = 'ACTION_CONSTRUCTOR_MOVE';

export interface IConstructorAddAction {
    readonly type: typeof ACTION_CONSTRUCTOR_ADD;
    readonly item: TCartIngredient;
}

export interface IConstructorClearAction {
    readonly type: typeof ACTION_CONSTRUCTOR_CLEAR;
}

export interface IConstructorRemoveAction {
    readonly type: typeof ACTION_CONSTRUCTOR_REMOVE;
    readonly id: number;
}

export interface IConstructorMoveAction {
    readonly type: typeof ACTION_CONSTRUCTOR_MOVE;
    readonly src: number;
    readonly dest: number;
}

export type TConstructorActions =
    | IConstructorAddAction
    | IConstructorClearAction
    | IConstructorRemoveAction
    | IConstructorMoveAction;

export const getConstructorAddAction = (item: TCartIngredient): IConstructorAddAction => ({
    type: ACTION_CONSTRUCTOR_ADD,
    item: item
});

export const getConstructorClearAction = (): IConstructorClearAction => ({
    type: ACTION_CONSTRUCTOR_CLEAR
});

export const getConstructorRemoveAction = (id: number): IConstructorRemoveAction => ({
    type: ACTION_CONSTRUCTOR_REMOVE,
    id: id
});

export const getConstructorMoveAction = (src: number, dest: number): IConstructorMoveAction => ({
    type: ACTION_CONSTRUCTOR_MOVE,
    src: src,
    dest: dest
});