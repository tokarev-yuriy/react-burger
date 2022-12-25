import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { FC } from 'react';

interface IModalOverlayProps {
    onClose: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }: IModalOverlayProps) => {

    const onClick = (): void => {
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