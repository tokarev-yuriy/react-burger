import React from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { getIngredientsService } from '../../api/ingredients';
import { useEffect } from 'react';
import { useState } from 'react';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import { ConstructorContext } from '../../services/constructorContext';
import { useReducer } from 'react';

function App() {

  const [items, setItems] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=>{
    const loadData = async () => {
      try {
        const data = await getIngredientsService();
        setItems(data);
      } catch(error) {
        setError('Не удалось загрузить данные =(');
      }
    }

    loadData();
  }, []);

  /**
   * Reducer for burger constructor
   * @param {bun: , ingredients: } state 
   * @param {type: add|remove|clear, playbook: } action 
   * @returns {bun: , ingredients: }
   */
  const constructorReducer = (state, action) => {
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
        if (state.bun._id == action.playbook) {
          return {...state, bun: null};
        }
        return {...state, ingredients: ingredients.filter(item => item._id != action.playbook)};
    }

    throw new Error("unknown action");
  };
  const [constructorState, constructorDispatcher] = useReducer(constructorReducer, {
    bun: null,
    ingredients: []
  });

  const bun = items ? items.find(ingredient => ingredient.type === 'bun') : {};
  const ingredients = items ? items.filter(ingredient => ingredient.type !== 'bun') : {};

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <ErrorBoundary>
          {error ? (
            <p>{error}</p>
          ) : (
            items && 
            <>
              <BurgerIngredients items={items} />
              <ConstructorContext.Provider value={{state: constructorState, dispatcher: constructorDispatcher}} >
                <BurgerConstructor />
              </ConstructorContext.Provider>
            </>
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
}

export { App };
