import React from 'react';
import styles from './burger-constructor-total.module.css';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructorTotal extends React.Component {
    render() {
        return (
            <div className={[styles.total, 'mb-6'].join(' ')}>
                <span className='mr-10 text text_type_digits-medium'>
                    {this.props.total} <CurrencyIcon />
                </span>
                <Button size="large">
                    Оформить заказ
                </Button>
            </div>
        );
    }
}

export default BurgerConstructorTotal;
