import React, { FC } from 'react';

import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

import { CardOrder } from '../card-order';
import { IOrderDetails } from '../../utils/interfaces/order.interface';
import { useWebSocket } from '../../hooks/useWebSocket';

import 'simplebar/dist/simplebar.min.css';
import styles from './orders-list.module.css';

type TOrdersListProps = {
  orders?: IOrderDetails[] | null,
  showOrderStatus?: boolean,
  className?: string
};
export const OrdersList: FC<TOrdersListProps> = ({
  orders,
  showOrderStatus,
  className,
}) => {
  useWebSocket();

  return (
    <SimpleBar className={classNames(styles.feed, className)}>
      {orders && orders.map((order) => (
        <CardOrder
          orderDetails={order}
          key={order._id}
          showOrderStatus={showOrderStatus}
        />
      ))}
      {!!orders && (
        <div className={styles.waiting}>Проверяем заказы...</div>
      )}
    </SimpleBar>
  );
};
OrdersList.defaultProps = {
  orders: null,
  showOrderStatus: false,
  className: '',
};
