import React, { useContext } from 'react';
import styles from './burger-ingredients-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-type';
import { useState } from 'react';
import { BurgerIngredientDetails } from '../burger-ingredient-details/burger-ingredient-details';
import { Modal } from '../modal/modal';
import { ConstructorDispatcherContext } from '../../services/constructorContext';

function BurgerIngredientsItem(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const constructorDispatcher = useContext(ConstructorDispatcherContext);

    const showDetails = () => {
        setModalVisible(true);
        constructorDispatcher({type: 'add', playbook: props.item});
    };

    const hideDetails = () => {
        setModalVisible(false);
    };

    return (
        <div key={props.item._id} className={styles.item}>
            <Counter count={props.count} />
            <div className={styles.item_img} onClick={showDetails}>
                <img src={props.item.image} alt={props.item.name} />
            </div>
            <p className={styles.item_price} onClick={showDetails}>
                {props.item.price}
                <CurrencyIcon />
            </p>
            <p className={styles.item_name}  onClick={showDetails}>{props.item.name}</p>

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
