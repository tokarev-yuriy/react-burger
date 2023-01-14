import React, { FC } from 'react';
import styles from './order-details.module.css';
import * as PropTypes from 'prop-types';
import * as checkIcon from '../../../images/check.svg';

interface IOrderDetailsProps {
    id: number;
}

const OrderDetails: FC<IOrderDetailsProps> = (props: IOrderDetailsProps) => {
    return (
        <div className={styles.order}>
            <h2 className={styles.order_number}>{props.id}</h2>
            <p className={styles.order_label}>идентификатор заказа</p>
            <div className={styles.order_icon}>
                <img src={checkIcon.default} alt="Ваш заказ начали готовить" />
            </div>
            <p className={styles.order_info}>Ваш заказ начали готовить</p>
            <p className={styles.order_comment}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

OrderDetails.propTypes = {
    id: PropTypes.number.isRequired,
};

export { OrderDetails };
