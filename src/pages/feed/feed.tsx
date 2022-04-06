import React, { FC, useEffect } from 'react';

import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

import { IOrderDetails } from '../../utils/interfaces/order.interface';
import { CardOrder } from '../../components/card-order';

import 'simplebar/dist/simplebar.min.css';
import styles from './feed.module.css';
import commonStyles from '../common.module.css';

export const FeedPage: FC = () => {
  const doneOrders = ['034533', '034532', '034530', '034527', '034525'];
  const inProgressOrders = ['034538', '034541', '034542'];
  // TODO: Add helper and change type to number
  const doneForAllTime = '28 752';
  const doneForToday = '138';

  const ordersFeed: IOrderDetails[] = [
    {
      ingredients: [
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d3',
      ],
      _id: '034535',
      name: 'Death Star Starship Main бургер',
      status: 'done',
      number: 34535,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
    {
      ingredients: [
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733d0',
      ],
      _id: '034535',
      name: 'Interstellar бургер',
      status: 'done',
      number: 34535,
      createdAt: '2022-04-01T14:43:22.587Z',
      updatedAt: '2022-04-01T14:43:22.603Z',
    },
    {
      ingredients: [
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d3',
      ],
      _id: '034535',
      name: 'Death Star Starship Main бургер',
      status: 'done',
      number: 34535,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
    {
      ingredients: [
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d3',
      ],
      _id: '034535',
      name: 'Death Star Starship Main бургер',
      status: 'done',
      number: 34535,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
    {
      ingredients: [
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d3',
      ],
      _id: '034535',
      name: 'Death Star Starship Main бургер',
      status: 'done',
      number: 34535,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
    {
      ingredients: [
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d3',
      ],
      _id: '034535',
      name: 'Death Star Starship Main бургер',
      status: 'done',
      number: 34535,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
    {
      ingredients: [
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d3',
      ],
      _id: '034535',
      name: 'Death Star Starship Main бургер',
      status: 'done',
      number: 34535,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
    {
      ingredients: [
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d3',
      ],
      _id: '034535',
      name: 'Death Star Starship Main бургер',
      status: 'done',
      number: 34535,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
    {
      ingredients: [
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d3',
      ],
      _id: '034535',
      name: 'Death Star Starship Main бургер',
      status: 'done',
      number: 34535,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
    {
      ingredients: [
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d3',
      ],
      _id: '034535',
      name: 'Death Star Starship Main бургер',
      status: 'done',
      number: 34535,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
  ];

  useEffect(() => {
    console.log('ready');
  }, []);

  return (
    <div className={classNames(commonStyles.content, styles.feedPage)}>
      <p className="text text_type_main-large mt-10">
        Лента заказов
      </p>
      <div className={classNames(styles.neighboringBlocks, 'mt-5')}>
        <SimpleBar className={classNames(styles.feed)}>
          {ordersFeed.map((order: IOrderDetails) => (
            <CardOrder orderDetails={order} />
          ))}
        </SimpleBar>
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
