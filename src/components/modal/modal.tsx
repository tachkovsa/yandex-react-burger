import ReactDOM from 'react-dom';
import React, { FC, useEffect } from 'react';
import classNames from 'classnames';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

import ModalOverlay from '../modal-overlay/modal-overlay';

const ESC_KEYCODE = 27;

export interface IModalProps {
  header: string;
  onClose: () => void;
}

export const Modal: FC<IModalProps> = ({
  children,
  header,
  onClose,
}) => {
  const reactModalsPlaceholder = document.getElementById('react-modals') || document.createElement('div');

  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
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
    reactModalsPlaceholder,
  );
};
