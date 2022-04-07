import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

import { CardOrder } from '../card-order';
import { IOrderDetails } from '../../utils/interfaces/order.interface';
import { TRootState } from '../../utils/types';

import 'simplebar/dist/simplebar.min.css';
import styles from './my-orders.module.css';

export const MyOrders: FC = () => {
  const { myOrders } = useSelector((state: TRootState) => state.feed);

  return (
    <SimpleBar className={classNames(styles.feed)}>
      {myOrders && myOrders.map((order: IOrderDetails) => (
        <CardOrder orderDetails={order} key={order._id} showOrderStatus />
      ))}
    </SimpleBar>
  );
};
