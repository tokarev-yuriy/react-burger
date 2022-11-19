import { useMemo, useContext } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorTotal } from '../burger-constructor-total/burger-constructor-total';
import { useCallback } from 'react';
import { placeOrder } from '../../api/order';
import { useState } from 'react';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_CONSTRUCTOR_REMOVE } from '../../services/actions/constructor';

function BurgerConstructor() {

    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const state = useSelector(store => store.cart);

    const showOrder = useCallback((e) => {
        setOrderModalVisible(true);
    }, []);

    const hideOrder = useCallback((e) => {
        setOrderModalVisible(false);
    }, []);

    const burgerTotal = useMemo(() => {
        return state.ingredients.reduce(
            (value, item) => value + item.price,
            state.bun ? 2 * state.bun.price : 0
        );
    }, [state]);

    const onPlaceOrder = useCallback(async () => {
        setError('');
        try {
            const ingredients = [state.bun._id, ...state.ingredients.map(item => item._id), state.bun._id] ;
            const result = await placeOrder(ingredients);
            if (result && result.orderId) {
                setOrderId(result.orderId);
                showOrder();
            } else {
                throw new Error('No result or order id');
            }
        } catch(error) {
            setError('Oops, an error occurred, please try again later');
        }
    }, [showOrder, setOrderId, setError, state]);
    
    const onRemoveItem = useCallback((id) => {
        dispatch({type: ACTION_CONSTRUCTOR_REMOVE, playbook: id});
    }, [dispatch]);

    return (
        <section className={styles.section}>
            <div className={styles.bun_top}>
                {state.bun && 
                    (<ConstructorElement
                        type="top"
                        text={`${state.bun.name} (верх)`}
                        thumbnail={state.bun.image_mobile}
                        price={state.bun.price}
                        isLocked
                    />)
                }
            </div>
            <div className={styles.main_items}>
                {state.ingredients.map(item => {
                    return (
                        <div className={styles.main_items_item} key={item._id}>
                            <span className={styles.main_items_item_icon}>
                                <DragIcon />
                            </span>
                            <ConstructorElement
                                text={item.name}
                                thumbnail={item.image_mobile}
                                price={item.price}
                                handleClose={() => {onRemoveItem(item._id)}}
                            />
                        </div>
                    );
                })}
            </div>
            <div className={styles.bun_bottom}>
                {state.bun && 
                    (<ConstructorElement
                        type="bottom"
                        text={`${state.bun.name} (низ)`}
                        thumbnail={state.bun.image_mobile}
                        price={state.bun.price}
                        isLocked
                    />)
                }
            </div>
            {error ? (
                <p>{error}</p>
             ) : ''}
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
