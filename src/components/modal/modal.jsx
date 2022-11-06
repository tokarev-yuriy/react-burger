import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.getElementById("react-modals");

function Modal(props) {

    const {onClose, title, children} = props;

    const catchEscKey = (event) => {
        if (event.key === "Escape") {
            onClose();
        }
    }

    const onClick = () => {
        onClose();
    }

    useEffect(() => {
        document.addEventListener('keydown', catchEscKey);
        return () => {
            document.removeEventListener('keydown', catchEscKey);
        }
    }, [])

    return ReactDOM.createPortal(
        <div className={styles.modal_wrapper}>
            <div className={styles.modal}>
                <h2 className={styles.modal_title}>{title}</h2>
                <div className={styles.modal_close}>
                    <CloseIcon onClick={onClick} className />
                </div>
                <div className={styles.modal_content}>
                    {children}
                </div>
            </div>
            <ModalOverlay onClose={onClose} />
        </div>
        ,
        modalRoot
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
};

export { Modal };