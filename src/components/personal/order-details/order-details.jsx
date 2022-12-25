import React from 'react';
import styles from './order-details.module.css';
import { PropTypes } from 'prop-types';
import checkIcon from '../../../images/check.svg';

function OrderDetails(props) {
    return (
        <div className={styles.order}>
            <h2 className={styles.order_number}>{props.id}</h2>
            <p className={styles.order_label}>идентификатор заказа</p>
            <div className={styles.order_icon}>
                <img src={checkIcon} alt="Ваш заказ начали готовить" />
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
