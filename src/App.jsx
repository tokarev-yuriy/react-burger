import React from 'react';
import logo from './logo.svg';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import './App.css';
import getIngredientsService from './api/ingredients';

function App() {

  let items = getIngredientsService();

  return (
    <div className="App pt-10">
      <AppHeader />
      <main className="main">
        <BurgerIngredients items={items} />
        <BurgerConstructor 
          topItem={items[0]} 
          bottomItem={items[items.length - 1]}
          mainItems={items.slice(1, items.length-1)}
        />
      </main>
    </div>
  );
}

export default App;
