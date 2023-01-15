import React, { FC, ReactNode, useMemo } from 'react';
import styles from './order-list-item.module.css';
import { TOrder } from '../../../utils/types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../../services/types/hooks';

interface IOrderListItemProps {
    order: TOrder;
    limitItems: number;
    showStatus: boolean;
    openDetails?: (id: string) => void, 
    children?: ReactNode;
}

const OrderListItem: FC<IOrderListItemProps> = (props: IOrderListItemProps) => {

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

    const showDetails = (): void => {
        if (props.openDetails) {
            props.openDetails(props.order._id);
        }
    };

    return (
        <div key={props.order._id} className={styles.item} onClick={showDetails}>
            <div className={styles.head}>
                <h3 className={styles.head_number}>#{props.order.number}</h3>
                <span className={styles.head_date}><FormattedDate date={new Date(props.order.createdAt)} /></span>
            </div>
            <h2 className={styles.title}>{props.order.name}</h2>
            {props.showStatus && getStatus(props.order.status)}
            <div className={styles.body}>
                <div>
                    {orderIngredients.map((ingredient, index) => {
                        if (!ingredient) return null;
                        if (index >= props.limitItems) {
                            return null;
                        }
                        if (index === props.limitItems-1) {
                            return (
                                <React.Fragment key={index}>
                                    <div key={index} className={styles.body_image}>
                                        <img src={ingredient.image_mobile} alt={ingredient.name} title={ingredient.name} />
                                    </div>
                                    <span className={styles.body_add}>+{orderIngredients.length - props.limitItems}</span>
                                </React.Fragment>
                            );
                        }
                        return (
                            <div key={index} className={styles.body_image}>
                                <img src={ingredient.image_mobile} alt={ingredient.name} title={ingredient.name} />
                            </div>
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
