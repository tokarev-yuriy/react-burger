import React, { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OrderDetail } from "../components/orders/detail/order-detail";
import { getFeedCloseAction, getFeedOpenAction } from "../services/actions/feed";
import { useAppDispatch, useAppSelector } from "../services/types/hooks";
import styles from "./order-detail-page.module.css";


function OrderDetailPage(): ReactElement {

  const params = useParams<{id: string}>();

  const { isLoading, isFailed, order } = useAppSelector((store) => ({
    isLoading: store.feed.feedRequest && !store.feed.feedRequestFail,
    isFailed: !store.feed.feedRequest && store.feed.feedRequestFail,
    order: params['id'] ? store.feed.orders.find(item => item._id === params['id']) : undefined,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFeedOpenAction());
    return () => {
      dispatch(getFeedCloseAction());
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

export { OrderDetailPage };
