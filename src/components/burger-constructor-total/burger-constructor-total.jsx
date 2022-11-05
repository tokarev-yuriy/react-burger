import React from 'react';
import styles from './burger-constructor-total.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerConstructorTotal(props) {
    return (
        <div className={styles.total}>
            <span className={styles.price}>
                {props.total} <CurrencyIcon />
            </span>
            <Button size="large" htmlType="button">
                Оформить заказ
            </Button>
        </div>
    );
}

BurgerConstructorTotal.propTypes = {
    total: PropTypes.number.isRequired
}; 

export { BurgerConstructorTotal };
