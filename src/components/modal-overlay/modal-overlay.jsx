import PropTypes from 'prop-types';

import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay({ onClose }) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,react/react-in-jsx-scope
    <div
      className={modalOverlayStyles.overlay}
      onClick={onClose}
      title="Закрыть модальное окно"
    />
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
