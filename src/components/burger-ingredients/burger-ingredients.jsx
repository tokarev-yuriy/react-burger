import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import getIngredientsService from '../../api/ingredients';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

class BurgerIngredients extends React.Component {
    state = {
        tab: 'bun',
        items: []
    };

    /**
     * Подгружаем ингридиенты
     */
    componentDidMount() {
        let items = getIngredientsService();
        this.setState({
            ...this.state,
            items: items
        });
    }

    /**
     * меняем активный tab
     * @param string val 
     */
    setTab = (val) => {
        let tab = document.getElementById('ingredients-tab-'  + val);
        tab.scrollIntoView();
        this.setState({
            ...this.state,
            tab: val
        })
    }

    render() {
        let types = [
            {
                'code': 'bun',
                'title': 'Булки',
            },
            {
                'code': 'sauce',
                'title': 'Соусы',
            },
            {
                'code': 'main',
                'title': 'Начинки',
            },
        ];
        return (
            <section className={styles.section}>
                <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
                
                <div style={{ display: 'flex' }} className="mb-10">
                    {types.map((type)=>(
                        <Tab value={type.code} active={this.state.tab === type.code} onClick={this.setTab} key={type.code}>
                            {type.title}
                        </Tab>
                    ))}
                </div>
                
                <div className={styles.scrollable}>
                    {types.map((type)=>(
                        <React.Fragment key={type.code}>
                            <h2 class="text text_type_main-medium" id={'ingredients-tab-' + type.code}>{type.title}</h2>
                            <div className={styles.ingredients}>
                                {this.state.items.map((ingredient) => {
                                    if (ingredient.type!=type.code) return;
                                    return (
                                        <BurgerIngredientsItem item={ingredient} key={ingredient._id} />
                                    );
                                })}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </section>
        );
    }
}

export default BurgerIngredients;
