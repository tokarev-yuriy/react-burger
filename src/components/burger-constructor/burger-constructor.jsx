import React from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorTotal from '../burger-constructor-total/burger-constructor-total';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/data';

class BurgerConstructor extends React.Component {
    
    /**
     * 
     * @returns Итоговая сумма
     */
    getTotal() {
        let summ = 0;
        summ += this.props.topItem.price;
        this.props.mainItems.map((item) => {
            summ += item.price;
        })
        summ += this.props.bottomItem.price;
        return summ;
    }

    render() {
        return (
            <section className="pt-15 ml-10 pl-4 pr-4">
                <div className="pl-8 pb-4 pr-4">
                    <ConstructorElement
                        type="top"
                        text={this.props.bottomItem.name}
                        thumbnail={this.props.bottomItem.image_mobile}
                        price={this.props.bottomItem.price}
                        isLocked
                    />
                </div>
                <div className={styles.main_items}>
                    {this.props.mainItems.map((item, index) => {
                        return (
                            <div className="pb-4 pr-4" key={index}>
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
                        text={this.props.topItem.name}
                        thumbnail={this.props.topItem.image_mobile}
                        price={this.props.topItem.price}
                        isLocked
                    />
                </div>
                <BurgerConstructorTotal total={this.getTotal()} />
            </section>
        );
    }
}

BurgerConstructor.propTypes = {
    mainItems: PropTypes.arrayOf(ingredientPropTypes),
    bottomItem: ingredientPropTypes,
    topItem: ingredientPropTypes,
}; 

export default BurgerConstructor;
