import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import modalStyles from './modal.module.css';

import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = ({ children , header, onClose }) => {

    useEffect(() => {
        const closeModal = (e) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                onClose();
            }
        }
        
        document.addEventListener('keydown', closeModal);
        return () => {
            document.removeEventListener('keydown', closeModal);
        };
    }, []);

    return ReactDOM.createPortal(
        (<>
            <div className={classNames(modalStyles.modal, 'p-10')}>
                <div className={classNames(modalStyles.modalHeader)}>
                    {header && (<p className={classNames(modalStyles.modalTitle, 'text', 'text_type_main-large')}>{header}</p>)}
                    <CloseIcon type="primary" onClick={onClose} />
                </div>
                <div className={classNames(modalStyles.modalContent)}>
                    {children}
                </div>
            </div>
            <ModalOverlay onClose={onClose} />
        </>),
        document.getElementById('react-modals') as HTMLElement
    );
}

Modal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired
}

export default Modal;
