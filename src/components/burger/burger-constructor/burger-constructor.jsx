import { useMemo, useContext } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorTotal } from '../burger-constructor-total/burger-constructor-total';
import { useCallback } from 'react';
import { Modal } from '../../misc/modal/modal';
import { OrderDetails } from '../../personal/order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrderAction, ACTION_ORDER_HIDE } from '../../../services/actions/order';
import { ACTION_CONSTRUCTOR_ADD } from '../../../services/actions/constructor';
import { useDrop } from 'react-dnd';
import { BurgerConstructorItem } from '../burger-constructor-item/burger-constructor-item';
import { guuid } from '../../../utils/guuid';

function BurgerConstructor() {

    const dispatch = useDispatch();
    const state = useSelector(store => store.cart);
    const ingredients = useSelector(store => store.catalog.ingredients);
    const order = useSelector(store => store.order.order);

    const [, drop] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch({
                type: ACTION_CONSTRUCTOR_ADD,
                item: {
                    ...ingredients.find(element => element._id === item.id),
                    id: guuid()
                },
            });
        },
    });

    const hideOrder = useCallback((e) => {
        dispatch({type: ACTION_ORDER_HIDE});
    }, [dispatch]);

    const burgerTotal = useMemo(() => {
        return state.ingredients.reduce(
            (value, item) => value + item.price,
            state.bun ? 2 * state.bun.price : 0
        );
    }, [state]);

    const canPlaceOrder = useMemo(() => {
        return state.ingredients.length > 0 && state.bun;
    }, [state]);

    const onPlaceOrder = useCallback(async () => {
        dispatch(placeOrderAction());
    }, [dispatch]);

    return (
        <section className={styles.section}>
          <div ref={drop}>
            {state.ingredients.length === 0 && !state.bun && (
                <div className={styles.empty_burger}>
                    Перетяните булки и ингредиенты
                </div>                
            )}
            <div className={styles.bun_top}>
                {state.bun &&
                    (
                    <ConstructorElement
                        type="top"
                        text={`${state.bun.name} (верх)`}
                        thumbnail={state.bun.image_mobile}
                        price={state.bun.price}
                        isLocked
                    />
                    )
                }
            </div>
            <div className={styles.main_items}>
                {state.ingredients.map(item => {
                    return (
                        <BurgerConstructorItem {...item}  key={item.id} />
                    );
                })}
            </div>
            <div className={styles.bun_bottom}>
                {state.bun &&
                    (
                      <ConstructorElement
                        type="bottom"
                        text={`${state.bun.name} (низ)`}
                        thumbnail={state.bun.image_mobile}
                        price={state.bun.price}
                        isLocked
                      />
                    )
                }
            </div>
          </div>
            {state.orderRequest ? (
                <p>Подождите...</p>
             ) : (state.orderRequestFail ? (
                <p>Не удалось разместить заказ, произошла ошибка</p>
             )
             :'')}
            <BurgerConstructorTotal total={burgerTotal} onPlaceOrder={onPlaceOrder} isDisabled={!canPlaceOrder} />
            
            {order && (
                <Modal title="" onClose={hideOrder}>
                    <OrderDetails id={order.orderId} />
                </Modal>
            )}
        </section>
    );
}

export { BurgerConstructor };
