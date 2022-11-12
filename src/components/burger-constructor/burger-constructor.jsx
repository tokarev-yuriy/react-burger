import { useMemo, useContext } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorTotal } from '../burger-constructor-total/burger-constructor-total';
import { useCallback } from 'react';
import { placeOrder } from '../../api/order';
import { useState } from 'react';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { ConstructorContext } from '../../services/constructorContext';

function BurgerConstructor(props) {

    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const [orderId, setOrderId] = useState('');

    const {state: constructorState, dispatcher: constructorDispatcher} = useContext(ConstructorContext);

    const showOrder = (e) => {
        setOrderModalVisible(true);
    }
    const hideOrder = (e) => {
        setOrderModalVisible(false);
    }

    const burgerTotal = useMemo(() => {
        let total = 0;
        if (constructorState.bun) {
            total += 2 * constructorState.bun.price;
        }
        constructorState.ingredients.forEach((item) => {
            total += item.price;
        });
        return total;
    }, [constructorState]);

    const onPlaceOrder = useCallback(() => {
        
        const result = placeOrder();
        if (result) {
            setOrderId(result.id);
            showOrder();
        }
    }, []);
    

    return (
        <section className={styles.section}>
            <div className={styles.bun_top}>
                {constructorState.bun && 
                    (<ConstructorElement
                        type="top"
                        text={`${constructorState.bun.name} (верх)`}
                        thumbnail={constructorState.bun.image_mobile}
                        price={constructorState.bun.price}
                        handleClose={constructorDispatcher({type: 'remove', playbook:  constructorState.bun._id})}
                        isLocked
                    />)
                }
            </div>
            <div className={styles.main_items}>
                {constructorState.ingredients.map((item, index) => {
                    return (
                        <div className={styles.main_items_item} key={index}>
                            <span className={styles.main_items_item_icon}>
                                <DragIcon />
                            </span>
                            <ConstructorElement
                                text={item.name}
                                thumbnail={item.image_mobile}
                                price={item.price}
                                handleClose={constructorDispatcher({type: 'remove', playbook: item._id})}
                            />
                        </div>
                    );
                })}
            </div>
            <div className={styles.bun_bottom}>
                {constructorState.bun && 
                    (<ConstructorElement
                        type="bottom"
                        text={`${constructorState.bun.name} (низ)`}
                        thumbnail={constructorState.bun.image_mobile}
                        price={constructorState.bun.price}
                        handleClose={constructorDispatcher({type: 'remove', playbook: constructorState.bun._id})}
                        isLocked
                    />)
                }
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

export { BurgerConstructor };
