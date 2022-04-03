import React, { FC, useEffect } from 'react';

import classNames from 'classnames';

import styles from './feed.module.css';
import commonStyles from '../common.module.css';

export const FeedPage: FC = () => {
  const doneOrders = ['034533', '034532', '034530', '034527', '034525'];
  const inProgressOrders = ['034538', '034541', '034542'];
  // TODO: Add helper and change type to number
  const doneForAllTime = '28 752';
  const doneForToday = '138';

  useEffect(() => {
    console.log('ready');
  }, []);
  return (
    <div className={classNames(commonStyles.content, styles.feedPage)}>
      <p className="text text_type_main-large mt-10">
        Лента заказов
      </p>
      <div className={classNames(styles.neighboringBlocks, 'mt-5')}>
        <section className={styles.feed}>123</section>
        <section className={classNames(styles.dashboard, 'ml-15')}>
          <div className={styles.neighboringBlocks}>
            <div className={styles.doneContainer}>
              <p className="text text_type_main-medium pb-6">Готовы:</p>
              <ul className={styles.doneOrdersList}>
                {doneOrders.map((orderNumber) => (
                  <li className={classNames(styles.doneOrder, 'text text_type_digits-default')} key={orderNumber}>{orderNumber}</li>
                ))}
              </ul>
            </div>
            <div className={classNames(styles.inProgressContainer, 'ml-9')}>
              <p className="text text_type_main-medium pb-6">В работе:</p>
              <ul className={styles.inProgressOrdersList}>
                {inProgressOrders.map((orderNumber) => (
                  <li className={classNames(styles.inProgressOrder, 'text text_type_digits-default')} key={orderNumber}>{orderNumber}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={classNames(styles.doneForAllTime, 'mt-15')}>
            <p className="text text_type_main-medium">Выполнено за всё время:</p>
            <p className={classNames(commonStyles.highlightedText, 'text text_type_digits-large')}>{doneForAllTime}</p>
          </div>
          <div className={classNames(styles.doneForToday, 'mt-15')}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={classNames(commonStyles.highlightedText, 'text text_type_digits-large')}>{doneForToday}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
