import React from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import getIngredientsService from '../../api/ingredients';
import BurgerConstructorTotal from '../burger-constructor-total/burger-constructor-total';

class BurgerConstructor extends React.Component {
    state = {
        topItem: {},
        mainItems: [],
        bottomItem: {},
    };

    /**
     * Подгружаем ингридиенты
     */
     componentDidMount() {
        let items = getIngredientsService();
        this.setState({
            ...this.state,
            topItem: items[0],
            bottomItem: items[items.length - 1],
            mainItems: items.slice(1, items.length-1)
        });
    }

    /**
     * 
     * @returns Итоговая сумма
     */
    getTotal() {
        let summ = 0;
        summ += this.state.topItem.price;
        this.state.mainItems.map((item) => {
            summ += item.price;
        })
        summ += this.state.bottomItem.price;
        return summ;
    }

    render() {
        return (
            <section className="pt-15 ml-10 pl-4 pr-4">
                <div className="pl-8 pb-4 pr-4">
                    <ConstructorElement
                        type="top"
                        text={this.state.bottomItem.name}
                        thumbnail={this.state.bottomItem.image_mobile}
                        price={this.state.bottomItem.price}
                        isLocked
                    />
                </div>
                <div className={styles.main_items}>
                    {this.state.mainItems.map((item, index) => {
                        return (
                            <div className="pb-4 pr-4">
                                <span className="mr-2">
                                    <DragIcon />
                                </span>
                                <ConstructorElement
                                    text={item.name}
                                    thumbnail={item.image_mobile}
                                    price={item.price}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="pl-8 pr-4 mb-10">
                    <ConstructorElement
                        type="bottom"
                        text={this.state.topItem.name}
                        thumbnail={this.state.topItem.image_mobile}
                        price={this.state.topItem.price}
                        isLocked
                    />
                </div>
                <BurgerConstructorTotal total={this.getTotal()} />
            </section>
        );
    }
}

export default BurgerConstructor;