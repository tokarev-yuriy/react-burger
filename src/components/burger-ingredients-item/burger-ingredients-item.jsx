import React from 'react';
import styles from './burger-ingredients-item.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/data';

class BurgerIngredientsItem extends React.Component {
    render() {
        return (
            <div key={this.props.item._id} className={styles.item}>
                <Counter count={this.props.count} />
                <img src={this.props.item.image} alt={this.props.item.name} className="ml-4 mr-4" />
                <p className="mt-1 mb-1 text text_type_digits-default">
                    {this.props.item.price}
                    <CurrencyIcon />
                </p>
                <p className={styles.name}>{this.props.item.name}</p>
            </div>
        );
    }
}

BurgerIngredientsItem.propTypes = {
    count: PropTypes.number,
    item: ingredientPropTypes,
};

export default BurgerIngredientsItem;
