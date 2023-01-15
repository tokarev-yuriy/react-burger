import React, { FC } from 'react';
import styles from './order-list.module.css';
import { TOrder } from '../../../utils/types';
import { OrderListItem } from '../list-item/order-list-item';

interface IOrderListProps {
    orders: Array<TOrder>;
    showStatus?: boolean;
}

const OrderList: FC<IOrderListProps> = (props: IOrderListProps) => {

    return (
        <>
            {props.orders.map(order => {
                return (
                    <OrderListItem order={order} limitItems={6} key={order._id} showStatus={props.showStatus ?? false} />
                );
            })}
        </>
    );
}

export { OrderList };