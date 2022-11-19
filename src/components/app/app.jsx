import React from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { getIngredientsService } from '../../api/ingredients';
import { useEffect } from 'react';
import { useState } from 'react';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import { useSelector, useDispatch } from 'react-redux';
import { getCatalog } from '../../services/actions/catalog';

function App() {

  const { items, isLoading, isFailed } = useSelector(store => ({
    items: store.catalog.ingredients,
    isLoading: store.catalog.catalogRequest && !store.catalog.catalogRequestFail,
    isFailed: !store.catalog.catalogRequest && store.catalog.catalogRequestFail,
  }));
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCatalog());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <ErrorBoundary>
          {isFailed ? (
            <p>Не удалось загрузить каталог</p>
          ) : 
            isLoading ? (
              <p>Идет загрузка</p>
            ):(
              items && 
              <>
                  <BurgerIngredients items={items} />
                  <BurgerConstructor />
              </>
            )}
        </ErrorBoundary>
      </main>
    </div>
  );
}

export { App };
