import React, { ReactElement } from 'react';
import styles from './order-detail-modal.module.css';
import { Modal } from '../../misc/modal/modal';
import { useHistory } from 'react-router-dom';
import { OrderDetail } from '../detail/order-detail';
import { TOrder } from '../../../utils/types';

function OrderDetailModal(): ReactElement {
    const history = useHistory();
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

    const hideDetails = (): void => {
        history.replace('/feed');
    };

    return (
        <>
            {order && (
                <Modal title="&nbsp;" onClose={hideDetails}>
                    <OrderDetail order={order} />
                </Modal>
            )}
        </>
    );
}

export { OrderDetailModal };