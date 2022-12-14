import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';


function ModalOverlay(props) {

    const { onClose } = props;

    const onClick = () => {
        onClose();
    }

    return (
        <div className={styles.overlay} onClick={onClick}></div>
    );
};

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export { ModalOverlay };