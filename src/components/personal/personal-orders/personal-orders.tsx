import React, { FC, useEffect } from 'react';
import styles from './personal-orders.module.css';
import { OrderList } from '../../orders/list/order-list';
import { EmptyObject } from 'redux';
import { useAppDispatch, useAppSelector } from '../../../services/types/hooks';
import { getHistoryCloseAction, getHistoryOpenAction } from '../../../services/actions/history';

const PersonalOrders: FC<EmptyObject> = () => {

  const { isLoading, isFailed, orders } = useAppSelector((store) => ({
    isLoading: store.history.historyRequest && !store.history.historyRequestFail,
    isFailed: !store.history.historyRequest && store.history.historyRequestFail,
    orders: store.history.orders,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHistoryOpenAction());
    return () => {
      dispatch(getHistoryCloseAction());
    };
  }, [dispatch]);

  return (
    <>
    {isFailed ? (
      <p>Не удалось загрузить данные</p>
    ) : 
      isLoading ? (
        <p>Идет загрузка</p>
      ):(
        orders && (
          <div className={styles.scrollable}>
              <OrderList orders={orders} showStatus={true} />
          </div>
        )
      )
    }
    </>
  );
}

export { PersonalOrders };
