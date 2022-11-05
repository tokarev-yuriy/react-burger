import React from 'react';
import styles from './burger-ingredients-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-type';

function BurgerIngredientsItem(props) {
    return (
        <div key={props.item._id} className={styles.item}>
            <Counter count={props.count} />
            <div className={styles.item_img}>
                <img src={props.item.image} alt={props.item.name} />
            </div>
            <p className={styles.item_price}>
                {props.item.price}
                <CurrencyIcon />
            </p>
            <p className={styles.item_name}>{props.item.name}</p>
        </div>
    );
}

BurgerIngredientsItem.propTypes = {
    count: PropTypes.number,
    item: ingredientPropTypes.isRequired,
};

export { BurgerIngredientsItem };
