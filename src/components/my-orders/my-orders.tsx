import React, { FC, useMemo } from 'react';

import classNames from 'classnames';
import SimpleBar from 'simplebar-react';
import { IOrderDetails } from '../../utils/interfaces/order.interface';
import { CardOrder } from '../card-order';

import 'simplebar/dist/simplebar.min.css';
import styles from './my-orders.module.css';

export const MyOrders: FC = () => {
  const ordersFeed: IOrderDetails[] = useMemo(() => [
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
      _id: '034536',
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
      _id: '034537',
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
      _id: '034538',
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
      _id: '034539',
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
      _id: '034540',
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
      _id: '034541',
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
      _id: '034542',
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
      _id: '034543',
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
      _id: '034544',
      name: 'Death Star Starship Main бургер',
      status: 'done',
      number: 34535,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
  ], []);

  return (
    <SimpleBar className={classNames(styles.feed)}>
      {ordersFeed.map((order: IOrderDetails) => (
        <CardOrder orderDetails={order} key={order._id} showOrderStatus />
      ))}
    </SimpleBar>
  );
};
