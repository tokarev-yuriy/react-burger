import React, { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHistoryCloseAction, getHistoryOpenAction } from "../../../services/actions/history";
import { useAppDispatch, useAppSelector } from "../../../services/types/hooks";
import { OrderDetail } from "../../orders/detail/order-detail";
import styles from "./personal-order-detail.module.css";


function PersonalOrderDetail(): ReactElement {

  const params = useParams<{id: string}>();

  const { isLoading, isFailed, order } = useAppSelector((store) => ({
    isLoading: store.history.historyRequest && !store.history.historyRequestFail,
    isFailed: !store.history.historyRequest && store.history.historyRequestFail,
    order: params['id'] ? store.history.orders.find(item => item._id === params['id']) : undefined,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHistoryOpenAction());
    return () => {
      dispatch(getHistoryCloseAction());
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {isFailed ? (
          <p>Не удалось загрузить данные</p>
        ) : 
          isLoading ? (
            <p>Идет загрузка</p>
          ):(
            order ? (
              <OrderDetail order={order} />
            ) : (
              <p>Заказ не найден =(</p>
            )
          )
      }
    </div>
  );
}

export { PersonalOrderDetail };
