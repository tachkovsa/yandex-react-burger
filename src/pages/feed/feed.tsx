import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

import { TRootState } from '../../utils/types';
import { OrdersList } from '../../components/orders-list';

import 'simplebar/dist/simplebar.min.css';
import styles from './feed.module.css';
import commonStyles from '../common.module.css';

export const FeedPage: FC = () => {
  const { total, totalToday, orders } = useSelector((state: TRootState) => state.feed);

  const foreignOrders = useMemo(() => orders?.filter((order) => !order._isOwn) || null, [orders]);
  const doneOrders = useMemo(() => foreignOrders?.filter((order) => order.status === 'done').map((order) => order.number) || [], [foreignOrders]);
  const inProgressOrders = useMemo(() => foreignOrders?.filter((order) => order.status === 'pending').map((order) => order.number) || [], [foreignOrders]);

  return (
    <div className={classNames(commonStyles.content, styles.feedPage)}>
      <p className="text text_type_main-large mt-10">
        Лента заказов
      </p>
      <div className={classNames(styles.neighboringBlocks, 'mt-5')}>
        <OrdersList orders={foreignOrders} showOrderStatus={false} className={styles.feed} />
        <section className={classNames(styles.dashboard, 'ml-15')}>
          <div className={styles.neighboringBlocks}>
            <div className={styles.doneContainer}>
              <p className="text text_type_main-medium pb-6">Готовы:</p>
              <SimpleBar className={styles.doneOrdersList}>
                {doneOrders.map((orderNumber) => (
                  <div className={classNames(styles.doneOrder, 'text text_type_digits-default')} key={orderNumber}>{orderNumber}</div>
                ))}
              </SimpleBar>
            </div>
            <div className={classNames(styles.inProgressContainer, 'ml-9')}>
              <p className="text text_type_main-medium pb-6">В работе:</p>
              <SimpleBar className={styles.inProgressOrdersList}>
                {inProgressOrders.map((orderNumber) => (
                  <div className={classNames(styles.inProgressOrder, 'text text_type_digits-default')} key={orderNumber}>{orderNumber}</div>
                ))}
              </SimpleBar>
            </div>
          </div>
          <div className={classNames(styles.doneForAllTime, 'mt-15')}>
            <p className="text text_type_main-medium">Выполнено за всё время:</p>
            <p className={classNames(commonStyles.highlightedText, 'text text_type_digits-large')}>{total}</p>
          </div>
          <div className={classNames(styles.doneForToday, 'mt-15')}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={classNames(commonStyles.highlightedText, 'text text_type_digits-large')}>{totalToday}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
