import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

import { IOrderDetails } from '../../utils/interfaces/order.interface';
import { CardOrder } from '../../components/card-order';

import 'simplebar/dist/simplebar.min.css';
import styles from './feed.module.css';
import commonStyles from '../common.module.css';
import { setType } from '../../store/actions/feed';
import { wsConnect, wsDisconnect } from '../../store/actions/websockets';
import { TRootState } from '../../utils/types';

export const FeedPage: FC = () => {
  const dispatch = useDispatch();

  const { total, totalToday, allOrders } = useSelector((state: TRootState) => state.feed);

  const doneOrders = useMemo(() => allOrders?.filter((order) => order.status === 'done').map((order) => order.number) || [], [allOrders]);
  const inProgressOrders = useMemo(() => allOrders?.filter((order) => order.status === 'pending').map((order) => order.number) || [], [allOrders]);

  useEffect(() => {
    dispatch(setType('all'));
    dispatch(wsConnect());

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return (
    <div className={classNames(commonStyles.content, styles.feedPage)}>
      <p className="text text_type_main-large mt-10">
        Лента заказов
      </p>
      <div className={classNames(styles.neighboringBlocks, 'mt-5')}>
        <SimpleBar className={classNames(styles.feed)}>
          {allOrders && allOrders.map((order: IOrderDetails) => (
            <CardOrder orderDetails={order} />
          ))}
        </SimpleBar>
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
