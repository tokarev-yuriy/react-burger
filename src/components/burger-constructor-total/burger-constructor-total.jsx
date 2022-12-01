import React from 'react';
import styles from './burger-constructor-total.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerConstructorTotal(props) {

    const {onPlaceOrder, total, isDisabled} = props;
    
    const onClick = () => {
        if (!isDisabled) {
            onPlaceOrder();
        }
    }

    return (
        <div className={styles.total}>
            <span className={styles.price}>
                {total} <CurrencyIcon />
            </span>
            <Button size="large" htmlType="button" onClick={onClick} extraClass={isDisabled ? styles.disabled : ''}>
                Оформить заказ
            </Button>
        </div>
    );
}

BurgerConstructorTotal.propTypes = {
    total: PropTypes.number.isRequired,
    onPlaceOrder: PropTypes.func.isRequired,
}; 

export { BurgerConstructorTotal };
