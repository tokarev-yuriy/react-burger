import React, { ReactElement } from 'react';
import { BurgerIngredients } from '../components/burger/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { ICatalogStore } from '../services/reducers/catalog';
import { TIngredient } from '../utils/types';


interface ISelected {
  isLoading: boolean;
  isFailed: boolean;
  items: Array<TIngredient>;
}

interface IStore {
  catalog: ICatalogStore;
}

function MainPage(): ReactElement {

  const { isLoading, isFailed, items } = useSelector<IStore, ISelected>((store: IStore) => ({
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
