import React from 'react';

export const ConstructorContext = React.createContext();
export const ConstructorDispatcherContext = React.createContext();

/**
 * Reducer for burger constructor
 * @param {bun: , ingredients: } state 
 * @param {type: add|remove|clear, playbook: } action 
 * @returns {bun: , ingredients: }
 */
export const constructorReducer = (state, action) => {
    switch(action.type) {
      case "add":
        if (!action.playbook) {
          throw new Error('No ingredient');
        }
        if (action.playbook.type === 'bun') {
          return {...state, bun: action.playbook};
        }
        return {...state, ingredients: [...state.ingredients, action.playbook]}
      case "clear":
        return {bun: null, ingredients: []};
      case "remove":
        if (state.bun && state.bun._id === action.playbook) {
          return {...state, bun: null};
        }
        return {...state, ingredients: state.ingredients.filter(item => item._id !== action.playbook)};
      default:
        throw new Error("unknown action");
    }
};