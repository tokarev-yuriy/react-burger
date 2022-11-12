import React from 'react';
import styles from './burger-constructor-total.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerConstructorTotal(props) {

    const {onPlaceOrder, total} = props;
    
    const onClick = () => {
        onPlaceOrder();
    }

    return (
        <div className={styles.total}>
            <span className={styles.price}>
                {total} <CurrencyIcon />
            </span>
            <Button size="large" htmlType="button" onClick={onClick}>
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
