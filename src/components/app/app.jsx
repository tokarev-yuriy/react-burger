import React from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { getIngredientsService } from '../../api/ingredients';
import { useEffect } from 'react';
import { useState } from 'react';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import { ConstructorContext, ConstructorDispatcherContext, constructorReducer } from '../../services/constructorContext';
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

  const [state, dispatch] = useReducer(constructorReducer, {
    bun: null,
    ingredients: []
  });

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
              <ConstructorContext.Provider value={state} >
              <ConstructorDispatcherContext.Provider value={dispatch} >
                <BurgerIngredients items={items} />
                <BurgerConstructor />
              </ConstructorDispatcherContext.Provider>
              </ConstructorContext.Provider>
            </>
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
}

export { App };
