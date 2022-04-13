import React, { FC } from 'react';
import classNames from 'classnames';

import styles from './order-accepted.module.css';
import doneImg from '../../images/done.svg';

interface IOrderAcceptedProps {
  orderNumber: number;
}

export const OrderAccepted: FC<IOrderAcceptedProps> = ({ orderNumber }) => (
  <div className={styles.modal}>
    <div
      className={classNames(styles.orderNumber, 'mb-8', 'text', 'text_type_digits-large')}
      data-test="order-number"
    >
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
