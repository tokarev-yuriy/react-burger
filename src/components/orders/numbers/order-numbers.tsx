import React, { FC, ReactNode } from 'react';
import styles from './order-numbers.module.css';
import { TOrder } from '../../../utils/types';

interface IOrderNumbersProps {
    orders: Array<TOrder>;
    title: string;
    className?: string;
    children?: ReactNode;
}

const OrderNumbers: FC<IOrderNumbersProps> = (props: IOrderNumbersProps) => {

    return (
        <div> 
            <h3 className={styles.title}>{props.title}</h3>
            <ul className={styles.list}>
                {props.orders.length === 0 && (
                    <li className={props.className}>-</li>
                )}
                {props.orders.map(order => (
                    <li className={props.className}>{order.number}</li>
                ))}
            </ul>
        </div>
    );
}

export { OrderNumbers };
