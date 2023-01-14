import { FC, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorTotal } from '../burger-constructor-total/burger-constructor-total';
import { useCallback } from 'react';
import { Modal } from '../../misc/modal/modal';
import { OrderDetails } from '../../personal/order-details/order-details';
import { placeOrderAction, ACTION_ORDER_HIDE } from '../../../services/actions/order';
import { ACTION_CONSTRUCTOR_ADD } from '../../../services/actions/constructor';
import { useDrop } from 'react-dnd';
import { BurgerConstructorItem } from '../burger-constructor-item/burger-constructor-item';
import { guuid } from '../../../utils/guuid';
import { tokenStorage } from '../../../services/token-storage';
import { useHistory } from 'react-router-dom';
import { Action } from 'redux';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { TDragIngredient } from '../../../utils/types';

const BurgerConstructor: FC<{}> = () => {

    const dispatch = useAppDispatch();
    const state = useAppSelector(store => store.cart);
    const ingredients = useAppSelector(store => store.catalog.ingredients);
    const order = useAppSelector(store => store.order.order);
    const isLoggedIn = useAppSelector(store => store.auth.user && store.auth.user.email && tokenStorage.getInstance().getToken() ? true: false);
    const {isRequest, isRequestFail} = useAppSelector(store => {
        return {
            isRequest: store.order.orderRequest,
            isRequestFail: store.order.orderRequestFail
        }
    });
    const history = useHistory();

    const [, drop] = useDrop<TDragIngredient>({
        accept: "ingredient",
        drop(item: TDragIngredient) {
            dispatch({
                type: ACTION_CONSTRUCTOR_ADD,
                item: {
                    ...ingredients.find(element => element._id === item.id),
                    id: guuid()
                },
            });
        },
    });

    const hideOrder = useCallback((): void => {
        dispatch({ type: ACTION_ORDER_HIDE });
    }, [dispatch]);

    const burgerTotal = useMemo((): number => {
        return state.ingredients.reduce(
            (value, item) => value + item.price,
            state.bun ? 2 * state.bun.price : 0
        );
    }, [state]);

    const canPlaceOrder = useMemo((): boolean => {
        return state.ingredients.length > 0 && state.bun !== null;
    }, [state]);

    const onPlaceOrder = useCallback(async (): Promise<void> => {
        if (isLoggedIn) {
            dispatch(placeOrderAction() as unknown as Action<string>);
        } else {
            history.push('/login', { referer: { pathname: '/' } });
        }
    }, [dispatch, history, isLoggedIn]);

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
                            <BurgerConstructorItem {...item} key={item.id} />
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
            {isRequest ? (
                <p className={styles.info}>Мы передаем ваш заказ на кухню... пожождите...</p>
            ) : (isRequestFail ? (
                <p>Не удалось разместить заказ, произошла ошибка</p>
            )
                : '')}
            {!isRequest && (
                <BurgerConstructorTotal total={burgerTotal} onPlaceOrder={onPlaceOrder} isDisabled={!canPlaceOrder} />
            )}

            {order && (
                <Modal title="" onClose={hideOrder}>
                    <OrderDetails id={order.orderId} />
                </Modal>
            )}
        </section>
    );
}

export { BurgerConstructor };
