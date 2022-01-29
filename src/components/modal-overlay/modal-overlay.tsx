
import modalOverlayStyles from './modal-overlay.module.css';

const ModalOverlay = ({ onClose }) => {
    return (
        <div
            className={modalOverlayStyles.overlay}
            onClick={onClose}
            title="Закрыть модальное окно"
        >
        </div>
    );
}

export default ModalOverlay;
