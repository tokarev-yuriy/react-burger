import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsItem } from '../burger-ingredients-item/burger-ingredients-item';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-type';
import { useCallback } from 'react';

function BurgerIngredients(props) {

    const [activeTab, setActiveTab] = useState('bun');

    /**
     * меняем активный tab
     * @param string val 
     */
    const changeTab = useCallback((val) => {
        setActiveTab(val);
        const tabElement = document.getElementById('ingredients-tab-'  + val);
        if (tabElement) {
            tabElement.scrollIntoView();
        }
    }, []);

    const types = [
        {
            'code': 'bun',
            'title': 'Булки',
            'items': props.items.filter((data) => data.type === 'bun'),
        },
        {
            'code': 'sauce',
            'title': 'Соусы',
            'items': props.items.filter((data) => data.type === 'sauce'),
        },
        {
            'code': 'main',
            'title': 'Начинки',
            'items': props.items.filter((data) => data.type === 'main'),
        },
    ];

    return (
        <section className={styles.section}>
            <h1 className={styles.section_title}>Соберите бургер</h1>
            
            <div className={styles.section_tabs}>
                {types.map((type)=>(
                    <Tab value={type.code} active={type.code === activeTab} onClick={changeTab} key={type.code}>
                        {type.title}
                    </Tab>
                ))}
            </div>
            
            <div className={styles.scrollable}>
                {types.map((type)=>(
                    <React.Fragment key={type.code}>
                        <h2 className={styles.section_items_title} id={'ingredients-tab-' + type.code}>{type.title}</h2>
                        <div className={styles.ingredients}>
                            {type.items.map((ingredient) => (
                                <BurgerIngredientsItem item={ingredient} key={ingredient._id} count={1} />
                            ))}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    items: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
}; 

export { BurgerIngredients };