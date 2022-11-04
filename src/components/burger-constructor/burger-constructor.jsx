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
        summ += this.props.bun.price;
        this.props.mainItems.map((item) => {
            summ += item.price;
        })
        return summ;
    }

    render() {
        return (
            <section className={styles.section}>
                <div className={styles.bun_top}>
                    <ConstructorElement
                        type="top"
                        text={this.props.bun.name}
                        thumbnail={this.props.bun.image_mobile}
                        price={this.props.bun.price}
                        isLocked
                    />
                </div>
                <div className={styles.main_items}>
                    {this.props.mainItems.map((item, index) => {
                        return (
                            <div className={styles.main_items_item} key={index}>
                                <span className={styles.main_items_item_icon}>
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
                <div className={styles.bun_bottom}>
                    <ConstructorElement
                        type="bottom"
                        text={this.props.bun.name}
                        thumbnail={this.props.bun.image_mobile}
                        price={this.props.bun.price}
                        isLocked
                    />
                </div>
                <BurgerConstructorTotal total={this.getTotal()} />
            </section>
        );
    }
}

BurgerConstructor.propTypes = {
    mainItems: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    bun: ingredientPropTypes.isRequired
}; 

export default BurgerConstructor;
