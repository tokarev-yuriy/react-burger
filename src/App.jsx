import React from 'react';
import logo from './logo.svg';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import {} from '@ya.praktikum/react-developer-burger-ui-components';
import './App.css';

function App() {
  return (
    <div className="App pt-10">
      <AppHeader />
      <main className="main">
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
