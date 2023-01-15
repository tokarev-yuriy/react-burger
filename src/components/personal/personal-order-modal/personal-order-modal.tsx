import React, { ReactElement } from 'react';
import styles from './personal-order-modal.module.css';
import { Modal } from '../../misc/modal/modal';
import { useHistory, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../services/types/hooks';
import { OrderDetail } from '../../orders/detail/order-detail';

function PersonalOrderModal(): ReactElement {
    const history = useHistory();
    const params = useParams<{id: string}>();

    const order = useAppSelector((store) => (
        params['id'] ? store.history.orders.find(item => item._id === params['id']) : undefined
    ));

    const hideDetails = (): void => {
        history.replace('/profile/orders');
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

export { PersonalOrderModal };