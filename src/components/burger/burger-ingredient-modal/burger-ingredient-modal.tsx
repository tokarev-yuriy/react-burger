import React, { ReactElement, ReactNode } from 'react';
import styles from './burger-ingredient-modal.module.css';
import { useSelector } from 'react-redux';
import { BurgerIngredientDetails } from '../burger-ingredient-details/burger-ingredient-details';
import { Modal } from '../../misc/modal/modal';
import { useHistory, useParams } from 'react-router-dom';
import { ICatalogStore } from '../../../services/reducers/catalog';
import { TIngredient } from '../../../utils/types';

  
interface IStore {
    catalog: ICatalogStore;
}

function BurgerIngredientModal(): ReactElement {
    const params = useParams<{id: string}>();
    const detail = useSelector<IStore, TIngredient | undefined>((store: IStore) => {
        return params['id'] ? store.catalog.ingredients.find(item => item._id === params['id']) : undefined;
    });
    const history = useHistory();

    const hideDetails = (): void => {
        history.replace('/');
    };

    return (
        <>
            {detail && (
                <Modal title="Детали ингредиента" onClose={hideDetails}>
                    <BurgerIngredientDetails item={detail} />
                </Modal>
            )}
        </>
    );
}

export { BurgerIngredientModal };