import React from 'react';
import styles from './burger-ingredients-item.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredientsItem extends React.Component {
    render() {
        return (
            <div key={this.props.item._id} className={[styles.item].join(' ')}>
                <img src={this.props.item.image} alt={this.props.item.name} className="ml-4 mr-4" />
                <p className="mt-1 mb-1 text text_type_digits-default">
                    {this.props.item.price}
                    <CurrencyIcon />
                </p>
                <p className={[styles.name, 'text text_type_main-default'].join(' ')}>{this.props.item.name}</p>
            </div>
        );
    }
}

export default BurgerIngredientsItem;
