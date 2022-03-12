import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

import ModalOverlay from '../modal-overlay/modal-overlay';

const ESC_KEYCODE = 27;
const Modal = ({ children, header, onClose }) => {
  useEffect(() => {
    const closeModal = (e) => {
      if (e.key === 'Escape' || e.keyCode === ESC_KEYCODE) {
        onClose();
      }
    };

    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    (
      <>
        <div className={classNames(styles.modal, 'p-10')}>
          <div className={classNames(styles.modalHeader)}>
            {header && (<p className={classNames(styles.modalTitle, 'text', 'text_type_main-large')}>{header}</p>)}
            <CloseIcon type="primary" onClick={onClose} />
          </div>
          <div className={classNames(styles.modalContent)}>
            {children}
          </div>
        </div>
        <ModalOverlay onClose={onClose} />
      </>
    ),
    document.getElementById('react-modals'),
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
