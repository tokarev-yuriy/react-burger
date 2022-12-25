import React from 'react';
import { BurgerIngredients } from '../components/burger/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';

function MainPage() {

  const { isLoading, isFailed, items } = useSelector(store => ({
    isLoading: store.catalog.catalogRequest && !store.catalog.catalogRequestFail,
    isFailed: !store.catalog.catalogRequest && store.catalog.catalogRequestFail,
    items: store.catalog.ingredients,
  }));

  return (
    <>
      {isFailed ? (
        <p>Не удалось загрузить данные</p>
      ) : 
        isLoading ? (
          <p>Идет загрузка</p>
        ):(
          items && (
            <>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients items={items} />
                <BurgerConstructor />
            </DndProvider>
            </>
          )
        )
      }
    </>
  );
}

export { MainPage };
