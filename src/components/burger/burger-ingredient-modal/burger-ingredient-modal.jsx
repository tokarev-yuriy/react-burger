import React from 'react';
import styles from './burger-ingredient-modal.module.css';
import { useSelector } from 'react-redux';
import { BurgerIngredientDetails } from '../burger-ingredient-details/burger-ingredient-details';
import { Modal } from '../../misc/modal/modal';
import { useHistory, useParams } from 'react-router-dom';

function BurgerIngredientModal(props) {
    const params = useParams();
    const detail = useSelector(store => params['id'] ? store.catalog.ingredients.find(item => item._id === params['id']) : null);
    const history = useHistory();

    const hideDetails = () => {
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