import React, { FC, ReactNode, useMemo } from 'react';
import styles from './order-detail.module.css';
import { TOrder } from '../../../utils/types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../../services/types/hooks';

interface IOrderDetailProps {
    order: TOrder;
    children?: ReactNode;
}

const OrderDetail: FC<IOrderDetailProps> = (props: IOrderDetailProps) => {

    const ingredients = useAppSelector(store => store.catalog.ingredients);

    const orderIngredients = props.order.ingredients.map(id => ingredients.find(item => item._id === id)).filter(item => item !== undefined);
    const total = useMemo((): number => {
        return orderIngredients.reduce(
            (value, item) => item ? value + item.price : value,
            0
        );
    }, [orderIngredients]);

    const getStatus = (status: string): ReactNode => {
        if(status === 'done') {
            return (<span className={styles.status_done}>Выполнен</span>);
        }
        if(status === 'created') {
            return (<span className={styles.status_created}>Создан</span>);
        }
        if(status === 'pending') {
            return (<span className={styles.status_pending}>Готовится</span>);
        }

        return (<span className={styles.status_error}>Неизвестный</span>);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.number}>#{props.order.number}</h1>
            <h2 className={styles.title}>{props.order.name}</h2>
            {getStatus(props.order.status)}
            <div className={styles.items}>
                <h2 className={styles.items_title}>Состав:</h2>
                <div className={styles.items_list}>
                    {orderIngredients.map((ingredient, index) => {
                        if (!ingredient) return null;
                        return (
                            <div className={styles.items_item} key={index}>
                                <span className={styles.items_item_name}>
                                    <img className={styles.items_item_img} src={ingredient.image_mobile} alt={ingredient.name} title={ingredient.name} />
                                    {ingredient.name}
                                </span>
                                <span className={styles.items_item_price}>1 x {ingredient.price} <CurrencyIcon type="primary" /></span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={styles.footer}>
                <span className={styles.footer_date}><FormattedDate date={new Date(props.order.createdAt)} /></span>
                <span className={styles.footer_price}>
                    {total}
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    );
}

export { OrderDetail };
