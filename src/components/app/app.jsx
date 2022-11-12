import React from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { getIngredientsService } from '../../api/ingredients';
import { useEffect } from 'react';
import { useState } from 'react';
import { ErrorBoundary } from '../error-boundary/error-boundary';

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
              <BurgerConstructor 
                bun={bun} 
                mainItems={ingredients}
              />
            </>
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
}

export { App };
