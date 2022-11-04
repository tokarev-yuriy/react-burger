import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/data';

class BurgerIngredients extends React.Component {
    state = {
        tab: 'bun'
    };

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
        const types = [
            {
                'code': 'bun',
                'title': 'Булки',
                'items': this.props.items.filter((data) => data.type === 'bun'),
            },
            {
                'code': 'sauce',
                'title': 'Соусы',
                'items': this.props.items.filter((data) => data.type === 'sauce'),
            },
            {
                'code': 'main',
                'title': 'Начинки',
                'items': this.props.items.filter((data) => data.type === 'main'),
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
                            <h2 className="text text_type_main-medium" id={'ingredients-tab-' + type.code}>{type.title}</h2>
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
}

BurgerIngredients.propTypes = {
    items: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
}; 

export default BurgerIngredients;
