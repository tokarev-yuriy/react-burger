import { useMemo, useContext } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorTotal } from '../burger-constructor-total/burger-constructor-total';
import { useCallback } from 'react';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_CONSTRUCTOR_REMOVE, placeOrderAction, ACTION_CONSTRUCTOR_ORDER_HIDE, ACTION_CONSTRUCTOR_ADD } from '../../services/actions/constructor';
import { useDrop } from 'react-dnd';

function BurgerConstructor() {

    const dispatch = useDispatch();
    const state = useSelector(store => store.cart);
    const ingredients = useSelector(store => store.catalog.ingredients);

    const [{ isHover } , drop] = useDrop({
        accept: "ingredient",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            dispatch({
                type: ACTION_CONSTRUCTOR_ADD,
                item: ingredients.find(element => element._id === item.id),
            });
        },
    });

    const hideOrder = useCallback((e) => {
        dispatch({type: ACTION_CONSTRUCTOR_ORDER_HIDE});
    }, [dispatch]);

    const burgerTotal = useMemo(() => {
        return state.ingredients.reduce(
            (value, item) => value + item.price,
            state.bun ? 2 * state.bun.price : 0
        );
    }, [state]);

    const onPlaceOrder = useCallback(async () => {
        dispatch(placeOrderAction());
    }, [dispatch]);
    
    const onRemoveItem = useCallback((id) => {
        dispatch({type: ACTION_CONSTRUCTOR_REMOVE, playbook: id});
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
            <BurgerConstructorTotal total={burgerTotal} onPlaceOrder={onPlaceOrder} />
            
            {state.order && (
                <Modal title="" onClose={hideOrder}>
                    <OrderDetails id={state.order.orderId} />
                </Modal>
            )}
        </section>
    );
}

export { BurgerConstructor };
