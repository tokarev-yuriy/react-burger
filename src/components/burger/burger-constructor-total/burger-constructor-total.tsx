import React, { FC } from 'react';
import styles from './burger-constructor-total.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useAppSelector } from '../../../services/types/hooks';

interface IBurgerConstructorTotalProps {
    onPlaceOrder: () => void;
    total: number;
    isDisabled?: boolean;
}

const BurgerConstructorTotal: FC<IBurgerConstructorTotalProps> = ({ onPlaceOrder, total, isDisabled }: IBurgerConstructorTotalProps) => {

    const isRequest = useAppSelector(store => store.order.orderRequest);

    const onClick = (): void => {
        if (!isDisabled) {
            onPlaceOrder();
        }
    }

    return (
        <div className={styles.total}>
            <span className={styles.price}>
                {total} <CurrencyIcon type="primary" />
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
