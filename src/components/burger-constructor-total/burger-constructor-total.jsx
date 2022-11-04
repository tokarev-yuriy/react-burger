import React from 'react';
import styles from './burger-constructor-total.module.css';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

class BurgerConstructorTotal extends React.Component {
    render() {
        return (
            <div className={styles.total}>
                <span className={styles.price}>
                    {this.props.total} <CurrencyIcon />
                </span>
                <Button size="large" htmlType="button">
                    Оформить заказ
                </Button>
            </div>
        );
    }
}

BurgerConstructorTotal.propTypes = {
    total: PropTypes.number.isRequired
}; 

export default BurgerConstructorTotal;
