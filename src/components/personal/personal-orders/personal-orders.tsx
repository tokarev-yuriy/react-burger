import React, { FC } from 'react';
import styles from './personal-orders.module.css';
import { OrderList } from '../../orders/list/order-list';
import { TOrder } from '../../../utils/types';
import { EmptyObject } from 'redux';

const PersonalOrders: FC<EmptyObject> = () => {
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

   return (
    <div className={styles.scrollable}>
        <OrderList orders={orders} showStatus={true} />
    </div>
    );
}

export { PersonalOrders };
