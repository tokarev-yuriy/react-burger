import React from 'react';
import styles from './burger-constructor-total.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function BurgerConstructorTotal(props) {

    const {onPlaceOrder, total, isDisabled} = props;
    const isRequest = useSelector(store => store.order.orderRequest);
    
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
            <Button size="large" htmlType="button" onClick={onClick} extraClass={isDisabled || isRequest ? styles.disabled : ''}>
                Оформить заказ
            </Button>
        </div>
    );
}

BurgerConstructorTotal.propTypes = {
    total: PropTypes.number.isRequired,
    onPlaceOrder: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
}; 

export { BurgerConstructorTotal };
