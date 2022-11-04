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
                <img src={this.props.item.image} alt={this.props.item.name} className={styles.item_img} />
                <p className={styles.item_price}>
                    {this.props.item.price}
                    <CurrencyIcon />
                </p>
                <p className={styles.item_name}>{this.props.item.name}</p>
            </div>
        );
    }
}

BurgerIngredientsItem.propTypes = {
    count: PropTypes.number,
    item: ingredientPropTypes.isRequired,
};

export default BurgerIngredientsItem;
