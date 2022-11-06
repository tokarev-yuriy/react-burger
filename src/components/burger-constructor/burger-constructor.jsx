import { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorTotal } from '../burger-constructor-total/burger-constructor-total';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-type';
import { useCallback } from 'react';
import { placeOrder } from '../../api/order';
import { useState } from 'react';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

function BurgerConstructor(props) {

    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const [orderId, setOrderId] = useState('');

    const showOrder = (e) => {
        setOrderModalVisible(true);
    }
    const hideOrder = (e) => {
        setOrderModalVisible(false);
    }

    const burgerTotal = useMemo(() => {
        let total = 0;
        total += props.bun.price;
        props.mainItems.map((item) => {
            total += item.price;
        });
        return total;
    }, [props.bun, props.mainItems]);

    const onPlaceOrder = useCallback(() => {
        
        const result = placeOrder();
        if (result) {
            setOrderId(result.id);
            showOrder();
        }
    });
    

    return (
        <section className={styles.section}>
            <div className={styles.bun_top}>
                <ConstructorElement
                    type="top"
                    text={props.bun.name}
                    thumbnail={props.bun.image_mobile}
                    price={props.bun.price}
                    isLocked
                />
            </div>
            <div className={styles.main_items}>
                {props.mainItems.map((item, index) => {
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
                    text={props.bun.name}
                    thumbnail={props.bun.image_mobile}
                    price={props.bun.price}
                    isLocked
                />
            </div>
            <BurgerConstructorTotal total={burgerTotal} onPlaceOrder={onPlaceOrder} />
            
            {orderModalVisible && (
                <Modal title="" onClose={hideOrder}>
                    <OrderDetails id={orderId} />
                </Modal>
            )}
        </section>
    );
}

BurgerConstructor.propTypes = {
    mainItems: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    bun: ingredientPropTypes.isRequired
}; 

export { BurgerConstructor };
