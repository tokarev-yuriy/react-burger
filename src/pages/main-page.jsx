import React from 'react';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function MainPage() {

  const { items } = useSelector(store => ({
    items: store.catalog.ingredients
  }));

  return (
    <>
        {items && (
            <>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients items={items} />
                <BurgerConstructor />
            </DndProvider>
            </>
        )}
    </>
  );
}

export { MainPage };
