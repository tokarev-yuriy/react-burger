import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ingredient-page.module.css';
import { BurgerIngredientDetails } from '../components/burger/burger-ingredient-details/burger-ingredient-details';

function IngredientPage() {

  const params = useParams();
  const { isLoading, isFailed, detail } = useSelector(store => ({
    isLoading: store.catalog.catalogRequest && !store.catalog.catalogRequestFail,
    isFailed: !store.catalog.catalogRequest && store.catalog.catalogRequestFail,
    detail: store.catalog.ingredients.find(item => item._id === params['id']),
  }));

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Детали ингредиента</h1>
      {isFailed ? (
        <p>Не удалось загрузить данные</p>
      ) : 
        isLoading ? (
          <p>Идет загрузка</p>
        ): detail ? (
          <BurgerIngredientDetails item={detail} />
        ) : (
          <p>
            Ингредиент не найден =(
          </p>
        )
      }
    </div>
  );
}

export { IngredientPage };
