import React, { ReactElement } from 'react';
import styles from './burger-ingredient-modal.module.css';
import { BurgerIngredientDetails } from '../burger-ingredient-details/burger-ingredient-details';
import { Modal } from '../../misc/modal/modal';
import { useHistory, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../services/hooks';

function BurgerIngredientModal(): ReactElement {
    const params = useParams<{id: string}>();
    const detail = useAppSelector((store) => {
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