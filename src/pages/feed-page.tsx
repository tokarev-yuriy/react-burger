import React, { ReactElement, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { OrderList } from '../components/orders/list/order-list';
import { OrderNumbers } from '../components/orders/numbers/order-numbers';
import { getFeedCloseAction, getFeedOpenAction } from '../services/actions/feed';
import { useAppDispatch, useAppSelector } from '../services/types/hooks';
import styles from "./feed-page.module.css";


function FeedPage(): ReactElement {

  const { isLoading, isFailed, orders, total, totalToday } = useAppSelector((store) => ({
    isLoading: store.feed.feedRequest && !store.feed.feedRequestFail,
    isFailed: !store.feed.feedRequest && store.feed.feedRequestFail,
    orders: store.feed.orders,
    total: store.feed.total,
    totalToday: store.feed.totalToday,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFeedOpenAction());
    return () => {
      dispatch(getFeedCloseAction());
    };
  }, [dispatch]);

  const history = useHistory();
  const location = useLocation();

  const openDetails = (id: string): void => {
    history.replace(`/feed/${id}`, { background: location });
  }

  return (
    <section className={styles.section}>
        <h1 className={styles.page_title}>Лента заказов</h1>
        {isFailed ? (
          <p>Не удалось загрузить данные</p>
        ) : 
          isLoading ? (
            <p>Идет загрузка</p>
          ):(
            orders && (
              <div className={styles.two_columns}>
                <div className={styles.left_column}>
                  <OrderList orders={orders} openDetails={openDetails} />
                </div>
                <div className={styles.right_column}>
                  <div className={styles.numbers}>
                    <OrderNumbers orders={orders.filter(order => order.status === 'done').slice(0,10)} title="Готовы:" className="text_color_success" />
                    <OrderNumbers orders={orders.filter(order => order.status !== 'done').slice(0,10)} title="В работе:" />
                  </div>
                  <div className={styles.totals}>
                    <h3 className={styles.totals_title}>Выполнено за все время:</h3>
                    <div className={styles.totals_summ}>{total}</div>
                  </div>
                  <div>
                    <h3 className={styles.totals_title}>Выполнено за сегодня:</h3>
                    <div className={styles.totals_summ}>{totalToday}</div>
                  </div>
                </div>
              </div>
            )
          )
        }
    </section>
  );
}

export { FeedPage };
