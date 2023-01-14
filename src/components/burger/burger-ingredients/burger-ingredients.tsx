import React, { FC, SyntheticEvent, useMemo, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsItem } from '../burger-ingredients-item/burger-ingredients-item';
import { useCallback } from 'react';
import { TIngredient } from '../../../utils/types';
import { useAppSelector } from '../../../services/hooks';

interface IBurgerIngredientsProps {
    items: Array<TIngredient>;
}

const BurgerIngredients: FC<IBurgerIngredientsProps> = (props: IBurgerIngredientsProps) => {

    const [activeTab, setActiveTab] = useState<string>('bun');

    const cart = useAppSelector((store) => store.cart);

    const getCounts = (id: string): number => {
        if (cart.bun && cart.bun._id === id) {
            return 2;
        }
        return cart.ingredients.reduce((value, item) => (item._id === id) ? ++value : value, 0);
    };

    /**
     * меняем активный tab
     * @param string val 
     */
    const changeTab = useCallback((val: string): void => {
        setActiveTab(val);
        const tabElement = document.getElementById('ingredients-tab-' + val);
        if (tabElement) {
            tabElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const onScroll = (event: SyntheticEvent): void => {
        const scrollTop = event.currentTarget.scrollTop;
        const tabs: {[name:string]: number} = {
            bun: 0,
            sauce: 0,
            main: 0
        }
        for (let x in tabs) {
            const tabElement = document.getElementById('ingredients-tab-' + x);
            if (tabElement instanceof HTMLElement) {
                tabs[x] = tabElement.offsetTop;
            }
        }
        let tab: boolean | string = false;
        let minScroll: boolean | number = false;
        for (let x in tabs) {
            if (minScroll === false || Math.abs(scrollTop - tabs[x]) < minScroll) {
                minScroll = Math.abs(scrollTop - tabs[x]);
                tab = x;
            }
        }
        setActiveTab(tab as string);
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
                {types.map((type) => (
                    <Tab value={type.code} active={type.code === activeTab} onClick={changeTab} key={type.code}>
                        {type.title}
                    </Tab>
                ))}
            </div>

            <div className={styles.scrollable} onScroll={onScroll}>
                {types.map((type) => (
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
        </section>
    );
}

export { BurgerIngredients };