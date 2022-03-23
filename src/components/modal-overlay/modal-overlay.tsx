import React, { FC } from 'react';

import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClose: () => void;
}
export const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => (
  <div
    className={styles.overlay}
    onClick={onClose}
    title="Закрыть модальное окно"
  />
);
