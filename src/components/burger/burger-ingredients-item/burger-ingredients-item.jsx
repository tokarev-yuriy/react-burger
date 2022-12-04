import React, { useContext } from 'react';
import styles from './burger-ingredients-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/prop-type';
import { useDispatch } from 'react-redux';
import { ACTION_CATALOG_DETAIL_SHOW } from '../../../services/actions/catalog-detail';
import { useDrag } from 'react-dnd';

function BurgerIngredientsItem(props) {

    const dispatch = useDispatch();

    const showDetails = (e) => {
        dispatch({type: ACTION_CATALOG_DETAIL_SHOW, item: props.item});
    };

    const [{ isDrag }, drag] = useDrag({
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
            <p className={styles.item_name}  onClick={showDetails}>{props.item.name}</p>
        </div>
    );
}

BurgerIngredientsItem.propTypes = {
    count: PropTypes.number,
    item: ingredientPropTypes.isRequired,
};

export { BurgerIngredientsItem };
