import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

function Modal(props) {

    const {onClose, title, children} = props;

    return ReactDOM.createPortal(
        <div className={styles.modal_wrapper}>
            <div className={styles.modal}>
                <h2 className={styles.modal_title}>{title}</h2>
                <div className={styles.modal_close}>
                    <CloseIcon onClick={onClose} className />
                </div>
                <div className={styles.modal_content}>
                    {children}
                </div>
            </div>
            <ModalOverlay onClose={onClose} />
        </div>,
        modalRoot
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
};

export { Modal };