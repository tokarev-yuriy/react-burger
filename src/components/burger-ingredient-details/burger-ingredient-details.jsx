import React from 'react';
import styles from './burger-ingredient-details.module.css';
import { ingredientPropTypes } from '../../utils/prop-type';

function BurgerIngredientDetails(props) {
    return (
        <div key={props.item._id} className={styles.item}>
            <div className={styles.item_img}>
                <img src={props.item.image_large} alt={props.item.name} />
            </div>
            <p className={styles.item_name}>{props.item.name}</p>
            <div className={styles.item_details}>
                <div className={styles.item_details_block}>
                    <span>Калорий,ккал</span>
                    <span className={styles.item_details_block_value}>{props.item.calories}</span>
                </div>
                <div className={styles.item_details_block}>
                    <span>Белки, г</span>
                    <span className={styles.item_details_block_value}>{props.item.proteins}</span>
                </div>
                <div className={styles.item_details_block}>
                    <span>Жиры, г</span>
                    <span className={styles.item_details_block_value}>{props.item.fat}</span>
                </div>
                <div className={styles.item_details_block}>
                    <span>Углеводы, г</span>
                    <span className={styles.item_details_block_value}>{props.item.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}

BurgerIngredientDetails.propTypes = {
    item: ingredientPropTypes.isRequired,
};

export { BurgerIngredientDetails };
