import React, { useMemo, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsItem } from '../burger-ingredients-item/burger-ingredients-item';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-type';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BurgerIngredientDetails } from '../burger-ingredient-details/burger-ingredient-details';
import { Modal } from '../modal/modal';
import { ACTION_CATALOG_DETAIL_HIDE } from '../../services/actions/catalog';

function BurgerIngredients(props) {

    const [activeTab, setActiveTab] = useState('bun');

    const detail = useSelector(store => store.catalog.detail);
    const cart = useSelector(store => store.cart);
    const dispatch = useDispatch();

    const hideDetails = () => {
        dispatch({type: ACTION_CATALOG_DETAIL_HIDE});
    };

    const getCounts = (id) => {
        if (cart.bun && cart.bun._id === id) {
            return 1;
        }
        return cart.ingredients.reduce((value, item) => (item._id === id)?++value:value, 0);
    };

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

    const onScroll = (event) => {
        const scrollTop = event.currentTarget.scrollTop;
        const tabs = {
            bun: 0,
            sauce: 0,
            main: 0
        }
        for(let x in tabs) {
            tabs[x] = document.getElementById('ingredients-tab-'  + x).offsetTop;
        }
        let tab = false;
        let minScroll = false;
        for(let x in tabs) {
            if (minScroll === false || Math.abs(scrollTop - tabs[x]) < minScroll) {
                minScroll = Math.abs(scrollTop - tabs[x]);
                tab = x;
            }
        }
        setActiveTab(tab);
    };

    const types = useMemo(() => ([
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
    ]), [props.items]);

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
            
            <div className={styles.scrollable} onScroll={onScroll}>
                {types.map((type)=>(
                    <React.Fragment key={type.code}>
                        <h2 className={styles.section_items_title} id={'ingredients-tab-' + type.code}>{type.title}</h2>
                        <div className={styles.ingredients}>
                            {type.items.map((ingredient) => (
                                <BurgerIngredientsItem item={ingredient} key={ingredient._id} count={getCounts(ingredient._id)} />
                            ))}
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {detail && (
                <Modal title="Детали ингредиента" onClose={hideDetails}>
                    <BurgerIngredientDetails item={detail} />
                </Modal>
            )}
        </section>
    );
}

BurgerIngredients.propTypes = {
    items: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
}; 

export { BurgerIngredients };