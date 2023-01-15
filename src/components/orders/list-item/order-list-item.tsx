import React, { FC, ReactNode, useMemo } from 'react';
import styles from './order-list-item.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { TOrder } from '../../../utils/types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../../services/types/hooks';

interface IOrderListItemProps {
    order: TOrder;
    limitItems: number;
    children?: ReactNode;
}

const OrderListItem: FC<IOrderListItemProps> = (props: IOrderListItemProps) => {

    const history = useHistory();
    const location = useLocation();
    const ingredients = useAppSelector(store => store.catalog.ingredients);

    const orderIngredients = props.order.ingredients.map(id => ingredients.find(item => item._id === id)).filter(item => item !== undefined);
    const total = useMemo((): number => {
        return orderIngredients.reduce(
            (value, item) => item ? value + item.price : value,
            0
        );
    }, [orderIngredients]);

    const showDetails = (): void => {
        history.replace(`/feed/${props.order._id}`, { background: location });
    };

    return (
        <div key={props.order._id} className={styles.item}>
            <div className={styles.head}>
                <h3 className={styles.head_number}>#{props.order.number}</h3>
                <span className={styles.head_date}><FormattedDate date={new Date(props.order.createdAt)} /></span>
            </div>
            <h2 className={styles.title}>{props.order.name}</h2>
            <div className={styles.body}>
                <div>
                    {orderIngredients.map((ingredient, index) => {
                        if (!ingredient) return;
                        if (index >= props.limitItems) {
                            return;
                        }
                        if (index === props.limitItems-1) {
                            return (
                                <>
                                    <img src={ingredient.image_mobile} alt={ingredient.name} title={ingredient.name} />
                                    <span className={styles.body_add}>+{orderIngredients.length - props.limitItems}</span>
                                </>
                            );
                        }
                        return (
                            <img src={ingredient.image_mobile} alt={ingredient.name} title={ingredient.name} />
                        );
                    })}
                </div>
                <span className={styles.body_price}>
                    {total}
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    );
}

export { OrderListItem };
