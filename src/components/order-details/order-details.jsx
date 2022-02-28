import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './order-details.module.css';
import doneImg from '../../images/done.svg';

function OrderDetails({ orderNumber }) {
  return (
    <div className={styles.modal}>
      <div className={classNames(styles.orderNumber, 'mb-8', 'text', 'text_type_digits-large')}>
        {orderNumber}
      </div>
      <div className={classNames(styles.orderSubtext, 'mb-15', 'text', 'text_type_main-medium')}>
        идентификатор заказа
      </div>
      <img className={classNames(styles.orderDoneImg, 'mb-15')} src={doneImg} alt="done" />
      <div className={classNames(styles.orderStatus, 'mb-2', 'text', 'text_type_main-default')}>
        Ваш заказ начали готовить
      </div>
      <div className={classNames(styles.orderSubStatus, 'mb-20', 'text', 'text_type_main-default')}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>

  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};

export default OrderDetails;
