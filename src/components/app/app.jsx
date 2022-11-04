import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import getIngredientsService from '../../api/ingredients';

function App() {

  let items = getIngredientsService();

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients items={items} />
        <BurgerConstructor 
          bun={items[0]} 
          mainItems={items.slice(1, items.length-1)}
        />
      </main>
    </div>
  );
}

export default App;
