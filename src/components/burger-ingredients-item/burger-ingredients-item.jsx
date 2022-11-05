import React from 'react';
import styles from './burger-ingredients-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-type';
import { useState } from 'react';
import { BurgerIngredientDetails } from '../burger-ingredient-details/burger-ingredient-details';
import { Modal } from '../modal/modal';

function BurgerIngredientsItem(props) {

    const [modalVisible, setModalVisible] = useState(false);

    const showDetails = (e) => {
        setModalVisible(true);
    }

    const hideDetails = (e) => {
        setModalVisible(false);
    }

    return (
        <div key={props.item._id} className={styles.item} onClick={showDetails}>
            <Counter count={props.count} />
            <div className={styles.item_img}>
                <img src={props.item.image} alt={props.item.name} />
            </div>
            <p className={styles.item_price}>
                {props.item.price}
                <CurrencyIcon />
            </p>
            <p className={styles.item_name}>{props.item.name}</p>

            {modalVisible && (
                <Modal title="Детали ингредиента" onClose={hideDetails}>
                    <BurgerIngredientDetails item={props.item} />
                </Modal>
            )}

        </div>
    );
}

BurgerIngredientsItem.propTypes = {
    count: PropTypes.number,
    item: ingredientPropTypes.isRequired,
};

export { BurgerIngredientsItem };
