import React, { ReactElement } from 'react';
import { OrderList } from '../components/orders/list/order-list';
import { OrderNumbers } from '../components/orders/numbers/order-numbers';
import { useAppSelector } from '../services/types/hooks';
import { TOrder } from '../utils/types';
import styles from "./feed-page.module.css";


function FeedPage(): ReactElement {

  const { isLoading, isFailed, items } = useAppSelector((store) => ({
    isLoading: store.catalog.catalogRequest && !store.catalog.catalogRequestFail,
    isFailed: !store.catalog.catalogRequest && store.catalog.catalogRequestFail,
    items: store.catalog.ingredients,
  }));

  const orders : Array<TOrder> = [
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733c9"
      ],
      _id: "",
      status: "done",
      number: 232323,
      name: "Тестовое название бургера",
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733c9"
      ],
      _id: "",
      status: "done",
      number: 232323,
      name: "Тестовое название бургера",
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733c9"
      ],
      _id: "",
      status: "pending",
      number: 232323,
      name: "Тестовое название бургера",
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733c9"
      ],
      _id: "",
      status: "done",
      number: 232323,
      name: "Тестовое название бургера",
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z"
    }
  ];
  const total : number = 1;
  const totalToday : number = 1;

  return (
    <section className={styles.section}>
        <h1 className={styles.page_title}>Лента заказов</h1>
        {isFailed ? (
          <p>Не удалось загрузить данные</p>
        ) : 
          isLoading ? (
            <p>Идет загрузка</p>
          ):(
            items && (
              <div className={styles.two_columns}>
                <div className={styles.left_column}>
                  <OrderList orders={orders} />
                </div>
                <div className={styles.right_column}>
                  <div className={styles.numbers}>
                    <OrderNumbers orders={orders.filter(order => order.status === 'done')} title="Готовы:" className="text_color_success" />
                    <OrderNumbers orders={orders.filter(order => order.status !== 'done')} title="В работе:" />
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
