import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ReactNode, useEffect } from 'react';
import { FC } from 'react';

interface IModalProps {
    onClose: () => void;
    title?: string;
    children?: ReactNode;
}

const modalRoot = document.getElementById("react-modals");

const Modal: FC<IModalProps> = ({ onClose, title, children }: IModalProps) => {

    const onClick = (): void => {
        onClose();
    }

    useEffect(() => {
        const catchEscKey = (event: KeyboardEvent): void => {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener('keydown', catchEscKey);
        return () => {
            document.removeEventListener('keydown', catchEscKey);
        }
    }, [onClose])

    return ReactDOM.createPortal(
        <div className={styles.modal_wrapper}>
            <div className={styles.modal}>
                <h2 className={styles.modal_title}>{title}</h2>
                <div className={styles.modal_close} data-test-id="modal-close">
                    <CloseIcon onClick={onClick} type="primary" />
                </div>
                <div className={styles.modal_content}>
                    {children}
                </div>
            </div>
            <ModalOverlay onClose={onClose} />
        </div>
        ,
        modalRoot as Element
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
};

export { Modal };