import React, { ReactElement } from 'react';
import styles from './order-detail-modal.module.css';
import { Modal } from '../../misc/modal/modal';
import { useHistory, useParams } from 'react-router-dom';
import { OrderDetail } from '../detail/order-detail';
import { useAppSelector } from '../../../services/types/hooks';

function OrderDetailModal(): ReactElement {
    const history = useHistory();
    const params = useParams<{id: string}>();

    const order = useAppSelector((store) => (
        params['id'] ? store.feed.orders.find(item => item._id === params['id']) : undefined
    ));

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