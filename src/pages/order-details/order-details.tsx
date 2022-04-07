import React, { FC } from 'react';

import classNames from 'classnames';

import { OrderDetails } from '../../components/order-details';

import styles from './order-details.module.css';
import commonStyles from '../common.module.css';

export const OrderDetailsPage: FC = () => (
  <div className={commonStyles.content}>
    <div className={classNames(styles.orderDetailsPage)}>
      <OrderDetails />
    </div>
  </div>
);
