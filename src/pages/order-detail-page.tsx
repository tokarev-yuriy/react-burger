import React, { ReactElement } from "react";
import { OrderDetail } from "../components/orders/detail/order-detail";
import { TOrder } from "../utils/types";
import styles from "./order-detail-page.module.css";


function OrderDetailPage(): ReactElement {
  const order : TOrder = {
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
    _id: "4",
    status: "done",
    number: 232323,
    name: "Тестовое название бургера",
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z"
};

  return (
    <div className={styles.container}>
      {order ? (
        <OrderDetail order={order} />
      ) : (
        <p>Заказ не найден =(</p>
      )}
    </div>
  );
}

export { OrderDetailPage };
