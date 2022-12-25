import React from 'react';
import styles from './burger-ingredients-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/prop-type';
import { useDrag } from 'react-dnd';
import { useHistory, useLocation } from 'react-router-dom';

function BurgerIngredientsItem(props) {

    const history = useHistory();
    const location = useLocation();

    const showDetails = (e) => {
        history.replace(`/ingredients/${props.item._id}`, { background: location });
    };

    const [, drag] = useDrag({
        type: "ingredient",
        item: { id: props.item._id },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <div key={props.item._id} className={styles.item} draggable ref={drag}>
            <Counter count={props.count} />
            <div className={styles.item_img} onClick={showDetails}>
                <img src={props.item.image} alt={props.item.name} />
            </div>
            <p className={styles.item_price} onClick={showDetails}>
                {props.item.price}
                <CurrencyIcon />
            </p>
            <p className={styles.item_name} onClick={showDetails}>{props.item.name}</p>
        </div>
    );
}

BurgerIngredientsItem.propTypes = {
    count: PropTypes.number,
    item: ingredientPropTypes.isRequired,
};

export { BurgerIngredientsItem };
